<script>
  import { enhance } from "$app/forms";
  import { PUBLIC_RECAPTCHA_SITE_KEY } from "$env/static/public";
  export let form;

  const onSubmit = async () => {
    await new Promise((resolve) => {
      grecaptcha.ready(() => {
        grecaptcha.execute(PUBLIC_RECAPTCHA_SITE_KEY, { action: "submit" }).then((t) => {
          document.cookie = `token=${t}; path=/; max-age=3600`;
          resolve();
        });
      });
    });
  };
</script>

<section>
  <div class="container">
    <div class="col-md-8 offset-md-2">
      <div class="row normal-row">
        <h1 class="text-center display-4">Register</h1>
        <form class="mb-3" method="POST" use:enhance={onSubmit}>
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
            <input class="form-control" id="emailInput" type="email" name="email" required />
          </div>
          <div class="mb-3">
            <label for="usernameInput" class="form-label">Username</label>
            <input class="form-control" id="usernameInput" type="text" name="username" required />
          </div>
          <div class="mb-3">
            <label for="passwordInput" class="form-label">Password</label>
            <input class="form-control" id="passwordInput" type="password" name="password" required />
          </div>
          <div class="mb-3">
            <label for="passwordConfirmInput" class="form-label">Confirm Password</label>
            <input class="form-control" id="passwordConfirmInput" type="password" name="passwordConfirm" required />
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
