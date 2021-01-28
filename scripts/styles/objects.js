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

  .o-media-block--align-stretch {
    align-content: stretch;
  }

  .o-media-block--narrow {
    grid-template-columns: 80%;
  }

  @media(min-width: 70em) {

    .o-media-block--narrow  {
      grid-template-columns: 48rem;
    }

  }

  .o-media-block__item {
    align-content: start;
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: 1fr;
    justify-content: center;
    row-gap: .5rem;
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

  .o-media-block--split  {
    column-gap: 4rem;
  }

  @media(min-width: 40em) {

    .o-media-block--split  {
      grid-template-columns:
        calc(45% - 4rem)
        calc(45% - 4rem);
    }

  }

  @media(min-width: 70em) {

    .o-media-block--split  {
      grid-template-columns: 27rem 27rem;
    }

  }

  .o-media-block--split-flush-end,
  .o-media-block--split-flush-start {
    column-gap: 2rem;
    grid-template-columns: 1fr;
  }

  @media(min-width: 40em) {

    .o-media-block--split-flush-end {
      column-gap: 3rem;
      grid-template-columns:
        calc(45% - 4rem)
        50%;
      justify-content: end;
    }

  }

  @media(min-width: 70em) {

    .o-media-block--split-flush-end {
      grid-template-columns:
      26rem
      50%;
    }

  }

  .o-media-block--split-flush-start {
    grid-template-columns: 1fr
  }

  @media(min-width: 40em) {

    .o-media-block--split-flush-start {
      column-gap: 3rem;
      grid-template-columns:
        50%
        calc(45% - 3.5rem);
      justify-content: start;
    }

  }

  @media(min-width: 70em) {

    .o-media-block--split-flush-start {
      grid-template-columns:
        50%
        26rem;
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
    align-content: center;
    column-gap: 0rem;
    display: grid;
    grid-template-columns: 1fr;
    justify-content: center;
    max-width: calc(90% - 2rem);
    row-gap: 4rem;
    width: 100%;
  }

  .o-block--align-start {
    align-content: start;
  }

  .o-block--align-stretch {
    align-content: stretch;
  }

  .o-block--justify-start {
    justify-content: start;
  }

  .o-block--narrow {
    grid-template-columns: 80%;
  }


  @media(min-width: 70em) {

    .o-block--narrow  {
      grid-template-columns: 58rem;
    }

  }

  .o-block--half {
    padding-left: 10%;
    padding-right: 10%;
  }

  @media(min-width: 40em) {

    .o-block--half {
      grid-template-columns: 50%;
      padding-left: 0;
      padding-right: 0;
      width: 100%;
    }

  }


  /* Spaced Rows */

  .o-spaced-rows {
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
    justify-items: center;
    padding-top: calc(var(--spacing-responsive) * 5);
    padding-bottom: calc(var(--spacing-responsive) * 5);
    row-gap: calc(var(--spacing-responsive) * 2);
  }

  .o-section-block--spacing-small {
    padding-top: calc(var(--spacing-responsive) * 3);
    padding-bottom: calc(var(--spacing-responsive) * 3);
    row-gap: calc(var(--spacing-responsive) * 1);
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