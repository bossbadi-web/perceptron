<script>
  import { page } from "$app/stores";
  export let currentPage, rangeRight, total;

  let orderByMessage = $page.url.searchParams.get("order") || "Newest first";
</script>

<div class="the-filters">
  <div class="page-buttons">
    <a
      href="/explore/{currentPage - 1}?order={orderByMessage}"
      class="btn btn-primary"
      class:disabled={currentPage === 1}
      data-sveltekit-reload
    >
      <i class="fas fa-arrow-left" />
    </a>
    <a
      href="/explore/{currentPage + 1}?order={orderByMessage}"
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
        <a class="dropdown-item" href="/explore/{$page.params.page}?order=A-Z" data-sveltekit-reload>
          <i class="fas fa-sort-alpha-down" />
          A-Z
        </a>
      </li>
      <li>
        <a class="dropdown-item" href="/explore/{$page.params.page}?order=Z-A" data-sveltekit-reload>
          <i class="fas fa-sort-alpha-down-alt" />
          Z-A
        </a>
      </li>
      <li>
        <a class="dropdown-item" href="/explore/{$page.params.page}?order=Oldest first" data-sveltekit-reload>
          <i class="fas fa-person-cane" />
          Oldest first
        </a>
      </li>
      <li>
        <a class="dropdown-item" href="/explore/{$page.params.page}?order=Newest first" data-sveltekit-reload>
          <i class="fas fa-baby" />
          Newest first
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
    margin-bottom: 1rem;
  }

  .page-buttons {
    display: flex;
    width: 10rem;
    gap: 0.25rem;
  }
</style>
