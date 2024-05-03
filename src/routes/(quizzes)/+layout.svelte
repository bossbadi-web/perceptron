<script>
  import "./styles.css";
  import { beforeNavigate } from "$app/navigation";
  import { onMount } from "svelte";

  onMount(() => {
    const scrollPosition = sessionStorage.getItem("scrollPosition");
    const previousURL = sessionStorage.getItem("previousURL");
    if (scrollPosition && previousURL === window.location.href) {
      window.scrollTo(0, scrollPosition);
    }
  });

  beforeNavigate(() => {
    sessionStorage.setItem("scrollPosition", window.scrollY);
    sessionStorage.setItem("previousURL", window.location.href);
  });
</script>

<section>
  <div class="container">
    <slot />
  </div>
</section>
