<script>
  import { onMount } from "svelte";
  import { afterNavigate } from "$app/navigation";
  export let data;

  $: ({ session } = data);

  let path;

  // get path of current page so if user logins in, they are redirected to the page they were on
  afterNavigate(({ to }) => {
    path = to.url.pathname;
  });

  onMount(() => {
    const scrollIndicator = document.querySelector(".scroll-progress");
    const scrollProgress = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      scrollIndicator.style.width = scrolled + "%";
    };
    window.addEventListener("scroll", scrollProgress);
  });
</script>

<nav class="navbar navbar-expand-lg sticky-top">
  <div class="container container-fluid">
    <a class="navbar-brand" href="/">
      <picture>
        <source srcset="/img/logo-white.svg" media="(prefers-color-scheme: dark)" />
        <img src="/img/logo-black.svg" alt="avatar" height="30" width="30" />
      </picture>
    </a>
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
          <a class="nav-link hover-underline" href="/create">
            <i class="fas fa-hammer" />
            Create
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link hover-underline" href="/explore/1">
            <i class="fas fa-search" />
            Explore
          </a>
        </li>
        {#if session}
          <li class="nav-item">
            <a class="nav-link hover-underline" href="/library">
              <i class="fas fa-layer-group" />
              My Library
            </a>
          </li>
        {/if}
      </ul>
      <ul class="navbar-nav ms-auto">
        {#if session}
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              id="navbarDropdownMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {session.user.username}
            </a>
            <ul
              class="dropdown-menu dropdown-menu-dark animate slideIn profile-links"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <li class="nav-item">
                <a class="nav-link hover-underline" href="/profile"><i class="fas fa-user" /> Profile</a>
              </li>
              <li class="nav-item">
                <form action="/logout" method="POST">
                  <button class="nav-link hover-underline" type="submit"
                    ><i class="fas fa-sign-out-alt" /> Logout</button
                  >
                </form>
              </li>
            </ul>
          </li>
        {:else}
          <li class="nav-item">
            <a class="nav-link hover-underline" href="/login?redirectTo={path}">Login</a>
          </li>
          <li class="nav-item">
            <a class="nav-link hover-underline" href="/register">Register</a>
          </li>
        {/if}
      </ul>
    </div>
  </div>
</nav>

<div class="scroll-indicator">
  <div class="scroll-progress" />
</div>

<style>
  .navbar * {
    color: var(--font) !important;
  }

  .nav-item:not(.dropdown) {
    display: flex;
    justify-content: center;
  }

  /* this is for the line under the navbar */
  .scroll-indicator {
    position: fixed;
    z-index: 1000;
    width: 100%;
    height: 3.5px; /* adjust height as needed */
  }

  .scroll-progress {
    height: 100%;
    width: 0%;
    background: linear-gradient(to right, transparent 0%, var(--font) 100%);
    box-shadow: 0 0 20px black;
    border-radius: 0 0.5em 0.5em 0;
  }

  @media (max-width: 991px) {
    .nav-item {
      text-align: center;
    }
  }
</style>
