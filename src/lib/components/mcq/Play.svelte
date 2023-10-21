<script>
  export let question, nextQuestion;

  const answerRight = (idx) => {
    document.querySelectorAll(".an-option").forEach((el, i) => {
      if (i !== idx) {
        el.classList.remove("btn-main");
        el.classList.add("btn-secondary");
        el.disabled = true;
      }
    });

    setTimeout(() => {
      resetOptions();
      nextQuestion({ wasCorrect: true, idx });
    }, 2000);
  };

  const answerWrong = (idx) => {
    document.querySelectorAll(".an-option").forEach((el, i) => {
      el.classList.remove("btn-main");
      if (i === idx) {
        el.classList.add("btn-danger");
      } else if (i === question.answer) {
        el.classList.add("btn-main");
        el.disabled = true;
      } else {
        el.classList.add("btn-secondary");
        el.disabled = true;
      }
    });

    setTimeout(() => {
      resetOptions();
      nextQuestion({ wasCorrect: false, idx });
    }, 2000);
  };

  const resetOptions = () => {
    document.querySelectorAll(".an-option").forEach((el) => {
      el.classList.remove("btn-danger");
      el.classList.remove("btn-secondary");
      el.classList.add("btn-main");
      el.disabled = false;
    });
  };

  const checkAnswer = (idx) => {
    if (idx === question.answer) {
      // answer is correct
      answerRight(idx);
    } else {
      // answer is wrong
      answerWrong(idx);
    }
  };
</script>

<h1 class="the-title display-6">{question.question}</h1>

<div class="options-box">
  {#each question.options as option, idx}
    <button class="an-option btn btn-main btn-lg btn-block" on:click={() => checkAnswer(idx)}>
      {option}
    </button>
  {/each}
</div>
