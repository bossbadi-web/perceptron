<script>
  import "$lib/components/mcq/styles.css";
  import Mcq from "$lib/components/mcq/Play.svelte";
  import McqSummary from "$lib/components/mcq/Summary.svelte";
  import QuizDescription from "$lib/components/quiz/Description.svelte";
  import { secondsToHMS } from "$lib/utils";

  export let data;
  const { quiz } = data;

  let { supabase, session } = data;
  $: ({ supabase, session } = data);

  let currentQuestionIdx = -1;
  let currentQuestion = null;
  let score = 0;
  let playerAnswers = [];

  const nextQuestion = ({ wasCorrect, idx }) => {
    if (wasCorrect && currentQuestion) {
      score++;
    }

    if (idx !== undefined) {
      playerAnswers.push(idx);
    }

    currentQuestionIdx++;
    currentQuestion = quiz.data[currentQuestionIdx];
  };

  // time to complete based total length of questions and options
  let seconds = 0;
  quiz.data.forEach((question) => {
    seconds += question.options.length * 5;
  });

  // convert to hours, minutes, seconds
  let time = secondsToHMS(seconds);
</script>

<section>
  <div class="container">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        {#if currentQuestionIdx === -1}
          <!-- if quiz not started -->
          <div class="question-box">
            <div class="quiz-metadata">
              <h1 class="quiz-title display-4">{quiz.title}</h1>
              <QuizDescription {quiz} {time} />
              <br />
              <button class="start-btn btn btn-main btn-lg" on:click={nextQuestion}>Start</button>
            </div>
          </div>
        {:else if currentQuestionIdx < quiz.data.length}
          <!-- if quiz not over -->
          <div class="question-box">
            <Mcq question={currentQuestion} {nextQuestion} />
          </div>
        {:else}
          <!-- if quiz over -->
          <div class="text-center alert alert-info" role="alert">
            <div class="score">
              <p>
                Your Score: {score}/{quiz.data.length} ({(score / quiz.data.length) * 100}%)
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
              <McqSummary {question} playerAnswerIdx={playerAnswers[questionIdx]} />
            </div>
          {/each}
        {/if}
      </div>
    </div>
  </div>
</section>
