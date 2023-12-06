<script>
  // immediately navigate to next
  import { page } from "$app/stores";

  const next = $page.url.searchParams.get("next") || "/";
</script>

<meta http-equiv="refresh" content="0;url={next}" />
