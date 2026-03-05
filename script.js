// scripts.js
document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Initialize EmailJS safely (replace with your real user ID from env in prod)
  // NOTE: Avoid committing public keys in source control. Consider using environment variables
  if (typeof emailjs !== 'undefined' && emailjs.init) {
    // If you want to keep the key client-side, at least store it in a private config not in VCS.
    emailjs.init("ILYtAj3_oxjdKqvgj");
  } else {
    console.warn('EmailJS client not available. Messages will not be sent.');
  }

  const form = document.getElementById("contact-form");
  if (!form) {
    console.warn('No contact-form found on the page.');
    return;
  }

  // Submit handler using FormData
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fd = new FormData(form);
    const userName = (fd.get('from_name') || '').toString().trim();
    const userEmail = (fd.get('reply_to') || '').toString().trim();
    // message can be empty
    const userMessage = (fd.get('message') || '').toString().trim();

    if (!userName || !userEmail) {
      alert('Please enter name and email');
      return;
    }

    if (typeof emailjs !== 'undefined' && emailjs.sendForm) {
      // Use your real service/template ids
      emailjs.sendForm("service_zt0cgq9", "template_q3dazye", form)
        .then(() => {
          alert(`Thanks ${userName} — we've received your message. We'll contact you at ${userEmail}.`);
          form.reset();
        })
        .catch((err) => {
          console.error('EmailJS send error:', err);
          alert('Failed to send message. Please try again later.');
        });
    } else {
      // Fallback / demo mode
      alert(`Thanks ${userName} — we've received your message. We'll contact you at ${userEmail} (demo mode — message not sent).`);
      form.reset();
    }
  });
});
