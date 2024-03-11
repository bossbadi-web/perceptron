<script>
  import { LIMITS } from "$lib/consts";
  export let quiz;
</script>

<label for="title">
  Title<span class="required">*</span>
  <small class="text-muted">(max {LIMITS.title} chars)</small>
</label>

<input
  class="form-control"
  type="text"
  id="title"
  name="title"
  maxlength={LIMITS.title}
  bind:value={$quiz.title}
  required
/>
