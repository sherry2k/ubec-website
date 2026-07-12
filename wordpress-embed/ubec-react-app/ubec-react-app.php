<?php
/**
 * Plugin Name: UBEC React Website
 * Description: Embeds the Universal Building Engineering Consultants React website
 * Version: 1.0.0
 * Author: UBEC
 */

if (!defined('ABSPATH')) exit;

class UBEC_React_App {
    
    private static $instance = null;
    
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    private function __construct() {
        add_action('init', array($this, 'register_shortcode'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_assets'));
        add_action('rest_api_init', array($this, 'register_api_routes'));
    }
    
    /**
     * Register the shortcode [ubec_website]
     */
    public function register_shortcode() {
        add_shortcode('ubec_website', array($this, 'render_app'));
    }
    
    /**
     * Render the React app container
     */
    public function render_app($atts) {
        $atts = shortcode_atts(array(
            'section' => '', // Optional: render specific section only
        ), $atts);
        
        // Enqueue the React app assets
        wp_enqueue_script('ubec-react-app');
        wp_enqueue_style('ubec-react-styles');
        
        // Pass WordPress data to React
        wp_localize_script('ubec-react-app', 'UBEC_WP', array(
            'api_url'    => rest_url('ubec/v1/'),
            'nonce'      => wp_create_nonce('wp_rest'),
            'site_url'   => home_url(),
            'assets_url' => plugin_dir_url(__FILE__) . 'dist/',
        ));
        
        $section_attr = $atts['section'] ? 'data-section="' . esc_attr($atts['section']) . '"' : '';
        
        return '<div id="ubec-root" ' . $section_attr . '></div>';
    }
    
    /**
     * Enqueue React app assets
     */
    public function enqueue_assets() {
        $dist_path = plugin_dir_path(__FILE__) . 'dist/';
        $dist_url = plugin_dir_url(__FILE__) . 'dist/';
        
        // Find the hashed JS and CSS files
        $js_file = $this->find_asset($dist_path, 'js');
        $css_file = $this->find_asset($dist_path, 'css');
        
        if ($js_file) {
            wp_register_script(
                'ubec-react-app',
                $dist_url . 'assets/' . $js_file,
                array(),
                '1.0.0',
                true
            );
        }
        
        if ($css_file) {
            wp_register_style(
                'ubec-react-styles',
                $dist_url . 'assets/' . $css_file,
                array(),
                '1.0.0'
            );
        }
    }
    
    /**
     * Find asset file by extension
     */
    private function find_asset($path, $ext) {
        $assets_path = $path . 'assets/';
        if (!is_dir($assets_path)) return null;
        
        $files = scandir($assets_path);
        foreach ($files as $file) {
            if (pathinfo($file, PATHINFO_EXTENSION) === $ext) {
                return $file;
            }
        }
        return null;
    }
    
    /**
     * Register REST API routes for contact form
     */
    public function register_api_routes() {
        register_rest_route('ubec/v1', '/contact', array(
            'methods'  => 'POST',
            'callback' => array($this, 'handle_contact_form'),
            'permission_callback' => '__return_true',
        ));
    }
    
    /**
     * Handle contact form submission
     */
    public function handle_contact_form($request) {
        $params = $request->get_json_params();
        
        $name    = sanitize_text_field($params['name'] ?? '');
        $email   = sanitize_email($params['email'] ?? '');
        $phone   = sanitize_text_field($params['phone'] ?? '');
        $service = sanitize_text_field($params['service'] ?? '');
        $message = sanitize_textarea_field($params['message'] ?? '');
        
        if (empty($name) || empty($email)) {
            return new WP_Error('missing_fields', 'Name and email are required', array('status' => 400));
        }
        
        // Send email notification
        $to = get_option('admin_email');
        $subject = 'New UBEC Contact Form Submission';
        $body = "Name: $name\nEmail: $email\nPhone: $phone\nService: $service\n\nMessage:\n$message";
        $headers = array('Content-Type: text/plain; charset=UTF-8', "Reply-To: $email");
        
        $sent = wp_mail($to, $subject, $body, $headers);
        
        if ($sent) {
            return array('success' => true, 'message' => 'Thank you! We will contact you soon.');
        } else {
            return new WP_Error('email_failed', 'Failed to send message', array('status' => 500));
        }
    }
}

// Initialize the plugin
UBEC_React_App::get_instance();
?>
