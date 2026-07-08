# Embedding UBEC React App in WordPress

## Method A: Using an iFrame (Simplest)

1. **Deploy the React app** to any hosting service:
   - Vercel (free): `vercel deploy`
   - Netlify (free): drag & drop the `dist` folder
   - Your own server

2. **Create a WordPress page** and add this shortcode or HTML:

```html
<iframe 
  src="https://your-react-app-url.com" 
  width="100%" 
  height="100vh" 
  style="border: none; min-height: 100vh;"
  title="UBEC Engineering Consultants"
></iframe>
```

3. **For full-page takeover**, use a blank page template in your WordPress theme.

---

## Method B: Direct Script Embedding

1. **Build the React app** with modified output:

```bash
npm run build
```

2. **Upload files** to WordPress:
   - Upload the `dist` folder contents to `/wp-content/themes/your-theme/ubec-app/`
   - Or upload to `/wp-content/uploads/ubec-app/`

3. **Create a custom WordPress template** (`page-ubec.php`):

```php
<?php
/**
 * Template Name: UBEC React App
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php wp_title('|', true, 'right'); ?></title>
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
    <div id="root"></div>
    
    <!-- Include built React app -->
    <script type="module" src="<?php echo get_template_directory_uri(); ?>/ubec-app/assets/index.js"></script>
    <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/ubec-app/assets/index.css">
    
    <?php wp_footer(); ?>
</body>
</html>
```

4. **Create a new page** in WordPress and select "UBEC React App" as the template.

---

## Method C: WordPress Plugin

Create a simple plugin to embed the React app anywhere using a shortcode.

1. Create folder: `/wp-content/plugins/ubec-react-app/`

2. Add these files (see plugin files in this folder)

3. Activate the plugin in WordPress

4. Use shortcode: `[ubec_website]`

---

## Recommended Hosting Setup

### For Headless WordPress:
```
WordPress Backend: your-domain.com/admin (or wp.your-domain.com)
React Frontend:    your-domain.com
```

### For Embedded Setup:
```
WordPress: your-domain.com
React App: your-domain.com/engineering (as a page)
```

---

## Important Notes

1. **Contact Form**: The React contact form needs to connect to WordPress. Options:
   - Use Contact Form 7 REST API
   - Use WPForms API
   - Use a service like Formspree or Netlify Forms

2. **SEO**: For best SEO, consider:
   - Server-side rendering (convert to Next.js)
   - Prerendering with tools like prerender.io
   - Using WordPress Yoast SEO for meta tags

3. **Performance**: The React app is already optimized and builds to ~128KB gzipped.
