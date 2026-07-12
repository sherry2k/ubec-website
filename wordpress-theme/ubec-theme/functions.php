<?php
/**
 * UBEC Theme Functions
 */

if (!defined('ABSPATH')) exit;

/**
 * Theme Setup
 */
function ubec_theme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
    add_theme_support('custom-logo');
    
    // Register navigation menus
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'ubec'),
        'footer'  => __('Footer Menu', 'ubec'),
    ));
}
add_action('after_setup_theme', 'ubec_theme_setup');

/**
 * Enqueue Scripts and Styles
 */
function ubec_enqueue_assets() {
    $theme_dir = get_template_directory();
    $theme_uri = get_template_directory_uri();
    
    // Find React build assets
    $assets_dir = $theme_dir . '/dist/assets/';
    
    if (is_dir($assets_dir)) {
        $files = scandir($assets_dir);
        
        foreach ($files as $file) {
            $ext = pathinfo($file, PATHINFO_EXTENSION);
            
            if ($ext === 'js' && strpos($file, 'index') !== false) {
                wp_enqueue_script(
                    'ubec-react-app',
                    $theme_uri . '/dist/assets/' . $file,
                    array(),
                    UBEC_VERSION,
                    true
                );
            }
            
            if ($ext === 'css') {
                wp_enqueue_style(
                    'ubec-react-styles',
                    $theme_uri . '/dist/assets/' . $file,
                    array(),
                    UBEC_VERSION
                );
            }
        }
    }
    
    // Pass data to React
    wp_localize_script('ubec-react-app', 'UBEC_CONFIG', array(
        'api_url'    => esc_url(rest_url('ubec/v1/')),
        'wp_api_url' => esc_url(rest_url('wp/v2/')),
        'nonce'      => wp_create_nonce('wp_rest'),
        'site_url'   => esc_url(home_url('/')),
        'theme_url'  => esc_url($theme_uri),
        'is_admin'   => current_user_can('manage_options'),
    ));
}
add_action('wp_enqueue_scripts', 'ubec_enqueue_assets');

/**
 * Theme Version
 */
define('UBEC_VERSION', '1.0.0');

/**
 * Include Custom Post Types
 */
require_once get_template_directory() . '/inc/custom-post-types.php';

/**
 * Include REST API Extensions
 */
require_once get_template_directory() . '/inc/rest-api.php';

/**
 * Include Theme Customizer
 */
require_once get_template_directory() . '/inc/customizer.php';

/**
 * Admin Notice for Setup
 */
function ubec_admin_notice() {
    $dist_dir = get_template_directory() . '/dist/';
    
    if (!is_dir($dist_dir) || !file_exists($dist_dir . 'index.html')) {
        ?>
        <div class="notice notice-warning">
            <p><strong>UBEC Theme:</strong> React build files not found. Please run <code>npm run build</code> and copy the <code>dist</code> folder to the theme directory.</p>
        </div>
        <?php
    }
}
add_action('admin_notices', 'ubec_admin_notice');

/**
 * Disable Gutenberg for Custom Post Types (optional)
 */
function ubec_disable_gutenberg($current_status, $post_type) {
    $disabled_types = array('project', 'tender', 'service', 'testimonial', 'partner');
    if (in_array($post_type, $disabled_types)) {
        return false;
    }
    return $current_status;
}
add_filter('use_block_editor_for_post_type', 'ubec_disable_gutenberg', 10, 2);
?>
