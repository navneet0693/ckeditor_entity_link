<?php

namespace Drupal\ckeditor_entity_link\Plugin\CKEditor5Plugin;

use Drupal\ckeditor5\Plugin\CKEditor5PluginDefault;
use Drupal\ckeditor5\Plugin\CKEditor5PluginDefinition;
use Drupal\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Extension\ModuleExtensionList;
use Drupal\editor\Entity\Editor;

/**
 * Defines the "entitylink" plugin.
 */
class EntityLink extends CKEditor5PluginDefault {

  /**
   * Media constructor.
   *
   * @param array $configuration
   *   A configuration array containing information about the plugin instance.
   * @param string $plugin_id
   *   The plugin_id for the plugin instance.
   * @param \Drupal\ckeditor5\Plugin\CKEditor5PluginDefinition $plugin_definition
   *   The plugin implementation definition.
   * @param \Drupal\Core\Extension\ModuleExtensionList $moduleExtensionList
   *   The module extension list.
   */
  public function __construct(array $configuration, string $plugin_id, CKEditor5PluginDefinition $plugin_definition, protected ModuleExtensionList $moduleExtensionList) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('extension.list.module'));
  }

  /**
   * {@inheritdoc}
   */
  public function getFile() {
    return $this->moduleExtensionList->getPath('ckeditor_entity_link') . '/js/plugins/entitylink/plugin.js';
  }

  /**
   * {@inheritdoc}
   */
  public function getLibraries(Editor $editor) {
    return [
      'core/drupal.ajax',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getConfig(Editor $editor) {
    return [
      'EntityLink_dialogTitleAdd' => $this->t('Add Link'),
      'EntityLink_dialogTitleEdit' => $this->t('Edit Link'),
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getButtons() {
    $path = $this->moduleExtensionList->getPath('ckeditor_entity_link') . '/js/plugins/entitylink';
    return [
      'EntityLink' => [
        'label' => $this->t('Link'),
        'image' => $path . '/link.png',
      ],
    ];
  }

}
