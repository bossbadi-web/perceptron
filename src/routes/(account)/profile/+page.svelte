<script>
  export let data;
</script>

<section>
  <div class="container">
    <div class="col-md-8 offset-md-2">
      <div class="row normal-row">
        <h1 class="display-4 text-center">My Profile</h1>

        <label for="username" class="form-label">Username</label>
        <div class="input-group mb-3">
          <input type="text" class="form-control text-muted" value={data.username} readonly />
          <a class="btn btn-main" href="/username/change"><i class="fas fa-edit"></i></a>
        </div>

        <label for="email" class="form-label">Email</label>
        <div class="input-group mb-3">
          <input type="text" class="form-control text-muted" value={data.email} readonly />
          <a class="btn btn-main" href="/email/change"><i class="fas fa-edit"></i></a>
        </div>

        <label for="id" class="form-label">ID</label>
        <div class="input-group mb-3">
          <input type="text" class="form-control text-muted" value={data.id} readonly />
        </div>

        <div class="buttons">
          <a class="btn btn-main" href="/password/change">Change Password</a>
          <a class="btn btn-danger" href="/account/delete">Delete Account</a>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  @media (max-width: 450px) {
    .buttons {
      flex-direction: column;
    }
  }
</style>
