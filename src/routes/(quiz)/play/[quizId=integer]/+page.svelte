<script>
  import "$lib/components/quiz/play/styles.css";
  import { beforeNavigate } from "$app/navigation";
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { secondsToHmsString } from "$lib/utils";
  import LikeDislike from "$lib/components/quiz/browse/LikeDislike.svelte";
  import McqPlay from "$lib/components/quiz/play/Play.svelte";
  import McqSummary from "$lib/components/quiz/play/Summary.svelte";
  import QuizDescription from "$lib/components/quiz/browse/Description.svelte";
  import toast from "svelte-french-toast";

  export let data;

  $: ({ session } = data);
  const { quiz, lastScore } = data;

  let currentQuestionIdx = -1;
  let currentQuestion = null;
  let score = 0;
  let playerAnswers = [];
  let startTime = null;
  let didWrongsOverride = false; // override original questions with wrongs only

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

  const nextQuestionWrongsOnly = (args) => {
    if (!didWrongsOverride) {
      didWrongsOverride = true;
      quiz.data = quiz.data.filter((q) => lastScore.questions_wrong.includes(q.question));
    }
    nextQuestion(args);
  };

  const saveScore = async () => {
    const questionsWrong = [];
    for (let i = 0; i < quiz.data.length; i++) {
      if (playerAnswers[i] !== quiz.data[i].answer) {
        questionsWrong.push(quiz.data[i].question);
      }
    }

    // time taken in nearest second
    const timeTaken = Math.round((Date.now() - startTime) / 1000);
    const questionCount = quiz.data.length;

    // fetch request to the current page
    await fetch(window.location.pathname, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        finished_at: new Date().toISOString(),
        questions_wrong: questionsWrong,
        time_taken: timeTaken,
        question_count: questionCount,
      }),
    });
  };

  // save score when quiz is over
  $: if (currentQuestionIdx >= quiz.data.length) {
    saveScore();
  }

  // show last score
  $: if (lastScore) {
    const ls = lastScore;
    const num = ls.question_count - ls.questions_wrong.length;
    const pScore = `Last attempt: ${num}/${ls.question_count} (${((num / ls.question_count) * 100).toFixed(0)}%)`;
    const pTime = `Time taken: ${secondsToHmsString(ls.time_taken)}`;
    const pWhen = `Finished at: ${new Date(ls.finished_at).toLocaleString()}`;
    toast.success(`${pScore}\n${pTime}\n${pWhen}`, { duration: 5000, position: "bottom-left" });
  }

  onMount(() => {
    // keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey) {
        switch (e.key.toLowerCase()) {
          case "o": // Ctrl + O: preview
            e.preventDefault();
            window.location.href = `/preview/${quiz.id}`;
            break;
          case "p": // Ctrl + P: do nothing
            e.preventDefault();
            break;
          case "e": // Ctrl + E: edit
            e.preventDefault();
            if (!session?.user) {
              alert("Please login to edit this quiz.");
            } else if (session.user.id !== quiz.owner) {
              alert("You are not the owner of this quiz.");
            } else {
              window.location.href = `/edit/${quiz.id}`;
            }
            break;
        }
      }
    });

    if (quiz.bg) {
      const bg = document.getElementById("background");
      bg.style.backgroundImage = `url(${quiz.bg})`;

      return () => {
        bg.style.backgroundImage = "";
      };
    }
  });

  beforeNavigate(() => {
    toast.dismiss();
  });
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
              {#if lastScore?.questions_wrong && lastScore.questions_wrong.length}
                <button class="start-btn btn btn-secondary btn-lg" on:click={nextQuestionWrongsOnly}>
                  Wrongs Only
                </button>
              {/if}
            </div>
          </div>
        {:else if currentQuestionIdx < quiz.data.length}
          <!-- if quiz not over -->
          <div class="question-box">
            <McqPlay
              question={currentQuestion}
              questionIdx={currentQuestionIdx}
              {nextQuestion}
              length={quiz.data.length}
            />
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
            <button class="btn btn-main" on:click={() => window.location.reload()} title="Ctrl + R">
              <i class="fa fa-redo"></i> Retry
            </button>
            {#if session?.user}
              <a href="/edit/{quiz.id}" class="btn btn-secondary" data-sveltekit-preload-data="tap" title="Ctrl + E">
                <i class="fa fa-edit"></i> Edit
              </a>
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
