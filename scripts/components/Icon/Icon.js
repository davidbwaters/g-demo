/*
 *  Scripts - Components - Icons
 */
import { LitElement, html, css } from '../../../modules/lit-element.js';
export class Icon extends LitElement {
  static get styles() {
    return [css`
        [data-icon]::before {
          display: inline-block;
          font-family: "gw-icons" !important;
          font-style: normal !important;
          font-weight: normal !important;
          font-variant: normal !important;
          line-height: 1;
          margin-left: .125em;
          speak: none;
          text-transform: none !important;
          vertical-align: -.125em;
          text-rendering: auto;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        [data-icon="angle-down"]::before {
          content: "\\ea01";
        }
        [data-icon="angle-left"]::before {
          content: "\\ea02";
        }
        [data-icon="angle-right"]::before {
          content: "\\ea03";
        }
        [data-icon="angle-up"]::before {
          content: "\\ea04";
        }
        [data-icon="arrow-circle-down"]::before {
          content: "\\ea05";
        }
        [data-icon="arrow-circle-left"]::before {
          content: "\\ea06";
        }
        [data-icon="arrow-circle-right"]::before {
          content: "\\ea07";
        }
        [data-icon="arrow-circle-up"]::before {
          content: "\\ea08";
        }
        [data-icon="arrow-down"]::before {
          content: "\\ea09";
        }
        [data-icon="arrow-left"]::before {
          content: "\\ea0a";
        }
        [data-icon="arrow-right"]::before {
          content: "\\ea0b";
        }
        [data-icon="arrow-up"]::before {
          content: "\\ea0c";
        }
        [data-icon="arrows-alt-h"]::before {
          content: "\\ea0d";
        }
        [data-icon="arrows-alt-v"]::before {
          content: "\\ea0e";
        }
        [data-icon="at-solid"]::before {
          content: "\\ea0f";
        }
        [data-icon="ban-solid"]::before {
          content: "\\ea10";
        }
        [data-icon="chevron-circle-down"]::before {
          content: "\\ea11";
        }
        [data-icon="chevron-circle-left"]::before {
          content: "\\ea12";
        }
        [data-icon="chevron-circle-right"]::before {
          content: "\\ea13";
        }
        [data-icon="chevron-circle-up"]::before {
          content: "\\ea14";
        }
        [data-icon="chevron-down"]::before {
          content: "\\ea15";
        }
        [data-icon="chevron-left"]::before {
          content: "\\ea16";
        }
        [data-icon="chevron-right"]::before {
          content: "\\ea17";
        }
        [data-icon="chevron-up"]::before {
          content: "\\ea18";
        }
        [data-icon="circle"]::before {
          content: "\\ea19";
        }
        [data-icon="circle-notch"]::before {
          content: "\\ea1a";
        }
        [data-icon="cogs"]::before {
          content: "\\ea1b";
        }
        [data-icon="columns"]::before {
          content: "\\ea1c";
        }
        [data-icon="comment"]::before {
          content: "\\ea1d";
        }
        [data-icon="expand-arrows-alt"]::before {
          content: "\\ea1e";
        }
        [data-icon="external-link-square-alt-solid"]::before {
          content: "\\ea1f";
        }
        [data-icon="facebook"]::before {
          content: "\\ea20";
        }
        [data-icon="feather-solid"]::before {
          content: "\\ea21";
        }
        [data-icon="flickr"]::before {
          content: "\\ea22";
        }
        [data-icon="grid"]::before {
          content: "\\ea23";
        }
        [data-icon="grid-alt"]::before {
          content: "\\ea24";
        }
        [data-icon="grip-horizontal-solid"]::before {
          content: "\\ea25";
        }
        [data-icon="grip-vertical-solid"]::before {
          content: "\\ea26";
        }
        [data-icon="hand-paper"]::before {
          content: "\\ea27";
        }
        [data-icon="hand-paper-solid"]::before {
          content: "\\ea28";
        }
        [data-icon="hand-point-up"]::before {
          content: "\\ea29";
        }
        [data-icon="hand-point-up-solid"]::before {
          content: "\\ea2a";
        }
        [data-icon="hand-pointer"]::before {
          content: "\\ea2b";
        }
        [data-icon="hand-pointer-solid"]::before {
          content: "\\ea2c";
        }
        [data-icon="hand-rock"]::before {
          content: "\\ea2d";
        }
        [data-icon="hand-rock-solid"]::before {
          content: "\\ea2e";
        }
        [data-icon="hashtag-solid"]::before {
          content: "\\ea2f";
        }
        [data-icon="hourglass-solid"]::before {
          content: "\\ea30";
        }
        [data-icon="hourglass-start-solid"]::before {
          content: "\\ea31";
        }
        [data-icon="i-cursor-solid"]::before {
          content: "\\ea32";
        }
        [data-icon="info-circle-solid"]::before {
          content: "\\ea33";
        }
        [data-icon="instagram"]::before {
          content: "\\ea34";
        }
        [data-icon="link-solid"]::before {
          content: "\\ea35";
        }
        [data-icon="long-arrow-alt-down"]::before {
          content: "\\ea36";
        }
        [data-icon="long-arrow-alt-left"]::before {
          content: "\\ea37";
        }
        [data-icon="long-arrow-alt-right"]::before {
          content: "\\ea38";
        }
        [data-icon="long-arrow-alt-up"]::before {
          content: "\\ea39";
        }
        [data-icon="meh-blank"]::before {
          content: "\\ea3a";
        }
        [data-icon="minus-circle"]::before {
          content: "\\ea3b";
        }
        [data-icon="minus-square"]::before {
          content: "\\ea3c";
        }
        [data-icon="plus-circle"]::before {
          content: "\\ea3d";
        }
        [data-icon="plus-square"]::before {
          content: "\\ea3e";
        }
        [data-icon="ruler-combined"]::before {
          content: "\\ea3f";
        }
        [data-icon="star-of-life"]::before {
          content: "\\ea40";
        }
        [data-icon="surprise"]::before {
          content: "\\ea41";
        }
        [data-icon="user-solid"]::before {
          content: "\\ea42";
        }
        [data-icon="window-close"]::before {
          content: "\\ea43";
        }
        [data-icon="youtube"]::before {
          content: "\\ea44";
        }

      `];
  }

  static get properties() {
    return {
      Icon: {
        type: String
      }
    };
  }

  render() {
    return html`
      <i data-icon=${this.Icon}></i>
    `;
  }

}