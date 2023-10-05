<script>
  import { page } from "$app/stores";
  import { enhance } from "$app/forms";
  export let form;

  const redirectTo = $page.url.searchParams.get("redirectTo") || "/";
</script>

<section>
  <div class="container">
    <h1 class="text-center display-4">Register</h1>
    <form method="POST" action="?redirectTo={redirectTo}" use:enhance>
      <div class="mb-3">
        <label for="emailInput" class="form-label">Email address</label>
        <input
          class="form-control"
          id="emailInput"
          type="text"
          name="email"
          placeholder="Email"
          value={form?.email ?? ""}
        />
      </div>
      <div class="mb-3">
        <label for="passwordInput" class="form-label">Password</label>
        <input class="form-control" id="passwordInput" type="password" name="password" placeholder="Password" />
      </div>
      <!-- confirm password -->
      <div class="mb-3">
        <label for="passwordConfirmInput" class="form-label">Confirm Password</label>
        <input class="form-control" id="passwordConfirmInput" type="password" name="password" placeholder="Password" />
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
    </form>
    <br />
    <small class="text-muted">
      Already have an account? <a href="/login">Login</a>
    </small>
  </div>
</section>
