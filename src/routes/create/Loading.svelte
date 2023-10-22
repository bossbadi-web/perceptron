<!-- display loading slides, alternate between each with slide animation -->
<script>
  import { onMount } from "svelte";

  const loadings = ["Loading", "Loading.", "Loading..", "Loading..."];

  let hints = [
    "Fetching the digital puzzle pieces",
    "Loading a world of wonders",
    "Just a moment while the magic happens",
    "Gearing up for action",
    "Counting down to liftoff",
    "Brewing up some awesomeness",
    "Warming up the engines",
  ];
  hints = hints.sort(() => Math.random() - 0.5);

  const slide = {
    title: loadings[0],
    message: hints[0],
  };

  let i = 0;

  onMount(() => {
    const fastInterval = setInterval(() => {
      i = (i + 1) % loadings.length;
      slide.title = loadings[i];
    }, 500);

    const slowInterval = setInterval(() => {
      i = (i + 1) % hints.length;
      slide.message = hints[i];
    }, 3000);

    return () => {
      clearInterval(fastInterval);
      clearInterval(slowInterval);
    };
  });
</script>

<h1 class="display-4 text-center">{slide.title}</h1>
<p class="lead text-center">{slide.message}</p>
