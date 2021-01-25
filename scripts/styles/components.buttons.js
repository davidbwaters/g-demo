/*
 *  Scripts - Styles - Components - Buttons
 */
import { css } from '../../modules/lit-element.js';
export const buttons = css`
  .c-button,
  .c-button:focus,
  .c-botton:active {
    background-color: var(--button-normal-bg);
    border: solid 1px var(--button-normal-fg);
    border-radius: .2rem;
    color: var(--button-normal-fg);
    cursor: pointer;
    font-size: var(--text-size-title-stylized);
    font-weight: var(--font-weight-title-stylized);
    letter-spacing: var(--letter-spacing-title-stylized);
    line-height: var(--line-height-title-stylized);
    margin-bottom: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
    margin-top: 1rem;
    padding-bottom: .5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: .5rem;
    outline: none;
    text-align: center;
    transition: all .33s;
  }

  .c-button:hover {
    background-color: var(--button-normal-bg-hover);
    color: var(--button-normal-fg-hover);
  }

  .c-button--icon,
  .c-button--icon:focus,
  .c-botton--icon:active  {
    align-content: center;
    background-color: var(--button-normal-bg);
    color: var(--button-normal-fg);
    display: grid;
    font-size: 1rem;
    height: 2.5rem;
    justify-content: center;
    line-height: 1;
    padding-left: 0;
    padding-right: 0;
    width: 2.5rem;
  }

`;