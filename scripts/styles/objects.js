/*
 *  Scripts - Styles - Objects
 */
import { css } from '../../modules/lit-element.js';
export const objects = css`

  /* Media Block */

  .o-media-block {
    align-content: center;
    column-gap: 0rem;
    display: grid;
    grid-template-columns: 90%;
    justify-content: center;
    row-gap: 3rem;
  }

  .o-media-block--narrow {
    grid-template-columns: 80%;
  }

  .o-media-block__item {
    align-content: start;
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: 1fr;
    justify-content: center;
    row-gap: 1rem;
  }

  .o-media-block--content-spacing-flush
    .o-media-block__item {
    row-gap: 0rem;
  }

  .o-media-block--content-spacing-large
    .o-media-block__item {
    row-gap: 2rem;
  }

  /* Variants */

  @media(min-width: 40em) {

    .o-media-block--split  {
      grid-template-columns:
        calc(45% - 3rem)
        calc(45% - 3rem);
    }

  }

  @media(min-width: 70em) {

    .o-media-block--split  {
      grid-template-columns:
        minmax( calc(40% - 3rem), 27rem )
        minmax( calc(40% - 3rem), 27rem );
    }

  }

  .o-media-block--split,
  .o-media-block--split-flush-end,
  .o-media-block--split-flush-start {
    column-gap: 2rem;
  }

  .o-media-block--split-flush-end,
  .o-media-block--split-flush-start {
    grid-template-columns: 1fr;
  }

  @media(min-width: 40em) {

    .o-media-block--split-flush-end {
      grid-template-columns:
        calc(45% - 3rem)
        50%;
      justify-content: end;
    }

  }

  @media(min-width: 70em) {

    .o-media-block--split-flush-end {
      grid-template-columns:
        minmax( calc(40% - 3rem), 27rem )
        50%;
    }

  }

  .o-media-block--split-flush-start {
    grid-template-columns: 1fr
  }

  @media(min-width: 40em) {

    .o-media-block--split-flush-start {
      grid-template-columns:
        50%
        calc(45% - 3rem);
      justify-content: start;
    }

  }

  @media(min-width: 70em) {

    .o-media-block--split-flush-start {
      grid-template-columns:
        50%
        minmax( calc(40% - 3rem), 20rem );
    }

  }

  .o-media-block--split-flush-end
    .o-media-block__item:first-child{
    padding-left: 10%;
    padding-right: 10%;
  }

  @media(min-width: 40em) {

    .o-media-block--split-flush-end
    .o-media-block__item:first-child{
      padding-left: 0%;
      padding-right: 0%;
    }

  }

  .o-media-block--split-flush-start
    .o-media-block__item:last-child{
      padding-left: 10%;
      padding-right: 10%;
  }

  @media(min-width: 40em) {

    .o-media-block--split-flush-start
    .o-media-block__item:last-child{
      padding-left: 0%;
      padding-right: 0%;
    }

  }

  /* Blocks */

  .o-block {
    align-content: start;
    column-gap: 0rem;
    display: grid;
    grid-template-columns: calc(90% - 2rem);
    justify-content: center;
    row-gap: 4rem;
  }

  @media(min-width: 40em) {

    .o-block {
      grid-template-columns: calc(90% - 2rem);
    }

  }

  @media(min-width: 70em) {

    .o-block {
      grid-template-columns: minmax(90%, 58rem);
    }

  }

  @media(min-width: 40em) {

    .o-block--narrow {
      grid-template-columns: calc(70% - 2rem);
    }

  }

  @media(min-width: 40em) {

    .o-block--half {
      grid-template-columns: calc(.5fr - 1rem);
      margin-left: auto;
      margin-right: auto;
      max-width: 58rem;
      padding-left: 10%;
      padding-right: 10%;
      width: 100%;
    }

  }

  @media(min-width: 70em) {

    .o-block--half {
      grid-template-columns: minmax(50%, 28rem);
    }

  }

  .o-block--narrow {
    grid-template-columns: 80%;
  }


  /* Spaced Rows */

  .o-space-rows {
    align-content: start;
    display: grid;
    row-gap: 3rem;
  }

  .o-spaced-columns {
    align-content: start;
    display: grid;
    row-gap: 3rem;
  }


  /* Section Block */

  .o-section-block {
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: 1fr;
    padding-top: 4rem;
    padding-bottom: 4rem;
    row-gap: 3rem;
  }

  @media(min-width: 40em) {

    .o-section-block {
      padding-top: 6rem;
      padding-bottom: 6rem;
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

  .o-section-block--flush-top {
    padding-top: 0rem;
  }
  .o-section-block--flush-bottom {
    padding-bottom: 0rem;
  }
`;