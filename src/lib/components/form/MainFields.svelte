<script>
  import Bg from "./Bg.svelte";
  import Description from "./Description.svelte";
  import Title from "./Title.svelte";
  import Visibility from "./Visibility.svelte";
  export let quiz = undefined;
</script>

<div class="mb-4">
  <Title {quiz} />
</div>

<div class="mb-4">
  <Description {quiz} />
</div>

<div class="mb-4">
  <Visibility {quiz} />
</div>

<div class="mb-4">
  <Bg {quiz} />
</div>
