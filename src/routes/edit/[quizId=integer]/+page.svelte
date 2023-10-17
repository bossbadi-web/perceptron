<!-- this is the quiz editing page -->

<script>
  export let data;

  import McqEdit from "$lib/models/McqEdit.svelte";
  import Divider from "$lib/models/Divider.svelte";
  import { createEditQuizStore, questionHandler } from "$lib/stores/editQuiz.js";
  // import { onDestroy } from "svelte";

  // const editQuizStore = createEditQuizStore(data?.questions);
  // const unsubscribe = editQuizStore.subscribe((model) => console.log("test"));

  // onDestroy(() => {
  //   unsubscribe();
  // });

  // export let questions = data?.questions ?? [];

  $: questions = createEditQuizStore(data?.questions);

  function insertQuestion(index) {
    console.log('here')
    $questions.data.splice(index, 0, {
      question: "ez",
      answer: "",
      options: [],
    });
  }
</script>

<section>
  <div class="container">
    <form>
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <button on:click={() => insertQuestion(0)} class="btn btn-primary btn-lg">Add Question</button>
          {#each $questions.data as question}
            <div class="question-box">
              <McqEdit {question} />
            </div>
            <Divider />
          {/each}
        </div>
      </div>

      <div class="row">
        <div class="col-md-8 offset-md-2 text-center">
          <button class="btn btn-primary btn-lg">Save</button>
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
