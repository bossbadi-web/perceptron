<!-- a card for a quiz on the library page -->

<script>
  import Explore from "./Explore.svelte";
  export let quiz, data;
</script>

<Explore {quiz} {data} showVisibility={true}>
  <a href={`/edit/${quiz.id}`} class="btn btn-secondary" title="Edit">
    <i class="fas fa-edit" />
  </a>
</Explore>
