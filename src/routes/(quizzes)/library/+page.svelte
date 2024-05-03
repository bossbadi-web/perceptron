<script>
  import { changePage } from "$lib/utils";
  import { page } from "$app/stores";
  import Menu from "../Menu.svelte";
  import QuizCard from "$lib/components/quiz/browse/Library.svelte";

  export let data;
  const { rangeLeft, rangeRight, quizzes, session, total } = data;

  const mainURL = $page.url.href;
  const currentPage = parseInt($page.url.searchParams.get("page")) || 1;
  let query = $page.url.searchParams.get("q") || "";
  const isSearch = query !== "";

  const search = () => {
    const url = changePage(mainURL, { page: 1, q: query }, true);
    window.location.href = url;
  };
</script>

<div class="title-part">
  <h1 class="text-center display-4">
    <i class="fas fa-layer-group" />
    My Library
  </h1>
  {#if total !== 0 || isSearch}
    <p class="text-center">
      <span class="badge bg-primary">Page: {currentPage}</span>
      <span class="badge bg-primary">Showing: {rangeLeft} - {rangeRight}</span>
      <span class="badge bg-primary">Total: {total}</span>
    </p>
    <form>
      <div class="input-group searchbar">
        <input type="text" class="form-control" placeholder="Search" bind:value={query} />
        <button type="submit" class="btn btn-primary" on:click={search}>
          <i class="fas fa-search" />
        </button>
        {#if isSearch}
          <a href="/explore" class="btn btn-danger" data-sveltekit-reload>
            <i class="fas fa-times" />
          </a>
        {/if}
      </div>
    </form>
  {/if}
</div>

{#if total === 0}
  <div class="text-center">
    <p class="lead">Nothing here yet :)</p>
  </div>
{:else}
  <Menu {currentPage} {rangeRight} {total} />

  <div class="all-cards">
    {#each quizzes as quiz}
      <div class="quiz-box">
        <QuizCard {quiz} data={{ quiz, session }} />
      </div>
    {/each}
  </div>

  <Menu {currentPage} {rangeRight} {total} />
{/if}
