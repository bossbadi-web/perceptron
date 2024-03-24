<!-- a card for a quiz on the library page -->

<script>
  import Explore from "./Explore.svelte";
  export let quiz, data;
</script>

<Explore {quiz} {data} showVisibility={true}>
  <a href={`/edit/${quiz.id}`} class="btn btn-secondary" data-sveltekit-reload>Edit</a>
</Explore>
