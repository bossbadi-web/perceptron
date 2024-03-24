<!-- a card for a quiz on the explore page -->

<script>
  import { formatDate } from "$lib/utils";
  import LikeDislike from "$lib/components/quiz/browse/LikeDislike.svelte";
  import QuizDescription from "./Description.svelte";

  export let quiz,
    data,
    showVisibility = false;

  quiz.created_at = formatDate(quiz.created_at);
</script>

<div class="card">
  <div class="card-body">
    <h1 class="card-title">{quiz.title}</h1>
    <p>
      <QuizDescription {quiz} {showVisibility} />
    </p>
    <p>
      <LikeDislike {data} />
    </p>
    <a href={`/play/${quiz.id}`} class="btn btn-main" data-sveltekit-reload>Play</a>
    <a href={`/preview/${quiz.id}`} class="btn btn-secondary" data-sveltekit-reload>Preview</a>
    <slot />
  </div>
</div>

<style>
  .card {
    color: var(--font);
    grid-template-rows: 50% 50%;
    padding: 10px;
    border-radius: 10px;
    background-color: var(--card-background);
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    transition: 0.5s;
  }
  .card:hover {
    background-color: var(--card-hover);
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
  }

  .card-title {
    font-size: 1.5rem;
    font-weight: 600;
  }
</style>
