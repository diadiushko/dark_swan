{
  // DOM Variables
  const afterword = document.querySelector('.afterword-board');
  const aftWordText = afterword.querySelector('.afterword-content');
  const content = [
    ...'Feel free to communicate with me about',
    '<br/>',
    ...'this project, either now or after the quiz.',
    '<br/>',
    ...'Enjoy your programming time :)',
  ];

  // Functions
  function contentFiller(target, content) {
    [...content].forEach((e, i) => {
      setTimeout(() => {
        target.innerHTML += e;
      }, i * 15);
    });
  }

  function afterwordListener() {
    const currentY = window.pageYOffset;
    const fullHeight = window.innerHeight;
    if (currentY > fullHeight * 1.75) {
      afterword.classList.add('active');
      contentFiller(aftWordText, content);
      window.removeEventListener('scroll', afterwordListener);
    }
  }
  // Events
  window.addEventListener('scroll', afterwordListener);
}
