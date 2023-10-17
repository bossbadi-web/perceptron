<script>
  export let data;

  let { supabase, session } = data;
  $: ({ supabase, session } = data);
</script>

<nav class="navbar navbar-expand-lg navbar-dark sticky-top">
  <div class="container container-fluid">
    <a class="navbar-brand" href="/">Perceptron</a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="/create">Create</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/explore">Explore</a>
        </li>
      </ul>
      {#if session}
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link" href="/profile">{session.user.email}</a>
          </li>
          <li class="nav-item">
            <form action="/logout" method="post">
              <button class="btn btn-outline-light" type="submit">Logout</button>
            </form>
          </li>
        </ul>
      {:else}
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link" href="/login">Login</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/register">Register</a>
          </li>
        </ul>
      {/if}
    </div>
  </div>
</nav>

<style>
  .navbar {
    background-color: var(--main-color);
  }
</style>
