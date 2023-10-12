<!-- this a MCQ component that is editable -->

<script>
  export let question;
</script>

<input class="form-control a-title" type="text" value={question.question} />

{#each question.options as option}
    <input class="form-control an-option" type="text" value={option} />
{/each}

<style>
  .a-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .an-option {
    margin-bottom: 0.5rem;
  }
</style>
