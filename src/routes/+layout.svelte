<script>
  import { invalidate, afterNavigate } from "$app/navigation";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import Footer from "./Footer.svelte";
  import Header from "./Header.svelte";
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

  afterNavigate(() => {
    const subpage = $page.route.id.split("/")[1].replace(/^\w/, (c) => c.toUpperCase());

    if (subpage) {
      document.title = `${subpage} | Perceptron`;
    } else {
      document.title = "Perceptron";
    }
  });
</script>

<div id="background" />

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
