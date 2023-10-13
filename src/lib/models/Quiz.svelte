<!-- a card for a quiz on the explore page -->

<script>
  export let quiz;
</script>

<div class="card">
  <div class="card-body">
    <h5 class="card-title">{quiz.title || "Untitled"}</h5>
    <p class="card-text">ID: {quiz.id}</p>
    <a href={`/quiz/${quiz.id}`} class="btn btn-primary" target="_blank">See more</a>
  </div>
</div>

<style>
  .card {
    margin-bottom: 1rem;
  }

  .card-title {
    font-size: 1.5rem;
  }

  .card-text {
    font-size: 1.25rem;
  }
</style>
