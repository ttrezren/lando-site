<?php
/**
 * @file
 * Contains functions to alter Backdrops's markup for the newtheme theme.
 *      ████████
*     ███░░▓▓▓▓███
*     █░░░░▓▓▓▓░░█
*    █░░░░▓▓▓▓▓▓░░█
*   ██░░░▓▓░░░░▓▓░██
*   █▓▓▓▓▓░░░░░░▓▓▓█
*   █▓░░▓▓░░░░░░▓▓▓█
*   █░░░░▓░░░░░░▓▓░█
*   █░░░░▓▓░░░░▓▓░░█
*   █▓░░▓▓▓▓▓▓▓▓▓░░█
*   █▓▓▓████████▓▓░█
*    ███░░█░░█░░███
*     █░░░█░░█░░░█
*     █░░░░░░░░░░█
*      █░░░░░░░░█
*       ████████
 *
 * The newtheme theme is a base theme designed to be easily extended by sub
 * themes. You should not modify this or any other file in the newtheme theme
 * folder. Instead, you should create a sub-theme and make your changes there.
 * In fact, if you're reading this, you may already off on the wrong foot.
 *
 * See the project page for more information:
 *   https://backdropcms.org/guide/themes
 */


//////////////////////////////
// Includes
//////////////////////////////

/**
 * Implements hook_preprocess_maintenance_page().
 */
function newtheme_preprocess_maintenance_page(&$variables) {
  backdrop_add_css(backdrop_get_path('theme', 'newtheme') . '/css/maintenance-page.css');
}

/**
 * Implements hook_preprocess_layout().
 */
function newtheme_preprocess_layout(&$variables) {
  if ($variables['content']['header']) {
    $variables['content']['header'] = '<div class="l-header-inner">' . $variables['content']['header'] . '</div>';
  }
}

/**
 * Implements theme_menu_tree().
 */
function newtheme_menu_tree($variables) {
  return '<ul class="menu clearfix">' . $variables['tree'] . '</ul>';
}

/**
 * Implements theme_field__field_type().
 */
function newtheme_field__taxonomy_term_reference($variables) {
  $output = '';

  // Render the label, if it's not hidden.
  if (!$variables['label_hidden']) {
    $output .= '<h3 class="field-label">' . $variables['label'] . ': </h3>';
  }

  // Render the items.
  $output .= ($variables['element']['#label_display'] == 'inline') ? '<ul class="links inline">' : '<ul class="links">';
  foreach ($variables['items'] as $delta => $item) {
    $item_attributes = (isset($variables['item_attributes'][$delta])) ? backdrop_attributes($variables['item_attributes'][$delta]) : '';
    $output .= '<li class="taxonomy-term-reference-' . $delta . '"' . $item_attributes . '>' . backdrop_render($item) . '</li>';
  }
  $output .= '</ul>';

  // Render the surrounding DIV with appropriate classes and attributes.
  if (!in_array('clearfix', $variables['classes'])) {
    $variables['classes'][] = 'clearfix';
  }
  $output = '<div class="' . implode(' ', $variables['classes']) . '"' . backdrop_attributes($variables['attributes']) . '>' . $output . '</div>';

  return $output;
}
