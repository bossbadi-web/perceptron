<script>
  export let data;

  import Mcq from "$lib/models/Mcq.svelte";
</script>

<section>
  <div class="container">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        {#each data?.questions as question}
          <div class="question-box">
            <Mcq {question} />
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .question-box {
    border: 1px solid black;
    padding: 2rem;
    margin-bottom: 1rem;
    border-radius: 1rem;
  }

  @media (max-width: 768px) {
    .question-box {
      padding: 1rem;
    }
  }
</style>
