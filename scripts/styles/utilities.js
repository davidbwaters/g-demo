/*
 *  Scripts - Styles - Utilities
 */
import { css } from '../../modules/lit-element.js';
export const utilities = css`

  /* Text Align */

  .u-text-align-left {
    text-align: left;
  }

  .u-text-align-center {
    text-align: center;
  }

  .u-text-align-right {
    text-align: right;
  }


  /* Text */

  .u-text-title {
    font-size:
      calc(var(--text-size-title-normal) * .8) !important;
    font-weight:  var(--font-weight-title-normal) !important;
    letter-spacing: var(
      --letter-spacing-title-normal
    ) !important;
    line-height: var(--line-height-title-normal) !important;
  }

  @media (min-width:40em) {

    .u-text-title {
      font-size:
        calc(var(--text-size-title-normal) * .9) !important;
    }

  }

  @media (min-width:60em) {
    .u-text-title {
      font-size:
        var(--text-size-title-normal) !important;
    }
  }

  .u-text-title-light {
    font-size:
      calc(var(--text-size-title-normal-light) * .8) !important;
    font-weight:  var(--font-weight-title-normal-light) !important;
    letter-spacing: var(
      --letter-spacing-title-normal-light
    ) !important;
    line-height: var(--line-height-title-normal-light) !important;
  }

  @media (min-width:40em) {

    .u-text-title-light {
      font-size:
        calc(var(--text-size-title-normal-light) * .9) !important;
    }

  }

  @media (min-width:60em) {
    .u-text-title-light {
      font-size:
        var(--text-size-title-normal-light) !important;
    }
  }

  .u-text-title-tiny {
    font-size:
      calc(var(--text-size-title-tiny) * .9) !important;
    font-weight: var(--font-weight-title-tiny) !important;
    letter-spacing: var(
      --letter-spacing-title-tiny
    ) !important;
    line-height: var(--line-height-title-tiny) !important;
    text-transform: uppercase !important;
  }

  @media (min-width:40em) {

    .u-text-title-tiny {
      font-size:
        calc(var(--text-size-title-tiny) * .95) !important;
    }

  }

  @media (min-width:60em) {
    .u-text-title-tiny {
      font-size:
        var(--text-size-title-tiny) !important;
    }
  }

  .u-text-title-stylized {
    font-size:
      calc(var(--text-size-title-stylized) * .8) !important;
    font-weight: var(--font-weight-title-stylized) !important;
    letter-spacing: var(
      --letter-spacing-title-stylized
    ) !important;
    line-height: var(--line-height-title-stylized) !important;
  }

  @media (min-width:40em) {

    .u-text-title-stylized {
      font-size:
        calc(var(--text-size-title-stylized) * .9) !important;
    }

  }

  @media (min-width:60em) {
    .u-text-title-stylized {
      font-size:
        var(--text-size-title-stylized) !important;
    }
  }

  .u-text-uppercase {
    text-transform: uppercase !important;
  }


  /* Text Colors */

  .u-text-color-subtle {
    color: var(--color-fg-subtle);
  }

  .u-text-color-contrast {
    color: var(--color-fg-contrast);
  }

  .u-text-color-subtle {
    color: var(--color-fg-subtle);
  }

  .u-text-color-inverse-subtle {
    color: var(--color-fg-subtle);
  }

  .u-text-color-inverse-contrast {
    color: var(--color-fg-contrast);
  }

  .u-text-color-inverse-subtle {
    color: var(--color-fg-subtle);
  }


  /* Background */

  .u-background-cover-center {
    background-position: center center;
    background-size: cover;
  }

  .u-padding-horizontal-10-percent {
    padding-left: 10% !important;
    padding-right: 10% !important;
  }


  /* Cursor */

  .u-cursor-zoom-in {
    cursor: zoom-in !important;
  }


  /* Blend Mode */

  .u-blend-mode-screen {
    mix-blend-mode: screen !important;
  }

  .u-blend-mode-luminosity {
    mix-blend-mode: luminosity !important;
  }


  /* Grid Align */

  .u-justify-content-center {
    justify-content: center;
  }

  .u-align-content-center {
    align-content: center;
  }

  .u-justify-content-stretch {
    justify-content: stretch;
  }

  .u-align-content-stretch {
    align-content: stretch;
  }

  .u-justify-content-start {
    justify-content: start;
  }

  .u-align-content-start {
    align-content: start;
  }

  .u-justify-content-end {
    justify-content: end;
  }

  .u-align-content-end {
    align-content: end;
  }

  .u-justify-items-start {
    justify-items: start;
  }

  .u-align-items-start {
    align-items: start;
  }

  .u-justify-items-end {
    justify-items: end;
  }

  .u-align-items-end {
    align-items: end;
  }


  /* Grid Gap */

  .u-row-gap-flush {
    row-gap: 0 !important;
  }

  .u-column-gap-flush {
    column-gap: 0 !important;
  }

  @media (max-width:40em) {

    .u-row-gap-flush\\@mobile {
      row-gap: 0 !important;
    }

    .u-column-gap-flush\\@mobile {
      column-gap: 0 !important;
    }

  }


  /* Visibility */

  .u-transparent {
    opacity: 0 !important;
  }

  .u-hidden{
    display: none !important;
    visibility: hidden !important;
  }

  @media (max-width:25em) {

    .u-hidden\\@small {
      display: none !important;
      visibility: hidden !important;
    }

  }

  @media (max-width:40em) {

    .u-hidden\\@mobile {
      display: none !important;
      visibility: hidden !important;
    }

  }

  @media (max-width:70em) {

    .u-hidden\\@tablet {
      display: none !important;
      visibility: hidden !important;
    }

  }

  @media (max-width:40em) {

    .u-padding-top-flush\\@mobile {
      padding-top: 0 !important;
    }

    .u-padding-bottom-flush\\@mobile {
      padding-bottom: 0 !important;
    }

  }

`;