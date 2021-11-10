export default () => {
  let animEl = document.querySelector('.prizes__anim .prizes-val');
  let fps = 12;
  let step = Number(animEl.dataset.step);
  let val = Number(animEl.textContent);

  document.addEventListener('DOMContentLoaded', hashHandler, false);
  window.addEventListener('hashchange', hashHandler, false);

  function hashHandler () {
    if (window.location.hash === '#prizes') {
      animateVal(animEl, animEl.dataset.end, val, fps, step);
    }
  }

  function animateVal(el, maxVal, counter, fps, step ) {
    el.innerHTML = counter;

    let animTimer = setInterval(() => {
      counter = counter + step;

      if (counter >= maxVal) {
        clearInterval(animTimer);
        counter = maxVal;
      }

      requestAnimationFrame(() => {
        el.innerHTML = counter;
      });
    }, 1000 / fps);
  }
}

