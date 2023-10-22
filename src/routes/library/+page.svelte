<script>
  import "$lib/components/explore/styles.css";
  import QuizCard from "$lib/components/quiz/Library.svelte";
  import { createSearchStore, searchHandler } from "$lib/stores/search";
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
    <div class="title-part">
      <h1 class="text-center display-4">My Library</h1>
      <input type="text" class="form-control searchbar" placeholder="Search" bind:value={$searchStore.search} />
    </div>

    <div class="row">
      <div class="all-cards">
        {#each $searchStore.filtered as quiz}
          <div class="quiz-box">
            <QuizCard {quiz} />
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
