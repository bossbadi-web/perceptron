<script>
  import "$lib/components/mcq/styles.css";
  import Mcq from "$lib/components/mcq/Preview.svelte";
  import QuizDescription from "$lib/components/quiz/Description.svelte";
  import { onMount } from "svelte";

  export let data;
  const { quiz } = data;

  if (quiz?.bg) {
    onMount(() => {
      document.body.style.backgroundImage = `url(${quiz.bg})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundAttachment = "fixed";

      return () => {
        document.body.style.backgroundImage = "";
        document.body.style.backgroundSize = "";
        document.body.style.backgroundRepeat = "";
        document.body.style.backgroundAttachment = "";
      };
    });
  }

  let { supabase, session } = data;
  $: ({ supabase, session } = data);
</script>

<section>
  <div class="container">
    <div class="row normal-row">
      <div class="col-md-10 offset-md-1">
        <div class="text-center alert alert-info" role="alert">
          <p>This is a preview of the quiz. You can't submit your answers here.</p>
          <a href="/play/{quiz.id}" class="btn btn-main">Play</a>
          {#if session}
            <a href="/edit/{quiz.id}" class="btn btn-secondary">Edit</a>
          {/if}
        </div>

        <div class="quiz-metadata">
          <h1 class="quiz-title display-4">{quiz.title}</h1>
          <QuizDescription {quiz} showVisibility={true} />
        </div>

        {#each quiz?.data as question, questionIdx}
          <div class="question-box">
            <Mcq {question} {questionIdx} />
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
