<script>
  import Mcq from "$lib/models/Mcq.svelte";

  export let data;
  const { quiz } = data;

  let currentQuestionIdx = -1;
  let currentQuestion = null;
  let score = 0;

  function nextQuestion() {
    currentQuestionIdx++;
    currentQuestion = quiz.data[currentQuestionIdx];
  }
</script>

<section>
  <div class="container">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="question-box">
          {#if !currentQuestion}
            <div class="quiz-metadata">
              <h1 class="quiz-title display-3">{quiz.title}</h1>
              <p class="quiz-description lead">{quiz.description}</p>
              <button class="btn btn-main btn-lg" on:click={nextQuestion}>Start Quiz</button>
            </div>
          {:else}
            <Mcq question={currentQuestion} />
          {/if}
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .quiz-metadata {
    text-align: center;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  .quiz-description {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }

  .question-box {
    border: 1px solid gray;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
    padding: 4rem;
    margin-bottom: 2rem;
    border-radius: 1rem;
  }

  @media (max-width: 768px) {
    .question-box {
      padding: 2rem;
    }
  }
</style>
