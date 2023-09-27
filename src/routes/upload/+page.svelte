<script>
  export let form;

  import MCQ from "$lib/models/mcq.svelte";
</script>

<section>
  <div class="container">
    <form method="POST" enctype="multipart/form-data">
      
      {#if form?.body}
        <!-- 
          sample format
          [
  {
    "question": "The question",
    "options": ["A", "B", "C", "D"],
    "answer": "A"
  }
]
 -->

        {#each form.body as question}
          <MCQ {question} />
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
