{
  const delay = () => Math.floor(Math.random() * 15 + 5) * 1000;

  const randomOffset = () => Math.floor(Math.random() * 75);

  (function comet() {
    const rocket = document.createElement('img');
    const wrapper = document.createElement('div');
    const main = document.querySelector('main');
    wrapper.classList.add('rocket-wrap');
    rocket.classList.add('rocket');
    rocket.src = `images/meteor${Math.ceil(Math.random() * 3)}.svg`;
    rocket.style.right = `${randomOffset()}%`;
    rocket.style.top = `${window.pageYOffset}px`;

    main.append(wrapper);
    wrapper.append(rocket);

    rocket.addEventListener('animationend', (e) => {
      e.target.parentNode.remove();
      e.target.remove();
    });

    setTimeout(comet, delay());
  })();
}
