<script>
  import Quiz from "$lib/models/Quiz.svelte";
  import { createSearchStore, searchHandler } from "$lib/stores/search.js";
  import { onDestroy } from "svelte";

  export let data;

  const searchQuizzes = data.quizzes.map((quiz) => ({
    ...quiz,
    searchTerms: `${quiz.title.toLowerCase()} ${quiz.description.toLowerCase()}`,
  }));

  const searchStore = createSearchStore(searchQuizzes);
  const unsubscribe = searchStore.subscribe((model) => searchHandler(model));

  onDestroy(() => {
    unsubscribe();
  });
</script>

<section>
  <div class="container">
    <h1 class="text-center display-4">Explore</h1>
    <input type="text" class="form-control searchbar" placeholder="Search" bind:value={$searchStore.search} />

    <div class="row">
      <div class="all-cards">
        {#each $searchStore.filtered as quiz}
          <div class="quiz-box">
            <Quiz {quiz} />
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .display-4 {
    margin-bottom: 1rem;
  }

  .searchbar {
    /* text is centered in the input including placeholder */
    text-align: center;
    padding: 0.5rem;
    margin-bottom: 2rem;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    min-width: 300px;
  }

  .all-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 1rem;
  }
</style>
