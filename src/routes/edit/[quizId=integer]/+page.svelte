<!-- this is the quiz editing page -->

<script>
  export let data;

  import McqEdit from "$lib/models/McqEdit.svelte";
  import { createEditQuizStore } from "$lib/stores/editQuiz.js";

  const editQuizStore = createEditQuizStore(data?.questions);

  $: jsonVersion = JSON.stringify($editQuizStore);
</script>

<section>
  <div class="container">
    <form method="POST">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          {#each $editQuizStore as question, index}
            <div class="question-box">
              <McqEdit {question} />
              <button on:click|preventDefault={() => editQuizStore.deleteQuestion(index)} class="btn btn-outline-danger"
                >Delete</button
              >
            </div>
            <button on:click|preventDefault={() => editQuizStore.insertQuestion(index)} class="btn btn-primary"
              >Insert</button
            >
          {/each}
        </div>
      </div>

      <div class="row">
        <div class="col-md-8 offset-md-2 text-center">
          <!-- send editQuizStore to the server -->
          <input type="hidden" name="questions" bind:value={jsonVersion} />
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </div>
    </form>
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
