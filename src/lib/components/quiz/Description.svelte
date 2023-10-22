<script>
  import Stats from "./Stats.svelte";
  export let quiz;
</script>

<Stats {quiz}>
  <div class="description lead">
    {quiz.description}
  </div>
</Stats>

<style>
  .description {
    margin-bottom: 1rem;
    word-break: break-word;
  }
</style>
