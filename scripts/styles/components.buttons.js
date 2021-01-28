/*
 *  Scripts - Styles - Components - Buttons
 */
import { css } from '../../modules/lit-element.js';
export const buttons = css`

  .c-button {
    border-radius: .2rem;
    cursor: pointer;
    font-size: calc(
      var(--text-size-title-stylized) * 1
    );
    font-weight: var(--font-weight-title-stylized);
    letter-spacing: var(--letter-spacing-title-stylized);
    line-height: var(--line-height-title-stylized);
    margin-bottom: .5rem;
    margin-left: .5rem;
    margin-right: .5rem;
    margin-top: .5rem;
    padding-bottom: .5rem;
    padding-left: .5rem;
    padding-right: .5rem;
    padding-top: .5rem;
    outline: none;
    text-align: center;
    transition: all .33s;
  }

  .c-button:first-child {
    margin-left: 0;
  }

  @media(min-width:60em) {

    .c-button {
      font-size: calc(
        var(--text-size-title-stylized) * .9
      );
      padding-bottom: .5rem;
      padding-left: .75rem;
      padding-right: .75rem;
      padding-top: .5rem;
    }

  }

  .c-button,
  .c-button:focus,
  .c-button:active,
  .c-button:visited {
    background-color: var(--button-normal-bg);
    border: solid 1px var(--button-normal-fg);
    color: var(--button-normal-fg);
  }

  .c-button:hover {
    background-color: var(--button-normal-bg-hover);
    border-color: var(--button-normal-fg-hover);
    color: var(--button-normal-fg-hover);
  }

  .c-button--inverse,
  .c-button--inverse:focus,
  .c-button--inverse:active,
  .c-button--inverse:visited {
    background-color: var(--button-inverse-bg);
    border: solid 1px var(--button-inverse-fg);
    color: var(--button-inverse-fg);
  }


  .c-button--large {
    font-size: calc(
      var(--text-size-title-stylized) * 1.1
    );
    padding-bottom: .75rem;
    padding-left: .75rem;
    padding-right: .75rem;
    padding-top: .75rem;
  }

  .c-button--flush {
    margin-bottom: 0rem;
    margin-left: 0rem;
    margin-right: 0rem;
    margin-top: 0rem;
  }

  .c-button--block {
    width: 100%;
  }

  .c-button--inverse:hover {
    background-color: var(--button-inverse-bg-hover);
    border-color: var(--button-inverse-fg-hover);
    color: var(--button-inverse-fg-hover);
  }


  .c-button--icon {
    align-content: center;
    display: inline-block;
    font-size: 1rem;
    height: 2.5rem;
    justify-content: center;
    line-height: 1.5;
    padding-left: 0;
    padding-right: 0;
    width: 2.5rem;
  }

  .c-button--icon.c-button--round {
    border-radius: 10rem;
  }

`;