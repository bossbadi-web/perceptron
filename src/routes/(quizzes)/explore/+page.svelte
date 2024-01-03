<script>
  import "$lib/components/explore/styles.css";
  import { changePage } from "$lib/utils";
  import { page } from "$app/stores";
  import Menu from "$lib/components/explore/Menu.svelte";
  import QuizCard from "$lib/components/quiz/Explore.svelte";
  export let data;

  const { rangeLeft, rangeRight, quizzes, total } = data;
  const mainURL = $page.url.href;
  const currentPage = parseInt($page.url.searchParams.get("page")) || 1;
  let query = $page.url.searchParams.get("q") || "";
  const isSearch = query !== "";
</script>

<section>
  <div class="container">
    <div class="title-part">
      <h1 class="text-center display-4">
        <i class="fas fa-search" />
        Explore
      </h1>
      <p class="text-center">
        <span class="badge bg-primary">Page: {currentPage}</span>
        <span class="badge bg-primary">Showing: {rangeLeft} - {rangeRight}</span>
        <span class="badge bg-primary">Total: {total}</span>
      </p>
      <div class="input-group searchbar">
        <input type="text" class="form-control" placeholder="Search" bind:value={query} />
        <a href={changePage(mainURL, { q: query }, true)} class="btn btn-main" data-sveltekit-reload>
          <i class="fas fa-search" />
        </a>
        {#if isSearch}
          <a href="/explore" class="btn btn-danger" data-sveltekit-reload>
            <i class="fas fa-times" />
          </a>
        {/if}
      </div>
    </div>

    <Menu {currentPage} {rangeRight} {total} />

    <div class="all-cards">
      {#each quizzes as quiz}
        <div class="quiz-box">
          <QuizCard {quiz} />
        </div>
      {/each}
    </div>
  </div>
</section>
