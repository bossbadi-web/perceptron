<script>
  export let form;
</script>

<section>
  <div class="container">
    <form method="POST" enctype="multipart/form-data">
      
      {#if form?.body}
        <pre>{JSON.stringify(form.body, null, 2)}</pre>
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
