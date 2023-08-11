import { Plugin } from 'ckeditor5/src/core';
import { findAttributeRange } from 'ckeditor5/src/typing';

/**
 * Add entitylink for the a tag.
 *
 * @private
 */
export default class EntityLinkEditing extends Plugin {
  /**
   * @inheritdoc
   */
  static get pluginName() {
    return 'EntityLinkEditing';
  }

  /**
   * @inheritDoc
   */
  init() {

  }
}
