export default () => {
  let screenGame = document.querySelector(`.screen--game`);
  let timerInit = false;
  let animateInterval;

  document.addEventListener('DOMContentLoaded', hashHandler, false);
  window.addEventListener('hashchange', hashHandler, false);
  document.querySelector('.result__button.js-play').addEventListener('click', function () {
    clearTimer();
    initTimer();
  })

  function hashHandler () {
    if (window.location.hash === '#game') {
      let screensResults = document.querySelectorAll('.screen--result');
      for (let i = 0; i < screensResults.length; i++) {
        if (screensResults[i].classList.contains('screen--show')) {
          return false;
        }
      }
      if (!timerInit) {
        initTimer();
      }
    }
  }

  function initTimer() {
    startTime();
    timerInit = true;
  }

  function startTime() {
    let date = new Date();
    let counter = document.querySelector('.game__counter');

    animate(date.getTime(), 300, counter);
  }

  function animate(startDate, time, counter) {
    let nowDate;
    console.log(counter)
    animateInterval = setInterval(function() {
      nowDate = new Date().getTime();
      let totalTime =  Math.round(time - ((nowDate - startDate) / 1000));

      if (totalTime <= 0) {
        window.clearInterval(animateInterval);
        document.querySelector('.game__counter').innerHTML = `00:00`
      } else {
        requestAnimationFrame(function () {
          counter.innerHTML = formatText(totalTime);
        });
      }
    }, 1000)
  }

  function formatText(text) {
    let min = Math.floor( (text / 60) % 60 );
    let sec = Math.floor( text % 60 );
    if (sec < 10) {
      sec = `0${sec}`
    }

    return `0${min}:${sec}`;
  }

  function clearTimer() {
    console.log('clear int')
    window.clearInterval(animateInterval);
    document.querySelector('.game__counter').innerHTML = `05:00`
  }
};
