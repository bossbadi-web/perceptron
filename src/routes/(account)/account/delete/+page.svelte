<script>
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";
  import Password from "$lib/components/auth/Password.svelte";

  const redirectTo = $page.url.searchParams.get("redirectTo") || "/";
</script>

<section>
  <div class="container">
    <div class="col-md-8 offset-md-2">
      <div class="row normal-row">
        <h1 class="text-center display-4">Are you sure?</h1>
        <form method="POST" action="?redirectTo={redirectTo}" use:enhance>
          <div class="mb-3">
            <p>All your Perceptrons will be deleted. This action cannot be undone.</p>
          </div>

          <div class="mb-3">
            <Password />
          </div>

          <div class="mb-3">
            <label for="deleteConfirm" class="form-label">
              Type <code>delete my account</code>
            </label>
            <input class="form-control" id="deleteConfirm" type="text" name="deleteConfirm" required />
          </div>

          <button type="submit" class="btn btn-danger">Delete Account</button>
        </form>
      </div>
    </div>
  </div>
</section>
