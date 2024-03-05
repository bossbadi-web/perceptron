<script>
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";
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
            <label for="passwordInput" class="form-label">Password<span class="required">*</span></label>
            <input class="form-control" id="passwordInput" type="password" name="password" required />
          </div>
          <div class="mb-3">
            <label for="usernameInput" class="form-label">New Username<span class="required">*</span></label>
            <input
              class="form-control"
              id="usernameInput"
              type="text"
              name="username"
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
