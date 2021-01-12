"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehiclesPage = void 0;

var _litElement = require("lit-element");

var _motionBlur = require("../../utils/motionBlur");

var _imagesPreload = require("../../utils/imagesPreload");

var _generic = require("../../styles/generic");

var _heroFrame = require("../../styles/heroFrame");

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n\n                <span class=\"c-speclist__item-text\">\n                  ", "\n                </span>\n\n              "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n\n            <div\n              class=\"c-speclist__item\"\n            >\n              <span class=\"c-speclist__item-title\">\n                ", "\n              </span>\n\n              ", "\n\n            </div>\n\n          "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n\n            <span class=\"c-spec-table__field-name\">\n              ", "\n            </span>\n            <span class=\"c-spec-table__field-content\">\n              ", "\n            </span>\n\n          "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n\n          <c-scale-section\n            data=", "\n          >\n          </c-scale-section>\n\n      "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n\n      <section\n        class=\"c-hero-frame\"\n      >\n        <div class=\"c-hero-frame__content\">\n          <div class=\"c-hero-frame__branding\">\n            <img\n              class=\"u-margin-bottom-5\"\n              src=\"", "\"\n              alt=\"", "\"\n            />\n            <c-slant-title\n              data=", "\n            >\n            </c-slant-title>\n          </div>\n          <img\n            src=\"", "\"\n            alt=\"", "\"\n            class=\"c-hero-frame__image\"\n          />\n          <div\n            class=\"c-hero-frame__text\"\n          >\n            <c-heading\n              text=", "\n              textAlign='center'\n              weight=normal'\n            >\n            </c-heading>\n            <c-text-block\n              content=", "\n              backgroundColor='transparent'\n              isFlush=true\n            >\n            </c-text-block>\n            <div class=\"u-text-title\">\n              ", "\n            </div>\n          </div>\n        </div>\n\n        <c-angle-section\n          data=", "\n\n        >\n        </c-angle-section>\n      </section>\n\n      ", "\n      <section\n        class=\"c-vehicles-lower\"\n      >\n        <div\n          class=\"c-vehicles-lower__text\"\n        >\n          <c-heading\n            text=", "\n            size=\"huge\"\n          >\n          </c-heading>\n          <c-text-block\n            content=", "\n            isFlush=true\n            size=\"medium\"\n            backgroundColor=\"transparent\"\n          >\n          </c-text-block>\n        </div>\n        <img\n          class=\"c-vehicles-lower__image\"\n          srcset=", "\n          src=", "\n          alt=", "\n        >\n      </section>\n      <section\n        class=\"c-spec-table\"\n      >\n        <div\n          class=\"c-spec-table__image\"\n        >\n          <img\n            src=", "\n            alt=", "\n          >\n        </div>\n        <div\n          class=\"c-spec-table__content\"\n        >\n          ", "\n        </div>\n      </section>\n\n      <section\n        class=\"c-speclist\"\n      >\n        <c-heading\n          text=", "\n          class=\"c-speclist__heading\"\n        >\n        </c-heading>\n        <div\n          class=\"c-speclist__content\"\n        >\n          ", "\n        </div>\n      </section>\n      <svg\n        xmlns=\"http://www.w3.org/2000/svg\"\n        version=\"1.1\"\n        class=\"c-filters\"\n      >\n        <defs>\n          <filter id=\"blur\">\n            <feGaussianBlur in=\"SourceGraphic\" stdDeviation=\"10,0\" />\n          </filter>\n        </defs>\n      </svg>\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        :host {\n          display: block;\n          height: 100%;\n          padding-top: var(--navbar-height);\n          width: 100%;\n        }\n\n        .c-vehicles-lower {\n          background-color: var(--color-subtle-light-5);\n          display: grid;\n          padding-bottom: 6rem;\n          padding-top: 6rem;\n          row-gap: 2rem;\n          text-align: center;\n        }\n\n        .c-vehicles-lower__text {\n          margin-left: auto;\n          margin-right: auto;\n          max-width: 60rem;\n          width: 80%;\n        }\n\n        .c-spec-table {\n          display: grid;\n          grid-gap: 2rem;\n          grid-template-columns: 80%;\n          padding-bottom: 4rem;\n          padding-top: 4rem;\n        }\n\n        @media(min-width: 40em) {\n\n          .c-spec-table {\n            grid-gap: 2rem;\n            grid-template-columns: 1fr 1fr;\n            padding-bottom: 6rem;\n            padding-top: 6rem;\n          }\n\n        }\n\n        .c-spec-table__content {\n          display: grid;\n          grid-template-columns: 1fr 1fr;\n        }\n\n        .c-spec-table__field-name {\n          color: var(--color-subtle-dark-1);\n          font-size: var(--text-size-title-tiny);\n          font-weight: var(--font-weight-title-tiny);\n          letter-spacing: var(--letter-spacing-title-tiny);\n          line-height: 1rem;\n          text-transform: uppercase;\n        }\n\n        .c-spec-table__field-content {\n          color: var(--color-subtle-dark-3);\n          font-size: .8rem;\n          font-weight: var(--font-weight-title-stylized);\n          letter-spacing: var(--letter-spacing-title-stylized);\n          line-height: 1rem;\n        }\n\n        .c-speclist {\n          padding-bottom: 4rem;\n          padding-top: 4rem;\n        }\n\n        @media(min-width: 40em) {\n\n          .c-speclist {\n            padding-bottom: 6rem;\n            padding-top: 6rem;\n          }\n\n        }\n\n        .c-speclist__content {\n          display: grid;\n          grid-gap: 2rem;\n          grid-template-columns: 80%;\n          padding-bottom: 4rem;\n          padding-top: 4rem;\n        }\n\n        .c-speclist__item-title {\n          display: block;\n          color: var(--color-subtle-dark-1);\n          font-size: var(--text-size-title-normal);\n          font-weight: var(--font-weight-title-normal);\n          letter-spacing: var(--letter-spacing-title-normal);\n        }\n        .c-speclist__item-text {\n          display: block;\n          color: var(--color-subtle-dark-4);\n          font-size: var(--text-size-title-normal-light);\n          font-weight: var(--font-weight-title-normal-light);\n          letter-spacing: var(--letter-spacing-title-normal-light);\n        }\n\n      "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);

      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

var VehiclesPage = /*#__PURE__*/function (_LitElement) {
  _inherits(VehiclesPage, _LitElement);

  _createClass(VehiclesPage, null, [{
    key: "styles",
    get: function get() {
      return [_generic.generic, _heroFrame.heroFrame, (0, _litElement.css)(_templateObject())];
    }
  }, {
    key: "properties",
    get: function get() {
      return {
        data: {
          type: Object
        },
        loaded: {
          type: Boolean,
          reflect: true
        }
      };
    }
  }]);

  function VehiclesPage() {
    var _this;

    _classCallCheck(this, VehiclesPage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VehiclesPage).call(this));
    _this.url = 'https://admin.guntherwerks.info';
    return _this;
  }

  _createClass(VehiclesPage, [{
    key: "firstUpdated",
    value: function firstUpdated() {
      var _this2 = this;

      this.blurFilter = document.querySelector('c-router-app').shadowRoot.querySelector('c-router-outlet').querySelector('c-vehicles-page').shadowRoot.querySelector('#blur').querySelector('feGaussianBlur');
      this.handleLoad = this.handleLoad.bind(this);
      this.updateComplete.then(function () {
        _this2.handleLoad();
      });
    }
  }, {
    key: "preload",
    value: function preload() {
      var _this3 = this;

      if (!this.data) {
        setTimeout(function () {
          _this3.preload();
        }, 500);
      } else {
        this.url = 'https://admin.guntherwerks.info';
        var images = [this.url + this.data.HeroLogo.url, this.url + this.data.HeroImage.url];
        var preloading = (0, _imagesPreload.imagesPreload)(images);
        (0, _imagesPreload.imagesPreloadedCheckWait)(preloading, true);
        this.loaded = true;
      }
    }
  }, {
    key: "handleLoad",
    value: function handleLoad() {
      var _this4 = this;

      if (this.loaded === true) {
        window.requestAnimationFrame(function () {
          window.dispatchEvent(new Event('resize'));
        });

        this._transitionIn();

        var load = new CustomEvent('routeLoad');
        this.dispatchEvent(load);
      } else {
        setTimeout(function () {
          _this4.handleLoad();
        }, 500);
      }
    }
  }, {
    key: "_transitionIn",
    value: function _transitionIn() {
      var _this5 = this;

      this.blurFilter.setAttribute('stdDeviation', '10,0');
      setTimeout(function () {
        _this5._blurAnimation();
      }, 500);
    }
  }, {
    key: "_blurAnimation",
    value: function _blurAnimation() {
      (0, _motionBlur.motionBlur)(this.blurFilter);
    }
  }, {
    key: "_getData",
    value: function _getData() {
      var response;
      return regeneratorRuntime.async(function _getData$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(fetch(this.url + '/vehicle').then(function (res) {
                return res.json();
              })["catch"](function (err) {
                return console.error(err);
              }));

            case 2:
              response = _context.sent;
              return _context.abrupt("return", {
                statusCode: 200,
                body: response
              });

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "performUpdate",
    value: function performUpdate() {
      var _this6 = this;

      var data;
      return regeneratorRuntime.async(function performUpdate$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(this._getData(function (data) {
                _this6.data = data;
              }));

            case 2:
              data = _context2.sent;
              console.log(this.data);
              this.data = data.body;
              this.LowerSectionImage = this.data.LowerSectionImage;

              _get(_getPrototypeOf(VehiclesPage.prototype), "performUpdate", this).call(this);

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "render",
    value: function render() {
      return (0, _litElement.html)(_templateObject2(), this.url + this.data.HeroLogo.url, this.url + this.data.HeroLogo.alternativeText, JSON.stringify(this.data.HeroSlantTitle), this.url + this.data.HeroImage.url, this.url + this.data.HeroImage.alternativeText, this.data.HeroHeading, this.data.HeroText, this.data.HeroSubHeading, JSON.stringify(this.data.HeroAngleBG), this.data.ScaleSections.map(function (data) {
        return (0, _litElement.html)(_templateObject3(), JSON.stringify(data));
      }), this.data.LowerSectionHeading, this.data.LowerSectionText, this.url + this.LowerSectionImage.formats.large.url + ', ' + this.url + this.LowerSectionImage.url + ' 2x', this.url + this.LowerSectionImage.url, this.LowerSectionImage.alternativeText, this.url + this.data.TableSectionImage.url, this.data.TableSectionImage.alternativeText, this.data.Table.map(function (data) {
        return (0, _litElement.html)(_templateObject4(), data.Field[0].Text, data.Field[1].Text);
      }), this.data.SpecSectionTitle, this.data.SpecsList.map(function (data) {
        return (0, _litElement.html)(_templateObject5(), data.Title, data.Item.map(function (item) {
          return (0, _litElement.html)(_templateObject6(), item.Text);
        }));
      }));
    }
  }]);

  return VehiclesPage;
}(_litElement.LitElement);

exports.VehiclesPage = VehiclesPage;