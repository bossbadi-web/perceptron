<script>
  import "./styles.css";
  import "$lib/components/quiz/play/styles.css";
  import { LANDING_QUESTIONS } from "$lib/landingQuestions.js";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import toast from "svelte-french-toast";

  $: idx = Math.floor(Math.random() * LANDING_QUESTIONS.length);

  const message = $page.url.searchParams.get("message");
  const error = $page.url.searchParams.get("error_description");

  onMount(() => {
    if (message) {
      toast.success(message, { duration: 5000 });
    }
    if (error) {
      toast.error(error, { duration: 5000 });
    }
  });
</script>

<section id="hero">
  <div class="container mobile-center">
    <div class="d-flex flex-lg-row flex-column">
      <div class="flex-grow-1 main-text">
        <h1 class="display-1 text-center">
          <picture>
            <img class="logo img-fluid" src="/img/logo-black.svg" alt="logo" />
            <img class="logo img-fluid" src="/img/logo-white.svg" alt="logo" />
          </picture>
          <br />
          Perceptron
          <p class="subtitle lead">Convert your handwritten notes into an interactive study guide.</p>
        </h1>
      </div>
      <div class="main-img">
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
  <div class="container">
    <div class="landing__all-cards">
      <div class="landing__card" data-aos="fade-in" data-aos-duration="1000">
        <h1 class="landing__card-title">
          <i class="fas fa-hammer" />
          Create
        </h1>
        <p class="landing__card-text">
          Create a quiz by uploading your notes—picture, screenshot, plain text. Also add a background image for good
          measure.
        </p>
      </div>

      <div class="landing__card" data-aos="fade-in" data-aos-duration="1000" data-aos-delay="100">
        <h1 class="landing__card-title">
          <i class="fas fa-gamepad" />
          Play
        </h1>
        <p class="landing__card-text">
          Choose an option and get instant feedback. Review your answers at the end to see your score and how long you
          took.
        </p>
      </div>

      <div class="landing__card" data-aos="fade-in" data-aos-duration="1000" data-aos-delay="200">
        <h1 class="landing__card-title">
          <i class="fas fa-cog" />
          Options
        </h1>
        <p class="landing__card-text">
          Upon creation, you can choose to immediately play the quiz, preview it, or start editing it. (So no answers
          are leaked.)
        </p>
      </div>

      <div class="landing__card" data-aos="fade-in" data-aos-duration="1000">
        <h1 class="landing__card-title">
          <i class="fas fa-edit" />
          Editor
        </h1>
        <p class="landing__card-text">
          Easily insert, delete, and modify questions. Did we make a mistake? Correct it in the editor. Click, save,
          done.
        </p>
      </div>

      <div class="landing__card" data-aos="fade-in" data-aos-duration="1000" data-aos-delay="100">
        <h1 class="landing__card-title">
          <i class="fas fa-rocket" />
          No limit
        </h1>
        <p class="landing__card-text">
          Create as many quizzes as you want. Create as many questions as you want. Play as many times as you want.
        </p>
      </div>

      <div class="landing__card" data-aos="fade-in" data-aos-duration="1000" data-aos-delay="200">
        <h1 class="landing__card-title">
          <i class="fas fa-share" />
          Share
        </h1>
        <p class="landing__card-text">
          Super easy to share with your friends—just send them the link. They don't even need an account to play!
        </p>
      </div>
    </div>
  </div>
</section>
