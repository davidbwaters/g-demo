/*
 *  Scripts - Utilities - Preload Images
 */
export function imagesPreload(imageUrls) {
  let images = [];
  let count = 0;
  imageUrls.forEach(url => {
    images[count] = new Image();
    images[count].src = url;
    count++;
  });
  return images;
}
export function imagesPreloadedCheck(imageEls, debug) {
  let loaded;
  imageEls.forEach(image => {
    if (image.complete) {
      loaded++;
    }
  });

  if (loaded === imageEls.length) {
    console.log('Loaded ' + loaded + ' Images');
    return true;
  }
}
export function imagesPreloadedCheckWait(imageEls, debug) {
  let loading = imagesPreloadedCheck(imageEls, debug);

  if (loading) {
    return true;
  } else {
    setTimeout(() => {
      return imagesPreloadedCheckWait(imageEls, debug);
    }, 200);
  }
}