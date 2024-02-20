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
        <h1 class="text-center display-4">Register</h1>
        <form class="mb-3" method="POST" use:enhance={submitCaptcha}>
          <div class="mb-3 text-center">
            <Google />
          </div>
          {#if form?.message}
            <div
              class="alert"
              role="alert"
              class:alert-success={form.status === 200}
              class:alert-danger={form.status !== 200}
            >
              {form?.message}
            </div>
          {/if}
          <div class="mb-3">
            <label for="emailInput" class="form-label">Email</label>
            <input class="form-control" id="emailInput" type="email" name="email" />
          </div>
          <div class="mb-3">
            <label for="usernameInput" class="form-label">Username</label>
            <input class="form-control" id="usernameInput" type="text" name="username" />
          </div>
          <div class="mb-3">
            <label for="passwordInput" class="form-label">Password</label>
            <input class="form-control" id="passwordInput" type="password" name="password" />
          </div>
          <div class="mb-3">
            <label for="passwordConfirmInput" class="form-label">Confirm Password</label>
            <input class="form-control" id="passwordConfirmInput" type="password" name="passwordConfirm" />
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
