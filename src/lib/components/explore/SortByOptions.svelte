<script>
  export let searchStore;

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

<div class="the-filters">
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
    justify-content: flex-end;
    margin-bottom: 1rem;
  }
</style>
