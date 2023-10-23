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

    let seconds = Math.ceil(wc / 4.5);  // how many words read per second
    seconds += 4 * quiz.data.length;  // 2s thinking + 2s loading per question

    timeToComplete = secondsToHmsString(seconds);
  }
</script>

<slot />

<div class="stats">
  <div>
    <b>Length:</b>
    {quiz.data.length} question{#if quiz.data.length !== 1}s{/if}
  </div>

  <div>
    <b>Expected time:</b>
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
