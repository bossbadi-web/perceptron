<!-- a card for a quiz on the library page -->

<script>
  import Explore from "./Explore.svelte";
  export let quiz, quizIdx;
</script>

<Explore {quiz} {quizIdx} showVisibility={true}>
  <a href={`/edit/${quiz.id}`} class="btn btn-secondary" data-sveltekit-reload>Edit</a>
</Explore>
