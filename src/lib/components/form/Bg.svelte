<script>
  export let data;
</script>

<label for="bg"><b>Background image</b></label>

{#if data?.bg}
  <input class="form-control" type="url" id="bg" name="bg" bind:value={data.bg} />
{:else}
  <input class="form-control" type="url" id="bg" name="bg" placeholder="https://images.unsplash.com/photo-123" />
{/if}
