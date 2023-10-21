<script>
  import { formatDate } from "$lib/utils.js";
  export let quiz, time;

  quiz.created_at = formatDate(quiz.created_at);
</script>

<div class="description lead">
  {quiz.description}
</div>

<div class="stats">
  <div class="a-stat">
    <b>Length:</b>
    {quiz.data.length} question{#if quiz.data.length !== 1}s{/if}
  </div>

  <div class="a-stat">
    <b>Time to complete:</b>
    {#if time.h === 0 && time.m === 0 && time.s === 0}
      0 seconds
    {:else}
      {#if time.h !== 0}
        {time.h} hour{#if time.h !== 1}s{/if}
      {/if}

      {#if time.m !== 0}
        {time.m} minute{#if time.m !== 1}s{/if}
      {/if}

      {#if time.s !== 0}
        {time.s} second{#if time.s !== 1}s{/if}
      {/if}
    {/if}
  </div>

  <div class="a-stat">
    <b>Created:</b>
    {quiz.created_at}
  </div>
</div>

<style>
  .description {
    margin-bottom: 1rem;
  }

  .stats {
    display: flex;
    flex-direction: column;
    font-size: 1rem;
  }
</style>
