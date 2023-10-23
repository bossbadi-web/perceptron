<!-- display loading slides, alternate between each with slide animation -->
<script>
  import { onMount } from "svelte";

  const title = "Creating your Perceptron";

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
    title: title,
    message: hints[0],
  };

  let i = 0;

  onMount(() => {
    const titleInt = setInterval(() => {
      if (slide.title.length < title.length + 3) {
        slide.title += ".";
      } else {
        slide.title = title;
      }
    }, 500);

    const hintInt = setInterval(() => {
      i = (i + 1) % hints.length;
      slide.message = hints[i];
    }, 2000);

    return () => {
      clearInterval(titleInt);
      clearInterval(hintInt);
    };
  });
</script>

<h1 class="display-4 text-center">{slide.title}</h1>
<p class="lead text-center">{slide.message}</p>
