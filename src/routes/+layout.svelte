<script>
  import { CAPTCHA_ROUTES } from "$lib/consts";
  import { getFlash } from "sveltekit-flash-message";
  import { invalidate, afterNavigate } from "$app/navigation";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { PUBLIC_RECAPTCHA_SITE_KEY } from "$env/static/public";
  import Footer from "./Footer.svelte";
  import Header from "./Header.svelte";
  import toast, { Toaster } from "svelte-french-toast";
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

    if (!CAPTCHA_ROUTES.includes(pathname)) {
      const badge = document.querySelector(".grecaptcha-badge");
      if (badge) {
        badge.remove();
      }
    }
  });

  $: pathname = $page.url.pathname.replace(/\/$/, "");

  const flash = getFlash(page);

  $: if ($flash) {
    switch ($flash.type) {
      case "success":
        toast.success($flash.message);
        break;
      case "error":
        toast.error($flash.message);
        break;
      default:
        toast($flash.message);
    }
  }
</script>

<svelte:head>
  {#if CAPTCHA_ROUTES.includes(pathname)}
    <script src="https://www.google.com/recaptcha/api.js?render={PUBLIC_RECAPTCHA_SITE_KEY}" async defer></script>
  {/if}
</svelte:head>

<div id="background" />

<div class="all-but-footer">
  <Header {data} />
  <Toaster />
  <slot />
</div>
<Footer />

<style>
  .all-but-footer {
    min-height: calc(100vh);
  }
</style>
