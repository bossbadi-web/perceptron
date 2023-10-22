<script>
  import "$lib/components/mcq/styles.css";
  import Mcq from "$lib/components/mcq/Play.svelte";
  import McqSummary from "$lib/components/mcq/Summary.svelte";
  import QuizDescription from "$lib/components/quiz/Description.svelte";
  import { secondsToHmsString } from "$lib/utils";
  import { onMount } from "svelte";

  onMount(() => {
    document.body.style.backgroundImage =
      "url(https://images.unsplash.com/photo-1682687220777-2c60708d6889?auto=format&fit=crop&q=80&w=2370&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";

    return () => {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundRepeat = "";
      document.body.style.backgroundAttachment = "";
    };
  });

  export let data;
  const { quiz } = data;

  let { supabase, session } = data;
  $: ({ supabase, session } = data);

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

<section>
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
              <button class="start-btn btn btn-main btn-lg" on:click={nextQuestion}>Start</button>
            </div>
          </div>
        {:else if currentQuestionIdx < quiz.data.length}
          <!-- if quiz not over -->
          <div class="question-box">
            <Mcq question={currentQuestion} questionIdx={currentQuestionIdx} {nextQuestion} />
          </div>
        {:else}
          <!-- if quiz over -->
          <div class="text-center alert alert-info" role="alert">
            <div class="score">
              <p>
                Your Score: {score}/{quiz.data.length} ({(score / quiz.data.length) * 100}%)
              </p>
              <p>
                Time Taken: {secondsToHmsString((Date.now() - startTime) / 1000)}
              </p>
            </div>
            <button class="btn btn-main" on:click={() => window.location.reload()}>Play Again</button>
            {#if session}
              <a href="/edit/{quiz.id}" class="btn btn-secondary">Edit</a>
            {/if}
          </div>

          <div class="quiz-metadata">
            <h1 class="quiz-title display-4">{quiz.title}</h1>
            <p class="quiz-description lead">{quiz.description}</p>
          </div>

          <!-- display summary -->
          {#each quiz.data as question, questionIdx}
            <div class="question-box">
              <McqSummary {question} {questionIdx} playerAnswerIdx={playerAnswers[questionIdx]} />
            </div>
          {/each}
        {/if}
      </div>
    </div>
  </div>
</section>
