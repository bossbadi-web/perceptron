<!-- divider between each question box
  when user hovers over it, a + button appears
  when user clicks on it, a new question box appears
  in between the two questions
  -->

<script>
  function addNewQuestion() {
    const questionBox = document.querySelector(".question-box");
    const newQuestionBox = questionBox.cloneNode(true);
    questionBox.after(newQuestionBox);
  }
</script>

<div class="divider">
  <div class="row">
    <div class="col-md-8 offset-md-2 text-center">
      <button class="add-new">
        <small class="text-muted">Add new</small>
      </button>
    </div>
  </div>
</div>

<style>
  .divider {
    border: 1px solid gray;
    padding: 2px;
    margin-bottom: 1rem;
    border-radius: 1rem;
  }

  .add-new:hover {
    font-weight: bold;
  }
</style>
