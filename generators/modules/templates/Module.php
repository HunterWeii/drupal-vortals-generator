<?php
  namespace Drupal\<%= module_name %>\Plugin\Block;

  use Drupal\Core\Block\BlockBase;
  use Drupal\Core\Form\FormStateInterface;

  /**
   * Provides a '<%= module_uppercase_name %>' Block.
   *
   * @Block(
   *   id = "<%= module_name %>",
   *   admin_label = @Translation("<%= module_uppercase_name %>"),
   * )
   */

  class <%= module_class_name %> extends BlockBase {
    /**
     * {@inheritdoc}
     */
    public function build() {
      $config = $this->getConfiguration();
      $message = $config['message'] ?? 'Meow is the best in the world';

      return [
        '#theme' => '<%= module_name %>',
        '#message' => $message,
      ];
    }

    /**
     * {@inheritdoc}
     */
    public function blockForm($form, FormStateInterface $form_state) {
      $form['message'] = [
        '#type' => 'textfield',
        '#title' => $this->t('Message'),
        '#default_value' => $this->configuration['message'] ?? 'Meow is the best in the world',
      ];

      return $form;
    }
    
    /**
     * {@inheritdoc}
     */
    public function blockSubmit($form, FormStateInterface $form_state) {
      $this->configuration['message'] = $form_state -> getValue('message');
      return;
    }

    /**
     * {@inheritdoc}
     */
    public function getCacheMaxAge() {
      return 0; // Disable caching for this block.
    }
  }

?>