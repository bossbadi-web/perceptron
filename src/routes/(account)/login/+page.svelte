<script>
  import { enhance } from "$app/forms";
  import { loginGoogle, loginDefault } from "$lib/recaptchaClient";
  import Google from "$lib/components/auth/Google.svelte";
  import Password from "$lib/components/auth/Password.svelte";
</script>

<section>
  <div class="container">
    <div class="col-md-8 offset-md-2">
      <div class="row normal-row">
        <h1 class="text-center display-4">Login</h1>
        <form id="google-signin" method="POST" use:enhance={loginGoogle}>
          <div class="mb-3 text-center">
            <Google />
          </div>
        </form>
        <form id="email-signin" class="mb-3" method="POST" use:enhance={loginDefault}>
          <div class="mb-3">
            <label for="emailInput" class="form-label">Email<span class="required">*</span></label>
            <input class="form-control" id="emailInput" type="email" name="email" required />
          </div>
          <div class="mb-3">
            <Password />
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
