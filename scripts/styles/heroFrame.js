import { css } from '../../modules/lit-element.js';
export const heroFrame = css`

  .c-hero-frame {
    position: relative;
    overflow: hidden;
  }

  .c-hero-frame__content {
    align-content: center;
    display: grid;
    grid-auto-flow: row;
    height: 100%;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    padding-top: calc(4rem + 3rem);
    padding-bottom: 4rem;
    row-gap: 4rem;
    text-align: left;
    width: 100%;
    will-change: opacity;
  }

  @media (min-width:40em) {

    .c-hero-frame__content {
      align-content: center;
      display: grid;
      grid-template-rows: min-content min-content;
      padding-bottom: 6rem;
      padding-left: 0;
      padding-right: 0;
      padding-top: calc(5rem + 3rem);
      row-gap: 0rem;
      width: 100%;
    }

  }

  @media (min-width:60em) {

    .c-hero-frame__content {
      padding-bottom: 8rem;
      row-gap: 0rem;
    }

  }

  .c-hero-frame__branding {
    display: grid;
    margin-left: auto;
    margin-right: auto;
    opacity: var(--loader-fade-in-opacity);
    padding-left: 10%;
    padding-right: 10%;
    row-gap: 3rem;
    transition:
      opacity var(--loader-fade-in-transition);
    width: 100%;
    will-change: opacity;
  }

  @media (min-width:40em) {

    .c-hero-frame__branding {
      max-width: none;
      padding-left: 5%;
      padding-right: 66%;
      text-align: right;
    }

  }

  .c-hero-frame__image {
    filter: url('#blur');
    margin-left: auto;
    margin-right: auto;
    opacity: var(--hero-image-opacity);
    transition: opacity .5s;
    width: 80%;
    will-change: opacity;
  }

  @media (min-width:40em) {

    .c-hero-frame__image {
      margin-top: -2rem;
      max-width: none;
      padding-left: 33%;
      width: 100%;
    }

  }

  .c-hero-frame__text {
    margin-left: auto;
    margin-right: auto;
    max-width: 60rem;
    padding-left: 5%;
    padding-right: 5%;
    text-align: center;
  }

  @media (min-width:40em) {

    .c-hero-frame__text {
      font-weight: var(--font-bolder-weight);
      padding-left: 10%;
      padding-right: 10%;
      padding-top: 3rem;
    }

  }

  @media (min-width:60em) {
    .c-hero-frame__text {
      padding-left: 10%;
      padding-right: 10%;
    }
  }

  .c-hero-frame__text c-text-block {
    margin-bottom: .5rem;
  }

  @media (min-width:40em) {

    .c-hero-frame__text c-text-block {
      margin-bottom: .5rem;
    }

  }
`;