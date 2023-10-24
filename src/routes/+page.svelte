<script>
  import "$lib/components/mcq/styles.css";
</script>

<section>
  <section>
    <div class="container mobile-center">
      <div class="d-flex flex-lg-row flex-column">
        <div class="flex-grow-1 main-text">
          <h1 class="display-1">
            <span>
              <img class="logo img-fluid" src="/img/logo-black.svg" alt="logo" />
            </span>
            <span>
              Perceptron
              <!-- <div class="lead text-center">Convert your handwritten notes into an interactive study guide.</div> -->
            </span>
          </h1>
        </div>
        <div class="main-img" data-aos="zoom-in" data-aos-duration="2000">
          <div class="example-quiz question-box">
            <p class="text-muted">Question 1 of 2</p>
            <h1 class="question-title display-6">hi?</h1>

            <div class="options-box">
              {#each ["a", "b", "c", "d"] as option, idx}
                <button class="question-option btn btn-main btn-lg btn-block">
                  {option}
                </button>
              {/each}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</section>

<style>
  .logo {
    height: 150px;
    width: 150px;
  }

  /* vertically center main text */
  .main-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .lead {
    color: var(--main-gray-lt-2);
    margin-right: 2em;
  }

  /* vertically center book cover img within this */
  .main-img {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* cool image animation */
  .example-quiz {
    min-width: 300px;
    transform: rotate3d(0.5, -0.866, 0, 15deg) rotate(1deg);
    box-shadow: 2em 4em 6em -2em rgba(0, 0, 0, 0.5), 1em 2em 3.5em -2.5em rgba(0, 0, 0, 0.5);
    border: 2px solid var(--main-green);
    transition: transform 1s ease, box-shadow 1s ease;

    &:hover {
      transform: rotate3d(0, 0, 0, 0deg) rotate(0deg);
    }
  }

  @media (max-width: 1400px) {
    .display-1 {
      font-size: 4em;
    }
  }

  @media (max-width: 1200px) {
    .display-1 {
      font-size: 3.5em;
    }
  }

  @media (max-width: 991px) {
    .main-text {
      margin-right: 0;
      margin-bottom: 2em;
    }

    .lead {
      margin-right: 0;
    }

    .main-img {
      display: block;
      height: auto;
    }

    /* if on mobile, don't tilt book cover */
    .example-quiz {
      transform: none;
      box-shadow: none;
    }
  }

  /* typing animation, make sure you set the --len variable */
  .typing {
    font-family: "Azeret Mono", monospace;
    width: calc(var(--len) * 1ch);
    --speed: 1.2s;

    animation: type var(--speed) steps(var(--len)), blink 1s linear var(--speed) infinite alternate;
    white-space: nowrap;
    overflow: hidden;
    border-right: 2px solid;
  }

  @keyframes type {
    from {
      width: 0;
    }
  }

  @keyframes blink {
    50% {
      border-color: transparent;
    }
  }
</style>
