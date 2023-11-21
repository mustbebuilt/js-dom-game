(() => {
  const startGameBtn = document.getElementById('startGameBtn');
  const playGround = document.querySelector('.playGround');
  const myTimer = document.querySelector('time');
  const myFound = document.getElementById('found');
  let numDots = 10;
  const dotSize = 20;
  let timePlayed = 0;
  let numFound = 0;
  let clockInterval;
  let isTouch = false;

  const myAnimation = [
    { transform: "scale(0)" },
    { transform: "scale(2)" },
    { transform: "scale(1)" },
  ];

  const myTiming = {
    duration: 1000,
  };

  isTouch = 'ontouchstart' in window;

    const placeDots = () => {
    for (let i = 0; i < numDots; i++) {
      const newDot = document.createElement('div');
      newDot.setAttribute('class', 'dot');
      let dotTop = Math.random() * (playGround.offsetHeight - dotSize);
      let dotLeft = Math.random() * (playGround.offsetWidth - dotSize);

      if (dotTop < dotSize) {
        dotTop += dotSize;
      }
      if (dotLeft < dotSize) {
        dotLeft += dotSize;
      }

      playGround.appendChild(newDot);
      newDot.style.top = dotTop + 'px';
      newDot.style.left = dotLeft + 'px';

      const randomDelay = Math.random() * 2;
      newDot.style.animationDelay = randomDelay + 's';

      newDot.style.setProperty("--transform-size", 1 + Math.random() * 4);

      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      newDot.style.setProperty("background", `rgba(${r},${g},${b},1)`);

      if (b % 2 === 0) {
        newDot.setAttribute('class', 'dot repeater');
      }

      isTouch ? newDot.addEventListener('touchstart', dotClick) : newDot.addEventListener('click', dotClick);
    }
  };

  const startGame = (ev) => {
    ev.target.setAttribute('disabled', 'disabled');
    myTimer.removeAttribute('class');
    myFound.removeAttribute('class');
    timePlayed = 0;
    numFound = 0;
    myFound.innerHTML = numFound;
    clockInterval = setInterval(clockCount, 10);
    placeDots();
  };

const dotClick = (ev) => {
  const dotElement = ev.target;

  if (dotElement.getAttribute('class') === 'dot repeater') {
    const dotTop = Math.random() * (playGround.offsetHeight - dotSize);
    const dotLeft = Math.random() * (playGround.offsetWidth - dotSize);

    dotElement.style.top = dotTop + 'px';
    dotElement.style.left = dotLeft + 'px';
    dotElement.style.setProperty("--transform-size", 1 + Math.random() * 3);
    dotElement.setAttribute('class', 'dot');
    dotElement.animate(myAnimation, myTiming);
  } else {
    playGround.removeChild(dotElement);
    numFound++;

    if (numFound === numDots) {
      endGame();
    }

    myFound.innerHTML = numFound;
  }
};


  const endGame = () => {
    clearInterval(clockInterval);
    myTimer.setAttribute('class', 'finished');
    myFound.setAttribute('class', 'finished');
    startGameBtn.removeAttribute('disabled');
  };

  const clockCount = () => {
    timePlayed++;
    const seconds = parseInt(timePlayed / 100);
    let centisecond = timePlayed % 100;
    centisecond = centisecond < 10 ? "0" + centisecond : centisecond;
    const displayTime = seconds + ":" + centisecond;
    myTimer.innerHTML = displayTime;
  };

  startGameBtn.addEventListener('click', startGame);
})();
