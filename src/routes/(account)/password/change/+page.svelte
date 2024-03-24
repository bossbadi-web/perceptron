<script>
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";
  import Password from "$lib/components/auth/Password.svelte";
  export let data;

  const { isFromPasswordReset } = data;

  const redirectTo = $page.url.searchParams.get("redirectTo") || "/";
</script>

<section>
  <div class="container">
    <div class="col-md-8 offset-md-2">
      <div class="row normal-row">
        <h1 class="text-center display-4">Change Password</h1>
        <form method="POST" action="?redirectTo={redirectTo}" use:enhance>
          {#if !isFromPasswordReset}
            <div class="mb-3">
              <Password labelName="Current Password" />
            </div>
          {/if}

          <div class="mb-3">
            <Password inputId="newPasswordInput" inputName="newPassword" labelName="New Password" />
          </div>

          <div class="mb-3">
            <Password
              inputId="newPasswordConfirmInput"
              inputName="newPasswordConfirm"
              labelName="Confirm New Password"
            />
          </div>

          <button type="submit" class="btn btn-main">Change Password</button>
        </form>
      </div>
    </div>
  </div>
</section>
