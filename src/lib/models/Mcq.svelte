<script>
  export let question;
</script>

<h1>{question.question}</h1>

<div class="options-box">
  {#each question.options as option, idx}
    <!-- make large buttons and put text inside button
  when the right one is clicked
-->
    <button class="btn btn-success btn-lg btn-block">
      {option}
    </button>
  {/each}
</div>

<style>
  .options-box {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 1rem;
  }
</style>
