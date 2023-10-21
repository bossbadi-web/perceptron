<script>
  import McqPreview from "$lib/models/McqPreview.svelte";

  export let data;
  const { quiz } = data;
</script>

<section>
  <div class="container">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="text-center alert alert-info" role="alert">
          <p>This is a preview of the quiz. You can't submit your answers here.</p>
          <a href="/edit/{quiz.id}" class="btn btn-primary">Edit</a>
          <a href="/play/{quiz.id}" class="btn btn-success">Play</a>
        </div>

        <div class="quiz-metadata">
          <h1 class="quiz-title display-3">{quiz.title}</h1>
          <p class="quiz-description lead">{quiz.description}</p>
        </div>

        {#each quiz?.data as question}
          <div class="question-box">
            <McqPreview {question} />
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .quiz-metadata {
    text-align: center;
    margin-top: 2rem;
    margin-bottom: 4rem;
  }

  .quiz-description {
    font-size: 1.2rem;
  }

  .question-box {
    border: 1px solid gray;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
    padding: 2rem;
    margin-bottom: 2rem;
    border-radius: 1rem;
  }

  @media (max-width: 768px) {
    .question-box {
      padding: 1rem;
    }
  }
</style>
