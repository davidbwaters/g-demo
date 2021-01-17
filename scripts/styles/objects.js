/*
 *  Scripts - Styles - Objects
 */
import { css } from '../../modules/lit-element.js';
export const objects = css`

  /* Media Block */

  .o-media-block {
    align-content: start;
    column-gap: 0rem;
    display: grid;
    grid-template-columns: 90%;
    justify-content: center;
    row-gap: 2rem;
  }

  .o-media-block--spaced-mobile {
    grid-template-columns: 80%;
  }

  @media(min-width: 40em) {

    .o-media-block {
      column-gap: 0rem;
      grid-template-columns: minmax(calc(80% - 2rem), 58rem);
      column-gap: 0rem;
    }

  }

  .o-media-block__item {
    align-content: start;
    display: grid;
    grid-auto-flow: row;
    row-gap: 2rem;
  }

  /* Variants */

  @media(min-width: 40em) {

    .o-media-block--split  {
      grid-template-columns:
        minmax( calc(40% - 3rem), 28rem )
        minmax( calc(40% - 3rem), 28rem );
    }

  }

  .o-media-block--split-,
  .o-media-block--split-flush-end,
  .o-media-block--split-flush-start {
    grid-gap: 2rem;
  }

  @media(min-width: 40em) {

    .o-media-block--split-flush-end {
      grid-template-columns:
        calc(45% - 4rem)
        50%;
      justify-content: end;
    }

  }

  @media(min-width: 40em) {

    .o-media-block--split-flush-end {
      grid-template-columns:
        calc(40% - 4rem)
        50%;
      justify-content: end;
    }

  }

  @media(min-width: 60em) {

    .o-media-block--split-flush-end {
      grid-template-columns:
        minmax( calc(40% - 2rem), 20rem )
        50%;
      justify-content: end;
    }

  }


  /* Spaced Rows */

  .o-space-rows {
    align-content: start;
    display: grid;
    row-gap: 2rem;
  }

  .o-spaced-columns {
    align-content: start;
    display: grid;
    row-gap: 2rem;
  }


  /* Section Block */

  .o-section-block {
    display: grid;
    grid-auto-flow: row;
    padding-top: 3rem;
    padding-bottom: 3rem;
    row-gap: 2rem;
  }

  @media(min-width: 40em) {

    .o-section-block {
      padding-top: 4rem;
      padding-bottom: 4rem;
    }

  }

  .o-section-block--top {

    padding-top: calc(
      var(--navbar-height) + 4rem
    );


  }

  @media(min-width: 40em) {

    .o-section-block--top {
      padding-top: calc(
        var(--navbar-height) + 6rem
      );
    }

  }

`;