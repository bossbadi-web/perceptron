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
      <h1 class="text-center display-4">
        <i class="fas fa-layer-group" />
        My Library
      </h1>
      {#if $searchStore.data.length > 0}
        <input type="text" class="form-control searchbar" placeholder="Search" bind:value={$searchStore.search} />
      {/if}
    </div>

    <div class="all-cards">
      {#if $searchStore.data.length === 0}
        <div class="text-center">
          <h3>Nothing here...yet</h3>
          <p>
            <a class="hover-underline" href="/create">Create</a> a Perceptron and it will show up here.
          </p>
        </div>
      {/if}

      {#each $searchStore.filtered as quiz}
        <div class="quiz-box">
          <QuizCard {quiz} />
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
</style>
