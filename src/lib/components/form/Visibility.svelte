<script>
  import "./styles.css";
  export let data;
</script>

<span><b class="label-title">Visibility</b><span class="required">*</span></span>

<br />

<div class="form-check form-check-inline">
  {#if data?.visibility === "public"}
    <input class="form-check-input" type="radio" id="public" name="visibility" value="public" required checked />
  {:else}
    <input class="form-check-input" type="radio" id="public" name="visibility" value="public" required />
  {/if}
  <label class="form-check-label" for="public">Public</label>
</div>

<div class="form-check form-check-inline">
  {#if data?.visibility === "unlisted"}
    <input class="form-check-input" type="radio" id="unlisted" name="visibility" value="unlisted" required checked />
  {:else}
    <input class="form-check-input" type="radio" id="unlisted" name="visibility" value="unlisted" required />
  {/if}
  <label class="form-check-label" for="unlisted">Unlisted</label>
</div>

<div class="form-check form-check-inline">
  {#if data?.visibility === "private"}
    <input class="form-check-input" type="radio" id="private" name="visibility" value="private" required checked />
  {:else}
    <input class="form-check-input" type="radio" id="private" name="visibility" value="private" required />
  {/if}
  <label class="form-check-label" for="private">Private</label>
</div>
