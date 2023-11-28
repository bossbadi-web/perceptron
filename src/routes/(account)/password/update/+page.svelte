<script>
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";
  export let form;

  const redirectTo = $page.url.searchParams.get("redirectTo") || "/";
</script>

<section>
  <div class="container">
    <div class="col-md-8 offset-md-2">
      <div class="row normal-row">
        <h1 class="text-center display-4">Change Password</h1>
        <form method="POST" action="?redirectTo={redirectTo}" use:enhance>
          {#if form?.message}
            <div
              class="alert"
              role="alert"
              class:alert-success={form.status === 200}
              class:alert-danger={form.status !== 200}
            >
              {form?.message}
            </div>
          {/if}
          <div class="mb-3">
            <label for="passwordInput" class="form-label">New Password</label>
            <input
              class="form-control"
              id="passwordInput"
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>
          <div class="mb-3">
            <label for="passwordConfirmInput" class="form-label">Confirm New Password</label>
            <input
              class="form-control"
              id="passwordConfirmInput"
              type="password"
              name="passwordConfirm"
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" class="btn btn-main">Change Password</button>
        </form>
      </div>
    </div>
  </div>
</section>
