<script>
  import { enhance } from "$app/forms";
  export let form;
</script>

<section>
  <div class="container">
    <h1>Register</h1>
    <form method="POST" use:enhance>
      <input type="text" name="email" placeholder="Email" value={form?.email ?? ""} />
      <input type="password" name="password" placeholder="Password" />
      <input type="submit" value="Register" />
    </form>
  </div>
</section>
