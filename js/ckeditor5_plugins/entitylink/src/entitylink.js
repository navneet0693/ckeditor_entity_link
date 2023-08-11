import { Plugin } from 'ckeditor5/src/core';
import EntityLinkEditing from './entitylinkediting';
import { Model, createDropdown, addListToDropdown, LabeledFieldView, createLabeledInputText } from 'ckeditor5/src/ui';
import { Collection } from 'ckeditor5/src/utils';
import initializeEntityLinkAutocomplete from './entitylinkautocomplete';
import { dropdownElements } from './utils';

/**
 * Drupal-specific plugin to update link elements in CKEditor 5.
 *
 * @private
 */
export default class EntityLink extends Plugin {
  /**
   * @inheritdoc
   */
  static get requires() {
    return [EntityLinkEditing];
  }

  /**
   * @inheritdoc
   */
  static get pluginName() {
    return 'EntityLink';
  }

  init() {
    this._state = {};
    const editor = this.editor;
    const options = dropdownElements.linkEntityType.viewOptions;
    this._createDropdownExtraFormField();
    this._enableLinkAutocomplete();
  }

  /**
   * Create Select field to get data from config.
   */
  _createDropdownExtraFormField() {
    const editor = this.editor;
    const t = editor.t;
    const locale = editor.locale;
    const linkFormView = editor.plugins.get( 'LinkUI' ).formView;
    const accessibleLabel = t( 'Link type' );

    const itemDefinitions = new Collection();
    const def = {
      type: 'button',
      model: new Model({
        label: 'Content',
        withText: true
      })
    };
    itemDefinitions.add( def );
    const extraFieldView = new  createDropdown( locale );
    addListToDropdown( extraFieldView, itemDefinitions, {
      ariaLabel: accessibleLabel,
      role: 'menu'
    } );

    extraFieldView.buttonView.set({
      ariaLabel: accessibleLabel,
      ariaLabelledBy: undefined,
      isOn: false,
      withText: true,
      tooltip: accessibleLabel
    } );

    linkFormView.children.add( extraFieldView, 0 );

    linkFormView.on( 'render', () => {
      linkFormView._focusables.add( extraFieldView, 0 );
      linkFormView.focusTracker.add( extraFieldView.element );
    } );

    linkFormView['entitytype'] = extraFieldView;
  }

  /**
   * Add auto complete to the link field
   */
  _enableLinkAutocomplete() {
    const editor = this.editor;
    const linkFormView = editor.plugins.get( 'LinkUI' ).formView;
    let wasAutocompleteAdded = false;

    linkFormView.extendTemplate( {
      attributes: {
        class: ['ck-vertical-form', 'ck-link-form_layout-vertical']
      },
    });

    editor.plugins.get( 'ContextualBalloon' )._rotatorView.content.on('add', ( evt, view ) => {
      if ( view !== linkFormView || wasAutocompleteAdded ) {
        return;
      }

      initializeEntityLinkAutocomplete (
        linkFormView.urlInputView.fieldView.element,
        {
          ...options,
          selectHandler: (event, { item }) => {
            if (!item.path) {
              throw 'Missing path param.' + JSON.stringify(item);
            }

            event.target.value = item.path;
            return false;
          },
          openHandler: (event) => {
          },
          closeHandler: (event) => {
          },
        },
      );

      wasAutocompleteAdded = true;
      linkFormView.urlInputView.fieldView.template.attributes.class.push('form-element--api-entity-autocomplete');
    });
  }
}
