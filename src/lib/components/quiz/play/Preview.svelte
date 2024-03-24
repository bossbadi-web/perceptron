<script>
  import "./styles.css";
  export let question, questionIdx, length;
</script>

<p class="text-muted">Question {questionIdx + 1} of {length}</p>
<h1 class="question-title display-6">{question.question}</h1>

<div class="options-box">
  {#each question.options as option}
    <button class="question-option btn btn-secondary btn-lg" disabled>
      {option}
    </button>
  {/each}
</div>
