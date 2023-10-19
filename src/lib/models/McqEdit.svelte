<!-- this a MCQ component that is editable -->

<script>
  export let question;
</script>

<input class="form-control a-title" type="text" value={question.question} placeholder="Question" />

{#each question.options as option, index}
  <input class="form-control an-option" type="text" value={option} placeholder="Option {index + 1}" />
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
