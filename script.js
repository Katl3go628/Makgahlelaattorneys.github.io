document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
    }));
  }

  const form = document.getElementById('enquiry-form');
  if (form) form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const subject = `Website enquiry: ${data.get('service')}`;
    const body = [
      'Website enquiry for Makgahlela Attorneys Inc.', '',
      `Name: ${data.get('name')}`,
      `Email: ${data.get('email')}`,
      `Phone: ${data.get('phone') || 'Not provided'}`,
      `Service: ${data.get('service')}`, '', 'Message:', data.get('message'), '',
      'Please note: this email was drafted from the website enquiry form.'
    ].join('\n');
    const status = document.getElementById('form-status');
    if (status) status.textContent = 'Your email application should open with the enquiry drafted. Review it before sending. If it does not open, email law@makgahlelaattorneys.co.za directly.';
    window.location.href = `mailto:law@makgahlelaattorneys.co.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
});
