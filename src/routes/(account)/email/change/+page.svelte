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
        <h1 class="text-center display-4">Change Email</h1>
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
            <label for="emailInput" class="form-label">New Email</label>
            <input
              class="form-control"
              id="emailInput"
              type="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>
          <div class="mb-3">
            <label for="emailConfirmInput" class="form-label">Confirm New Email</label>
            <input
              class="form-control"
              id="emailConfirmInput"
              type="email"
              name="emailConfirm"
              placeholder="Email"
              required
            />
          </div>
          <button type="submit" class="btn btn-main">Change Email</button>
        </form>
      </div>
    </div>
  </div>
</section>
