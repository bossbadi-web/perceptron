<script>
  import "./styles.css";
  export let data;
</script>

<label for="bg">
  <b class="label-title">Background image</b>
  <small class="text-muted">(from Unsplash)</small>
</label>

{#if data?.bg}
  <input class="form-control" type="url" id="bg" name="bg" bind:value={data.bg} />
{:else}
  <input class="form-control" type="url" id="bg" name="bg" placeholder="https://images.unsplash.com/photo-123" />
{/if}
