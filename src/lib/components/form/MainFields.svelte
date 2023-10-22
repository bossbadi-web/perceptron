<script>
  import Title from "./Title.svelte";
  import Description from "./Description.svelte";
  import Visibility from "./Visibility.svelte";

  export let data;
</script>

<div class="mb-3">
  <Title {data} />
</div>

<div class="mb-3">
  <Description {data} />
</div>

<div class="mb-3">
  <Visibility {data} />
</div>
