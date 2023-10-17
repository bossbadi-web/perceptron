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
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              id="navbarDropdownMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {session.user.email}
            </a>
            <ul
              class="dropdown-menu dropdown-menu-dark animate slideIn profile-links"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <li class="nav-item">
                <a class="nav-link" href="/profile"><i class="fas fa-user" /> Profile</a>
              </li>
              <li class="nav-item">
                <form action="/logout" method="POST">
                  <button class="nav-link" type="submit"><i class="fas fa-sign-out-alt" /> Logout</button>
                </form>
              </li>
            </ul>
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

  .profile-links li {
    display: flex;
    justify-content: center;
  }

  @media (max-width: 991px) {
    .nav-item {
      text-align: center;
    }
  }
</style>
