<script>
  import { formatDate, secondsToHMS } from "$lib/utils";
  export let quiz;

  quiz.created_at = formatDate(quiz.created_at);

  // time to complete based total length of questions and options
  let seconds = 0;
  quiz.data.forEach((question) => {
    seconds += question.options.length * 5;
  });

  // convert to hours, minutes, seconds
  let time = secondsToHMS(seconds);
</script>

<div class="description lead">
  {quiz.description}
</div>

<div class="stats text-muted">
  <div>
    <b>Length:</b>
    {quiz.data.length} question{#if quiz.data.length !== 1}s{/if}
  </div>

  <div>
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

  <div>
    <b>Created:</b>
    {quiz.created_at}
  </div>
</div>

<style>
  .description {
    margin-bottom: 1rem;
    word-break: break-word;
  }

  .stats {
    display: flex;
    flex-direction: column;
    font-size: 1rem;
  }
</style>
