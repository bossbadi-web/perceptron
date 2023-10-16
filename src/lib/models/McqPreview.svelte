<script>
  export let question;
</script>

<h1>{question.question}</h1>

{#each question.options as option}
  <p>{option}</p>
{/each}
