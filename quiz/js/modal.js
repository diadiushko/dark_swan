export default function createModal(container, data) {
  // Modal creation
  const wrapper = document.createElement('div');
  wrapper.classList.add('modal-wrapper');
  setTimeout(() => {
    wrapper.classList.add('active');
  }, 10);

  // Mark calc
  const testLength = data.length;
  const correctAnsw = data.filter((e) => e.isCorrect).length;
  const resultMark = (correctAnsw * 100) / testLength;

  // Inner html
  const rows = createInnerRows(data, resultMark);
  wrapper.insertAdjacentHTML('afterbegin', rows);

  container.append(wrapper);

  function deleteModal() {
    wrapper.classList.remove('active');
    setTimeout(() => wrapper.remove(), 800);
  }

  modalEvents(wrapper, deleteModal);
}

function modalEvents(wrapper, deleteModal) {
  const exitBtn = wrapper.querySelector('.close-button');

  function modalCloseListener(event) {
    const clickedElement = event.target;
    console.log(clickedElement, wrapper, exitBtn);
    if (clickedElement === wrapper || clickedElement === exitBtn) deleteModal();
  }
  document.addEventListener('click', modalCloseListener);
}

function createInnerRows(data, resultMark) {
  let tableRows = '';
  for (const questionInfo of data) {
    tableRows += `<div class="table-row">
      <div class="row-question">${questionInfo.question}</div>
      <div class="row-answer ${
        questionInfo.isCorrect ? 'correct' : 'incorrect'
      }">${questionInfo.userAnswer}</div>
      <div class="row-correct">${questionInfo.rightAnswer}</div>
    </div>`;
  }

  return `<div class="modal">
    <div class="test-result">
      <div class="result-table">
        <div class="table-head">
          <div class="head-question">Question</div>
          <div class="head-answer">Your Answer</div>
          <div class="head-correct">Correct Answer</div>
        </div>
        ${tableRows}
      </div>
      <span class="result-mark">${Math.round(resultMark)}%</span>
    </div>
    <div class="result-form">
      <h2 class="form-title">Consider a subscribe</h2>
      <form action="https://formspree.io/f/xnqljvzg" method="POST">
        <input type="email" name="email" required id="result-input" placeholder="mail" />
        <label for="result-input"
          >Receive a message reminder every<br />time Dark Swan gets a new
          quiz.</label
        >
        <button class="result-button" type="submit">Confirm</button>
      </form>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="162"
        height="162"
        viewBox="0 0 162 162"
        fill="none"
      >
        <g id="circles">
          <path
            id="outer"
            d="M4.46801e-05 162C4.65399e-05 140.726 4.1903 119.66 12.3316 100.005C20.4728 80.3505 32.4057 62.4918 47.4488 47.4487C62.4918 32.4056 80.3506 20.4728 100.005 12.3315C119.66 4.19026 140.726 1.35653e-05 162 1.63551e-05L162 162L4.46801e-05 162Z"
          />
          <path
            id="inner"
            d="M46.2858 162C46.2858 146.804 49.2789 131.757 55.0941 117.718C60.9092 103.679 69.4327 90.9227 80.1778 80.1776C90.9228 69.4326 103.679 60.9091 117.718 55.0939C131.757 49.2787 146.804 46.2857 162 46.2857L162 162L46.2858 162Z"
          />
        </g>
      </svg>
      <button type="button" class="close-button">exit</button>
    </div>
  </div>`;
}
