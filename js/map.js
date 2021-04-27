{
  // DOM Variables
  const mapDots = document.querySelectorAll('.dot');
  const mainHeight = document.querySelector('main').offsetHeight;

  // Variables
  const sectionHeight = document.querySelector('section').offsetHeight;

  // Scroll Position Replication
  window.addEventListener('scroll', () => {
    //   DOM Variables
    const line = document.querySelector('.pink');

    // Map Line Height
    const currentY = window.pageYOffset;
    const fullHeigth = mainHeight - sectionHeight;
    line.style.height = `calc(${(currentY * 100) / fullHeigth}% - 15px)`;

    // Active Dot
    const activeDot = Math.floor(currentY / sectionHeight + 0.5);
    mapDots.forEach((e) => e.classList.remove('active'));
    mapDots[activeDot].classList.add('active');
  });

  // Map Dot Scroll
  mapDots.forEach((e) => {
    e.addEventListener('click', (event) => {
      const scroll = event.target.dataset.map * sectionHeight;
      window.scrollTo({
        top: scroll,
        behavior: 'smooth',
      });
    });
  });
}
