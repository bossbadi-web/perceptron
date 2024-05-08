<script>
  import { changePage } from "$lib/utils";
  import { page } from "$app/stores";
  export let currentPage, rangeRight, total;

  const mainURL = $page.url.href;
  const orderByMessage = $page.url.searchParams.get("order") || "Recent";
</script>

<div class="the-filters">
  <div class="page-buttons">
    <a
      href={changePage(mainURL, { page: currentPage - 1 })}
      class="btn btn-primary"
      class:disabled={currentPage === 1}
      data-sveltekit-reload
    >
      <i class="fas fa-arrow-left" />
    </a>
    <a
      href={changePage(mainURL, { page: currentPage + 1 })}
      class="btn btn-primary"
      class:disabled={rangeRight === total}
      data-sveltekit-reload
    >
      <i class="fas fa-arrow-right" />
    </a>
  </div>

  <div class="dropdown">
    <button
      class="btn btn-main dropdown-toggle"
      id="dropdownMenuButton1"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      {orderByMessage}
    </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
      <li>
        <a class="dropdown-item" href={changePage(mainURL, { order: "Most liked" })} data-sveltekit-reload>
          {#if orderByMessage === "Most liked"}
            <i class="fas fa-check" />
          {:else}
            <i class="fas fa-heart" />
          {/if}
          Most liked
        </a>
      </li>
      <li>
        <a class="dropdown-item" href={changePage(mainURL, { order: "Recent" })} data-sveltekit-reload>
          {#if orderByMessage === "Recent"}
            <i class="fas fa-check" />
          {:else}
            <i class="fas fa-baby" />
          {/if}
          Recent
        </a>
      </li>
      <li>
        <a class="dropdown-item" href={changePage(mainURL, { order: "A-Z" })} data-sveltekit-reload>
          {#if orderByMessage === "A-Z"}
            <i class="fas fa-check" />
          {:else}
            <i class="fas fa-sort-alpha-down" />
          {/if}
          A-Z
        </a>
      </li>
      <li>
        <a class="dropdown-item" href={changePage(mainURL, { order: "Z-A" })} data-sveltekit-reload>
          {#if orderByMessage === "Z-A"}
            <i class="fas fa-check" />
          {:else}
            <i class="fas fa-sort-alpha-down-alt" />
          {/if}
          Z-A
        </a>
      </li>
      <li>
        <a class="dropdown-item" href={changePage(mainURL, { order: "Oldest" })} data-sveltekit-reload>
          {#if orderByMessage === "Oldest"}
            <i class="fas fa-check" />
          {:else}
            <i class="fas fa-person-cane" />
          {/if}
          Oldest
        </a>
      </li>
    </ul>
  </div>
</div>

<style>
  .dropdown-menu {
    background-color: var(--primary);
  }

  .dropdown-item {
    color: white;
  }

  .dropdown-item:hover {
    background-color: var(--secondary);
  }

  .the-filters {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .page-buttons {
    display: flex;
    width: 10rem;
    gap: 0.25rem;
  }
</style>
