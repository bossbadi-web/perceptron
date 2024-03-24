<script>
  import "$lib/components/quiz/play/styles.css";
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import LikeDislike from "$lib/components/quiz/browse/LikeDislike.svelte";
  import Mcq from "$lib/components/quiz/play/Preview.svelte";
  import QuizDescription from "$lib/components/quiz/browse/Description.svelte";
  export let data;

  const { quiz } = data;

  onMount(() => {
    // keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey) {
        switch (e.key.toLowerCase()) {
          case "p": // Ctrl + P: play
            e.preventDefault();
            window.location.href = `/play/${quiz.id}`;
            break;
          case "o": // Ctrl + O: do nothing
            e.preventDefault();
            break;
          case "e": // Ctrl + E: edit
            e.preventDefault();
            if (!data.session?.user?.id) {
              alert("Please login to edit this quiz.");
            } else if (data.session?.user?.id !== quiz?.owner) {
              alert("You are not the owner of this quiz.");
            } else {
              window.location.href = `/edit/${quiz.id}`;
            }
            break;
        }
      }
    });

    if (quiz?.bg) {
      const bg = document.getElementById("background");
      bg.style.backgroundImage = `url(${quiz.bg})`;

      return () => {
        bg.style.backgroundImage = "";
      };
    }
  });

  $: ({ session } = data);
</script>

<section in:fade>
  <div class="container">
    <div class="row normal-row">
      <div class="col-md-10 offset-md-1">
        <div class="text-center alert alert-info" role="alert">
          <p>This is a preview. You can't submit your answers here.</p>
          <a href="/play/{quiz.id}" class="btn btn-main" data-sveltekit-preload-data="tap" title="Ctrl + P">Play</a>
          {#if session?.user?.id === quiz?.owner}
            <a href="/edit/{quiz.id}" class="btn btn-secondary" data-sveltekit-preload-data="tap" title="Ctrl + E">
              Edit
            </a>
          {/if}
        </div>

        <div class="quiz-metadata">
          <h1 class="quiz-title display-4">{quiz.title}</h1>
          <p>
            <QuizDescription {quiz} showVisibility={true} />
          </p>
          <p>
            <LikeDislike {data} />
          </p>
        </div>

        {#each quiz?.data as question, questionIdx}
          <div class="question-box">
            <Mcq {question} {questionIdx} length={quiz.data.length} />
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
