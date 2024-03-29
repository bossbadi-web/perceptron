<script>
  import "./styles.css";
  export let question, questionIdx, length;
</script>

<p class="text-muted">Question {questionIdx + 1} of {length}</p>
<h1 class="question-title display-6">{question.question}</h1>

<div class="options-box">
  {#each question.options as option, idx}
    {#if idx === question.answer}
      <button class="question-option btn btn-main btn-lg">
        {option}
      </button>
    {:else}
      <button class="question-option btn btn-secondary btn-lg" disabled>
        {option}
      </button>
    {/if}
  {/each}
</div>
