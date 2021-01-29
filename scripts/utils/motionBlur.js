/*
 *  Scripts - Utilities - Motion Blur
 */
export function motionBlur(filter, ammount = 12, throttle = 5) {
  let start = ammount;
  let currentTime;

  const blur = time => {
    if (start >= 0) {
      window.requestAnimationFrame(time => {
        if (time - currentTime > throttle) {
          filter.querySelector('feGaussianBlur').setAttribute('stdDeviation', start + ',0');
          currentTime = time;
          start--;
        }

        if (!currentTime) {
          filter.setAttribute('stdDeviation', start + ',0');
          currentTime = time;
        }

        blur();
      });
    }
  };

  blur();
}
export function motionBlurReverse(filter, ammount = 12, throttle = 5) {
  let start = 0;
  let currentTime;

  const blur = time => {
    if (start <= ammount) {
      window.requestAnimationFrame(time => {
        if (time - currentTime > throttle) {
          filter.querySelector('feGaussianBlur').setAttribute('stdDeviation', start + ',0');
          currentTime = time;
          start++;
        }

        if (!currentTime) {
          filter.setAttribute('stdDeviation', start + ',0');
          currentTime = time;
        }

        blur();
      });
    }
  };

  blur();
}