<!-- this is the quiz editing page -->

<script>
  import { createEditQuizStore } from "$lib/stores/editQuiz.js";
  export let data;

  const { quiz } = data;
  const editQuizStore = createEditQuizStore(quiz?.data);

  $: jsonVersion = JSON.stringify($editQuizStore);
</script>

<section>
  <div class="container">
    <form method="POST">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <div class="mb-3">
            <h1 class="text-center display-4">Edit Perceptron</h1>
            <input class="form-control" type="text" name="title" placeholder="Title" bind:value={quiz.title} />
            <input class="form-control" type="text" name="description" placeholder="Description" bind:value={quiz.description} />
          </div>

          {#each $editQuizStore as question, questionIdx}
            <div class="question-box">
              <input class="form-control a-title" type="text" placeholder="Question" bind:value={question.question} />

              {#each question.options as _, optionIdx}
                <input
                  class="form-control an-option"
                  type="text"
                  placeholder="Option {optionIdx + 1}"
                  bind:value={question.options[optionIdx]}
                />
              {/each}

              <button
                on:click|preventDefault={() => editQuizStore.deleteQuestion(questionIdx)}
                class="btn btn-outline-danger"
              >
                Delete
              </button>
            </div>
            <button on:click|preventDefault={() => editQuizStore.insertQuestion(questionIdx)} class="btn btn-primary">
              Insert
            </button>
          {/each}
        </div>
      </div>

      <div class="row">
        <div class="col-md-8 offset-md-2 text-center">
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

  .a-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .an-option {
    margin-bottom: 0.5rem;
  }

  @media (max-width: 768px) {
    .question-box {
      padding: 1rem;
    }
  }
</style>
