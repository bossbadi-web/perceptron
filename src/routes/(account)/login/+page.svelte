<script>
  import { enhance } from "$app/forms";
  import { submitCaptcha } from "$lib/recaptchaClient";
  import Google from "$lib/components/auth/Google.svelte";
  export let form;
</script>

<section>
  <div class="container">
    <div class="col-md-8 offset-md-2">
      <div class="row normal-row">
        <h1 class="text-center display-4">Login</h1>
        <form class="mb-3" method="POST" use:enhance={submitCaptcha}>
          <div class="mb-3 text-center">
            <Google />
          </div>
          {#if form?.message}
            <div class="alert alert-danger" role="alert">
              {form?.message}
            </div>
          {/if}
          <div class="mb-3">
            <label for="emailInput" class="form-label">Email</label>
            <input class="form-control" id="emailInput" type="email" name="email" />
          </div>
          <div class="mb-3">
            <label for="passwordInput" class="form-label">Password</label>
            <input class="form-control" id="passwordInput" type="password" name="password" />
          </div>
          <button type="submit" class="btn btn-main">Login</button>
          <small class="forgot-password text-muted">
            <a class="hover-underline" href="/password/forgot">Forgot password?</a>
          </small>
        </form>
        <br />
        <small class="text-muted text-center">
          Don't have an account? <a class="hover-underline" href="/register">Create one</a>
        </small>
      </div>
    </div>
  </div>
</section>

<style>
  .forgot-password {
    margin-left: 0.5rem;
  }
  .forgot-password a {
    font-weight: normal;
  }
</style>
