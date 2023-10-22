<script>
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";
  export let form;

  const redirectTo = $page.url.searchParams.get("redirectTo") || "/";
</script>

<section>
  <div class="container">
    <div class="row normal-row">
      <div class="col-md-10 offset-md-1">
        <h1 class="text-center display-4">Login</h1>
        <form method="POST" action="?redirectTo={redirectTo}" use:enhance>
          {#if form?.message}
            <div class="alert alert-danger" role="alert">
              {form?.message}
            </div>
          {/if}
          <div class="mb-3">
            <label for="emailInput" class="form-label">Email address</label>
            <input class="form-control" id="emailInput" type="email" name="email" placeholder="Email" required />
          </div>
          <div class="mb-3">
            <label for="passwordInput" class="form-label">Password</label>
            <input
              class="form-control"
              id="passwordInput"
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" class="btn btn-main">Login</button>
          <small class="forgot-password text-muted">
            <a class="hover-underline" href="/password/forgot">Forgot password?</a>
          </small>
        </form>
        <br />
        <small class="text-muted">
          Don't have an account? <a class="hover-underline" href="/register">Create one</a>
        </small>
      </div>
    </div>
  </div>
</section>

<style>
  .forgot-password {
    margin-left: 0.5rem;
  }
  .forgot-password a {
    font-weight: normal;
  }
</style>
