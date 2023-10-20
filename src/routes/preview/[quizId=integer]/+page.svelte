<script>
  import McqPreview from "$lib/models/McqPreview.svelte";

  export let data;
  const { quiz } = data;
</script>

<section>
  <div class="container">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="mb-3">
          <h1 class="display-4">Preview Perceptron</h1>
          <h1>{quiz.title}</h1>
          <p>{quiz.description}</p>
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
  .question-box {
    border: 1px solid black;
    padding: 2rem;
    margin-bottom: 1rem;
    border-radius: 1rem;
  }

  @media (max-width: 768px) {
    .question-box {
      padding: 1rem;
    }
  }
</style>
