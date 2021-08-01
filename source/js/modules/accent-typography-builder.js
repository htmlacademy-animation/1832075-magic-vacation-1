export default class AccentTypographyBuild {
  constructor(
      elementSelector,
      timer,
      classForActivate,
      property,
      delay = 0,
      timeOffsetDelta = 50
  ) {
    this.TIME_SPACE = 100;

    this.elementSelector = elementSelector;
    this.timer = timer;
    this.classForActivate = classForActivate;
    this.property = property;

    if (typeof this.elementSelector === `string`) {
      this.element = document.querySelector(this.elementSelector);
    } else {
      this.element = this.elementSelector;
    }

    this.timeOffset = 250;
    this.timeOffsetDelta = timeOffsetDelta;
    this.delay = delay;

    this.prepareText(timeOffsetDelta);
  }


  createElement(letter, delta, index) {
    const span = document.createElement(`span`);
    index = index + 1;
    span.textContent = letter;
    span.style.transition = this.getTransition();

    this.timeOffset = 200;
    if (index % 4 == 0 && index >= 4) {
      this.timeOffset = 250;
    } else if (index % 2 == 0 && index >= 2) {
      this.timeOffset = 150;
    } else if (index % 3 == 0 && index >= 3) {
      this.timeOffset = 200;
    } else if (index % 5 == 0 && index >= 5) {
      this.timeOffset = 300;
    } 
   
    return span;
  }


  getTransition() {
    return `${this.property} ${this.timer}ms ease ${this.delay + this.timeOffset}ms`;
  }


  prepareText(delta) {
    if (!this.element) {
      return;
    }

    const text = this.element.textContent.trim().split(/[\s]+/);

    const {length} = text;
    const content = text.reduce((fragmentParent, word, index) => {
      const wordElement = Array.from(word).reduce((fragment, letter, index) => {
        fragment.appendChild(this.createElement(letter, delta, index));
        return fragment;
      }, document.createDocumentFragment());

      const wordContainer = document.createElement(`span`);

      wordContainer.classList.add(`slogan__word`);
      wordContainer.appendChild(wordElement);
      fragmentParent.appendChild(wordContainer);

      // Add Space text node:
      if (index < length - 1) fragmentParent.appendChild(document.createTextNode(` `));

      return fragmentParent;
    }, document.createDocumentFragment());

    this.element.innerHTML = ``;
    this.element.appendChild(content);
  }


  clearStyle() {
    const spans = [...this.element.querySelectorAll(`.slogan__word span`)];

    spans.forEach((span) => {
      span.removeAttribute('style');
    });
  }


  addStyle(delta) {
    this.timeOffset = 0;
    delta = (typeof delta !== `number`) ? this.timeOffsetDelta : delta;

    const words = [...this.element.querySelectorAll(`.slogan__word`)];

    words.forEach((word) => {
      [...word.querySelectorAll(`span`)].forEach((span) => {
        span.style.transition = this.getTransition();
        this.timeOffset += delta;
      });
    });
  }


  runAnimation() {
    if (!this.element) {
      return;
    }

    this.element.classList.add(this.classForActivate);
  }

  destroyAnimation() {
    this.element.classList.remove(this.classForActivate);
  }
}
  
const animationTopScreenSliderTitle = new AccentTypographyBuild(`.screen--story .slider__item-title`, 500, `active`, `transform`);
const animationTopScreenIntroTitle = new AccentTypographyBuild(`.screen--intro .intro__title`, 500, `active`, `transform`);
const animationScreenIntroDate = new AccentTypographyBuild('.screen--intro .intro__date', 500, 'active', 'transform');
const animationTopScreenPrizesTitle = new AccentTypographyBuild(`.screen--prizes .prizes__title`, 500, `active`, `transform`);
const animationTopScreenRulesTitle = new AccentTypographyBuild(`.screen--rules .rules__title`, 500, `active`, `transform`);
const animationTopScreenGameTitle = new AccentTypographyBuild('.screen--game .game__title', 500, 'active', 'transform');


setTimeout(() => {
  animationTopScreenSliderTitle.runAnimation();
  animationTopScreenIntroTitle.runAnimation();
  animationScreenIntroDate.runAnimation();
  animationTopScreenPrizesTitle.runAnimation();
  animationTopScreenRulesTitle.runAnimation();
  animationTopScreenGameTitle.runAnimation();
}, 500);