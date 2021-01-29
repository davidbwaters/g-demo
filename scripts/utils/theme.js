/*
 *  Scripts - Utilities - Theme Utilites
 */
export const getColor = color => {
  const colorValue = color.toLowerCase();
  let colorProperty;

  if (colorValue.startsWith('dark')) {
    colorProperty = 'color-subtle-dark-' + colorValue.slice(4, 5);
  } else if (colorValue.startsWith('light')) {
    colorProperty = 'color-subtle-light-' + colorValue.slice(5, 6);
  } else {
    colorProperty = 'color-gw-' + colorValue;
  }

  return 'var(--' + colorProperty + ')';
};
export const getForegroundColor = color => {
  const colorValue = color.toLowerCase();
  let textColor;

  if (colorValue === 'gray' || colorValue === 'blue' || colorValue === 'red' || colorValue === 'green' || colorValue === 'dark1' || colorValue === 'dark2' || colorValue === 'dark3' || colorValue === 'dark4') {
    textColor = 'color-fg-inverse-contrast';
  } else {
    textColor = 'color-fg';
  }

  return 'var(--' + textColor + ')';
};