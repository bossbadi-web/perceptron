<!-- a card for a quiz on the explore page -->

<script>
  import "$lib/components/quiz/styles.css";
  export let quiz;
</script>

<div class="card">
  <div class="card-body">
    <h5 class="card-title">{quiz.title}</h5>
    <p class="card-text">{quiz.description}</p>
    <a href={`/play/${quiz.id}`} class="btn btn-main">Play</a>
    <a href={`/preview/${quiz.id}`} class="btn btn-secondary">Preview</a>
  </div>
</div>
