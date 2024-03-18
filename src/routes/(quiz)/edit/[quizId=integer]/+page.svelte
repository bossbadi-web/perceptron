<script>
  import "$lib/components/mcq/styles.css";
  import { createEditQuizStore, edited } from "$lib/stores/editQuiz";
  import { enhance } from "$app/forms";
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import MainFields from "$lib/components/form/MainFields.svelte";
  import Stats from "$lib/components/quiz/Stats.svelte";
  export let data;

  const { quiz, LIMITS } = data;
  const editQuizStore = createEditQuizStore(quiz);

  $: jsonVersion = JSON.stringify($editQuizStore.data);

  onMount(() => {
    // prevent accidental page close
    window.onbeforeunload = (e) => {
      if ($edited) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    document.getElementById("quiz-form").addEventListener("submit", () => {
      edited.set(false);
    });

    // keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      // Enter: add a new question below
      // Shift + Enter: add a new question above
      if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
        e.preventDefault();
        const activeElement = document.activeElement;
        if (activeElement.tagName === "INPUT" && activeElement.type === "text") {
          const questionIdx = activeElement.closest(".question-box").getAttribute("data-question-idx");
          if (e.shiftKey) {
            editQuizStore.insertQuestion(parseInt(questionIdx) - 1);
            setTimeout(() => {
              const newQuestion = document.getElementById(`question-${parseInt(questionIdx)}`);
              newQuestion.querySelector(".a-title").focus();
            }, 0);
          } else {
            editQuizStore.insertQuestion(parseInt(questionIdx));
            setTimeout(() => {
              const newQuestion = document.getElementById(`question-${parseInt(questionIdx) + 1}`);
              newQuestion.querySelector(".a-title").focus();
            }, 0);
          }
        }
      }

      // Tab: focus on next field
      // Shift + Tab: focus on previous field
      else if (e.key === "Tab") {
        const activeElement = document.activeElement;
        if (activeElement.closest(".question-box")) {
          e.preventDefault();
          const questionIdx = activeElement.closest(".question-box").getAttribute("data-question-idx");
          const fields = activeElement.closest(".question-box").querySelectorAll("input[type='text']");
          const idx = Array.from(fields).indexOf(activeElement);
          if (e.shiftKey) {
            if (idx > 0) {
              fields[idx - 1].focus();
            } else {
              const prevQuestion = document.getElementById(`question-${parseInt(questionIdx) - 1}`);
              if (prevQuestion) {
                const prevFields = prevQuestion.querySelectorAll("input[type='text']");
                prevFields[prevFields.length - 1].focus();
              } else {
                // create a new question above
                editQuizStore.insertQuestion(parseInt(questionIdx) - 1);
                setTimeout(() => {
                  const newQuestion = document.getElementById(`question-${parseInt(questionIdx)}`);
                  newQuestion.querySelector(".a-title").focus();
                }, 0);
              }
            }
          } else {
            if (idx < fields.length - 1) {
              fields[idx + 1].focus();
            } else {
              const nextQuestion = document.getElementById(`question-${parseInt(questionIdx) + 1}`);
              if (nextQuestion) {
                nextQuestion.querySelector(".a-title").focus();
              } else {
                // create a new question below
                editQuizStore.insertQuestion(parseInt(questionIdx));
                setTimeout(() => {
                  const newQuestion = document.getElementById(`question-${parseInt(questionIdx) + 1}`);
                  newQuestion.querySelector(".a-title").focus();
                }, 0);
              }
            }
          }
        }
      } else if (e.ctrlKey) {
        switch (e.key.toLowerCase()) {
          case "s": // Ctrl + S: save
            e.preventDefault();
            document.querySelector("button[formaction='?/save']").click();
            break;
          case "p": // Ctrl + P: play
            e.preventDefault();
            document.querySelector("button[formaction='?/play']").click();
            break;
          case "o": // Ctrl + O: preview
            e.preventDefault();
            document.querySelector("button[formaction='?/preview']").click();
            break;
          case "e": // Ctrl + E: do nothing
            e.preventDefault();
            break;
        }
      }
    });
  });

  const confirmDelete = () => {
    confirm("Are you sure?") && document.querySelector("button[formaction='?/delete']").click();
  };
</script>

<section in:fade>
  <div class="container">
    <form id="quiz-form" method="POST" use:enhance>
      <div class="row normal-row">
        <div class="col-md-10 offset-md-1">
          <div class="mb-3">
            <h1 class="display-4 text-center">
              <i class="fas fa-edit" />
              Edit Perceptron
            </h1>
            <p class="text-center">
              <Stats quiz={$editQuizStore} />
            </p>
          </div>

          <br />

          <MainFields quiz={editQuizStore} />

          <div class="divider">
            <button on:click|preventDefault={() => editQuizStore.insertQuestion(-1)}>
              {#if $editQuizStore.data.length === 0}
                <div class="add-question-hint">Click this to add a question</div>
              {/if}
              <div>+</div>
            </button>
          </div>

          {#each $editQuizStore.data as question, questionIdx}
            <div class="question-box" id="question-{questionIdx}" data-question-idx={questionIdx}>
              <p class="text-muted">Question {questionIdx + 1} of {$editQuizStore.data.length}</p>

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
          <button class="btn btn-main btn-lg" formaction="?/save" title="Ctrl + S">Save</button>
          <button class="btn btn-main btn-lg" formaction="?/play" title="Ctrl + P">Play</button>
          <button class="btn btn-secondary btn-lg" formaction="?/preview" title="Ctrl + O">Preview</button>
          <button class="btn btn-danger btn-lg" formnovalidate on:click|preventDefault={confirmDelete}>Delete</button>
          <button class="btn btn-danger btn-lg d-none" formaction="?/delete" />
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
    color: var(--primary);
  }

  .question-box {
    color: var(--font);
    border: 1px solid gray;
    background-color: var(--card-background);
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
    padding: 2rem;
    margin-bottom: 1rem;
    border-radius: 1rem;
    transition: 0.5s;
  }
  .question-box:focus-within {
    background-color: var(--card-hover);
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
