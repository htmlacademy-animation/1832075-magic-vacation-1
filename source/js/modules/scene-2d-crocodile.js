import Animation from './animation.js';
import Scene2D from './scene-2d.js';
import _ from './utils.js';


const IMAGES_URLS = Object.freeze({
  key: `img/module-4/lose-images/key.png`,
  crocodile: `img/module-4/lose-images/crocodile.png`,
  drop: `img/module-4/lose-images/drop.png`,
  flamingo: `img/module-4/lose-images/flamingo.png`,
  leaf: `img/module-4/lose-images/leaf.png`,
  saturn: `img/module-4/lose-images/saturn.png`,
  snowflake: `img/module-4/lose-images/snowflake.png`,
  watermelon: `img/module-4/lose-images/watermelon.png`,
});

const OBJECTS = Object.freeze({
  key: {
    imageId: `key`,
    x: 50,
    y: 60,
    size: 15,
    opacity: 0,
    transforms: {
    }
  },
  crocodile: {
    imageId: `crocodile`,
    x: 49.5,
    y: 60,
    size: 68,
    opacity: 0,
    transforms: {
      translateX: 30,
      translateY: -15,
    },
  },
  drop: {
    imageId: `drop`,
    x: 48,
    y: 63,
    size: 2.5,
    opacity: 1,
    transforms: {
      scaleX: 0,
      scaleY: 0
    }
  },
  flamingo: {
    imageId: `flamingo`,
    x: 20,
    y: 50,
    size: 5,
    opacity: 0,
    transforms: {
      translateY: 10,
      translateX: 10,
      rotate: 30
    }
  },
  saturn: {
    imageId: `saturn`,
    x: 60,
    y: 60,
    size: 5,
    opacity: 0,
    transforms: {
      translateY: 0,
      translateX: 0,
      rotate: 30
    }
  },
  snowflake: {
    imageId: `snowflake`,
    x: 50,
    y: 65,
    size: 5,
    opacity: 0,
    transforms: {
      translateY: 0,
      translateX: 0,
      rotate: 30
    }
  },
  leaf: {
    imageId: `leaf`,
    x: 50,
    y: 45,
    size: 5,
    opacity: 0,
    transforms: {
      translateY: 0,
      translateX: 0,
      rotate: 30
    }
  },
  watermelon: {
    imageId: `watermelon`,
    x: 10,
    y: 80,
    size: 5,
    opacity: 0,
    transforms: {
      translateY: 0,
      translateX: 10,
      rotate: 30
    }
  },
});

const LOCALS = Object.freeze({
  mask: {
    centerX: 42.4,
    centerY: 44.5,
    radius: 9.1,
    endX: 87,
    endY: 53,
    startAngle: 270,
    endAngle: 48,
    opacity: 1,
    color: `#5f458c`,
    path: {
      x1: 48.5,
      y1: 51.3,
      x2: 51.5,
      y2: 66.5,
      x3: 51.5,
      y3: 81,
      x4: 92.4,
      y4: 81,
      x5: 87.4,
      y5: 35.45,
      x6: 42.4,
      y6: 35.45
    }
  }
});
export default class Scene2DCrocodile extends Scene2D {
  constructor() {
    const canvas = document.getElementById(`crocodile`);

    super({
      canvas,
      objects: OBJECTS,
      locals: LOCALS,
      imagesUrls: IMAGES_URLS,
    });

    this.initLocals();

    this.afterInit = () => {
      this.objects.flamingo.before = this.drawMask.bind(this);
    };

    this.initEventListeners();
    this.initObjects(OBJECTS);
    this.initLocals();
    this.start();
    this.updateSize();
  }


  initLocals() {
    this.locals = {
      ...LOCALS
    };
  }


  initEventListeners() {
    window.addEventListener(`resize`, this.updateSize.bind(this));
  }


  initAnimations() {
    this.animations.push(new Animation({
      func: () => {
        this.drawScene();
      },
      duration: `infinite`,
      fps: 60
    }));

    this.initKeyAnimations();
    this.initCrocodileAnimations();
    this.initDropAnimations();
    this.initFlamingoAnimations();
    this.initWatermelonAnimations();
    this.initSnowflakeAnimations();
    this.initLeafAnimations();
    this.initSaturnAnimations();
  }
  drawMask() {
    const b = this.locals.mask;
    const path = b.path;
    const s = this.size / 85;

    this.ctx.save();
    this.ctx.globalAlpha = b.opacity;
    this.ctx.fillStyle = b.color;

    this.ctx.beginPath();

    this.ctx.arc(
        b.centerX * s,
        b.centerY * s,
        b.radius * s,
        (Math.PI / 180) * b.startAngle,
        (Math.PI / 180) * b.endAngle,
    );

    this.ctx.moveTo(
        path.x1 * s,
        path.y1 * s
    );

    this.ctx.lineTo(
        path.x2 * s,
        path.y2 * s
    );
    this.ctx.lineTo(
        path.x3 * s,
        path.y3 * s
    );
    this.ctx.lineTo(
        path.x4 * s,
        path.y4 * s
    );
    this.ctx.lineTo(
        path.x5 * s,
        path.y5 * s
    );
    this.ctx.lineTo(
        path.x6 * s,
        path.y6 * s
    );

    this.ctx.fill();
    this.ctx.restore();
  }
  initKeyAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.key.opacity = progress;
        this.objects.key.size = this.objects.key.size + 0.5;
      },
      duration: 200,
      delay: 400,
      easing: _.easeInQuad,
    }))
  }

  initCrocodileAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;

        this.objects.crocodile.transforms.translateX =
          25 * progressReversed;
        this.objects.crocodile.transforms.translateY = -15 * progressReversed;
        this.objects.crocodile.opacity = progress;
        // this.ctx.restore();
      },
      duration: 600,
      delay: 1000,
      easing: _.easeInQuad,
    }))
  }
  initDropAnimations() {
    this.dropAnimations = [];
    this.dropAnimations.push(new Animation({
      func: (progress) => {
        const {transforms} = this.objects.drop;
        this.objects.drop.opacity = 1;
        transforms.scaleX = 1 * progress;
        transforms.scaleY = 1 * progress;
        transforms.translateX = -0.5 * progress;
      },
      duration: 600,
      delay: 1600
    }));
    this.dropAnimations.push(new Animation({
      func: (progress) => {
        const {transforms} = this.objects.drop;
        transforms.translateY = 7 * progress;
      },
      duration: 500,
      delay: 2200,
    }));
    this.dropAnimations.push(new Animation({
      func: (progress) => {
        const {transforms} = this.objects.drop;
        const progressReversed = 1 - progress;
        transforms.scaleX = (0.5 * progressReversed) + 0.5;
        transforms.scaleY = (0.5 * progressReversed) + 0.5;
        transforms.translateX = -0.5 * progressReversed;
        this.objects.drop.opacity = 1 * progressReversed;
      },
      duration: 200,
      delay: 2700,
    }));

    this.dropAnimations.push(new Animation({
      func: () => {
        const {transforms} = this.objects.drop;
        transforms.translateY = 0;
      },
      duration: 100,
      delay: 2900,
    }));

    this.dropAnimations.forEach((animation) => {
      animation.start();
    });

    setTimeout(() => {
      this.initDropAnimations();
    }, 3000);
  }

  initFlamingoAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;
        this.objects.flamingo.transforms.rotate =  30 * Math.sin(progressReversed * 2);
        this.objects.flamingo.transforms.translateY = 15 * progressReversed;
        this.objects.flamingo.transforms.translateX = 40 * progressReversed;
        this.objects.flamingo.size = this.objects.flamingo.size + 0.5;
        this.objects.flamingo.opacity = progress;
      },
      duration: 600,
      delay: 600,
      easing: _.easeOutQuad,
    }))
    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.flamingo.transforms.translateY = 100 * progress;
      },
      duration: 800,
      delay: 1200,
      easing: _.easeInCubic,
    }))
  }

  initWatermelonAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;
        this.objects.watermelon.transforms.rotate =  30 * Math.sin(progressReversed * 2);
        this.objects.watermelon.transforms.translateY = -15 * progressReversed;
        this.objects.watermelon.transforms.translateX = 40 * progressReversed;
        this.objects.watermelon.size = this.objects.watermelon.size + 0.5;
        this.objects.watermelon.opacity = progress;
      },
      duration: 600,
      delay: 600,
      easing: _.easeOutQuad,
    }))
    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.watermelon.transforms.translateY = 100 * progress;
      },
      duration: 800,
      delay: 1200,
      easing: _.easeInCubic,
    }))
  }

  initSnowflakeAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;
        this.objects.snowflake.transforms.rotate =  -30 * Math.sin(progressReversed * 2);
        this.objects.snowflake.transforms.translateY = -3 * progress;
        this.objects.snowflake.transforms.translateX = 25 * progress;
        this.objects.snowflake.size = this.objects.snowflake.size + 0.5;
        this.objects.snowflake.opacity = progress;
      },
      duration: 600,
      delay: 600,
      easing: _.easeOutQuad,
    }))
    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.snowflake.transforms.translateY = this.objects.snowflake.transforms.translateY + (20 * progress);
      },
      duration: 800,
      delay: 1200,
      easing: _.easeInCubic,
    }))
  }

  initLeafAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;
        this.objects.leaf.transforms.rotate =  -30 * Math.sin(progressReversed * 2);
        this.objects.leaf.transforms.translateY = -3 * progress;
        this.objects.leaf.transforms.translateX = 40 * progress;
        this.objects.leaf.size = this.objects.leaf.size + 0.5;
        this.objects.leaf.opacity = progress;
      },
      duration: 600,
      delay: 600,
      easing: _.easeOutQuad,
    }))
    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.leaf.transforms.translateY = 100 * progress;
      },
      duration: 800,
      delay: 1200,
      easing: _.easeInCubic,
    }))
  }

  initSaturnAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;
        this.objects.saturn.transforms.rotate =  -30 * Math.sin(progressReversed * 2);
        this.objects.saturn.transforms.translateY = 20 * progress;
        this.objects.saturn.transforms.translateX = 30 * progress;
        this.objects.saturn.size = this.objects.saturn.size + 0.5;
        this.objects.saturn.opacity = progress;
      },
      duration: 600,
      delay: 600,
      easing: _.easeOutQuad,
    }))
    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress
        this.objects.saturn.transforms.translateY = this.objects.saturn.transforms.translateY + (20 * progress);
      },
      duration: 800,
      delay: 1200,
      easing: _.easeInCubic,
    }))
  }
}