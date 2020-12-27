/*
 *  Scripts - Utilities - Motion Blur
 */
export const motionBlur = (filter, ammount = 15, throttle = 25) => {
  let start = ammount;
  let currentTime;

  const blur = time => {
    if (start >= 0) {
      window.requestAnimationFrame(time => {
        if (time - currentTime > throttle) {
          filter.setAttribute('stdDeviation', start + ',0');
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
};