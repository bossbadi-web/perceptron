<script>
  import { CAPTCHA_ROUTES } from "$lib/consts";
  import { getFlash } from "sveltekit-flash-message";
  import { invalidate, afterNavigate } from "$app/navigation";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { PUBLIC_RECAPTCHA_SITE_KEY } from "$env/static/public";
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
  $: flash = getFlash(page, { clearAfterMs: 5000 });
</script>

<svelte:head>
  {#if CAPTCHA_ROUTES.includes(pathname)}
    <script src="https://www.google.com/recaptcha/api.js?render={PUBLIC_RECAPTCHA_SITE_KEY}" async defer></script>
  {/if}
</svelte:head>

<div id="background" />

<div class="all-but-footer">
  <Header {data} />
  {#if $flash}
    <div class="alert alert-{$flash.type} alert-dismissible fade show text-center" role="alert">
      {$flash.message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  {/if}
  <slot />
</div>
<Footer />

<style>
  .all-but-footer {
    min-height: calc(100vh);
  }
</style>
