{
  // DOM Variables
  const descButtons = document.querySelectorAll('.desc-button');
  const cards = document.querySelectorAll('.desc-card');
  const titles = document.querySelectorAll('.card-title h2');

  const titlesText = ['Try it out', 'new quiz every month', 'absolutely free'];
  // Functions
  function buttonListener(event) {
    const cardIndex = event.target.dataset.desc;
    const currentCard = cards[cardIndex];
    const currentCardTitle = titles[cardIndex];
    const title = titlesText[cardIndex];
    [...title].forEach((e, i) => {
      setTimeout(() => {
        currentCardTitle.textContent += e;
      }, i * 30);
    });

    currentCard.classList.add('active');
  }

  // Events
  descButtons.forEach((button) => {
    button.addEventListener('click', buttonListener);
  });
}
