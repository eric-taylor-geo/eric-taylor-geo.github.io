(() => {
  const floors = window.HW_FLOORS;
  const wrap = document.getElementById('hw-map-wrap');
  if (!wrap || !floors?.length) return;
  const el = id => document.getElementById(id);
  const canvas = el('hw-map-canvas'), overlay = el('hw-map-overlay');
  const image = el('hw-map-img'), tabs = el('hw-map-tabs'), select = el('hw-location');
  const panelImage = el('hw-panel-img'), imageLink = el('hw-image-link');
  const details = el('hw-panel-details'), history = el('hw-panel-history');
  const remembered = new Map();
  const zoomIn = el('hw-zoom-in'), zoomOut = el('hw-zoom-out');
  let mapWidth = wrap.clientWidth, mapHeight = wrap.clientHeight;
  let markers = [], renderFrame = 0;
  let floor, scale = 1, x = 0, y = 0, moved = false;
  let zoomFrame = 0, zoomTarget = null;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const films = { PS: "Philosopher’s Stone", CoS: 'Chamber of Secrets', PoA: 'Prisoner of Azkaban', GoF: 'Goblet of Fire', OotP: 'Order of the Phoenix', HBP: 'Half-Blood Prince', DH2: 'Deathly Hallows: Part 2' };

  function transform() {
    cancelAnimationFrame(renderFrame);
    renderFrame = 0;
    x = clamp(x, mapWidth * (1 - scale), 0);
    y = clamp(y, mapHeight * (1 - scale), 0);
    canvas.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    markers.forEach(({ element, mx, my }) => {
      element.style.transform = `translate3d(${x + mx * mapWidth * scale}px, ${y + my * mapHeight * scale}px, 0) translate(-50%, -50%)`;
    });
    const atMin = (zoomTarget ?? scale) <= 1, atMax = (zoomTarget ?? scale) >= 5;
    if (zoomOut.disabled !== atMin) zoomOut.disabled = atMin;
    if (zoomIn.disabled !== atMax) zoomIn.disabled = atMax;
  }
  function scheduleTransform() {
    if (!renderFrame) renderFrame = requestAnimationFrame(transform);
  }
  function stopZoom() {
    cancelAnimationFrame(zoomFrame);
    zoomFrame = 0;
    zoomTarget = null;
  }
  function zoom(next, cx = mapWidth / 2, cy = mapHeight / 2, immediate = true) {
    stopZoom();
    next = clamp(next, 1, 5);
    const ratio = next / scale;
    x = cx - (cx - x) * ratio; y = cy - (cy - y) * ratio;
    scale = next;
    x = clamp(x, mapWidth * (1 - scale), 0);
    y = clamp(y, mapHeight * (1 - scale), 0);
    if (immediate) transform(); else scheduleTransform();
  }
  function smoothZoom(next, cx = mapWidth / 2, cy = mapHeight / 2) {
    stopZoom();
    next = clamp(next, 1, 5);
    if (reducedMotion.matches) { zoom(next, cx, cy); return; }
    const from = { scale, x, y };
    const targetX = clamp(cx - (cx - x) * next / scale, mapWidth * (1 - next), 0);
    const targetY = clamp(cy - (cy - y) * next / scale, mapHeight * (1 - next), 0);
    const started = performance.now();
    zoomTarget = next;
    function tick(now) {
      const progress = clamp((now - started) / 260, 0, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      scale = from.scale + (next - from.scale) * eased;
      x = from.x + (targetX - from.x) * eased;
      y = from.y + (targetY - from.y) * eased;
      if (progress === 1) { zoomFrame = 0; zoomTarget = null; }
      transform(); // Move markers and map together throughout the animation.
      if (progress < 1) zoomFrame = requestAnimationFrame(tick);
    }
    zoomFrame = requestAnimationFrame(tick);
  }
  function zoomStep(factor) { smoothZoom((zoomTarget ?? scale) * factor); }
  function reset() { smoothZoom(1); }
  function showLocation(id) {
    const location = floor.locations.find(item => item.id === id);
    if (!location) return;
    remembered.set(floor.id, id); select.value = id;
    overlay.querySelectorAll('button').forEach(marker => marker.setAttribute('aria-pressed', String(marker.dataset.id === id)));
    el('hw-panel-name').textContent = location.label;
    el('hw-panel-desc').textContent = location.desc || '';
    el('hw-panel-desc').hidden = !location.desc;
    panelImage.hidden = !location.image;
    imageLink.hidden = !location.image;
    if (location.image) { panelImage.src = location.image; panelImage.alt = location.label + ' in Minecraft'; imageLink.href = location.image; }
    else { panelImage.removeAttribute('src'); imageLink.removeAttribute('href'); }
    history.replaceChildren();
    const addFilms = (label, values) => {
      if (!values?.length) return;
      const row = document.createElement('p'); row.className = 'film-row';
      row.textContent = label + ': ' + values.map(value => films[value] || value).join(', ');
      history.append(row);
    };
    addFilms('First seen in', location.firstSeen ? [location.firstSeen] : []);
    addFilms('Updated in', location.updatedIn);
    if (location.history) { const p = document.createElement('p'); p.textContent = location.history; history.append(p); }
    details.hidden = !history.childElementCount;
  }
  function showFloor(next) {
    floor = next;
    tabs.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.floor === floor.id)));
    image.src = floor.map; image.alt = `Hogwarts ${floor.label.toLowerCase()} floor plan`;
    overlay.replaceChildren(); select.replaceChildren();
    markers = [];
    floor.locations.forEach(location => {
      const option = new Option(location.label, location.id); select.add(option);
      const marker = document.createElement('button');
      marker.type = 'button'; marker.className = 'hw-marker';
      marker.dataset.id = location.id; marker.dataset.x = location.x; marker.dataset.y = location.y;
      marker.setAttribute('aria-label', location.label); marker.setAttribute('aria-pressed', 'false');
      const label = document.createElement('span'); label.className = 'hw-marker-label'; label.textContent = location.label;
      marker.append(label);
      marker.addEventListener('click', event => { if (!moved || event.detail === 0) showLocation(location.id); });
      overlay.append(marker);
      markers.push({ element: marker, mx: location.x / 100, my: location.y / 100 });
    });
    transform();
    showLocation(remembered.get(floor.id) || floor.locations[0]?.id);
  }
  floors.forEach(item => {
    const button = document.createElement('button'); button.type = 'button';
    button.dataset.floor = item.id; button.textContent = item.label;
    button.addEventListener('click', () => showFloor(item)); tabs.append(button);
  });
  select.addEventListener('change', () => showLocation(select.value));
  el('hw-zoom-in').addEventListener('click', () => zoomStep(1.4));
  el('hw-zoom-out').addEventListener('click', () => zoomStep(1 / 1.4));
  el('hw-reset').addEventListener('click', reset);
  wrap.addEventListener('dblclick', reset);
  // Scroll over the plan to zoom around the cursor; page scrolling outside it is unchanged.
  wrap.addEventListener('wheel', event => {
    if (!event.deltaY) return;
    event.preventDefault(); const bounds = wrap.getBoundingClientRect();
    // Normalize mouse-wheel line/page units and trackpad pixel deltas.
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? mapHeight : 1;
    const delta = clamp(event.deltaY * unit, -100, 100);
    // Apply input immediately, with only one visual update per display frame.
    zoom(scale * Math.exp(-delta * .0025), event.clientX - bounds.left, event.clientY - bounds.top, false);
  }, { passive: false });
  wrap.addEventListener('keydown', event => {
    if (event.target !== wrap) return;
    if (event.key.startsWith('Arrow')) stopZoom();
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
  const pointers = new Map();
  let gesture;
  const distance = points => Math.hypot(points[1].x - points[0].x, points[1].y - points[0].y);
  function startGesture() {
    const points = [...pointers.values()];
    gesture = { points, x, y, scale, distance: points.length > 1 ? distance(points) : 0 };
  }
  wrap.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    stopZoom();
    transform();
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    // Capture on the original target so a marker tap remains a marker click.
    event.target.setPointerCapture(event.pointerId);
    moved = false; startGesture(); wrap.classList.add('is-dragging');
  });
  wrap.addEventListener('pointermove', event => {
    if (!pointers.has(event.pointerId)) return;
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    const points = [...pointers.values()];
    if (points.length > 1 && gesture.points.length > 1) {
      moved = true;
      const bounds = wrap.getBoundingClientRect();
      const oldCenter = { x: (gesture.points[0].x + gesture.points[1].x) / 2 - bounds.left, y: (gesture.points[0].y + gesture.points[1].y) / 2 - bounds.top };
      scale = clamp(gesture.scale * distance(points) / Math.max(gesture.distance, 1), 1, 5);
      x = (points[0].x + points[1].x) / 2 - bounds.left - (oldCenter.x - gesture.x) * scale / gesture.scale;
      y = (points[0].y + points[1].y) / 2 - bounds.top - (oldCenter.y - gesture.y) * scale / gesture.scale;
    } else {
      const dx = points[0].x - gesture.points[0].x, dy = points[0].y - gesture.points[0].y;
      if (Math.abs(dx) + Math.abs(dy) > 5) moved = true;
      x = gesture.x + dx; y = gesture.y + dy;
    }
    scheduleTransform();
  });
  function endPointer(event) {
    pointers.delete(event.pointerId);
    if (pointers.size) startGesture(); else wrap.classList.remove('is-dragging');
  }
  wrap.addEventListener('pointerup', endPointer);
  wrap.addEventListener('pointercancel', endPointer);
  image.addEventListener('load', transform);
  new ResizeObserver(() => {
    mapWidth = wrap.clientWidth; mapHeight = wrap.clientHeight;
    stopZoom(); transform();
  }).observe(wrap);
  showFloor(floors[0]);
})();
