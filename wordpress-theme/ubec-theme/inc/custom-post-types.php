<?php
/**
 * UBEC Custom Post Types
 */

if (!defined('ABSPATH')) exit;

/**
 * Register all custom post types
 */
function ubec_register_post_types() {
    
    // Projects
    register_post_type('project', array(
        'labels' => array(
            'name'               => __('Projects', 'ubec'),
            'singular_name'      => __('Project', 'ubec'),
            'add_new'            => __('Add New Project', 'ubec'),
            'add_new_item'       => __('Add New Project', 'ubec'),
            'edit_item'          => __('Edit Project', 'ubec'),
            'view_item'          => __('View Project', 'ubec'),
            'search_items'       => __('Search Projects', 'ubec'),
            'not_found'          => __('No projects found', 'ubec'),
        ),
        'public'             => true,
        'has_archive'        => true,
        'menu_icon'          => 'dashicons-building',
        'supports'           => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
        'show_in_rest'       => true,
        'rest_base'          => 'projects',
        'rewrite'            => array('slug' => 'projects'),
    ));
    
    // Tenders
    register_post_type('tender', array(
        'labels' => array(
            'name'               => __('Tenders', 'ubec'),
            'singular_name'      => __('Tender', 'ubec'),
            'add_new'            => __('Add New Tender', 'ubec'),
            'add_new_item'       => __('Add New Tender', 'ubec'),
            'edit_item'          => __('Edit Tender', 'ubec'),
            'view_item'          => __('View Tender', 'ubec'),
        ),
        'public'             => true,
        'has_archive'        => true,
        'menu_icon'          => 'dashicons-clipboard',
        'supports'           => array('title', 'editor', 'thumbnail', 'custom-fields'),
        'show_in_rest'       => true,
        'rest_base'          => 'tenders',
        'rewrite'            => array('slug' => 'tenders'),
    ));
    
    // Services
    register_post_type('service', array(
        'labels' => array(
            'name'               => __('Services', 'ubec'),
            'singular_name'      => __('Service', 'ubec'),
            'add_new'            => __('Add New Service', 'ubec'),
        ),
        'public'             => true,
        'has_archive'        => false,
        'menu_icon'          => 'dashicons-admin-tools',
        'supports'           => array('title', 'editor', 'thumbnail', 'page-attributes', 'custom-fields'),
        'show_in_rest'       => true,
        'rest_base'          => 'services',
        'rewrite'            => array('slug' => 'services'),
    ));
    
    // Testimonials
    register_post_type('testimonial', array(
        'labels' => array(
            'name'               => __('Testimonials', 'ubec'),
            'singular_name'      => __('Testimonial', 'ubec'),
        ),
        'public'             => true,
        'has_archive'        => false,
        'menu_icon'          => 'dashicons-format-quote',
        'supports'           => array('title', 'editor', 'thumbnail', 'custom-fields'),
        'show_in_rest'       => true,
        'rest_base'          => 'testimonials',
    ));
    
    // Partners
    register_post_type('partner', array(
        'labels' => array(
            'name'               => __('Partners', 'ubec'),
            'singular_name'      => __('Partner', 'ubec'),
        ),
        'public'             => true,
        'has_archive'        => false,
        'menu_icon'          => 'dashicons-groups',
        'supports'           => array('title', 'thumbnail', 'page-attributes'),
        'show_in_rest'       => true,
        'rest_base'          => 'partners',
    ));
}
add_action('init', 'ubec_register_post_types');

/**
 * Register Project Taxonomies
 */
function ubec_register_taxonomies() {
    
    // Project Type
    register_taxonomy('project_type', 'project', array(
        'labels' => array(
            'name'          => __('Project Types', 'ubec'),
            'singular_name' => __('Project Type', 'ubec'),
        ),
        'hierarchical'  => true,
        'show_in_rest'  => true,
        'rest_base'     => 'project-types',
        'rewrite'       => array('slug' => 'project-type'),
    ));
    
    // Project Status
    register_taxonomy('project_status', 'project', array(
        'labels' => array(
            'name'          => __('Project Status', 'ubec'),
            'singular_name' => __('Status', 'ubec'),
        ),
        'hierarchical'  => true,
        'show_in_rest'  => true,
    ));
    
    // Service Category
    register_taxonomy('service_category', 'service', array(
        'labels' => array(
            'name'          => __('Service Categories', 'ubec'),
            'singular_name' => __('Category', 'ubec'),
        ),
        'hierarchical'  => true,
        'show_in_rest'  => true,
    ));
}
add_action('init', 'ubec_register_taxonomies');

/**
 * Add custom meta boxes for CPTs
 */
function ubec_add_meta_boxes() {
    
    // Project Meta
    add_meta_box(
        'project_details',
        __('Project Details', 'ubec'),
        'ubec_project_meta_box',
        'project',
        'normal',
        'high'
    );
    
    // Tender Meta
    add_meta_box(
        'tender_details',
        __('Tender Details', 'ubec'),
        'ubec_tender_meta_box',
        'tender',
        'normal',
        'high'
    );
    
    // Testimonial Meta
    add_meta_box(
        'testimonial_details',
        __('Client Details', 'ubec'),
        'ubec_testimonial_meta_box',
        'testimonial',
        'normal',
        'high'
    );
    
    // Service Meta
    add_meta_box(
        'service_details',
        __('Service Details', 'ubec'),
        'ubec_service_meta_box',
        'service',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'ubec_add_meta_boxes');

/**
 * Project Meta Box
 */
function ubec_project_meta_box($post) {
    wp_nonce_field('ubec_project_meta', 'ubec_project_nonce');
    
    $location = get_post_meta($post->ID, '_project_location', true);
    $services = get_post_meta($post->ID, '_project_services', true);
    $featured = get_post_meta($post->ID, '_project_featured', true);
    ?>
    <p>
        <label for="project_location"><strong><?php _e('Location:', 'ubec'); ?></strong></label><br>
        <input type="text" id="project_location" name="project_location" value="<?php echo esc_attr($location); ?>" class="widefat">
    </p>
    <p>
        <label for="project_services"><strong><?php _e('Services Provided:', 'ubec'); ?></strong></label><br>
        <input type="text" id="project_services" name="project_services" value="<?php echo esc_attr($services); ?>" class="widefat" placeholder="Architectural Design, Structural Engineering, MEP">
        <span class="description"><?php _e('Comma-separated list of services', 'ubec'); ?></span>
    </p>
    <p>
        <label>
            <input type="checkbox" name="project_featured" value="1" <?php checked($featured, '1'); ?>>
            <strong><?php _e('Featured Project', 'ubec'); ?></strong>
        </label>
    </p>
    <?php
}

/**
 * Tender Meta Box
 */
function ubec_tender_meta_box($post) {
    wp_nonce_field('ubec_tender_meta', 'ubec_tender_nonce');
    
    $location = get_post_meta($post->ID, '_tender_location', true);
    $deadline = get_post_meta($post->ID, '_tender_deadline', true);
    $drawings = get_post_meta($post->ID, '_tender_drawings', true);
    ?>
    <p>
        <label for="tender_location"><strong><?php _e('Project Location:', 'ubec'); ?></strong></label><br>
        <input type="text" id="tender_location" name="tender_location" value="<?php echo esc_attr($location); ?>" class="widefat">
    </p>
    <p>
        <label for="tender_deadline"><strong><?php _e('Submission Deadline:', 'ubec'); ?></strong></label><br>
        <input type="date" id="tender_deadline" name="tender_deadline" value="<?php echo esc_attr($deadline); ?>">
    </p>
    <p>
        <label for="tender_drawings"><strong><?php _e('Drawings Link/File:', 'ubec'); ?></strong></label><br>
        <input type="url" id="tender_drawings" name="tender_drawings" value="<?php echo esc_url($drawings); ?>" class="widefat" placeholder="https://...">
    </p>
    <?php
}

/**
 * Testimonial Meta Box
 */
function ubec_testimonial_meta_box($post) {
    wp_nonce_field('ubec_testimonial_meta', 'ubec_testimonial_nonce');
    
    $company = get_post_meta($post->ID, '_testimonial_company', true);
    $role = get_post_meta($post->ID, '_testimonial_role', true);
    ?>
    <p>
        <label for="testimonial_company"><strong><?php _e('Company:', 'ubec'); ?></strong></label><br>
        <input type="text" id="testimonial_company" name="testimonial_company" value="<?php echo esc_attr($company); ?>" class="widefat">
    </p>
    <p>
        <label for="testimonial_role"><strong><?php _e('Role/Position:', 'ubec'); ?></strong></label><br>
        <input type="text" id="testimonial_role" name="testimonial_role" value="<?php echo esc_attr($role); ?>" class="widefat">
    </p>
    <?php
}

/**
 * Service Meta Box
 */
function ubec_service_meta_box($post) {
    wp_nonce_field('ubec_service_meta', 'ubec_service_nonce');
    
    $icon = get_post_meta($post->ID, '_service_icon', true);
    $icons = array('Building2', 'Columns3', 'Zap', 'ShieldCheck', 'ClipboardList', 'HardHat', 'Palette', 'Box', 'Calculator', 'BarChart3', 'RefreshCw');
    ?>
    <p>
        <label for="service_icon"><strong><?php _e('Icon:', 'ubec'); ?></strong></label><br>
        <select id="service_icon" name="service_icon">
            <?php foreach ($icons as $i) : ?>
                <option value="<?php echo esc_attr($i); ?>" <?php selected($icon, $i); ?>><?php echo esc_html($i); ?></option>
            <?php endforeach; ?>
        </select>
    </p>
    <?php
}

/**
 * Save Meta Box Data
 */
function ubec_save_meta_boxes($post_id) {
    // Project
    if (isset($_POST['ubec_project_nonce']) && wp_verify_nonce($_POST['ubec_project_nonce'], 'ubec_project_meta')) {
        update_post_meta($post_id, '_project_location', sanitize_text_field($_POST['project_location'] ?? ''));
        update_post_meta($post_id, '_project_services', sanitize_text_field($_POST['project_services'] ?? ''));
        update_post_meta($post_id, '_project_featured', isset($_POST['project_featured']) ? '1' : '0');
    }
    
    // Tender
    if (isset($_POST['ubec_tender_nonce']) && wp_verify_nonce($_POST['ubec_tender_nonce'], 'ubec_tender_meta')) {
        update_post_meta($post_id, '_tender_location', sanitize_text_field($_POST['tender_location'] ?? ''));
        update_post_meta($post_id, '_tender_deadline', sanitize_text_field($_POST['tender_deadline'] ?? ''));
        update_post_meta($post_id, '_tender_drawings', esc_url_raw($_POST['tender_drawings'] ?? ''));
    }
    
    // Testimonial
    if (isset($_POST['ubec_testimonial_nonce']) && wp_verify_nonce($_POST['ubec_testimonial_nonce'], 'ubec_testimonial_meta')) {
        update_post_meta($post_id, '_testimonial_company', sanitize_text_field($_POST['testimonial_company'] ?? ''));
        update_post_meta($post_id, '_testimonial_role', sanitize_text_field($_POST['testimonial_role'] ?? ''));
    }
    
    // Service
    if (isset($_POST['ubec_service_nonce']) && wp_verify_nonce($_POST['ubec_service_nonce'], 'ubec_service_meta')) {
        update_post_meta($post_id, '_service_icon', sanitize_text_field($_POST['service_icon'] ?? ''));
    }
}
add_action('save_post', 'ubec_save_meta_boxes');
?>
