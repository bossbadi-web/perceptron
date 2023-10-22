<!-- a card for a quiz on the explore page -->

<script>
  import QuizDescription from "./Description.svelte";
  import { formatDate } from "$lib/utils";
  export let quiz,
    showVisibility = false;

  quiz.created_at = formatDate(quiz.created_at);
</script>

<div class="card">
  <div class="card-body">
    <h1 class="card-title">{quiz.title}</h1>
    <p>
      <QuizDescription {quiz} {showVisibility} />
    </p>
    <a href={`/play/${quiz.id}`} class="btn btn-main">Play</a>
    <a href={`/preview/${quiz.id}`} class="btn btn-secondary">Preview</a>
    <slot />
  </div>
</div>

<style>
  .card {
    grid-template-rows: 50% 50%;
    padding: 10px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    transition: 0.5s;
  }
  .card:hover {
    background-color: white;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
  }

  .card-title {
    font-size: 1.5rem;
    font-weight: 600;
  }
</style>
