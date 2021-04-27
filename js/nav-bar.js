{
  // DOM variables
  const navAside = document.querySelector('.nav-aside');
  const navButton = document.querySelector('.nav-open');
  const copyrights = document.querySelector('.nobr');

  // Functions
  function copyright(changeStr) {
    const value = copyrights.innerText;
    for (let i = 0; i < changeStr.length; i++) {
      setTimeout(() => {
        copyrights.innerText = changeStr.slice(0, i + 1) + value.slice(i + 1);
      }, i * 100);
    }
  }

  function navToggle() {
    const isActive = navAside.classList.contains('active');
    copyright(isActive ? 'c@f21 ' : 'copyri');
    navAside.classList.toggle('active');
  }

  // Listeners
  navButton.addEventListener('click', navToggle);
}
