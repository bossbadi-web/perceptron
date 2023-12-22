<script>
  import "$lib/components/explore/styles.css";
  import { createSearchStore, searchHandler } from "$lib/stores/search";
  import { onDestroy } from "svelte";
  import { page } from "$app/stores";
  import Menu from "$lib/components/explore/Menu.svelte";
  import QuizCard from "$lib/components/quiz/Explore.svelte";
  export let data;

  const { rangeLeft, rangeRight, total } = data;
  const currentPage = parseInt($page.params.page);

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
    <div class="title-part">
      <h1 class="text-center display-4">
        <i class="fas fa-layer-group" />
        My Library
      </h1>
      <p class="text-center">
        <span class="badge bg-primary">Page: {currentPage}</span>
        <span class="badge bg-primary">Showing: {rangeLeft} - {rangeRight}</span>
        <span class="badge bg-primary">Total: {total}</span>
      </p>
      <input type="text" class="form-control searchbar" placeholder="Search" bind:value={$searchStore.search} />
    </div>

    <div></div>

    <Menu {searchStore} {currentPage} {rangeRight} {total} />

    <div class="all-cards">
      {#each $searchStore.filtered as quiz, quizIdx}
        <div class="quiz-box">
          <QuizCard {quiz} {quizIdx} />
        </div>
      {/each}
    </div>
  </div>
</section>
