<script>
  import "$lib/components/mcq/styles.css";
  import Mcq from "$lib/components/mcq/Preview.svelte";

  export let data;
  const { quiz } = data;

  let { supabase, session } = data;
  $: ({ supabase, session } = data);
</script>

<section>
  <div class="container">
    <div class="row">
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
          <p class="quiz-description lead">{quiz.description}</p>
        </div>

        {#each quiz?.data as question}
          <div class="question-box">
            <Mcq {question} />
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
