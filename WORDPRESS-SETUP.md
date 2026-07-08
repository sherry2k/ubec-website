# WordPress Integration Guide for UBEC Website

## Quick Start: Choose Your Approach

| Approach | Difficulty | Best For |
|----------|------------|----------|
| **Option 1: Headless WordPress** | Medium | Full CMS control, dynamic content |
| **Option 2: iFrame Embed** | Easy | Quick deployment, separate hosting |
| **Option 3: WordPress Theme** | Medium | Full WordPress integration |
| **Option 4: WordPress Plugin** | Easy | Adding to existing WordPress site |

---

## Option 1: Headless WordPress (Recommended)

Use WordPress purely as a backend CMS, with this React site as the frontend.

### Architecture
```
┌─────────────────┐     REST API      ┌─────────────────┐
│   WordPress     │ ◄───────────────► │   React App     │
│   (Backend)     │                   │   (Frontend)    │
│   wp.ubec.ae    │                   │   ubec.ae       │
└─────────────────┘                   └─────────────────┘
```

### Step-by-Step Setup

#### 1. Set Up WordPress Backend
```bash
# Install WordPress on your server (wp.your-domain.com or similar)
```

#### 2. Install Required Plugins
- **WPGraphQL** or use built-in REST API
- **Advanced Custom Fields (ACF)** - for custom fields
- **ACF to REST API** - expose ACF fields to API
- **JWT Authentication** - for secure form submissions

#### 3. Add Custom Post Types
Copy the file `wordpress-theme/ubec-custom-post-types.php` to your theme's folder and include it in `functions.php`:
```php
require_once get_template_directory() . '/ubec-custom-post-types.php';
```

#### 4. Configure React to Fetch from WordPress
Update `src/lib/wordpress.ts`:
```typescript
const WP_URL = 'https://wp.your-domain.com'; // Your WordPress URL
```

#### 5. Deploy React Frontend
```bash
npm run build
# Deploy to Vercel, Netlify, or your own server
```

#### 6. Enable CORS on WordPress
Add to your theme's `functions.php`:
```php
add_action('rest_api_init', function() {
    header('Access-Control-Allow-Origin: https://your-react-domain.com');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
});
```

---

## Option 2: iFrame Embed (Simplest)

### Step 1: Deploy React App
Deploy to any static hosting:
- **Vercel**: `npx vercel` (free)
- **Netlify**: Drag & drop `dist` folder (free)
- **GitHub Pages**: Push to `gh-pages` branch (free)

### Step 2: Create WordPress Page
1. Create a new Page in WordPress
2. Switch to HTML/Code editor
3. Paste:
```html
<div style="width:100%;height:100vh;overflow:hidden;">
  <iframe 
    src="https://your-react-app.vercel.app" 
    style="width:100%;height:100%;border:none;"
    title="UBEC Engineering Consultants">
  </iframe>
</div>
```

### Step 3: Use Full-Width Template
Select a "Full Width" or "Blank" page template to remove WordPress header/footer.

---

## Option 3: WordPress Theme

### Step 1: Build React App
```bash
npm run build
```

### Step 2: Copy Theme Files
1. Copy the `wordpress-theme/ubec-theme/` folder to `/wp-content/themes/`
2. Copy your React `dist/` folder into the theme: `/wp-content/themes/ubec-theme/dist/`

### Step 3: Activate Theme
Go to WordPress Admin → Appearance → Themes → Activate "UBEC Engineering Consultants"

### Step 4: Configure via Customizer
Go to Appearance → Customize → UBEC Settings to configure:
- Contact information
- Social media links
- Hero content
- Statistics

### Step 5: Add Content
1. **Services**: Go to Services → Add New
2. **Projects**: Go to Projects → Add New
3. **Tenders**: Go to Tenders → Add New
4. **Testimonials**: Go to Testimonials → Add New
5. **Partners**: Go to Partners → Add New
6. **Blog**: Go to Posts → Add New

---

## Option 4: WordPress Plugin (Shortcode)

### Step 1: Build React App
```bash
npm run build
```

### Step 2: Create Plugin
1. Copy `wordpress-embed/ubec-react-app/` to `/wp-content/plugins/`
2. Copy `dist/` folder into the plugin: `/wp-content/plugins/ubec-react-app/dist/`

### Step 3: Activate Plugin
Go to Plugins → Activate "UBEC React Website"

### Step 4: Use Shortcode
Add to any page or post:
```
[ubec_website]
```

---

## Making Content Dynamic

To load content from WordPress instead of static data, update your React components:

### Example: Dynamic Services
```tsx
// src/components/Services.tsx
import { useEffect, useState } from 'react';
import { getServices, WPService } from '@/lib/wordpress';

export default function Services() {
  const [services, setServices] = useState<WPService[]>([]);
  
  useEffect(() => {
    getServices().then(setServices);
  }, []);
  
  // ... rest of component using `services` instead of static SERVICES
}
```

### Full Dynamic Version
For a fully WordPress-powered version, create a hook:

```tsx
// src/hooks/useWordPressContent.ts
import { useState, useEffect } from 'react';

export function useWordPressContent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('https://your-wp-site.com/wp-json/ubec/v1/all-content')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
  
  return { data, loading };
}
```

---

## Contact Form Integration

### Option A: WordPress REST API
The theme/plugin includes a REST endpoint at `/wp-json/ubec/v1/contact`.

Update your Contact component:
```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  const response = await fetch('/wp-json/ubec/v1/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  
  const result = await response.json();
  if (result.success) {
    setFormSubmitted(true);
  }
};
```

### Option B: Contact Form 7
1. Install Contact Form 7 plugin
2. Install "Contact Form 7 REST API" plugin
3. Create a form and note its ID
4. Submit to: `/wp-json/contact-form-7/v1/contact-forms/{ID}/feedback`

### Option C: External Service
Use Formspree, Netlify Forms, or similar:
```tsx
<form action="https://formspree.io/f/YOUR_ID" method="POST">
```

---

## SEO Considerations

### For Headless Setup
1. Use **Yoast SEO** on WordPress for content meta
2. Add **prerender.io** or similar for search engine crawling
3. Consider converting to **Next.js** for server-side rendering

### For Theme/Plugin Setup
WordPress handles SEO naturally with Yoast or RankMath.

---

## File Structure Summary

```
your-wordpress/
├── wp-content/
│   ├── themes/
│   │   └── ubec-theme/           # Option 3: Full Theme
│   │       ├── dist/             # React build output
│   │       ├── inc/
│   │       │   ├── custom-post-types.php
│   │       │   ├── rest-api.php
│   │       │   └── customizer.php
│   │       ├── style.css
│   │       ├── functions.php
│   │       ├── index.php
│   │       ├── header.php
│   │       └── footer.php
│   │
│   └── plugins/
│       └── ubec-react-app/       # Option 4: Plugin
│           ├── dist/             # React build output
│           └── ubec-react-app.php
```

---

## Deployment Checklist

- [ ] Build React app: `npm run build`
- [ ] Test locally: `npm run preview`
- [ ] Set up WordPress with required plugins
- [ ] Add custom post types
- [ ] Configure CORS if using headless setup
- [ ] Copy files to WordPress (theme or plugin)
- [ ] Activate theme/plugin
- [ ] Configure settings in Customizer
- [ ] Add initial content (services, projects, etc.)
- [ ] Test contact form submission
- [ ] Configure email notifications
- [ ] Set up SSL certificates
- [ ] Test on mobile devices

---

## Need Help?

For the headless approach, you may also consider:
- **WPGraphQL** for more efficient queries
- **Frontity** - React framework for WordPress
- **Next.js with WordPress** - for server-side rendering
