// Render the PDF directly, keeping a lightweight transform during gestures.
const pdfBase = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@5.4.149/';
const library = import(pdfBase + 'build/pdf.min.mjs');

for (const root of document.querySelectorAll('.poster-viewer')) {
  setup(root).catch(() => {
    root.querySelector('.poster-status').hidden = false;
    root.querySelector('.poster-status').textContent = 'Preview unavailable. Download the PDF below.';
  });
}

async function setup(root) {
  const pdfjs = await library;
  pdfjs.GlobalWorkerOptions.workerSrc = pdfBase + 'build/pdf.worker.min.mjs';
  const document = await pdfjs.getDocument({ url: root.dataset.pdf, cMapUrl: pdfBase + 'cmaps/', cMapPacked: true, standardFontDataUrl: pdfBase + 'standard_fonts/', wasmUrl: pdfBase + 'wasm/' }).promise;
  const page = await document.getPage(1);
  const viewport = root.querySelector('.poster-viewport');
  const sheet = root.querySelector('.poster-sheet');
  const status = root.querySelector('.poster-status');
  const buttons = Object.fromEntries([...root.querySelectorAll('button')].map(button => [button.dataset.action, button]));
  const original = page.getViewport({ scale: 1 });
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  let width, height, fit, scale = 1, x = 0, y = 0, timer, task, generation = 0;
  let zoomFrame = 0, zoomTarget = null;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const pointers = new Map();
  let gesture;

  function transform() {
    const w = original.width * fit * scale, h = original.height * fit * scale;
    x = w <= width ? (width - w) / 2 : clamp(x, width - w, 0);
    y = h <= height ? (height - h) / 2 : clamp(y, height - h, 0);
    sheet.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    buttons.out.disabled = (zoomTarget ?? scale) <= 1;
    buttons.in.disabled = (zoomTarget ?? scale) >= 8;
    buttons.reset.disabled = false;
  }
  async function render() {
    const version = ++generation;
    task?.cancel();
    // Limit the backing store to 16 megapixels, including on high-DPI phones.
    const requested = fit * scale * Math.min(window.devicePixelRatio || 1, 2);
    const resolution = Math.min(requested, Math.sqrt(16000000 / (original.width * original.height)));
    const view = page.getViewport({ scale: resolution });
    const canvas = window.document.createElement('canvas');
    canvas.width = Math.ceil(view.width); canvas.height = Math.ceil(view.height);
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', 'IGS conference research poster. Full text is available in the downloadable PDF.');
    try {
      task = page.render({ canvasContext: canvas.getContext('2d'), viewport: view });
      await task.promise;
      if (version !== generation) return;
      sheet.replaceChildren(canvas);
      status.hidden = true;
    } catch (error) {
      if (error.name !== 'RenderingCancelledException') {
        status.textContent = 'Preview unavailable. Download the PDF below.';
        status.hidden = false;
      }
    }
  }
  function queueRender() { clearTimeout(timer); timer = setTimeout(render, 180); }
  function stopZoom() {
    cancelAnimationFrame(zoomFrame);
    zoomFrame = 0;
    zoomTarget = null;
  }
  function zoom(next, cx = width / 2, cy = height / 2) {
    stopZoom();
    next = clamp(next, 1, 8);
    const ratio = next / scale;
    x = cx - (cx - x) * ratio; y = cy - (cy - y) * ratio;
    scale = next; transform(); queueRender();
  }
  function smoothZoom(next, cx = width / 2, cy = height / 2) {
    stopZoom();
    next = clamp(next, 1, 8);
    if (reducedMotion.matches) { zoom(next, cx, cy); return; }
    clearTimeout(timer);
    const from = { scale, x, y };
    const w = original.width * fit * next, h = original.height * fit * next;
    const targetX = w <= width ? (width - w) / 2 : clamp(cx - (cx - x) * next / scale, width - w, 0);
    const targetY = h <= height ? (height - h) / 2 : clamp(cy - (cy - y) * next / scale, height - h, 0);
    const started = performance.now();
    zoomTarget = next;
    function tick(now) {
      const progress = clamp((now - started) / 260, 0, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      scale = from.scale + (next - from.scale) * eased;
      x = from.x + (targetX - from.x) * eased;
      y = from.y + (targetY - from.y) * eased;
      if (progress === 1) { zoomFrame = 0; zoomTarget = null; }
      transform();
      if (progress < 1) zoomFrame = requestAnimationFrame(tick);
      else queueRender();
    }
    zoomFrame = requestAnimationFrame(tick);
  }
  function zoomStep(factor) { smoothZoom((zoomTarget ?? scale) * factor); }
  function reset() { smoothZoom(1); }
  buttons.in.addEventListener('click', () => zoomStep(1.4));
  buttons.out.addEventListener('click', () => zoomStep(1 / 1.4));
  buttons.reset.addEventListener('click', reset);
  viewport.addEventListener('dblclick', reset);
  viewport.addEventListener('wheel', event => {
    event.preventDefault();
    const bounds = viewport.getBoundingClientRect();
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? height : 1;
    zoom(scale * Math.exp(-clamp(event.deltaY * unit, -100, 100) * .0025), event.clientX - bounds.left, event.clientY - bounds.top);
  }, { passive: false });
  viewport.addEventListener('keydown', event => {
    if (event.key.startsWith('Arrow')) { stopZoom(); queueRender(); }
    if (event.key === '+' || event.key === '=') zoomStep(1.4);
    else if (event.key === '-') zoomStep(1 / 1.4);
    else if (event.key === '0') reset();
    else if (event.key === 'ArrowLeft') { x += 40; transform(); }
    else if (event.key === 'ArrowRight') { x -= 40; transform(); }
    else if (event.key === 'ArrowUp') { y += 40; transform(); }
    else if (event.key === 'ArrowDown') { y -= 40; transform(); }
    else return;
    event.preventDefault();
  });
  const distance = points => Math.hypot(points[1].x - points[0].x, points[1].y - points[0].y);
  function startGesture() { gesture = { points: [...pointers.values()], x, y, scale }; }
  viewport.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    stopZoom(); transform(); queueRender();
    viewport.focus({ preventScroll: true });
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    viewport.setPointerCapture(event.pointerId);
    startGesture(); viewport.classList.add('is-dragging');
  });
  viewport.addEventListener('pointermove', event => {
    if (!pointers.has(event.pointerId)) return;
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    const points = [...pointers.values()];
    if (points.length > 1 && gesture.points.length > 1) {
      const bounds = viewport.getBoundingClientRect();
      const cx = (gesture.points[0].x + gesture.points[1].x) / 2 - bounds.left;
      const cy = (gesture.points[0].y + gesture.points[1].y) / 2 - bounds.top;
      scale = clamp(gesture.scale * distance(points) / Math.max(distance(gesture.points), 1), 1, 8);
      x = (points[0].x + points[1].x) / 2 - bounds.left - (cx - gesture.x) * scale / gesture.scale;
      y = (points[0].y + points[1].y) / 2 - bounds.top - (cy - gesture.y) * scale / gesture.scale;
      queueRender();
    } else {
      x = gesture.x + points[0].x - gesture.points[0].x;
      y = gesture.y + points[0].y - gesture.points[0].y;
    }
    transform();
  });
  function endPointer(event) {
    pointers.delete(event.pointerId);
    if (pointers.size) startGesture();
    else viewport.classList.remove('is-dragging');
  }
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) viewport.addEventListener(type, endPointer);
  new ResizeObserver(() => {
    width = viewport.clientWidth; height = viewport.clientHeight;
    fit = Math.min(width / original.width, height / original.height);
    sheet.style.width = `${original.width * fit}px`;
    sheet.style.height = `${original.height * fit}px`;
    zoom(1);
  }).observe(viewport);
}
