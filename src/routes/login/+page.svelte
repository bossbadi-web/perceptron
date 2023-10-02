<!-- // src/routes/login/+page.svelte -->
<script>
  import { enhance } from "$app/forms";
  export let form;
</script>

<section>
  <div class="container">
    <h1>Login</h1>
    <form method="POST" use:enhance>
      <input type="text" name="email" placeholder="Email" value={form?.email ?? ""} />
      <input type="password" name="password" placeholder="Password" />
      <input type="submit" value="Login" />
    </form>
  </div>
</section>
