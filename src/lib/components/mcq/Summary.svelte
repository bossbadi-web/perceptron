<script>
  import "$lib/components/mcq/styles.css";
  export let question, playerAnswerIdx;
</script>

<h2>
  {#if playerAnswerIdx === question.answer}
    <span class="badge bg-main">Correct</span>
  {:else}
    <span class="badge bg-danger">Wrong</span>
  {/if}
</h2>

<h1 class="question-title display-6">{question.question}</h1>

<div class="options-box">
  {#each question.options as option, idx}
    {#if idx === question.answer}
      <button class="question-option btn btn-main btn-lg" disabled>
        {option}
      </button>
    {:else if idx === playerAnswerIdx}
      <button class="question-option btn btn-danger btn-lg" disabled>
        {option}
      </button>
    {:else}
      <button class="question-option btn btn-secondary btn-lg" disabled>
        {option}
      </button>
    {/if}
  {/each}
</div>
