export default () => {
  let animElArr = document.querySelectorAll('.prizes__anim .prizes-val');
  let fps = 12;
  let step;

  document.addEventListener('DOMContentLoaded', hashHandler, false);
  window.addEventListener('hashchange', hashHandler, false);

  function hashHandler () {
    if (window.location.hash === '#prizes') {
      animElArr.forEach(function(item,i,arr) {
        let val = Number(item.textContent)
        if (Number(item.dataset.end) <= 10) {
          step = 1;
        } else {
          step = Math.round(Math.random() * (100 - 40) + 40);
        }
        animateVal(item, item.dataset.end, val, fps, step);
      })
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

