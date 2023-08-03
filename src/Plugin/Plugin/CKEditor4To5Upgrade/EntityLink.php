<?php

namespace Drupal\ckeditor_entity_link\Plugin\CKEditor4To5Upgrade;

use Drupal\ckeditor5\HTMLRestrictions;
use Drupal\ckeditor5\Plugin\CKEditor4To5UpgradePluginInterface;
use Drupal\Core\Plugin\PluginBase;
use Drupal\filter\FilterFormatInterface;

/**
 * Provides the CKEditor 4 to 5 upgrade for CKEditor CodeMirror.
 *
 * @CKEditor4To5Upgrade(
 *   id = "entitylink",
 *   cke4_buttons = {
 *     "EntityLink"
 *   }
 * )
 */
class EntityLink extends PluginBase implements CKEditor4To5UpgradePluginInterface {

  /**
   * {@inheritdoc}
   */
  public function mapCkeditor4ToolbarButtonToCkeditor5ToolbarItem(string $cke4_button, HTMLRestrictions $text_format_html_restrictions): ?array {
    switch ($cke4_button) {
      // @see \Drupal\ckeditor_entity_link\Plugin\CKEditorPlugin\EntityLink
      case 'EntityLink':
        return ['link'];

      default:
        throw new \OutOfBoundsException();
    }
  }

  /**
   * {@inheritdoc}
   */
  public function mapCkeditor4SettingsToCkeditor5Configuration(string $cke4_plugin_id, array $cke4_plugin_settings): ?array {
    throw new \OutOfBoundsException();
  }

  /**
   * {@inheritdoc}
   */
  public function computeCkeditor5PluginSubsetConfiguration(string $cke5_plugin_id, FilterFormatInterface $text_format): ?array {
    throw new \OutOfBoundsException();
  }

}
