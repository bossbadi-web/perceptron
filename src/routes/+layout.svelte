<script>
  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";

  import { invalidate } from "$app/navigation";
  import { onMount } from "svelte";

  export let data;

  $: ({ supabase, session } = data);

  onMount(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, _session) => {
      if (_session?.expires_at !== session?.expires_at) {
        invalidate("supabase:auth");
      }
    });

    return () => subscription.unsubscribe();
  });
</script>

<div class="all-but-footer">
  <Header {data} />
  <slot />
</div>
<Footer />

<style>
  .all-but-footer {
    min-height: calc(100vh);
  }
</style>
