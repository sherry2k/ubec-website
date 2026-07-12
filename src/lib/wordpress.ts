/**
 * WordPress Headless CMS Integration
 * 
 * Configure your WordPress site URL below.
 * This fetches data from WordPress REST API or WPGraphQL.
 */

// Replace with your WordPress site URL
const WP_URL = 'https://your-wordpress-site.com';
const WP_API = `${WP_URL}/wp-json/wp/v2`;

// Types for WordPress content
export interface WPProject {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  featured_media: number;
  acf: {
    location: string;
    project_type: string;
    services: string[];
    status: string;
    featured_image_url: string;
  };
}

export interface WPTender {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  acf: {
    location: string;
    submission_date: string;
    drawings_link: string;
    project_image: string;
  };
}

export interface WPService {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  acf: {
    icon: string;
    description: string;
  };
}

export interface WPTestimonial {
  id: number;
  acf: {
    client_name: string;
    company: string;
    role: string;
    testimonial_text: string;
    client_photo: string;
  };
}

export interface WPBlogPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  slug: string;
  featured_media: number;
  categories: number[];
  acf: {
    read_time: string;
  };
}

export interface WPSettings {
  site_title: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  working_hours: string;
  whatsapp: string;
  social_links: {
    linkedin: string;
    instagram: string;
    facebook: string;
    twitter: string;
  };
}

// Fetch functions
export async function getProjects(): Promise<WPProject[]> {
  try {
    const res = await fetch(`${WP_API}/projects?_embed&per_page=20`);
    if (!res.ok) throw new Error('Failed to fetch projects');
    return res.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function getTenders(): Promise<WPTender[]> {
  try {
    const res = await fetch(`${WP_API}/tenders?_embed&per_page=10`);
    if (!res.ok) throw new Error('Failed to fetch tenders');
    return res.json();
  } catch (error) {
    console.error('Error fetching tenders:', error);
    return [];
  }
}

export async function getServices(): Promise<WPService[]> {
  try {
    const res = await fetch(`${WP_API}/services?_embed&per_page=20`);
    if (!res.ok) throw new Error('Failed to fetch services');
    return res.json();
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export async function getTestimonials(): Promise<WPTestimonial[]> {
  try {
    const res = await fetch(`${WP_API}/testimonials?_embed&per_page=10`);
    if (!res.ok) throw new Error('Failed to fetch testimonials');
    return res.json();
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

export async function getBlogPosts(): Promise<WPBlogPost[]> {
  try {
    const res = await fetch(`${WP_API}/posts?_embed&per_page=10`);
    if (!res.ok) throw new Error('Failed to fetch posts');
    return res.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getSettings(): Promise<WPSettings | null> {
  try {
    // This requires ACF Options page or custom endpoint
    const res = await fetch(`${WP_URL}/wp-json/acf/v3/options/site-settings`);
    if (!res.ok) throw new Error('Failed to fetch settings');
    return res.json();
  } catch (error) {
    console.error('Error fetching settings:', error);
    return null;
  }
}

export async function getMediaUrl(mediaId: number): Promise<string> {
  try {
    const res = await fetch(`${WP_API}/media/${mediaId}`);
    if (!res.ok) return '';
    const media = await res.json();
    return media.source_url;
  } catch {
    return '';
  }
}

// Contact form submission
export async function submitContactForm(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}): Promise<boolean> {
  try {
    // Using Contact Form 7 REST API or WPForms
    const res = await fetch(`${WP_URL}/wp-json/contact-form-7/v1/contact-forms/YOUR_FORM_ID/feedback`, {
      method: 'POST',
      body: new URLSearchParams({
        'your-name': data.name,
        'your-email': data.email,
        'your-phone': data.phone,
        'your-service': data.service,
        'your-message': data.message,
      }),
    });
    return res.ok;
  } catch (error) {
    console.error('Form submission error:', error);
    return false;
  }
}
