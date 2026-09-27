// Enhance Hugo's footnote links without changing their normal navigation.
const references = document.querySelectorAll('.post-content a.footnote-ref');
if (references.length) {
  const preview = document.createElement('aside');
  preview.id = 'footnote-preview';
  preview.className = 'footnote-preview';
  preview.setAttribute('aria-label', 'Footnote preview');
  preview.hidden = true;
  document.body.append(preview);
  let active, closeTimer, previousDescription;

  function hide() {
    clearTimeout(closeTimer);
    if (active) {
      if (previousDescription === null) active.removeAttribute('aria-describedby');
      else active.setAttribute('aria-describedby', previousDescription);
    }
    active = null;
    preview.hidden = true;
  }

  function position() {
    if (!active) return;
    const anchor = active.getBoundingClientRect();
    const margin = 12, gap = 8;
    const box = preview.getBoundingClientRect();
    const left = Math.max(margin, Math.min(anchor.left + anchor.width / 2 - box.width / 2,
      document.documentElement.clientWidth - box.width - margin));
    const below = anchor.bottom + gap;
    const top = below + box.height <= window.innerHeight - margin ? below : anchor.top - gap - box.height;
    preview.style.left = `${left}px`;
    preview.style.top = `${Math.max(margin, top)}px`;
  }

  function show(reference) {
    clearTimeout(closeTimer);
    if (active === reference) return;
    const note = document.getElementById(decodeURIComponent(reference.hash.slice(1)));
    if (!note) return;
    hide();
    const content = note.cloneNode(true);
    content.querySelectorAll('.footnote-backref').forEach(link => link.remove());
    content.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));
    preview.replaceChildren(...content.childNodes);
    active = reference;
    previousDescription = reference.getAttribute('aria-describedby');
    reference.setAttribute('aria-describedby', [previousDescription, preview.id].filter(Boolean).join(' '));
    preview.hidden = false;
    position();
  }

  function scheduleHide() {
    clearTimeout(closeTimer);
    closeTimer = setTimeout(() => {
      if (active?.matches(':hover, :focus') || preview.matches(':hover, :focus-within')) return;
      hide();
    }, 180);
  }

  references.forEach(reference => {
    reference.addEventListener('pointerenter', event => {
      if (event.pointerType !== 'touch') show(reference);
    });
    reference.addEventListener('pointerleave', scheduleHide);
    reference.addEventListener('focus', () => show(reference));
    reference.addEventListener('blur', scheduleHide);
    reference.addEventListener('click', hide);
  });
  preview.addEventListener('pointerenter', () => clearTimeout(closeTimer));
  preview.addEventListener('pointerleave', scheduleHide);
  preview.addEventListener('focusin', () => clearTimeout(closeTimer));
  preview.addEventListener('focusout', scheduleHide);
  preview.addEventListener('load', position, true);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && active) {
      if (preview.contains(document.activeElement)) active.focus();
      hide();
    }
  });
  document.addEventListener('pointerdown', event => {
    if (!preview.contains(event.target) && !active?.contains(event.target)) hide();
  });
  window.addEventListener('resize', hide);
  document.addEventListener('scroll', event => {
    if (preview.contains(event.target)) return;
    // Keyboard focus can start a smooth scroll before the reference is visible.
    const focused = document.activeElement;
    if (focused.matches('.post-content a.footnote-ref')) {
      const bounds = focused.getBoundingClientRect();
      if (bounds.bottom >= 0 && bounds.top <= window.innerHeight) show(focused);
    }
    if (!active) return;
    const anchor = active.getBoundingClientRect();
    if (anchor.bottom < 0 || anchor.top > window.innerHeight) hide();
    else position();
  }, true);
}
