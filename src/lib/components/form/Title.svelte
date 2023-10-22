<script>
  import "./styles.css";
  import { LIMITS } from "$lib/consts";

  export let data;
</script>

<label for="title">
  <b class="label-title">Title</b><span class="required">*</span>
  <small class="text-muted">(max {LIMITS.title} chars)</small>
</label>

{#if data?.title}
  <input
    class="form-control"
    type="text"
    id="title"
    name="title"
    maxlength={LIMITS.title}
    bind:value={data.title}
    required
  />
{:else}
  <input
    class="form-control"
    type="text"
    id="title"
    name="title"
    placeholder="Title"
    maxlength={LIMITS.title}
    required
  />
{/if}
