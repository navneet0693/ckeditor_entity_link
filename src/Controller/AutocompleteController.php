<?php

namespace Drupal\ckeditor_entity_link\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * Returns responses for ckeditor_entity_link autocomplete routes.
 */
class AutocompleteController {

  /**
   * Menu callback for ckeditor_entity_link search autocompletion.
   *
   * Like other autocomplete functions, this function inspects the 'q' query
   * parameter for the string to use to search for suggestions.
   *
   * @param \Symfony\Component\HttpFoundation\Request $request
   *   The request.
   * @param string $entity
   *   The entity name.
   *
   * @return \Symfony\Component\HttpFoundation\JsonResponse
   *   A JSON response containing the autocomplete suggestions.
   */
  public function autocomplete(Request $request, $entity) {
    $suggestionCollection = [];
dump($request);
//    $entity = $this->entityTypeManager
//      ->getStorage($form_state->getValue('entity_type'))
//      ->load($form_state->getValue('entity_id'));
//
//    // Get the entity translation from context.
//    $entity = $this->entityRepository->getTranslationFromContext($entity);
//    $values = [
//      'attributes' => [
//          'href' => $this->getUrl($entity),
//        ] + $form_state->getValue('attributes', []),
//    ];

    return new JsonResponse($suggestionCollection);
  }

}
