# Free Contact Form Options

## Option 1: Netlify Forms (If hosting on Netlify)

Just add `netlify` attribute to your form - it works automatically!

```html
<form name="contact" method="POST" data-netlify="true">
  <input type="text" name="name" />
  <input type="email" name="email" />
  <textarea name="message"></textarea>
  <button type="submit">Send</button>
</form>
```

**Free tier:** 100 submissions/month

---

## Option 2: Formspree (Works everywhere)

1. Go to [formspree.io](https://formspree.io) → Sign up free
2. Create a form → Get your form ID
3. Update your form action:

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**Free tier:** 50 submissions/month

---

## Option 3: Web3Forms (Unlimited free)

1. Go to [web3forms.com](https://web3forms.com)
2. Enter your email → Get access key
3. Add to your form:

```html
<form action="https://api.web3forms.com/submit" method="POST">
  <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY">
  <input type="text" name="name" required>
  <input type="email" name="email" required>
  <textarea name="message" required></textarea>
  <button type="submit">Send</button>
</form>
```

**Free tier:** Unlimited submissions!

---

## Option 4: Google Forms Embed

1. Create Google Form
2. Get embed code
3. Add to your site or redirect to the form

---

## Recommended: Web3Forms Integration

Update `src/components/Contact.tsx`:

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_key: 'YOUR_ACCESS_KEY', // Get from web3forms.com
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: formData.service,
      message: formData.message,
      subject: 'New UBEC Contact Form Submission',
    }),
  });
  
  const result = await response.json();
  if (result.success) {
    setFormSubmitted(true);
  }
};
```
