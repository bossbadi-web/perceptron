<script>
  export let inputId = "passwordInput",
    inputName = "password",
    labelName = "Password";

  const togglePassword = () => {
    const passwordInput = document.getElementById(inputId);
    const toggle = passwordInput.nextElementSibling;

    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      toggle.classList.remove("fa-eye");
      toggle.classList.add("fa-eye-slash");
    } else {
      passwordInput.type = "password";
      toggle.classList.remove("fa-eye-slash");
      toggle.classList.add("fa-eye");
    }
  };
</script>

<label for={inputId} class="form-label">{labelName}<span class="required">*</span></label>
<div class="input-group">
  <input type="password" class="form-control" id={inputId} name={inputName} required />
  <i class="fas fa-eye" on:click={togglePassword}></i>
</div>

<style>
  .input-group {
    position: relative;
  }

  .input-group i {
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
  }

  .input-group input {
    border-radius: 0.375rem !important;
  }
</style>
