<script>
  export let data;

  import Quiz from "$lib/models/Quiz.svelte";

  console.log(data);
</script>

<section>
  <div class="container">
    <h1>Explore</h1>

    <div class="row">
      <div class="col-md-8 offset-md-2">
        {#each data?.quizzes as quiz}
          <div class="quiz-box">
            <Quiz {quiz} />
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
