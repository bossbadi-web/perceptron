<!-- this is the quiz editing page -->

<script>
  export let data;

  import McqEdit from "$lib/models/McqEdit.svelte";
  import Divider from "$lib/models/Divider.svelte";
</script>

<section>
  <div class="container">
    <form method="POST">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <Divider />
          {#each data?.questions as question}
            <div class="question-box">
              <McqEdit {question} />
            </div>
            <Divider />
          {/each}
        </div>
      </div>

      <div class="row">
        <div class="col-md-8 offset-md-2 text-center">
          <button class="btn btn-primary btn-lg">Save</button>
        </div>
      </div>
    </form>
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
