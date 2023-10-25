<script>
  import "./styles.css";
  import "$lib/components/mcq/styles.css";
  import { LANDING_QUESTIONS } from "$lib/landingQuestions.js";

  $: idx = Math.floor(Math.random() * LANDING_QUESTIONS.length);
</script>

<section id="hero">
  <div class="container mobile-center">
    <div class="d-flex flex-lg-row flex-column">
      <div class="flex-grow-1 main-text">
        <h1 class="display-1 text-center">
          <img class="logo img-fluid" src="/img/logo-black.svg" alt="logo" />
          <br />
          Perceptron
          <p class="subtitle lead">Convert your handwritten notes into an interactive study guide.</p>
        </h1>
      </div>
      <div class="main-img" data-aos="zoom-in" data-aos-duration="2000">
        <div class="example-quiz question-box">
          <p class="text-muted">Question {idx + 1} of {LANDING_QUESTIONS.length}</p>
          <h1 class="question-title display-6">{LANDING_QUESTIONS[idx].question}</h1>

          <div class="options-box">
            {#each LANDING_QUESTIONS[idx].options as option}
              <button class="question-option btn btn-main btn-lg">
                {option}
              </button>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="cards">
  <div class="all-cards">
    <div class="card">
      <h1 class="card-title">
        <i class="fas fa-hammer" />
        Create
      </h1>
      <p class="card-text">
        Create a quiz by uploading your notes—picture, screenshot, plain text. Also add a background image for good
        measure.
      </p>
    </div>

    <div class="card">
      <h1 class="card-title">
        <i class="fas fa-gamepad" />
        Play
      </h1>
      <p class="card-text">
        Choose an option and get instant feedback. Review your answers at the end to see your score and how long you
        took.
      </p>
    </div>

    <div class="card">
      <h1 class="card-title">
        <i class="fas fa-cog" />
        Options
      </h1>
      <p class="card-text">
        Upon creation, you can choose to immediately play the quiz, preview it, or start editing it. (So no answers are
        leaked.)
      </p>
    </div>

    <div class="card">
      <h1 class="card-title">
        <i class="fas fa-edit" />
        Editor
      </h1>
      <p class="card-text">
        Easily insert, delete, and modify questions. Did we make a mistake? Correct it in the editor. Click, save, done.
      </p>
    </div>

    <div class="card">
      <h1 class="card-title">
        <i class="fas fa-rocket" />
        No limit
      </h1>
      <p class="card-text">
        Create as many quizzes as you want. Create as many questions as you want. Play as many times as you want.
      </p>
    </div>

    <div class="card">
      <h1 class="card-title">
        <i class="fas fa-share" />
        Share
      </h1>
      <p class="card-text">
        Super easy to share with your friends—just send them the link. They don't even need an account to play!
      </p>
    </div>
  </div>
</section>
