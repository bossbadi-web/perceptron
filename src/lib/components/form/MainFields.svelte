<script>
  import Title from "./Title.svelte";
  import Description from "./Description.svelte";
  import Visibility from "./Visibility.svelte";
  import Bg from "./Bg.svelte";

  export let data = null;
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

<div class="mb-3">
  <Bg {data} />
</div>
