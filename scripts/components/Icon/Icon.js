/*
 *  Scripts - Components - Icons
 */
import { LitElement, html, css } from '../../../modules/lit-element.js';
export class Icon extends LitElement {
  static get styles() {
    return [css`

        @font-face {
          font-family: "gw-icons";
          src: url("../icons/gw-icons.eot");
          src: url("../icons/gw-icons.eot?ozg8tw#iefix") format("embedded-opentype"),
              url("../icons/gw-icons.woff2?ozg8tw") format("woff2"),
              url("../icons/gw-icons.woff?ozg8tw") format("woff"),
              url("../icons/gw-icons.ttf?ozg8tw") format("truetype"),
              url("../icons/gw-icons.svg?ozg8tw#gw-icons") format("svg");
          font-style: normal;
          font-weight: 400;
        }

        [data-icon]::before {
          color: inherit;
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
          text-rendering: block;
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
        [data-icon="at"]::before {
          content: "\\ea0f";
        }
        [data-icon="ban"]::before {
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
        [data-icon="clock"]::before {
          content: "\\ea1b";
        }
        [data-icon="close"]::before {
          content: "\\ea1c";
        }
        [data-icon="cogs"]::before {
          content: "\\ea1d";
        }
        [data-icon="columns"]::before {
          content: "\\ea1e";
        }
        [data-icon="comment"]::before {
          content: "\\ea1f";
        }
        [data-icon="dizzy"]::before {
          content: "\\ea20";
        }
        [data-icon="edit"]::before {
          content: "\\ea21";
        }
        [data-icon="ello"]::before {
          content: "\\ea22";
        }
        [data-icon="envelope"]::before {
          content: "\\ea23";
        }
        [data-icon="expand-arrows-alt"]::before {
          content: "\\ea24";
        }
        [data-icon="external-link-square-alt"]::before {
          content: "\\ea25";
        }
        [data-icon="facebook"]::before {
          content: "\\ea26";
        }
        [data-icon="feather"]::before {
          content: "\\ea27";
        }
        [data-icon="flickr"]::before {
          content: "\\ea28";
        }
        [data-icon="grid"]::before {
          content: "\\ea29";
        }
        [data-icon="grid-alt"]::before {
          content: "\\ea2a";
        }
        [data-icon="grip-horizontal"]::before {
          content: "\\ea2b";
        }
        [data-icon="grip-vertical"]::before {
          content: "\\ea2c";
        }
        [data-icon="hand-paper"]::before {
          content: "\\ea2d";
        }
        [data-icon="hand-paper"]::before {
          content: "\\ea2e";
        }
        [data-icon="hand-point-up"]::before {
          content: "\\ea2f";
        }
        [data-icon="hand-point-up"]::before {
          content: "\\ea30";
        }
        [data-icon="hand-pointer"]::before {
          content: "\\ea31";
        }
        [data-icon="hand-pointer"]::before {
          content: "\\ea32";
        }
        [data-icon="hand-rock"]::before {
          content: "\\ea33";
        }
        [data-icon="hand-rock"]::before {
          content: "\\ea34";
        }
        [data-icon="hashtag"]::before {
          content: "\\ea35";
        }
        [data-icon="hourglass"]::before {
          content: "\\ea36";
        }
        [data-icon="hourglass-start"]::before {
          content: "\\ea37";
        }
        [data-icon="i-cursor"]::before {
          content: "\\ea38";
        }
        [data-icon="info-circle"]::before {
          content: "\\ea39";
        }
        [data-icon="instagram"]::before {
          content: "\\ea3a";
        }
        [data-icon="link"]::before {
          content: "\\ea3b";
        }
        [data-icon="long-arrow-alt-down"]::before {
          content: "\\ea3c";
        }
        [data-icon="long-arrow-alt-left"]::before {
          content: "\\ea3d";
        }
        [data-icon="long-arrow-alt-right"]::before {
          content: "\\ea3e";
        }
        [data-icon="long-arrow-alt-up"]::before {
          content: "\\ea3f";
        }
        [data-icon="meh-blank"]::before {
          content: "\\ea40";
        }
        [data-icon="minus-circle"]::before {
          content: "\\ea41";
        }
        [data-icon="minus-square"]::before {
          content: "\\ea42";
        }
        [data-icon="phone"]::before {
          content: "\\ea43";
        }
        [data-icon="pin"]::before {
          content: "\\ea44";
        }
        [data-icon="plus-circle"]::before {
          content: "\\ea45";
        }
        [data-icon="plus-square"]::before {
          content: "\\ea46";
        }
        [data-icon="ruler-combined"]::before {
          content: "\\ea47";
        }
        [data-icon="star-of-life"]::before {
          content: "\\ea48";
        }
        [data-icon="surprise"]::before {
          content: "\\ea49";
        }
        [data-icon="twitter"]::before {
          content: "\\ea4a";
        }
        [data-icon="user"]::before {
          content: "\\ea4b";
        }
        [data-icon="window-close"]::before {
          content: "\\ea4c";
        }
        [data-icon="youtube"]::before {
          content: "\\ea4d";
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