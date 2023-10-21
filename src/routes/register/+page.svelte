<script>
  import { page } from "$app/stores";
  import { enhance } from "$app/forms";
  export let form;

  const redirectTo = $page.url.searchParams.get("redirectTo") || "/";
</script>

<section>
  <div class="container">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center display-4">Register</h1>
        <form method="POST" action="?redirectTo={redirectTo}" use:enhance>
          {#if form?.message}
            <div class="alert alert-danger" role="alert">
              {form?.message}
            </div>
          {/if}
          <div class="mb-3">
            <label for="emailInput" class="form-label">Email address</label>
            <input class="form-control" id="emailInput" type="text" name="email" placeholder="Email" />
          </div>
          <div class="mb-3">
            <label for="passwordInput" class="form-label">Password</label>
            <input class="form-control" id="passwordInput" type="password" name="password" placeholder="Password" />
          </div>
          <div class="mb-3">
            <label for="passwordConfirmInput" class="form-label">Confirm Password</label>
            <input
              class="form-control"
              id="passwordConfirmInput"
              type="password"
              name="passwordConfirm"
              placeholder="Password"
            />
          </div>
          <button type="submit" class="btn btn-main">Register</button>
        </form>
        <br />
        <small class="text-muted">
          Already have an account? <a href="/login">Login</a>
        </small>
      </div>
    </div>
  </div>
</section>
