<script>
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";
  import Password from "$lib/components/auth/Password.svelte";

  export let data;
  const { email } = data;

  const redirectTo = $page.url.searchParams.get("redirectTo") || "/";
</script>

<section>
  <div class="container">
    <div class="col-md-8 offset-md-2">
      <div class="row normal-row">
        <h1 class="text-center display-4">Change Email</h1>
        <form method="POST" action="?redirectTo={redirectTo}" use:enhance>
          <div class="mb-3">
            <Password />
          </div>
          <div class="mb-3">
            <label for="emailInput" class="form-label">New Email<span class="required">*</span></label>
            <input class="form-control" id="emailInput" type="email" name="email" placeholder={email ?? ""} required />
          </div>
          <div class="mb-3">
            <label for="emailConfirmInput" class="form-label">Confirm New Email<span class="required">*</span></label>
            <input class="form-control" id="emailConfirmInput" type="email" name="emailConfirm" required />
          </div>
          <button type="submit" class="btn btn-main">Change Email</button>
        </form>
      </div>
    </div>
  </div>
</section>
