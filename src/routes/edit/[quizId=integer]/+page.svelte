<!-- this is the quiz editing page -->

<script>
  import "$lib/components/mcq/styles.css";
  import { createEditQuizStore } from "$lib/stores/editQuiz";
  import { enhance } from "$app/forms";
  import { fade } from "svelte/transition";
  import MainFields from "$lib/components/form/MainFields.svelte";
  import Stats from "$lib/components/quiz/Stats.svelte";
  export let data, form;

  const { quiz, LIMITS } = data;
  const editQuizStore = createEditQuizStore(quiz?.data);

  $: jsonVersion = JSON.stringify($editQuizStore);
  $: storeData = {
    ...quiz,
    data: $editQuizStore,
  };
</script>

<section in:fade={{ duration: 300, delay: 400 }} out:fade={{ duration: 300 }}>
  <div class="container">
    <form method="POST" use:enhance>
      <div class="row normal-row">
        <div class="col-md-10 offset-md-1">
          {#if form?.message}
            <div class="alert alert-danger" role="alert">
              {form?.message}
            </div>
          {/if}

          <div class="mb-3">
            <h1 class="display-4 text-center">
              <i class="fas fa-edit" />
              Edit Perceptron
            </h1>
            <p class="text-center">
              <Stats quiz={storeData} />
            </p>
          </div>

          <br />

          <MainFields data={storeData} />

          <div class="divider">
            <button on:click|preventDefault={() => editQuizStore.insertQuestion(-1)}>
              {#if $editQuizStore.length === 0}
                <div class="add-question-hint">Click this to add a question</div>
              {/if}
              <div>+</div>
            </button>
          </div>

          {#each $editQuizStore as question, questionIdx}
            <div class="question-box">
              <p class="text-muted">Question {questionIdx + 1}</p>

              <input
                class="form-control a-title"
                type="text"
                placeholder="Question"
                bind:value={question.question}
                maxlength={LIMITS.question}
                required
              />

              {#each question.options as _, optionIdx}
                <div class="input-group mb-1">
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

                  <label class="correctAnswerToggle btn btn-outline-success" for="option-{questionIdx}-{optionIdx}">
                    <span style="width: 1rem; display: inline-block;" />
                  </label>

                  <input
                    type="text"
                    class="form-control"
                    placeholder="Option {optionIdx + 1}"
                    bind:value={question.options[optionIdx]}
                    maxlength={LIMITS.option}
                    required
                  />
                </div>
              {/each}

              <br />

              <button
                on:click|preventDefault={() => editQuizStore.deleteQuestion(questionIdx)}
                class="btn btn-outline-danger"
              >
                <i class="fas fa-trash-alt" />
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
  .add-question-hint {
    font-size: 1rem;
    font-weight: normal;
    margin-bottom: -1rem;
  }

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
    background-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
    padding: 2rem;
    margin-bottom: 1rem;
    border-radius: 1rem;
    transition: 0.5s;
  }
  .question-box:focus-within {
    background-color: white;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
  }

  .correctAnswerToggle {
    border-radius: 0.375rem 0 0 0.375rem !important;
    border: 1px solid rgba(0, 0, 0, 0.125) !important;
  }

  .a-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  @media (max-width: 768px) {
    .question-box {
      padding: 1rem;
    }
  }
</style>
