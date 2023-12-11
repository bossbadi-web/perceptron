<script>
  export let data;
</script>

<section>
  <div class="container">
    <div class="col-md-8 offset-md-2">
      <div class="row normal-row">
        <h1 class="display-4 text-center">My Profile</h1>

        <div>
          <p>
            Username: {data.username}
          </p>

          <p>
            Email: {data.email}
          </p>
          <p>
            ID: {data.id}
          </p>
        </div>

        <div class="buttons">
          <a class="btn btn-main" href="/username/change">Change Username</a>
          <a class="btn btn-main" href="/email/change">Change Email</a>
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
    gap: 0.5rem;
  }

  @media (max-width: 450px) {
    .buttons {
      flex-direction: column;
    }
  }
</style>
