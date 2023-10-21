<script>
  export let question, playerAnswerIdx;
</script>

<h2>
  {#if question.answer === question.options[playerAnswerIdx]}
    <span class="badge bg-main">Correct</span>
  {:else}
    <span class="badge bg-danger">Wrong</span>
  {/if}
</h2>

<h1 class="the-title display-6">{question.question}</h1>

<div class="options-box">
  {#each question.options as option, idx}
    {#if option === question.answer}
      <button class="an-option btn btn-main btn-lg" disabled>
        {option}
      </button>
    {:else if idx === playerAnswerIdx}
      <button class="an-option btn btn-danger btn-lg" disabled>
        {option}
      </button>
    {:else}
      <button class="an-option btn btn-secondary btn-lg" disabled>
        {option}
      </button>
    {/if}
  {/each}
</div>

<style>
  .the-title {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .an-option {
    padding: 1rem;
  }

  .options-box {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 0.5rem;
  }
</style>
