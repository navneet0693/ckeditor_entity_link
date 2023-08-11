<?php

declare(strict_types=1);

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
  public function autocomplete(Request $request, $entity) : array {
    $suggestionCollection = [];


    return new JsonResponse($suggestionCollection);
  }

}
