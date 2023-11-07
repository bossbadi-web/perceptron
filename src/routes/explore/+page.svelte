<script>
  import "$lib/components/explore/styles.css";
  import { createSearchStore, searchHandler } from "$lib/stores/search";
  import { onDestroy } from "svelte";
  import QuizCard from "$lib/components/quiz/Explore.svelte";
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

  let orderByMessage = "Newest first";
  const orderBy = (what, rev = false) => {
    if (what === "A-Z") {
      orderByMessage = rev ? "Z-A" : "A-Z";
    } else if (what === "id") {
      orderByMessage = rev ? "Newest first" : "Oldest first";
    }

    searchStore.orderBy(what, rev);
  };
</script>

<section>
  <div class="container">
    <div class="title-part">
      <h1 class="text-center display-4">
        <i class="fas fa-search" />
        Explore
      </h1>
      <p class="text-center">
        <span>{$searchStore.filtered.length}</span> of
        <span>{$searchStore.data.length}</span>
      </p>
      <input type="text" class="form-control searchbar" placeholder="Search" bind:value={$searchStore.search} />
    </div>

    <div class="the-filters">
      <div class="dropdown">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {orderByMessage}
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li>
            <button class="dropdown-item" on:click={() => orderBy("A-Z")}>
              <i class="fas fa-sort-alpha-down" />
              A-Z
            </button>
          </li>
          <li>
            <button class="dropdown-item" on:click={() => orderBy("A-Z", true)}>
              <i class="fas fa-sort-alpha-down-alt" />
              Z-A
            </button>
          </li>
          <li>
            <button class="dropdown-item" on:click={() => orderBy("id")}>
              <i class="fas fa-person-cane" />
              Oldest first
            </button>
          </li>
          <li>
            <button class="dropdown-item" on:click={() => orderBy("id", true)}>
              <i class="fas fa-baby" />
              Newest first
            </button>
          </li>
        </ul>
      </div>
    </div>

    <div class="all-cards">
      {#each $searchStore.filtered as quiz, quizIdx}
        <div class="quiz-box">
          <QuizCard {quiz} {quizIdx} />
        </div>
      {/each}
    </div>
  </div>
</section>
