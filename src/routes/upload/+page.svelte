<script>
  export let form;

  import MCQ from "$lib/models/mcq.svelte";
</script>

<section>
  <div class="container">
    <form method="POST" enctype="multipart/form-data">
      {#if form?.body}
        {#each form.body as question}
          <div class="question-box">
            <MCQ {question} />
          </div>
        {/each}
      {/if}

      <div class="group">
        <label for="file">Upload your file</label>
        <input type="file" id="file" name="fileToUpload" accept=".jpg, .jpeg, .png, .webp" required />
      </div>

      <button class="btn btn-primary" type="submit">Submit</button>
    </form>

    <a href="/">Back</a>
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
