<script>
  import { page } from "$app/stores";
</script>

<section>
  <div class="container">
    <h1>{$page.error.message}</h1>
    <p>{$page.error.hint}</p>
    <a href="/">Go home</a>
  </div>
</section>
