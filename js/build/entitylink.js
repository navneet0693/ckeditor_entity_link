!function(e,_){"object"==typeof exports&&"object"==typeof module?module.exports=_():"function"==typeof define&&define.amd?define([],_):"object"==typeof exports?exports.CKEditor5=_():(e.CKEditor5=e.CKEditor5||{},e.CKEditor5.entitylink=_())}(self,(()=>(()=>{var __webpack_modules__={"./ckeditor5_plugins/entitylink/src/entitylink.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ EntityLink)\n/* harmony export */ });\n/* harmony import */ var ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ckeditor5/src/core */ \"ckeditor5/src/core.js\");\n/* harmony import */ var _entitylinkediting__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entitylinkediting */ \"./ckeditor5_plugins/entitylink/src/entitylinkediting.js\");\n/* harmony import */ var ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ckeditor5/src/ui */ \"ckeditor5/src/ui.js\");\n/* harmony import */ var ckeditor5_src_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ckeditor5/src/utils */ \"ckeditor5/src/utils.js\");\n/* harmony import */ var _entitylinkautocomplete__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./entitylinkautocomplete */ \"./ckeditor5_plugins/entitylink/src/entitylinkautocomplete.js\");\n/* harmony import */ var _entitylinkautocomplete__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_entitylinkautocomplete__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils */ \"./ckeditor5_plugins/entitylink/src/utils.js\");\n\n\n\n\n\n\n\n/**\n * Drupal-specific plugin to update link elements in CKEditor 5.\n *\n * @private\n */\nclass EntityLink extends ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__.Plugin {\n  /**\n   * @inheritdoc\n   */\n  static get requires() {\n    return [_entitylinkediting__WEBPACK_IMPORTED_MODULE_1__[\"default\"]];\n  }\n\n  /**\n   * @inheritdoc\n   */\n  static get pluginName() {\n    return 'EntityLink';\n  }\n\n  init() {\n    this._state = {};\n    const editor = this.editor;\n    const options = _utils__WEBPACK_IMPORTED_MODULE_5__.dropdownElements.linkEntityType.viewOptions;\n    this._createDropdownExtraFormField();\n    this._enableLinkAutocomplete();\n  }\n\n  /**\n   * Create Select field to get data from config.\n   */\n  _createDropdownExtraFormField() {\n    const editor = this.editor;\n    const t = editor.t;\n    const locale = editor.locale;\n    const linkFormView = editor.plugins.get( 'LinkUI' ).formView;\n    const accessibleLabel = t( 'Link type' );\n\n    const itemDefinitions = new ckeditor5_src_utils__WEBPACK_IMPORTED_MODULE_3__.Collection();\n    const def = {\n      type: 'button',\n      model: new ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_2__.Model({\n        label: 'Content',\n        withText: true\n      })\n    };\n    itemDefinitions.add( def );\n    const extraFieldView = new  ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_2__.createDropdown( locale );\n    (0,ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_2__.addListToDropdown)( extraFieldView, itemDefinitions, {\n      ariaLabel: accessibleLabel,\n      role: 'menu'\n    } );\n\n    extraFieldView.buttonView.set({\n      ariaLabel: accessibleLabel,\n      ariaLabelledBy: undefined,\n      isOn: false,\n      withText: true,\n      tooltip: accessibleLabel\n    } );\n\n    linkFormView.children.add( extraFieldView, 0 );\n\n    linkFormView.on( 'render', () => {\n      linkFormView._focusables.add( extraFieldView, 0 );\n      linkFormView.focusTracker.add( extraFieldView.element );\n    } );\n\n    linkFormView['entitytype'] = extraFieldView;\n  }\n\n  /**\n   * Add auto complete to the link field\n   */\n  _enableLinkAutocomplete() {\n    const editor = this.editor;\n    const linkFormView = editor.plugins.get( 'LinkUI' ).formView;\n    let wasAutocompleteAdded = false;\n\n    linkFormView.extendTemplate( {\n      attributes: {\n        class: ['ck-vertical-form', 'ck-link-form_layout-vertical']\n      },\n    });\n\n    editor.plugins.get( 'ContextualBalloon' )._rotatorView.content.on('add', ( evt, view ) => {\n      if ( view !== linkFormView || wasAutocompleteAdded ) {\n        return;\n      }\n\n      _entitylinkautocomplete__WEBPACK_IMPORTED_MODULE_4___default() (\n        linkFormView.urlInputView.fieldView.element,\n        {\n          ...options,\n          selectHandler: (event, { item }) => {\n            if (!item.path) {\n              throw 'Missing path param.' + JSON.stringify(item);\n            }\n\n            event.target.value = item.path;\n            return false;\n          },\n          openHandler: (event) => {\n          },\n          closeHandler: (event) => {\n          },\n        },\n      );\n\n      wasAutocompleteAdded = true;\n      linkFormView.urlInputView.fieldView.template.attributes.class.push('form-element--api-entity-autocomplete');\n    });\n  }\n}\n\n\n//# sourceURL=webpack://CKEditor5.entitylink/./ckeditor5_plugins/entitylink/src/entitylink.js?")},"./ckeditor5_plugins/entitylink/src/entitylinkautocomplete.js":()=>{eval("\n\n//# sourceURL=webpack://CKEditor5.entitylink/./ckeditor5_plugins/entitylink/src/entitylinkautocomplete.js?")},"./ckeditor5_plugins/entitylink/src/entitylinkediting.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ EntityLinkEditing)\n/* harmony export */ });\n/* harmony import */ var ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ckeditor5/src/core */ "ckeditor5/src/core.js");\n/* harmony import */ var ckeditor5_src_typing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ckeditor5/src/typing */ "ckeditor5/src/typing.js");\n\n\n\n/**\n * Add entitylink for the a tag.\n *\n * @private\n */\nclass EntityLinkEditing extends ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__.Plugin {\n  /**\n   * @inheritdoc\n   */\n  static get pluginName() {\n    return \'EntityLinkEditing\';\n  }\n\n  /**\n   * @inheritDoc\n   */\n  init() {\n\n  }\n}\n\n\n//# sourceURL=webpack://CKEditor5.entitylink/./ckeditor5_plugins/entitylink/src/entitylinkediting.js?')},"./ckeditor5_plugins/entitylink/src/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _entitylink__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entitylink */ "./ckeditor5_plugins/entitylink/src/entitylink.js");\n\n\n/**\n * @private\n */\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  EntityLink: _entitylink__WEBPACK_IMPORTED_MODULE_0__["default"],\n});\n\n\n//# sourceURL=webpack://CKEditor5.entitylink/./ckeditor5_plugins/entitylink/src/index.js?')},"./ckeditor5_plugins/entitylink/src/utils.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   dropdownElements: () => (/* binding */ dropdownElements)\n/* harmony export */ });\nconst dropdownElements = {\n  // linkEntityType: {\n  //   viewOptions: {\n  //     autocompleteUrl: '/ckeditor_entity_link/autocomplete',\n  //     profile: 'default',\n  //     options: drupalSettings.ckeditor_entity_link\n  //   }\n  // },\n  linkEntityType: {\n    label: Drupal.t('Title1'),\n    viewAttribute: 'title1',\n  }\n}\n\n\n\n\n//# sourceURL=webpack://CKEditor5.entitylink/./ckeditor5_plugins/entitylink/src/utils.js?")},"ckeditor5/src/core.js":(module,__unused_webpack_exports,__webpack_require__)=>{eval('module.exports = (__webpack_require__(/*! dll-reference CKEditor5.dll */ "dll-reference CKEditor5.dll"))("./src/core.js");\n\n//# sourceURL=webpack://CKEditor5.entitylink/delegated_./core.js_from_dll-reference_CKEditor5.dll?')},"ckeditor5/src/typing.js":(module,__unused_webpack_exports,__webpack_require__)=>{eval('module.exports = (__webpack_require__(/*! dll-reference CKEditor5.dll */ "dll-reference CKEditor5.dll"))("./src/typing.js");\n\n//# sourceURL=webpack://CKEditor5.entitylink/delegated_./typing.js_from_dll-reference_CKEditor5.dll?')},"ckeditor5/src/ui.js":(module,__unused_webpack_exports,__webpack_require__)=>{eval('module.exports = (__webpack_require__(/*! dll-reference CKEditor5.dll */ "dll-reference CKEditor5.dll"))("./src/ui.js");\n\n//# sourceURL=webpack://CKEditor5.entitylink/delegated_./ui.js_from_dll-reference_CKEditor5.dll?')},"ckeditor5/src/utils.js":(module,__unused_webpack_exports,__webpack_require__)=>{eval('module.exports = (__webpack_require__(/*! dll-reference CKEditor5.dll */ "dll-reference CKEditor5.dll"))("./src/utils.js");\n\n//# sourceURL=webpack://CKEditor5.entitylink/delegated_./utils.js_from_dll-reference_CKEditor5.dll?')},"dll-reference CKEditor5.dll":e=>{"use strict";e.exports=CKEditor5.dll}},__webpack_module_cache__={};function __webpack_require__(e){var _=__webpack_module_cache__[e];if(void 0!==_)return _.exports;var n=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e](n,n.exports,__webpack_require__),n.exports}__webpack_require__.n=e=>{var _=e&&e.__esModule?()=>e.default:()=>e;return __webpack_require__.d(_,{a:_}),_},__webpack_require__.d=(e,_)=>{for(var n in _)__webpack_require__.o(_,n)&&!__webpack_require__.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:_[n]})},__webpack_require__.o=(e,_)=>Object.prototype.hasOwnProperty.call(e,_),__webpack_require__.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var __webpack_exports__=__webpack_require__("./ckeditor5_plugins/entitylink/src/index.js");return __webpack_exports__=__webpack_exports__.default,__webpack_exports__})()));