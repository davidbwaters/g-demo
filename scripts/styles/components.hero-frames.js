/*
 *  Scripts - Styles - Components - Hero Frames
 */
import { css } from '../../modules/lit-element.js';
export const heroFrame = css`

  .c-hero-frame {
    position: relative;
    overflow: hidden;
  }

  .c-hero-frame__content {
    will-change: opacity;
  }

  .c-hero-frame__branding {
    min-width: 16rem;
    transition:
      opacity var(--loader-fade-in-transition);
    will-change: opacity;
  }

  @media (min-width:40em) {

    .c-hero-frame__branding {
      max-width: none;
    }

  }

  .c-hero-frame__image {
    filter: url('#blurFilter');
    opacity: var(--hero-image-opacity);
    transition: opacity .5s;
    will-change: opacity;
  }

  @media (min-width:40em) {

    .c-hero-frame__image {
      margin-left: -20%;
      margin-top: 6rem;
      max-width: none;
      width: 140%;
    }

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