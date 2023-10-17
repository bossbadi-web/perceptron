<script>
  export let data;

  let { supabase, session } = data;
  $: ({ supabase, session } = data);
</script>

<section>
  <div class="container text-center">
    <h1 class="display-1">Perceptron</h1>
  </div>
  {#if session}
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h1 class="text-center">Welcome {session.user.username}</h1>
        </div>
      </div>
    </div>
  {/if}
</section>
