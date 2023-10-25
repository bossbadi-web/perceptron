<!-- a card for a quiz on the explore page -->

<script>
  import { formatDate } from "$lib/utils";
  import { onMount } from "svelte";
  import QuizDescription from "./Description.svelte";

  export let quiz,
    quizIdx,
    showVisibility = false;

  quiz.created_at = formatDate(quiz.created_at);

  let numCols = 0;

  const updateCols = () => {
    if (window.innerWidth < 768) {
      numCols = 1;
    } else if (window.innerWidth < 1020) {
      numCols = 2;
    } else if (window.innerWidth < 1400) {
      numCols = 3;
    } else {
      numCols = 4;
    }
  };

  onMount(() => {
    updateCols();
    window.addEventListener("resize", updateCols);
  });
</script>

<div class="card" data-aos="fade-in" data-aos-duration="1000" data-aos-delay={(quizIdx * 100) % (numCols * 100)}>
  <div class="card-body">
    <h1 class="card-title">{quiz.title}</h1>
    <p>
      <QuizDescription {quiz} {showVisibility} />
    </p>
    <a href={`/play/${quiz.id}`} class="btn btn-main" data-sveltekit-preload-data="tap">Play</a>
    <a href={`/preview/${quiz.id}`} class="btn btn-secondary" data-sveltekit-preload-data="tap">Preview</a>
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
