/*!
 * scrollBehavior.js 1.0
 * https://github.com/dagrox/scrollBehavior.js
 *
 * @license GPLv3 for open source use only
 *
 * Copyright (C) 2022 https://github.com/dagrox/ - made with ❤️ by Daniel Grohmann
 */
function ScrollBehavior(container, settings) {
  // Check type of Argument "container", for selecting nodes
  const containerElement = typeof container === 'string' ? document.querySelector(container) : container;
  const html = document.querySelector('html');
  let windowWidth = containerElement.parentElement.clientWidth;
  let windowHeight = containerElement.parentElement.clientHeight;
  const slides = containerElement.querySelectorAll('section');
  const numberOfSlides = slides.length;
  let activeSlide;
  let autoSlideInterval;
  let nextButtons;
  let prevButtons;
  let currentSlidePosition = 0;
  const scrollTimeoutRefresh = 1500;

  // Mobile Variables
  const isTouchDevice = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/);
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  const defaultSetting = {
    autoInit: true,
    mode: 'vertical',
    activeClass: 'current-slide',
    scrollSpeed: 500,
    autoScroll: false,
    autoScrollSpeed: 3000,
    keyboardScrolling: false,
    arrows: {
      enabled: true,
      prev: {
        // CSS-Selector
        selector: '.nav-arrows__prev',
      },
      next: {
        // CSS-Selector
        selector: '.nav-arrows__next',
      },
    },
  };

  settings = createSettings(defaultSetting, settings);

  this.initialize = () => {
    if (!container) {
      return false;
    }

    this.numberingSlides();
    this.setActiveSlide(containerElement.querySelector('section'));
    this.prepareContainer();
    this.updateOnResize();
    this.setDeviceClass();

    if (settings.arrows.enabled) {
      this.prepareControls();
    }

    if (settings.keyboardScrolling) {
      this.triggerKeyboardScroll();
    }

    if (settings.autoScroll) {
      this.triggerAutoScroll();
    }

    // trigger events for mobile devices
    if ('ontouchstart' in window) {
      this.triggerOnTouchEvents();
    }
  };

  this.setDeviceClass = () => {
    html.classList.add(isTouchDevice ? 'is-touch' : 'is-desktop');
  };

  this.triggerOnTouchEvents = () => {
    containerElement.addEventListener('touchstart', (event) => {
      touchStartX = event.changedTouches[0].screenX;
      touchStartY = event.changedTouches[0].screenY;
    });

    containerElement.addEventListener('touchend', (event) => {
      touchEndX = event.changedTouches[0].screenX;
      touchEndY = event.changedTouches[0].screenY;
      this.handleGesture();
    });
  };

  this.handleGesture = () => {
    const touchLengthX = Math.abs(touchStartX - touchEndX);
    const touchLengthY = Math.abs(touchStartY - touchEndY);

    if (touchLengthX > touchLengthY) {
      if (touchStartX < touchEndX) {
        this.scrollToSlide(activeSlide.previousElementSibling);
      } else {
        this.scrollToSlide(activeSlide.nextElementSibling);
      }
    } else if (touchLengthX < touchLengthY) {
      if (touchStartY < touchEndY) {
        this.scrollToSlide(activeSlide.previousElementSibling);
      } else {
        this.scrollToSlide(activeSlide.nextElementSibling);
      }
    }
  };

  // Set global variable active Slide
  this.setActiveSlide = (newActiveSlide) => {
    if (activeSlide) {
      activeSlide.classList.remove(settings.activeClass);
      activeSlide = null;
    }

    if (newActiveSlide) {
      newActiveSlide.classList.add(settings.activeClass);
      activeSlide = newActiveSlide;
    }
  };

  // Numbering slides
  this.numberingSlides = () => {
    for (let i = 0; i < numberOfSlides; i++) {
      slides[i].setAttribute('data-slide', i + 1);
    }
  };

  // Check mode of object and trigger vertical or horizontal function
  this.prepareContainer = () => {
    if (settings.mode === 'horizontal') {
      containerElement.classList.add('-scroll-horizontal');
      containerElement.style.width = `${100 * numberOfSlides}%`;
      containerElement.addEventListener('wheel', this.horizontalWheelEvent, false);
    } else if (settings.mode === 'vertical') {
      containerElement.classList.add('-scroll-vertical');
      containerElement.style.height = `${100 * numberOfSlides}%`;
      containerElement.addEventListener('wheel', this.verticalWheelEvent, false);
    } else {
      console.error("Setting Mode is NOT set. Set it to 'vertical' or 'horizontal'.");
      return false;
    }
  };

  this.horizontalWheelEvent = (event) => {
    containerElement.removeEventListener('wheel', this.horizontalWheelEvent, false);

    // event.deltaY < 0 means, that the user is scrolling up
    targetSlide = event.deltaY < 0 ? activeSlide.previousElementSibling : activeSlide.nextElementSibling;
    this.scrollToSlide(targetSlide);
    if (settings.autoScroll) {
      this.triggerAutoScroll();
    }

    slideTimeout = setTimeout(() => {
      containerElement.addEventListener('wheel', this.horizontalWheelEvent, false);
    }, scrollTimeoutRefresh);
  };

  this.verticalWheelEvent = () => {
    containerElement.removeEventListener('wheel', this.verticalWheelEvent, false);

    // event.deltaY < 0 means, that the user is scrolling up
    targetSlide = event.deltaY < 0 ? activeSlide.previousElementSibling : activeSlide.nextElementSibling;
    this.scrollToSlide(targetSlide);
    if (settings.autoScroll) {
      this.triggerAutoScroll();
    }

    slideTimeout = setTimeout(() => {
      containerElement.addEventListener('wheel', this.verticalWheelEvent, false);
    }, scrollTimeoutRefresh);
  };

  // targetSlide as element or string/number of data-slide attribute
  this.scrollToSlide = (targetSlide) => {
    containerElement.style.transition = `transform ${settings.scrollSpeed}ms ease 0ms`;
    targetSlide = typeof targetSlide === 'string' || typeof targetSlide === 'number' 
    ? containerElement.querySelector(`section[data-slide='${targetSlide}']`) : targetSlide;
    if (targetSlide) {
      currentSlidePosition = targetSlide.getAttribute('data-slide') === 1 ? 0 : parseInt(targetSlide.getAttribute('data-slide')) - 1;
      if (settings.mode === 'horizontal') {
        containerElement.style.transform = `translate(-${currentSlidePosition * windowWidth}px, 0)`;
      } else if (settings.mode === 'vertical') {
        containerElement.style.transform = `translate(0, -${currentSlidePosition * windowHeight}px)`;
      }
      this.setActiveSlide(targetSlide);
      if (settings.arrows.enabled) {
        this.updateArrowStatus();
      }
    }
  };

  // Search for given selectors and add Click-Event
  this.prepareControls = () => {
    nextButtons = typeof settings.arrows.next.selector === 'string' ? document.querySelectorAll(settings.arrows.next.selector) : null;
    prevButtons = typeof settings.arrows.prev.selector === 'string' ? document.querySelectorAll(settings.arrows.prev.selector) : null;
    if (nextButtons) {
      nextButtons.forEach((buttonNext) => {
        buttonNext.addEventListener('click', () => {
          this.scrollToSlide(activeSlide.nextElementSibling);
          if (settings.autoScroll) {
            this.triggerAutoScroll();
          }
        });
      });
    }
    if (prevButtons) {
      prevButtons.forEach((buttonPrev) => {
        buttonPrev.addEventListener('click', () => {
          this.scrollToSlide(activeSlide.previousElementSibling);
          if (settings.autoScroll) {
            this.triggerAutoScroll();
          }
        });
      });
    }
  };

  // Set prev/next button on disabled, if there is no next slide
  this.updateArrowStatus = () => {
    nextButtons.forEach((buttonNext) => {
      if (!activeSlide.nextElementSibling) {
        buttonNext.classList.add('-disabled');
      } else {
        buttonNext.classList.remove('-disabled');
      }
    });

    prevButtons.forEach((buttonPrev) => {
      if (!activeSlide.previousElementSibling) {
        buttonPrev.classList.add('-disabled');
      } else {
        buttonPrev.classList.remove('-disabled');
      }
    });
  };

  // Update width of slides on resize
  this.updateOnResize = () => {
    window.addEventListener('resize', () => {
      windowWidth = html.clientWidth;
      windowHeight = html.clientHeight;
      this.scrollToSlide(activeSlide);
    });
  };

  this.triggerKeyboardScroll = () => {
    document.addEventListener('keydown', (event) => {
      if (
        (event.key === 'ArrowRight' || event.key === 'ArrowDown') &&
        settings.keyboardScrolling
      ) {
        this.scrollToSlide(activeSlide.nextElementSibling);
        if (settings.autoScroll) {
          this.triggerAutoScroll();
        }
      }

      if (
        (event.key === 'ArrowLeft' || event.key === 'ArrowUp') &&
        settings.keyboardScrolling
      ) {
        this.scrollToSlide(activeSlide.previousElementSibling);
        if (settings.autoScroll) {
          this.triggerAutoScroll();
        }
      }
    });
  };

  this.triggerAutoScroll = () => {
    clearInterval(autoSlideInterval);
    autoSlideInterval = null;
    autoSlideInterval = setInterval(() => {
      if (settings.autoScroll) {
        if (activeSlide.nextElementSibling) {
          this.scrollToSlide(activeSlide.nextElementSibling);
        } else {
          this.scrollToSlide(1);
        }
        this.triggerAutoScroll();
      }
    }, settings.autoScrollSpeed);
  };


  // auto execute init function
  if (settings.autoInit) {
    this.initialize();
  }
}

// Match the given object with the default values.
function createSettings(out) {
  out = out || {};

  for (let i = 1; i < arguments.length; i++) {
    const obj = arguments[i];

    if (!obj) continue;

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object' && obj[key] != null)
          out[key] = createSettings(out[key], obj[key]);
        else out[key] = obj[key];
      }
    }
  }

  return out;
}
