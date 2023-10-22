<script>
  import Bg from "./Bg.svelte";
  import Description from "./Description.svelte";
  import Title from "./Title.svelte";
  import Visibility from "./Visibility.svelte";
  export let data = null;
</script>

<div class="mb-4">
  <Title {data} />
</div>

<div class="mb-4">
  <Description {data} />
</div>

<div class="mb-4">
  <Visibility {data} />
</div>

<div class="mb-4">
  <Bg {data} />
</div>
