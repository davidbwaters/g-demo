import { css } from '../../modules/lit-element.js';
export const logoResponsive = css`
  .c-logo-responsive {
    align-content: center;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 100%;
    min-width: 2.2rem;
    position: relative;
  }

  .c-logo-responsive::after {
    background-image: var(--logo-small);
    background-repeat: no-repeat;
    content: '';
    display: block;
    padding-bottom: calc(
      100% * var(--logo-small-height) / var(--logo-small-width)
    );
    width: 100%;
  }

  .c-logo-responsive--light::after {
    background-image: var(--logo-small-light);
  }

  @media (min-width:20em) {

    .c-logo-responsive {
      min-width: 4rem;
    }

    .c-logo-responsive::after {
      background-image: var(--logo-medium);
      padding-bottom: calc(
        100% *
        var(--logo-medium-height) / var(--logo-medium-width)
      );
    }

    .c-logo-responsive--light::after {
      background-image: var(--logo-medium-light);
    }

  }

  .c-logo-responsive a {
    height: 100%;
    position: absolute;
    width: 100%;
  }
`;