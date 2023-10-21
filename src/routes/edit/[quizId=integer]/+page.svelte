<!-- this is the quiz editing page -->

<script>
  import { createEditQuizStore } from "$lib/stores/editQuiz";
  export let data, form;

  const { quiz, LIMITS } = data;
  const editQuizStore = createEditQuizStore(quiz?.data);

  $: jsonVersion = JSON.stringify($editQuizStore);
</script>

<section>
  <div class="container">
    <form method="POST">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          {#if form?.message}
            <div class="alert alert-danger" role="alert">
              {form?.message}
            </div>
          {/if}

          <div class="mb-3">
            <h1 class="display-4 text-center">Edit Perceptron</h1>
          </div>

          <div class="mb-3">
            <label for="title">Title<span class="required">*</span></label>
            <input
              class="form-control"
              type="text"
              id="title"
              name="title"
              bind:value={quiz.title}
              maxlength={LIMITS.title}
              required
            />
          </div>

          <div class="mb-3">
            <label for="description">Description<span class="required">*</span></label>
            <input
              class="form-control"
              type="text"
              id="description"
              name="description"
              bind:value={quiz.description}
              maxlength={LIMITS.description}
              required
            />
          </div>

          <div class="divider">
            <button on:click|preventDefault={() => editQuizStore.insertQuestion(-1)}>+</button>
          </div>

          {#each $editQuizStore as question, questionIdx}
            <div class="question-box">
              <input
                class="form-control a-title"
                type="text"
                placeholder="Question"
                bind:value={question.question}
                required
              />

              {#each question.options as _, optionIdx}
                <div class="input-group mb-1">
                  <span class="input-group-text">
                    {#if question.answer !== undefined && optionIdx === question.answer}
                      <input
                        type="radio"
                        class="btn-check"
                        name="options-{questionIdx}"
                        id="option-{questionIdx}-{optionIdx}"
                        autocomplete="off"
                        checked
                        required
                        on:change={() => (question.answer = optionIdx)}
                      />
                    {:else}
                      <input
                        type="radio"
                        class="btn-check"
                        name="options-{questionIdx}"
                        id="option-{questionIdx}-{optionIdx}"
                        autocomplete="off"
                        required
                        on:change={() => (question.answer = optionIdx)}
                      />
                    {/if}

                    <label class="btn btn-outline-success" for="option-{questionIdx}-{optionIdx}">
                      <span style="width: 1rem; display: inline-block;" />
                    </label>
                  </span>

                  <input
                    type="text"
                    class="form-control"
                    placeholder="Option {optionIdx + 1}"
                    bind:value={question.options[optionIdx]}
                    required
                  />
                </div>
              {/each}

              <br />

              <button
                on:click|preventDefault={() => editQuizStore.deleteQuestion(questionIdx)}
                class="btn btn-outline-danger"
              >
                Delete Question
              </button>
            </div>

            <div class="divider">
              <button on:click|preventDefault={() => editQuizStore.insertQuestion(questionIdx)}>+</button>
            </div>
          {/each}
        </div>

        <br />

        <div class="row-of-buttons">
          <input type="hidden" name="questions" bind:value={jsonVersion} />
          <button class="btn btn-main btn-lg" formaction="?/save">Save</button>
          <button class="btn btn-main btn-lg" formaction="?/play">Play</button>
          <button class="btn btn-secondary btn-lg" formaction="?/preview">Preview</button>
          <button class="btn btn-danger btn-lg" formaction="?/delete">Delete</button>
        </div>
      </div>
    </form>
  </div>
</section>

<style>
  .divider {
    display: flex;
    align-items: center;
    text-align: center;
    margin-bottom: 1rem;
  }
  .divider button {
    flex-grow: 1;
    border: none;
    background-color: transparent;
    color: gray;
    font-size: 2rem;
    font-weight: bold;
    transition: 0.5s;
  }
  .divider button:hover {
    color: var(--primary-color);
  }

  .question-box {
    border: 1px solid gray;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
    padding: 2rem;
    margin-bottom: 1rem;
    border-radius: 1rem;
  }

  .a-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .input-group-text {
    background-color: white;
  }

  @media (max-width: 768px) {
    .question-box {
      padding: 1rem;
    }
  }
</style>
