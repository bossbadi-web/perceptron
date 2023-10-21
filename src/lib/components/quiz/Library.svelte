<!-- a card for a quiz on the explore page -->

<script>
  import "$lib/components/quiz/styles.css";
  import { formatDate } from "$lib/utils.js";

  export let quiz;

  quiz.created_at = formatDate(quiz.created_at);
</script>

<div class="card">
  <div class="card-body">
    <h1 class="card-title">{quiz.title}</h1>
    <p>
      {quiz.description}
      <br />
      <small class="text-muted">Created {quiz.created_at}</small>
    </p>
    <a href={`/play/${quiz.id}`} class="btn btn-main">Play</a>
    <a href={`/preview/${quiz.id}`} class="btn btn-secondary">Preview</a>
    <a href={`/edit/${quiz.id}`} class="btn btn-secondary">Edit</a>
  </div>
</div>
