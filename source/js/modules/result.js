import Scene2DSeaCalf from './scene-2d-sea-calf.js';

export default () => {
  let showResultEls = document.querySelectorAll(`.js-show-result`);
  let results = document.querySelectorAll(`.screen--result`);
  let animationFail = document.querySelectorAll('#svg-fail animate')
  let pathFail = document.querySelectorAll('#svg-fail path');
  if (results.length) {
    for (let i = 0; i < showResultEls.length; i++) {
      showResultEls[i].addEventListener(`click`, function () {
        let target = showResultEls[i].getAttribute(`data-target`);
        [].slice.call(results).forEach(function (el) {
          el.classList.remove(`screen--show`);
          el.classList.add(`screen--hidden`);
        });
        let targetEl = [].slice.call(results).filter(function (el) {
          return el.getAttribute(`id`) === target;
        });
        targetEl[0].classList.add(`screen--show`);
        targetEl[0].classList.remove(`screen--hidden`);
        if (results[2].classList.contains('screen--show')) {
          let delay = 0;
          for (let j = 0; j < animationFail.length; j++) {
            delay = delay + 0.05
            animationFail[j].beginElement(delay);
          }
        }
        if (results[0].classList.contains('screen--show')) {
          const scene = new Scene2DSeaCalf();
        }
      });
    }

    let playBtn = document.querySelector(`.js-play`);
    if (playBtn) {
      playBtn.addEventListener(`click`, function () {
        [].slice.call(results).forEach(function (el) {
          el.classList.remove(`screen--show`);
          el.classList.add(`screen--hidden`);
        });
        document.getElementById(`messages`).innerHTML = ``;
        document.getElementById(`message-field`).focus();
      });
    }
  }
};
