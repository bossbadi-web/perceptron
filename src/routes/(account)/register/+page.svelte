<script>
  import { enhance } from "$app/forms";
  import { LIMITS } from "$lib/consts";
  import { loginGoogle, registerDefault } from "$lib/recaptchaClient";
  import Google from "$lib/components/auth/Google.svelte";
  import Password from "$lib/components/auth/Password.svelte";
</script>

<section>
  <div class="container">
    <div class="col-md-8 offset-md-2">
      <div class="row normal-row">
        <h1 class="text-center display-4">Register</h1>
        <form id="google-signin" method="POST" use:enhance={loginGoogle}>
          <div class="mb-3 text-center">
            <Google />
          </div>
        </form>
        <form id="email-signin" class="mb-3" method="POST" use:enhance={registerDefault}>
          <div class="mb-3">
            <label for="emailInput" class="form-label">Email<span class="required">*</span></label>
            <input class="form-control" id="emailInput" type="email" name="email" required />
          </div>
          <div class="mb-3">
            <label for="usernameInput" class="form-label">
              Username<span class="required">*</span>
              <small class="text-muted">(max {LIMITS.username} chars)</small>
            </label>
            <input
              class="form-control"
              id="usernameInput"
              type="text"
              name="username"
              maxlength={LIMITS.username}
              required
            />
          </div>
          <div class="mb-3">
            <Password />
          </div>
          <div class="mb-3">
            <Password inputId="passwordConfirmInput" inputName="passwordConfirm" labelName="Confirm Password" />
          </div>
          <button type="submit" class="btn btn-main">Register</button>
        </form>
        <br />
        <small class="text-muted text-center">
          Already have an account? <a class="hover-underline" href="/login">Login</a>
        </small>
      </div>
    </div>
  </div>
</section>
