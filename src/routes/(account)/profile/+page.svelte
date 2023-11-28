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
            Email: {data.email}
          </p>
          <p>
            ID: {data.id}
          </p>
        </div>

        <div>
          <a class="btn btn-main" href="/email/change">Change Email</a>
          <a class="btn btn-main" href="/password/change">Change Password</a>
        </div>
      </div>
    </div>
  </div>
</section>
