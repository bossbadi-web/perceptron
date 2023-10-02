<script>
  export let data;

  let { supabase, session } = data;
  $: ({ supabase, session } = data);
</script>

{#if session}
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1 class="text-center">Welcome {session.user.email}</h1>
      </div>
    </div>
  </div>
{:else}
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1 class="text-center">Welcome</h1>
      </div>
    </div>
  </div>
{/if}

<section>
  <div class="container text-center">
    <h1 class="display-1">Perceptron</h1>
    
    <a href="/upload">upload</a>
  </div>
</section>
