<!-- a card for a quiz on the library page -->

<script>
  import Explore from "./Explore.svelte";
  export let quiz;
</script>

<Explore {quiz}>
  <a href={`/edit/${quiz.id}`} class="btn btn-secondary">Edit</a>
</Explore>
