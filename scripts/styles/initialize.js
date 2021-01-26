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
`;