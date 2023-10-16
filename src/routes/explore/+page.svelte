<script>
  export let data;

  import Quiz from "$lib/models/Quiz.svelte";

  console.log(data);
</script>

<section>
  <div class="container">
    <h1 class="text-center display-4">Explore</h1>

    <div class="row">
      <div class="all-cards">
        {#each data?.quizzes as quiz}
          <div class="quiz-box">
            <Quiz {quiz} />
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .all-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 1rem;
  }
</style>
