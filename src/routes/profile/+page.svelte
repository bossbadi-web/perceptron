<script>
  export let data;
</script>

<section>
  <div class="container">
    <div class="row normal-row">
      <div class="col-md-10 offset-md-1">
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
          <a class="btn btn-secondary" href="/password/update">Change Password</a>
        </div>
      </div>
    </div>
  </div>
</section>
