<script>
  export let question;
</script>

<h1 class="the-title display-6">{question.question}</h1>

<div class="options-box">
  {#each question.options as option, idx}
    <button class="an-option btn btn-main btn-lg btn-block">
      {option}
    </button>
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
