<script>
  import "$lib/components/mcq/styles.css";
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import LikeDislike from "$lib/components/quiz/LikeDislike.svelte";
  import Mcq from "$lib/components/mcq/Preview.svelte";
  import QuizDescription from "$lib/components/quiz/Description.svelte";
  export let data;

  const { quiz } = data;

  onMount(() => {
    // keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      // Ctrl + P: play
      if (e.ctrlKey && e.key === "p") {
        e.preventDefault();
        window.location.href = `/play/${quiz.id}`;
      }

      // Ctrl + O: do nothing
      else if (e.ctrlKey && e.key === "o") {
        e.preventDefault();
      }

      // Ctrl + E: edit
      else if (e.ctrlKey && e.key === "e") {
        e.preventDefault();

        if (!data.session?.user?.id) {
          alert("Please login to edit this quiz.");
        } else if (data.session?.user?.id !== quiz?.owner) {
          alert("You are not the owner of this quiz.");
        } else {
          window.location.href = `/edit/${quiz.id}`;
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
