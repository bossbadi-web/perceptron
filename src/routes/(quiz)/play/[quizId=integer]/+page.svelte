<script>
  import "$lib/components/mcq/styles.css";
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { secondsToHmsString } from "$lib/utils";
  import LikeDislike from "$lib/components/quiz/LikeDislike.svelte";
  import Mcq from "$lib/components/mcq/Play.svelte";
  import McqSummary from "$lib/components/mcq/Summary.svelte";
  import QuizDescription from "$lib/components/quiz/Description.svelte";
  export let data;

  const { quiz } = data;

  onMount(() => {
    // keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      // Ctrl + O: preview
      if (e.ctrlKey && e.key === "o") {
        e.preventDefault();
        window.location.href = `/preview/${quiz.id}`;
      }

      // Ctrl + P: do nothing
      else if (e.ctrlKey && e.key === "p") {
        e.preventDefault();
      }

      // Ctrl + E: edit
      else if (e.ctrlKey && e.key === "e") {
        e.preventDefault();

        if (!data.session?.user?.id) {
          alert("Please login to edit this quiz.");
        } else if (data.session?.user?.id !== quiz?.owner) {
          alert("You are not the owner of this quiz.");
        } else {
          window.location.href = `/edit/${quiz.id}`;
        }
      }
    });

    if (quiz?.bg) {
      const bg = document.getElementById("background");
      bg.style.backgroundImage = `url(${quiz.bg})`;

      return () => {
        bg.style.backgroundImage = "";
      };
    }
  });

  $: ({ session } = data);

  let currentQuestionIdx = -1;
  let currentQuestion = null;
  let score = 0;
  let playerAnswers = [];
  let startTime = null;

  const nextQuestion = ({ wasCorrect, idx }) => {
    if (!startTime) {
      startTime = new Date();
    }

    if (wasCorrect && currentQuestion) {
      score++;
    }

    if (idx !== undefined) {
      playerAnswers.push(idx);
    }

    currentQuestionIdx++;
    currentQuestion = quiz.data[currentQuestionIdx];
  };
</script>

<section in:fade>
  <div class="container">
    <div class="row">
      <div class="col-md-10 offset-md-1">
        {#if currentQuestionIdx === -1}
          <!-- if quiz not started -->
          <div class="question-box">
            <div class="quiz-metadata">
              <h1 class="quiz-title display-4">{quiz.title}</h1>
              <p>
                <QuizDescription {quiz} showVisibility={true} />
              </p>
              <p>
                <LikeDislike {data} />
              </p>
              <button class="start-btn btn btn-main btn-lg" on:click={nextQuestion}>Start</button>
            </div>
          </div>
        {:else if currentQuestionIdx < quiz.data.length}
          <!-- if quiz not over -->
          <div class="question-box">
            <Mcq question={currentQuestion} questionIdx={currentQuestionIdx} {nextQuestion} length={quiz.data.length} />
          </div>
        {:else}
          <!-- if quiz over -->
          <div class="text-center alert alert-info" role="alert">
            <p>
              Your Score: {score}/{quiz.data.length} ({((score / quiz.data.length) * 100).toFixed(0)}%)
            </p>
            <p>
              Time Taken: {secondsToHmsString((Date.now() - startTime) / 1000)}
            </p>
            <button class="btn btn-main" on:click={() => window.location.reload()}>Play Again</button>
            {#if session}
              <a href="/edit/{quiz.id}" class="btn btn-secondary" data-sveltekit-preload-data="tap">Edit</a>
            {/if}
          </div>

          <div class="question-box">
            <div class="quiz-metadata">
              <h1 class="quiz-title display-4">{quiz.title}</h1>
              <p class="quiz-description lead">{quiz.description}</p>
            </div>
          </div>

          <!-- display summary -->
          {#each quiz.data as question, questionIdx}
            <div class="question-box">
              <McqSummary
                {question}
                {questionIdx}
                playerAnswerIdx={playerAnswers[questionIdx]}
                length={quiz.data.length}
              />
            </div>
          {/each}
        {/if}
      </div>
    </div>
  </div>
</section>
