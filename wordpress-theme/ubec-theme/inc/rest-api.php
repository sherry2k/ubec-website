<?php
/**
 * UBEC REST API Extensions
 */

if (!defined('ABSPATH')) exit;

/**
 * Add custom fields to REST API responses
 */
function ubec_register_rest_fields() {
    
    // Projects
    register_rest_field('project', 'ubec_meta', array(
        'get_callback' => function($post) {
            return array(
                'location'      => get_post_meta($post['id'], '_project_location', true),
                'services'      => explode(',', get_post_meta($post['id'], '_project_services', true)),
                'featured'      => get_post_meta($post['id'], '_project_featured', true) === '1',
                'featured_image' => get_the_post_thumbnail_url($post['id'], 'large'),
            );
        },
        'schema' => null,
    ));
    
    // Tenders
    register_rest_field('tender', 'ubec_meta', array(
        'get_callback' => function($post) {
            return array(
                'location'      => get_post_meta($post['id'], '_tender_location', true),
                'deadline'      => get_post_meta($post['id'], '_tender_deadline', true),
                'drawings_link' => get_post_meta($post['id'], '_tender_drawings', true),
                'featured_image' => get_the_post_thumbnail_url($post['id'], 'large'),
            );
        },
        'schema' => null,
    ));
    
    // Services
    register_rest_field('service', 'ubec_meta', array(
        'get_callback' => function($post) {
            return array(
                'icon'          => get_post_meta($post['id'], '_service_icon', true),
                'featured_image' => get_the_post_thumbnail_url($post['id'], 'medium'),
            );
        },
        'schema' => null,
    ));
    
    // Testimonials
    register_rest_field('testimonial', 'ubec_meta', array(
        'get_callback' => function($post) {
            return array(
                'company'       => get_post_meta($post['id'], '_testimonial_company', true),
                'role'          => get_post_meta($post['id'], '_testimonial_role', true),
                'client_photo'  => get_the_post_thumbnail_url($post['id'], 'thumbnail'),
            );
        },
        'schema' => null,
    ));
    
    // Partners
    register_rest_field('partner', 'ubec_meta', array(
        'get_callback' => function($post) {
            return array(
                'logo' => get_the_post_thumbnail_url($post['id'], 'medium'),
            );
        },
        'schema' => null,
    ));
    
    // Blog Posts
    register_rest_field('post', 'ubec_meta', array(
        'get_callback' => function($post) {
            $content = get_post_field('post_content', $post['id']);
            $word_count = str_word_count(strip_tags($content));
            $read_time = ceil($word_count / 200); // Average reading speed
            
            return array(
                'read_time'     => $read_time . ' min read',
                'featured_image' => get_the_post_thumbnail_url($post['id'], 'large'),
                'category_names' => wp_get_post_terms($post['id'], 'category', array('fields' => 'names')),
            );
        },
        'schema' => null,
    ));
}
add_action('rest_api_init', 'ubec_register_rest_fields');

/**
 * Register custom API endpoints
 */
function ubec_register_api_routes() {
    
    // Site Settings
    register_rest_route('ubec/v1', '/settings', array(
        'methods'  => 'GET',
        'callback' => 'ubec_get_settings',
        'permission_callback' => '__return_true',
    ));
    
    // Contact Form Submission
    register_rest_route('ubec/v1', '/contact', array(
        'methods'  => 'POST',
        'callback' => 'ubec_submit_contact',
        'permission_callback' => '__return_true',
    ));
    
    // All Content (for initial load)
    register_rest_route('ubec/v1', '/all-content', array(
        'methods'  => 'GET',
        'callback' => 'ubec_get_all_content',
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'ubec_register_api_routes');

/**
 * Get site settings
 */
function ubec_get_settings() {
    return array(
        'site_title'    => get_bloginfo('name'),
        'tagline'       => get_bloginfo('description'),
        'logo'          => wp_get_attachment_url(get_theme_mod('custom_logo')),
        'phone'         => get_theme_mod('ubec_phone', '+971 XX XXX XXXX'),
        'email'         => get_theme_mod('ubec_email', 'info@ubec.ae'),
        'address'       => get_theme_mod('ubec_address', 'Abu Dhabi, United Arab Emirates'),
        'working_hours' => get_theme_mod('ubec_hours', 'Sun-Thu: 8:00 AM - 6:00 PM'),
        'whatsapp'      => get_theme_mod('ubec_whatsapp', '+971000000000'),
        'map_embed'     => get_theme_mod('ubec_map_embed', ''),
        'social' => array(
            'linkedin'  => get_theme_mod('ubec_linkedin', '#'),
            'instagram' => get_theme_mod('ubec_instagram', '#'),
            'facebook'  => get_theme_mod('ubec_facebook', '#'),
            'twitter'   => get_theme_mod('ubec_twitter', '#'),
        ),
        'hero' => array(
            'headline'    => get_theme_mod('ubec_hero_headline', 'Engineering Vision. Building the Future.'),
            'subheadline' => get_theme_mod('ubec_hero_subheadline', 'Universal Building Engineering Consultants LLC delivers innovative architectural, structural, MEP, project management, and authority approval solutions across the UAE.'),
            'background'  => get_theme_mod('ubec_hero_bg', ''),
        ),
        'stats' => array(
            array('value' => get_theme_mod('ubec_stat_projects', '200'), 'suffix' => '+', 'label' => 'Projects Delivered'),
            array('value' => get_theme_mod('ubec_stat_years', '10'), 'suffix' => '+', 'label' => 'Years Experience'),
            array('value' => get_theme_mod('ubec_stat_satisfaction', '98'), 'suffix' => '%', 'label' => 'Client Satisfaction'),
            array('value' => get_theme_mod('ubec_stat_compliance', '100'), 'suffix' => '%', 'label' => 'Municipality Compliance'),
        ),
    );
}

/**
 * Submit contact form
 */
function ubec_submit_contact($request) {
    $params = $request->get_json_params();
    
    // Validate
    $name    = sanitize_text_field($params['name'] ?? '');
    $email   = sanitize_email($params['email'] ?? '');
    $phone   = sanitize_text_field($params['phone'] ?? '');
    $service = sanitize_text_field($params['service'] ?? '');
    $message = sanitize_textarea_field($params['message'] ?? '');
    
    if (empty($name) || empty($email)) {
        return new WP_Error('validation_error', 'Name and email are required.', array('status' => 400));
    }
    
    if (!is_email($email)) {
        return new WP_Error('validation_error', 'Invalid email address.', array('status' => 400));
    }
    
    // Send notification email
    $admin_email = get_option('admin_email');
    $subject = sprintf('[UBEC Contact] New inquiry from %s', $name);
    
    $body = "New contact form submission:\n\n";
    $body .= "Name: {$name}\n";
    $body .= "Email: {$email}\n";
    $body .= "Phone: {$phone}\n";
    $body .= "Service: {$service}\n\n";
    $body .= "Message:\n{$message}\n";
    
    $headers = array(
        'Content-Type: text/plain; charset=UTF-8',
        "Reply-To: {$name} <{$email}>",
    );
    
    $sent = wp_mail($admin_email, $subject, $body, $headers);
    
    // Optionally save to database
    $post_id = wp_insert_post(array(
        'post_type'   => 'ubec_inquiry',
        'post_title'  => $name . ' - ' . current_time('mysql'),
        'post_status' => 'private',
        'meta_input'  => array(
            '_inquiry_name'    => $name,
            '_inquiry_email'   => $email,
            '_inquiry_phone'   => $phone,
            '_inquiry_service' => $service,
            '_inquiry_message' => $message,
        ),
    ));
    
    if ($sent) {
        return array(
            'success' => true,
            'message' => 'Thank you for your inquiry. We will contact you within 24 hours.',
        );
    }
    
    return new WP_Error('send_error', 'Failed to send message. Please try again.', array('status' => 500));
}

/**
 * Get all content for initial page load
 */
function ubec_get_all_content() {
    return array(
        'settings'     => ubec_get_settings(),
        'services'     => ubec_format_services(get_posts(array('post_type' => 'service', 'posts_per_page' => 20, 'orderby' => 'menu_order', 'order' => 'ASC'))),
        'projects'     => ubec_format_projects(get_posts(array('post_type' => 'project', 'posts_per_page' => 20))),
        'tenders'      => ubec_format_tenders(get_posts(array('post_type' => 'tender', 'posts_per_page' => 10))),
        'testimonials' => ubec_format_testimonials(get_posts(array('post_type' => 'testimonial', 'posts_per_page' => 10))),
        'partners'     => ubec_format_partners(get_posts(array('post_type' => 'partner', 'posts_per_page' => 20, 'orderby' => 'menu_order', 'order' => 'ASC'))),
        'posts'        => ubec_format_posts(get_posts(array('posts_per_page' => 4))),
    );
}

// Helper formatters
function ubec_format_services($posts) {
    return array_map(function($post) {
        return array(
            'title'       => $post->post_title,
            'description' => $post->post_content,
            'icon'        => get_post_meta($post->ID, '_service_icon', true),
        );
    }, $posts);
}

function ubec_format_projects($posts) {
    return array_map(function($post) {
        return array(
            'title'    => $post->post_title,
            'location' => get_post_meta($post->ID, '_project_location', true),
            'type'     => wp_get_post_terms($post->ID, 'project_type', array('fields' => 'names'))[0] ?? '',
            'services' => array_map('trim', explode(',', get_post_meta($post->ID, '_project_services', true))),
            'status'   => wp_get_post_terms($post->ID, 'project_status', array('fields' => 'names'))[0] ?? 'Completed',
            'image'    => get_the_post_thumbnail_url($post->ID, 'large'),
            'featured' => get_post_meta($post->ID, '_project_featured', true) === '1',
        );
    }, $posts);
}

function ubec_format_tenders($posts) {
    return array_map(function($post) {
        return array(
            'title'          => $post->post_title,
            'description'    => $post->post_content,
            'location'       => get_post_meta($post->ID, '_tender_location', true),
            'submissionDate' => get_post_meta($post->ID, '_tender_deadline', true),
            'drawingsLink'   => get_post_meta($post->ID, '_tender_drawings', true),
            'image'          => get_the_post_thumbnail_url($post->ID, 'large'),
        );
    }, $posts);
}

function ubec_format_testimonials($posts) {
    return array_map(function($post) {
        return array(
            'name'    => $post->post_title,
            'text'    => $post->post_content,
            'company' => get_post_meta($post->ID, '_testimonial_company', true),
            'role'    => get_post_meta($post->ID, '_testimonial_role', true),
        );
    }, $posts);
}

function ubec_format_partners($posts) {
    return array_map(function($post) {
        return $post->post_title;
    }, $posts);
}

function ubec_format_posts($posts) {
    return array_map(function($post) {
        $content = get_post_field('post_content', $post->ID);
        $word_count = str_word_count(strip_tags($content));
        $categories = wp_get_post_terms($post->ID, 'category', array('fields' => 'names'));
        
        return array(
            'title'    => $post->post_title,
            'excerpt'  => wp_trim_words($post->post_excerpt ?: $content, 25),
            'category' => $categories[0] ?? 'General',
            'date'     => get_the_date('F j, Y', $post->ID),
            'readTime' => ceil($word_count / 200) . ' min read',
            'slug'     => $post->post_name,
        );
    }, $posts);
}

/**
 * Enable CORS for headless setup
 */
function ubec_cors_headers() {
    $origin = get_http_origin();
    
    if ($origin) {
        header("Access-Control-Allow-Origin: " . esc_url_raw($origin));
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization, X-WP-Nonce");
        header("Access-Control-Allow-Credentials: true");
    }
}
add_action('rest_api_init', 'ubec_cors_headers', 15);

/**
 * Register Inquiry CPT for storing contact submissions
 */
function ubec_register_inquiry_cpt() {
    register_post_type('ubec_inquiry', array(
        'labels'       => array('name' => 'Inquiries', 'singular_name' => 'Inquiry'),
        'public'       => false,
        'show_ui'      => true,
        'show_in_menu' => true,
        'menu_icon'    => 'dashicons-email-alt',
        'supports'     => array('title'),
        'capabilities' => array(
            'create_posts' => false,
        ),
        'map_meta_cap' => true,
    ));
}
add_action('init', 'ubec_register_inquiry_cpt');
?>
