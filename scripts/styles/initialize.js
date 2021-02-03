import { css } from '../../modules/lit-element.js';
export const initialize = css`
  * {
    box-sizing: border-box;
  }

  img {
    max-width: 100%;
  }

  *::selection {
    background-color: var(--color-fg);
    color: var(--color-bg);
    -webkit-text-stroke-color: var(--color-bg);
  }

  a,
  a:visited {
    color: inherit;
    font-family: var(--font-title), sans-serif;
    font-weight: var(--font-medium-weight);
    text-decoration: none;
  }
`;