<!-- a card for a quiz on the explore page -->

<script>
  export let quiz;
</script>

<div class="card">
  <div class="card-body">
    <h5 class="card-title">{quiz.title}</h5>
    <p class="card-text">{quiz.description}</p>
    <p class="card-text">ID: {quiz.id}</p>
    <a href={`/preview/${quiz.id}`} class="btn btn-primary">Preview</a>
    <a href={`/play/${quiz.id}`} class="btn btn-primary">Play</a>
  </div>
</div>

<style>
  .card {
    grid-template-rows: 50% 50%;
    padding: 10px;
    border-radius: 10px;
  }
  .card:hover {
    background-color: var(--main-gray);
  }
</style>
