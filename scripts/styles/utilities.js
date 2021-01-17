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

`;