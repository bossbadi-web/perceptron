<script>
  export let data;
</script>

<label for="visibility"><b>Visibility</b><span class="required">*</span></label>

<br />

<div class="form-check form-check-inline">
  {#if data?.visibility === "public"}
    <input class="form-check-input" type="radio" id="public" name="visibility" value="public" checked />
  {:else}
    <input class="form-check-input" type="radio" id="public" name="visibility" value="public" />
  {/if}
  <label class="form-check-label" for="public">Public</label>
</div>

<div class="form-check form-check-inline">
  {#if data?.visibility === "unlisted"}
    <input class="form-check-input" type="radio" id="unlisted" name="visibility" value="unlisted" checked />
  {:else}
    <input class="form-check-input" type="radio" id="unlisted" name="visibility" value="unlisted" />
  {/if}
  <label class="form-check-label" for="unlisted">Unlisted</label>
</div>

<div class="form-check form-check-inline">
  {#if data?.visibility === "private"}
    <input class="form-check-input" type="radio" id="private" name="visibility" value="private" checked />
  {:else}
    <input class="form-check-input" type="radio" id="private" name="visibility" value="private" />
  {/if}
  <label class="form-check-label" for="private">Private</label>
</div>
