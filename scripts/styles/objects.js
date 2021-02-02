/*
 *  Scripts - Styles - Objects
 */
import { css } from '../../modules/lit-element.js';
export const objects = css`

  /* Media Block */

  .o-media-block {
    --media-block-gap:  calc(
      var(--spacing-responsive) * 4
    );

    --media-block-content-gap:  calc(
      var(--spacing-responsive) * 2
    );

    align-content: center;
    column-gap: var(--media-block-gap);
    display: grid;
    grid-template-columns: var(--wrapper-max);
    justify-content: center;
    row-gap: var(--media-block-gap);
  }

  .o-media-block--align-stretch {
    align-content: stretch;
  }

  .o-media-block--narrow {
    grid-template-columns: calc(
      var(--wrapper-max) / 9 * 8
    );
  }

  .o-media-block__item {
    align-content: start;
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: 1fr;
    justify-content: center;
    row-gap: var(--media-block-content-gap);
  }

  .o-media-block--content-spacing-flush {

    --media-block-content-gap: 0;

  }

  .o-media-block--content-spacing-large {

    --media-block-content-gap: calc(
      var(--spacing-responsive) * 4
    );

  }

  .o-media-block--split  {
    column-gap: var(--media-block-gap);
    grid-template-columns: var(--wrapper-max);
  }

  @media(min-width: 40em) {

    .o-media-block--split  {
      grid-template-columns:
        calc(
          (var(--wrapper-max) / 2) -
          (var(--media-block-gap) / 2)
        )
        calc(
          (var(--wrapper-max) / 2) -
          (var(--media-block-gap) / 2)
        );
    }

  }

  .o-media-block--split-flush-end,
  .o-media-block--split-flush-start {

    --media-block-gap:  calc(
      var(--spacing-responsive) * 3
    );

    column-gap: var(--media-block-gap);
    grid-template-columns: 1fr;
  }

  .o-media-block--split-flush-end
  .o-media-block__item:first-child,
  .o-media-block--split-flush-start
  .o-media-block__item:last-child {
    padding-left: calc(
      (100% - var(--wrapper-max)) / 2
    );
    padding-right: calc(
      (100% - var(--wrapper-max)) / 2
    );
  }


  @media(min-width: 40em) {

    .o-media-block--split-flush-end
    .o-media-block__item:first-child,
    .o-media-block--split-flush-start
    .o-media-block__item:last-child {
      padding-left: 0;
      padding-right: 0;
    }

  }

  .o-media-block--split-flush-end {
    justify-content: end;
  }

  @media(min-width: 40em) {

    .o-media-block--split-flush-end {
      grid-template-columns:
        calc(
          (var(--wrapper-max) / 2) -
          var(--media-block-gap)
        )
        50%;
    }

  }

  .o-media-block--split-flush-start {
    justify-content: start;
  }

  @media(min-width: 40em) {

    .o-media-block--split-flush-start {
      grid-template-columns:
        50%
        calc(
          (var(--wrapper-max) / 2) -
          var(--media-block-gap)
        );
      justify-content: start;
    }

  }


  /* Blocks */

  .o-block {
    --block-gap: calc(
      var(--spacing-responsive) * 2
    );
    align-content: center;
    column-gap: 0rem;
    display: grid;
    grid-template-columns: 1fr;
    justify-content: center;
    max-width: var(--wrapper-max);
    row-gap: var(--block-gap);
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
    grid-template-columns: calc(
      var(--wrapper-max) / 9 * 8
    );
  }


  @media(min-width: 70em) {

    .o-block--narrow  {
      grid-template-columns: calc(
        var(--wrapper-max) / 9 * 7
      );
    }

  }

  .o-block--half {
    grid-template-columns: calc(
      var(--wrapper-max) / 9 * 8
    );
  }

  @media(min-width: 40em) {

    .o-block--half,
    .o-block--half\\@desktop {
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
    row-gap: calc(
      var(--spacing-responsive) * 4
    )
  }

  .o-spaced-columns {
    align-content: start;
    display: grid;
    column-gap: calc(
      var(--spacing-responsive) * 4
    )
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
      var(--navbar-height) +
      (var(--spacing-responsive) * 5)
    );

  }

  .o-section-block--flush-top {
    padding-top: 0;
  }
  .o-section-block--flush-bottom {
    padding-bottom: 0;
  }
`;