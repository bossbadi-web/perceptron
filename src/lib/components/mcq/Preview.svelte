<script>
  import "$lib/components/mcq/styles.css";
  export let question;
</script>

<h1 class="the-title display-6">{question.question}</h1>

<div class="options-box">
  {#each question.options as option}
    <button class="an-option btn btn-secondary btn-lg" disabled>
      {option}
    </button>
  {/each}
</div>
