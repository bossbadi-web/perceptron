<script>
  export let form;
</script>

<section>
  <div class="container">
    {#if form?.message}
      <div class="alert alert-danger" role="alert">
        {form?.message}
      </div>
    {/if}

    <form method="POST">
      <div class="group">
        <label for="file">Upload your file</label>
        <input type="file" id="file" name="fileToUpload" accept=".jpg, .jpeg, .png, .webp" required />
      </div>

      <button class="btn btn-primary" type="submit">Submit</button>
    </form>

    <a href="/">Back</a>
  </div>
</section>
