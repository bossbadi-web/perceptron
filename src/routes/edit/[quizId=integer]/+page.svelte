<!-- this is the quiz editing page -->

<script>
  export let data;

  import McqEdit from "$lib/models/McqEdit.svelte";
  import Divider from "$lib/models/Divider.svelte";
  // import { createEditQuizStore } from "$lib/stores/editQuiz.js";
  // import { onDestroy } from "svelte";

  // const editQuizStore = createEditQuizStore(data?.questions);
  // const unsubscribe = editQuizStore.subscribe((model) => console.log("subscribe"));

  // onDestroy(() => {
  //   unsubscribe();
  // });

  export let questions = data?.questions || [];

  const EMPTY_QUESTION = {
    question: "",
    options: ["", "", "", ""],
    answer: "",
  };

  function insertQuestion(index) {
    console.log("insertQuestion", index);
    questions = [...questions.slice(0, index + 1), EMPTY_QUESTION, ...questions.slice(index + 1)];
  }

  function deleteQuestion(index) {
    questions.splice(index, 1);
    questions = [...questions];
  }
</script>

<section>
  <div class="container">
    <form method="POST">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          {#each questions as question, index}
            <div class="question-box">
              <McqEdit {question} />
              <button on:click|preventDefault={() => deleteQuestion(index)} class="btn btn-outline-danger"
                >Delete</button
              >
            </div>
            <button on:click|preventDefault={() => insertQuestion(index)} class="btn btn-primary">Insert</button>
          {/each}
        </div>
      </div>

      <div class="row">
        <div class="col-md-8 offset-md-2 text-center">
          <!-- save button, send list to action -->
          <button type="submit" class="btn btn-primary btn-lg">Save</button>
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
