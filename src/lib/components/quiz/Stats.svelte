<script>
  import { formatDate, secondsToHmsString, wordCount } from "$lib/utils";
  export let quiz,
    showVisibility = false;

  let timeToComplete = "";

  $: {
    quiz.created_at = formatDate(quiz.created_at);

    let wc = 0;
    quiz.data.forEach((question) => {
      wc += wordCount(question.question);
      question.options.forEach((option) => {
        wc += wordCount(option);
      });
    });

    let seconds = Math.ceil(wc / 7);
    seconds += 2 * quiz.data.length;

    timeToComplete = secondsToHmsString(seconds);
  }
</script>

<slot />

<div class="stats text-muted">
  <div>
    <b>Length:</b>
    {quiz.data.length} question{#if quiz.data.length !== 1}s{/if}
  </div>

  <div>
    <b>Estimated time to complete:</b>
    {timeToComplete}
  </div>

  <div>
    <b>Created:</b>
    {quiz.created_at}
  </div>

  {#if showVisibility}
    <div>
      <b>Visibility:</b>
      {quiz.visibility}
    </div>
  {/if}
</div>

<style>
  .stats {
    display: flex;
    flex-direction: column;
    font-size: 1rem;
  }
</style>
