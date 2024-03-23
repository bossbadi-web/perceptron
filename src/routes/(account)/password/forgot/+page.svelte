<script>
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";

  const redirectTo = $page.url.searchParams.get("redirectTo") || "/";
</script>

<section>
  <div class="container">
    <div class="col-md-8 offset-md-2">
      <div class="row normal-row">
        <h1 class="text-center display-4">Forgot Password</h1>
        <form method="POST" action="?redirectTo={redirectTo}" use:enhance>
          <div class="mb-3">
            <label for="emailInput" class="form-label">Email address<span class="required">*</span></label>
            <input class="form-control" id="emailInput" type="email" name="email" required />
          </div>
          <button type="submit" class="btn btn-main">Send Reset Link</button>
        </form>
      </div>
    </div>
  </div>
</section>
