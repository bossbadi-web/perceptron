<script>
  import { page } from "$app/stores";
</script>

<section>
  <div class="container">
    <h1>{$page.error.message}</h1>
    {#if $page.error?.hint}
      <p>{$page.error.hint}</p>
    {/if}
    <a href="/">Go home</a>
  </div>
</section>
