<script>
  export let data;

  let { supabase, session } = data;
  $: ({ supabase, session } = data);
</script>

<section>
  <div class="container text-center">
    <h1 class="display-1">
      <img class="logo img-fluid" src="/img/logo-black.svg" alt="logo" />
      Perceptron
    </h1>
  </div>
  {#if session}
    <div class="container">
      <div class="row">
        <div class="col-md-10 offset-md-1">
          <h1 class="text-center">
            Welcome, {session.user.username}
          </h1>
        </div>
      </div>
    </div>
  {/if}
</section>

<style>
  .logo {
    height: 150px;
    width: 150px;
  }
</style>
