<?php
/**
 * UBEC Theme Customizer
 */

if (!defined('ABSPATH')) exit;

function ubec_customize_register($wp_customize) {
    
    // ===== UBEC Settings Panel =====
    $wp_customize->add_panel('ubec_settings', array(
        'title'    => __('UBEC Settings', 'ubec'),
        'priority' => 30,
    ));
    
    // ===== Contact Information Section =====
    $wp_customize->add_section('ubec_contact', array(
        'title' => __('Contact Information', 'ubec'),
        'panel' => 'ubec_settings',
    ));
    
    // Phone
    $wp_customize->add_setting('ubec_phone', array(
        'default'           => '+971 XX XXX XXXX',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('ubec_phone', array(
        'label'   => __('Phone Number', 'ubec'),
        'section' => 'ubec_contact',
        'type'    => 'text',
    ));
    
    // Email
    $wp_customize->add_setting('ubec_email', array(
        'default'           => 'info@ubec.ae',
        'sanitize_callback' => 'sanitize_email',
    ));
    $wp_customize->add_control('ubec_email', array(
        'label'   => __('Email Address', 'ubec'),
        'section' => 'ubec_contact',
        'type'    => 'email',
    ));
    
    // Address
    $wp_customize->add_setting('ubec_address', array(
        'default'           => 'Abu Dhabi, United Arab Emirates',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('ubec_address', array(
        'label'   => __('Office Address', 'ubec'),
        'section' => 'ubec_contact',
        'type'    => 'textarea',
    ));
    
    // Working Hours
    $wp_customize->add_setting('ubec_hours', array(
        'default'           => 'Sun-Thu: 8:00 AM - 6:00 PM',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('ubec_hours', array(
        'label'   => __('Working Hours', 'ubec'),
        'section' => 'ubec_contact',
        'type'    => 'text',
    ));
    
    // WhatsApp
    $wp_customize->add_setting('ubec_whatsapp', array(
        'default'           => '+971000000000',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('ubec_whatsapp', array(
        'label'       => __('WhatsApp Number', 'ubec'),
        'description' => __('Include country code without + or spaces', 'ubec'),
        'section'     => 'ubec_contact',
        'type'        => 'text',
    ));
    
    // Google Maps Embed
    $wp_customize->add_setting('ubec_map_embed', array(
        'default'           => '',
        'sanitize_callback' => 'esc_url_raw',
    ));
    $wp_customize->add_control('ubec_map_embed', array(
        'label'       => __('Google Maps Embed URL', 'ubec'),
        'description' => __('Paste the iframe src URL from Google Maps', 'ubec'),
        'section'     => 'ubec_contact',
        'type'        => 'url',
    ));
    
    // ===== Social Media Section =====
    $wp_customize->add_section('ubec_social', array(
        'title' => __('Social Media', 'ubec'),
        'panel' => 'ubec_settings',
    ));
    
    $social_networks = array(
        'linkedin'  => 'LinkedIn',
        'instagram' => 'Instagram',
        'facebook'  => 'Facebook',
        'twitter'   => 'Twitter/X',
    );
    
    foreach ($social_networks as $key => $label) {
        $wp_customize->add_setting('ubec_' . $key, array(
            'default'           => '#',
            'sanitize_callback' => 'esc_url_raw',
        ));
        $wp_customize->add_control('ubec_' . $key, array(
            'label'   => $label . ' URL',
            'section' => 'ubec_social',
            'type'    => 'url',
        ));
    }
    
    // ===== Hero Section =====
    $wp_customize->add_section('ubec_hero', array(
        'title' => __('Hero Section', 'ubec'),
        'panel' => 'ubec_settings',
    ));
    
    // Hero Headline
    $wp_customize->add_setting('ubec_hero_headline', array(
        'default'           => 'Engineering Vision. Building the Future.',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('ubec_hero_headline', array(
        'label'   => __('Headline', 'ubec'),
        'section' => 'ubec_hero',
        'type'    => 'text',
    ));
    
    // Hero Subheadline
    $wp_customize->add_setting('ubec_hero_subheadline', array(
        'default'           => 'Universal Building Engineering Consultants LLC delivers innovative architectural, structural, MEP, project management, and authority approval solutions across the UAE with precision, sustainability, and excellence.',
        'sanitize_callback' => 'sanitize_textarea_field',
    ));
    $wp_customize->add_control('ubec_hero_subheadline', array(
        'label'   => __('Subheadline', 'ubec'),
        'section' => 'ubec_hero',
        'type'    => 'textarea',
    ));
    
    // Hero Background Image
    $wp_customize->add_setting('ubec_hero_bg', array(
        'default'           => '',
        'sanitize_callback' => 'esc_url_raw',
    ));
    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'ubec_hero_bg', array(
        'label'   => __('Background Image', 'ubec'),
        'section' => 'ubec_hero',
    )));
    
    // ===== Statistics Section =====
    $wp_customize->add_section('ubec_stats', array(
        'title' => __('Statistics', 'ubec'),
        'panel' => 'ubec_settings',
    ));
    
    // Projects
    $wp_customize->add_setting('ubec_stat_projects', array(
        'default'           => '200',
        'sanitize_callback' => 'absint',
    ));
    $wp_customize->add_control('ubec_stat_projects', array(
        'label'   => __('Projects Delivered', 'ubec'),
        'section' => 'ubec_stats',
        'type'    => 'number',
    ));
    
    // Years
    $wp_customize->add_setting('ubec_stat_years', array(
        'default'           => '10',
        'sanitize_callback' => 'absint',
    ));
    $wp_customize->add_control('ubec_stat_years', array(
        'label'   => __('Years Experience', 'ubec'),
        'section' => 'ubec_stats',
        'type'    => 'number',
    ));
    
    // Satisfaction
    $wp_customize->add_setting('ubec_stat_satisfaction', array(
        'default'           => '98',
        'sanitize_callback' => 'absint',
    ));
    $wp_customize->add_control('ubec_stat_satisfaction', array(
        'label'   => __('Client Satisfaction %', 'ubec'),
        'section' => 'ubec_stats',
        'type'    => 'number',
    ));
    
    // Compliance
    $wp_customize->add_setting('ubec_stat_compliance', array(
        'default'           => '100',
        'sanitize_callback' => 'absint',
    ));
    $wp_customize->add_control('ubec_stat_compliance', array(
        'label'   => __('Municipality Compliance %', 'ubec'),
        'section' => 'ubec_stats',
        'type'    => 'number',
    ));
    
    // ===== About Section =====
    $wp_customize->add_section('ubec_about', array(
        'title' => __('About Section', 'ubec'),
        'panel' => 'ubec_settings',
    ));
    
    $wp_customize->add_setting('ubec_about_text', array(
        'default'           => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('ubec_about_text', array(
        'label'   => __('About Text', 'ubec'),
        'section' => 'ubec_about',
        'type'    => 'textarea',
    ));
    
    $wp_customize->add_setting('ubec_about_image', array(
        'default'           => '',
        'sanitize_callback' => 'esc_url_raw',
    ));
    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'ubec_about_image', array(
        'label'   => __('About Image', 'ubec'),
        'section' => 'ubec_about',
    )));
}
add_action('customize_register', 'ubec_customize_register');
?>
