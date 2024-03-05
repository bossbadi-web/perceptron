<script>
  import { enhance } from "$app/forms";
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  let isFromPasswordReset = false;
  const redirectTo = $page.url.searchParams.get("redirectTo") || "/";

  onMount(() => {
    const referrer = document.referrer;
    let error;

    if (referrer && typeof referrer === "string") {
      const url = new URL(referrer);
      error = url.searchParams.get("error");
    }

    if (!error) {
      isFromPasswordReset = referrer.startsWith(`${window.location.origin}/auth/callback`);
    }
  });
</script>

<section>
  <div class="container">
    <div class="col-md-8 offset-md-2">
      <div class="row normal-row">
        <h1 class="text-center display-4">Change Password</h1>
        <form method="POST" action="?redirectTo={redirectTo}" use:enhance>
          {#if !isFromPasswordReset}
            <div class="mb-3">
              <label for="passwordInput" class="form-label">Current Password</label>
              <input class="form-control" id="passwordInput" type="password" name="password" required />
            </div>
          {/if}

          <div class="mb-3">
            <label for="newPasswordInput" class="form-label">New Password</label>
            <input class="form-control" id="newPasswordInput" type="password" name="newPassword" required />
          </div>

          <div class="mb-3">
            <label for="newPasswordConfirmInput" class="form-label">Confirm New Password</label>
            <input
              class="form-control"
              id="newPasswordConfirmInput"
              type="password"
              name="newPasswordConfirm"
              required
            />
          </div>

          <input type="hidden" name="isFromPasswordReset" value={isFromPasswordReset ? 1 : 0} />

          <button type="submit" class="btn btn-main">Change Password</button>
        </form>
      </div>
    </div>
  </div>
</section>
