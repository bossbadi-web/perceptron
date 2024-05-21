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

  $: pathname = $page.url.pathname.replace(/\/$/, "");

  // display flashed messages as toasts
  const flash = getFlash(page);

  $: if ($flash) {
    switch ($flash.type) {
      case "success":
        toast.success($flash.message, { duration: 5000 });
        break;
      case "error":
        toast.error($flash.message, { duration: 5000 });
        break;
      default:
        toast($flash.message, { duration: 5000 });
    }
  }

  onMount(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, _session) => {
      if (_session?.expires_at !== session?.expires_at) {
        invalidate("supabase:auth");
      }
    });

    // pull customizations from database
    const theme = session?.user?.theme;
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }

    const font = session?.user?.font;
    if (font) {
      document.body.style.fontFamily = font;
      localStorage.setItem("font", font);
    }

    return () => subscription.unsubscribe();
  });

  afterNavigate(() => {
    // set page title
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

    // if navbar is open, close it
    const navbar = document.querySelector(".navbar-collapse");
    if (navbar && navbar.classList.contains("show")) {
      navbar.classList.remove("show");
    }

    // remove reCAPTCHA badge on non-CAPTCHA routes
    if (!CAPTCHA_ROUTES.includes(pathname)) {
      const badge = document.querySelector(".grecaptcha-badge");
      if (badge) {
        badge.remove();
      }
    }

    // if user deleted their account, force sign out
    if ($page.url.searchParams.has("signOut")) {
      document.cookie.split(";").forEach((c) => {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });

      setTimeout(() => {
        location.href = "/";
      }, 5000);
    }

    // if reload is specified, reload the page
    if ($page.url.searchParams.has("reload")) {
      const url = new URL(location.href);
      url.searchParams.delete("reload");
      location.href = url;
    }
  });
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
