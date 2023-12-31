<?php

namespace Drupal\ckeditor_entity_link\Form;

use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\CloseModalDialogCommand;
use Drupal\Core\Ajax\HtmlCommand;
use Drupal\Core\Ajax\ReplaceCommand;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\EntityRepositoryInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\File\FileUrlGeneratorInterface;
use Drupal\Core\Form\BaseFormIdInterface;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\editor\Ajax\EditorDialogSave;
use Drupal\filter\Entity\FilterFormat;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides a link dialog for text editors.
 */
class CKEditorEntityLinkDialog extends FormBase implements BaseFormIdInterface {

  /**
   * CKEditorEntityLinkDialog constructor.
   */
  public function __construct(
    protected EntityTypeManagerInterface $entityTypeManager,
    protected EntityRepositoryInterface $entityRepository,
    protected FileUrlGeneratorInterface $fileUrlGenerator) {
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('entity_type.manager'),
      $container->get('entity.repository'),
      $container->get('file_url_generator')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId(): string {
    return 'ckeditor_entity_link_dialog';
  }

  /**
   * {@inheritdoc}
   */
  public function getBaseFormId(): ?string {
    // Use the EditorLinkDialog form id to ease alteration.
    return 'editor_link_dialog';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state, FilterFormat $filter_format = NULL): array {
    $config = $this->config('ckeditor_entity_link.settings');

    // The default values are set directly from \Drupal::request()->request,
    // provided by the editor plugin opening the dialog.
    $form['#tree'] = TRUE;
    $form['#attached']['library'][] = 'editor/drupal.editor.dialog';
    $form['#prefix'] = '<div id="ckeditor-entity-link-dialog-form">';
    $form['#suffix'] = '</div>';

    $entity_types = $this->entityTypeManager->getDefinitions();
    $types = [];
    foreach ($config->get('entity_types') as $type => $selected) {
      if ($selected) {
        $types[$type] = $entity_types[$type]->getLabel();
      }
    }

    $form['entity_type'] = [
      '#type' => 'select',
      '#title' => $this->t('Link type'),
      '#options' => $types,
      '#default_value' => 'node',
      '#required' => TRUE,
      '#size' => 1,
      '#ajax' => [
        'callback' => '::updateTypeSettings',
        'effect' => 'fade',
      ],
    ];

    $entity_type = empty($form_state->getValue('entity_type')) ? 'node' : $form_state->getValue('entity_type');
    $bundles = [];
    foreach ($config->get($entity_type . '_bundles') as $bundle => $selected) {
      if ($selected) {
        $bundles[] = $bundle;
      }
    }

    $form['entity_id'] = [
      '#type' => 'entity_autocomplete',
      '#target_type' => $entity_type,
      '#title' => $this->t('Link'),
      '#required' => TRUE,
      '#prefix' => '<div id="entity-id-wrapper">',
      '#suffix' => '</div>',
    ];

    if (!empty($bundles)) {
      $form['entity_id']['#selection_settings']['target_bundles'] = $bundles;
    }

    $form['actions'] = [
      '#type' => 'actions',
    ];
    $form['actions']['save_modal'] = [
      '#type' => 'submit',
      '#value' => $this->t('Save'),
      // No regular submit-handler. This form only works via JavaScript.
      '#submit' => [],
      '#ajax' => [
        'callback' => '::submitForm',
        'event' => 'click',
      ],
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state): AjaxResponse {
    $response = new AjaxResponse();

    if ($form_state->getErrors()) {
      unset($form['#prefix'], $form['#suffix']);
      $form['status_messages'] = [
        '#type' => 'status_messages',
        '#weight' => -10,
      ];
      $response->addCommand(new HtmlCommand('#ckeditor-entity-link-dialog-form', $form));
    }
    else {
      $entity = $this->entityTypeManager
        ->getStorage($form_state->getValue('entity_type'))
        ->load($form_state->getValue('entity_id'));

      // Get the entity translation from context.
      $entity = $this->entityRepository->getTranslationFromContext($entity);
      $values = [
        'attributes' => [
          'href' => $this->getUrl($entity),
        ] + $form_state->getValue('attributes', []),
      ];

      $response->addCommand(new EditorDialogSave($values));
      $response->addCommand(new CloseModalDialogCommand());
    }

    return $response;
  }

  /**
   * Helper function to return entity url.
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   * @throws \Drupal\Core\Entity\EntityMalformedException
   */
  public function getUrl(EntityInterface $entity): string {
    switch ($entity->getEntityType()->get('id')) {
      case 'menu_link_content':
        return $entity->getUrlObject()->toString();

      case 'shortcut':
        return $entity->getUrl()->toString();

      case 'file':
        return $entity->createFileUrl();

      case 'media':
        $media_source = $entity->getSource();
        // Handle remote video.
        if ($entity->hasField('field_media_oembed_video')) {
          $url = $entity->get('field_media_oembed_video')->getString();
          if (!empty($url)) {
            return $url;
          }
        }

        // Handle file attachments.
        $fid = $media_source->getSourceFieldValue($entity);
        $file = $this->entityTypeManager->getStorage('file')->load($fid);
        if ($file) {
          $url = $this->fileUrlGenerator->generateAbsoluteString($file->getFileUri());
          return parse_url($url, PHP_URL_PATH);
        }
        // In all other cases.
        return $entity->toUrl()->toString();

      default:
        return $entity->toUrl()->toString();
    }
  }

  /**
   * Ajax callback to update the form fields which depend on embed type.
   */
  public function updateTypeSettings(array &$form, FormStateInterface $form_state): AjaxResponse {
    $response = new AjaxResponse();

    // Update options for entity type bundles.
    $response->addCommand(new ReplaceCommand(
      '#entity-id-wrapper',
      $form['entity_id']
    ));

    return $response;
  }

}
