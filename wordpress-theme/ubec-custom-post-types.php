<?php
/**
 * UBEC Custom Post Types for WordPress
 * Add this to your theme's functions.php or create as a plugin
 */

// Register Projects CPT
function ubec_register_projects() {
    $labels = array(
        'name'               => 'Projects',
        'singular_name'      => 'Project',
        'menu_name'          => 'Projects',
        'add_new'            => 'Add New Project',
        'add_new_item'       => 'Add New Project',
        'edit_item'          => 'Edit Project',
        'new_item'           => 'New Project',
        'view_item'          => 'View Project',
        'search_items'       => 'Search Projects',
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'has_archive'        => true,
        'menu_icon'          => 'dashicons-building',
        'supports'           => array('title', 'editor', 'thumbnail', 'excerpt'),
        'show_in_rest'       => true, // Enable REST API
        'rest_base'          => 'projects',
    );

    register_post_type('project', $args);
}
add_action('init', 'ubec_register_projects');

// Register Tenders CPT
function ubec_register_tenders() {
    $labels = array(
        'name'               => 'Tenders',
        'singular_name'      => 'Tender',
        'menu_name'          => 'Tenders',
        'add_new'            => 'Add New Tender',
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'has_archive'        => true,
        'menu_icon'          => 'dashicons-media-document',
        'supports'           => array('title', 'editor', 'thumbnail'),
        'show_in_rest'       => true,
        'rest_base'          => 'tenders',
    );

    register_post_type('tender', $args);
}
add_action('init', 'ubec_register_tenders');

// Register Services CPT
function ubec_register_services() {
    $labels = array(
        'name'               => 'Services',
        'singular_name'      => 'Service',
        'menu_name'          => 'Services',
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'has_archive'        => false,
        'menu_icon'          => 'dashicons-hammer',
        'supports'           => array('title', 'editor', 'thumbnail'),
        'show_in_rest'       => true,
        'rest_base'          => 'services',
    );

    register_post_type('service', $args);
}
add_action('init', 'ubec_register_services');

// Register Testimonials CPT
function ubec_register_testimonials() {
    $labels = array(
        'name'               => 'Testimonials',
        'singular_name'      => 'Testimonial',
        'menu_name'          => 'Testimonials',
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'has_archive'        => false,
        'menu_icon'          => 'dashicons-format-quote',
        'supports'           => array('title', 'editor', 'thumbnail'),
        'show_in_rest'       => true,
        'rest_base'          => 'testimonials',
    );

    register_post_type('testimonial', $args);
}
add_action('init', 'ubec_register_testimonials');

// Register Partners CPT
function ubec_register_partners() {
    $args = array(
        'labels'             => array('name' => 'Partners', 'singular_name' => 'Partner'),
        'public'             => true,
        'menu_icon'          => 'dashicons-groups',
        'supports'           => array('title', 'thumbnail'),
        'show_in_rest'       => true,
        'rest_base'          => 'partners',
    );

    register_post_type('partner', $args);
}
add_action('init', 'ubec_register_partners');

// Add ACF fields to REST API
function ubec_add_acf_to_rest() {
    $post_types = array('project', 'tender', 'service', 'testimonial', 'partner', 'post');
    
    foreach ($post_types as $post_type) {
        register_rest_field($post_type, 'acf', array(
            'get_callback' => function($object) {
                return get_fields($object['id']);
            },
            'schema' => null,
        ));
    }
}
add_action('rest_api_init', 'ubec_add_acf_to_rest');

// Enable CORS for headless setup
function ubec_add_cors_headers() {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
}
add_action('rest_api_init', 'ubec_add_cors_headers');

// Add custom REST endpoint for site settings
function ubec_register_settings_endpoint() {
    register_rest_route('ubec/v1', '/settings', array(
        'methods'  => 'GET',
        'callback' => 'ubec_get_site_settings',
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'ubec_register_settings_endpoint');

function ubec_get_site_settings() {
    return array(
        'site_title'    => get_bloginfo('name'),
        'tagline'       => get_bloginfo('description'),
        'phone'         => get_option('ubec_phone', '+971 XX XXX XXXX'),
        'email'         => get_option('ubec_email', 'info@ubec.ae'),
        'address'       => get_option('ubec_address', 'Abu Dhabi, UAE'),
        'working_hours' => get_option('ubec_working_hours', 'Sun-Thu: 8AM-6PM'),
        'whatsapp'      => get_option('ubec_whatsapp', '+971000000000'),
        'social_links'  => array(
            'linkedin'  => get_option('ubec_linkedin', '#'),
            'instagram' => get_option('ubec_instagram', '#'),
            'facebook'  => get_option('ubec_facebook', '#'),
            'twitter'   => get_option('ubec_twitter', '#'),
        ),
    );
}
?>
