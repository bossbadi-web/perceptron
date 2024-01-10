<script>
  import { init } from "$lib/smoothScroll";
  import { invalidate, afterNavigate } from "$app/navigation";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import Footer from "./Footer.svelte";
  import Header from "./Header.svelte";
  export let data;

  $: ({ supabase, session } = data);

  onMount(() => {
    init(); // smooth scroll

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
    const subpages = $page.route.id.split("/");
    let subpage;

    for (let i = 0; i < subpages.length; i++) {
      const part = subpages[i];

      if (!part || part.startsWith("(")) {
        continue;
      } else {
        subpage = part.replace(/^\w/, (c) => c.toUpperCase());
        break;
      }
    }

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
