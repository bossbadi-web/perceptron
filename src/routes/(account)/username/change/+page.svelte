<script>
  import { enhance } from "$app/forms";
  import { LIMITS } from "$lib/consts";
  import { page } from "$app/stores";
  import Password from "$lib/components/auth/Password.svelte";

  export let data;
  const { username } = data;

  const redirectTo = $page.url.searchParams.get("redirectTo") || "/";
</script>

<section>
  <div class="container">
    <div class="col-md-8 offset-md-2">
      <div class="row normal-row">
        <h1 class="text-center display-4">Change Username</h1>
        <form method="POST" action="?redirectTo={redirectTo}" use:enhance>
          <div class="mb-3">
            <Password />
          </div>
          <div class="mb-3">
            <label for="usernameInput" class="form-label">
              New Username<span class="required">*</span>
              <small class="text-muted">(max {LIMITS.username} chars)</small>
            </label>
            <input
              class="form-control"
              id="usernameInput"
              type="text"
              name="username"
              maxlength={LIMITS.username}
              placeholder={username ?? ""}
              required
            />
          </div>
          <button type="submit" class="btn btn-main">Change Username</button>
        </form>
      </div>
    </div>
  </div>
</section>
