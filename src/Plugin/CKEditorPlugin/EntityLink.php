<?php

/**
 * @file
 * Contains \Drupal\ckeditor\Plugin\CKEditorPlugin\DrupalLink.
 */

namespace Drupal\ckeditor_entity_link\Plugin\CKEditorPlugin;

use Drupal\ckeditor\CKEditorPluginBase;
use Drupal\editor\Entity\Editor;

/**
 * Defines the "entitylink" plugin.
 *
 * @CKEditorPlugin(
 *   id = "entitylink",
 *   label = @Translation("Entity link"),
 * )
 */
class EntityLink extends CKEditorPluginBase {

  /**
   * {@inheritdoc}
   */
  public function getFile() {
    return drupal_get_path('module', 'ckeditor_entity_link') . '/js/plugins/entitylink/plugin.js';
  }

  /**
   * {@inheritdoc}
   */
  public function getLibraries(Editor $editor) {
    return array(
      'core/drupal.ajax',
    );
  }

  /**
   * {@inheritdoc}
   */
  public function getConfig(Editor $editor) {
    return array(
      'EntityLink_dialogTitleAdd' => t('Add Entity Link'),
      'EntityLink_dialogTitleEdit' => t('Edit Entity Link'),
    );
  }

  /**
   * {@inheritdoc}
   */
  public function getButtons() {
    $path = drupal_get_path('module', 'ckeditor_entity_link') . '/js/plugins/entitylink';
    return array(
      'EntityLink' => array(
        'label' => t('Link'),
        'image' => $path . '/link.png',
      ),
    );
  }

}
