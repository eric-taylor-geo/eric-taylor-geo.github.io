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
  let floor, scale = 1, x = 0, y = 0, moved = false;
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const films = { PS: "Philosopher’s Stone", CoS: 'Chamber of Secrets', PoA: 'Prisoner of Azkaban', GoF: 'Goblet of Fire', OotP: 'Order of the Phoenix', HBP: 'Half-Blood Prince', DH2: 'Deathly Hallows: Part 2' };

  function transform() {
    x = clamp(x, wrap.clientWidth * (1 - scale), 0);
    y = clamp(y, wrap.clientHeight * (1 - scale), 0);
    canvas.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
    overlay.querySelectorAll('button').forEach(marker => {
      marker.style.left = `${x + Number(marker.dataset.x) / 100 * wrap.clientWidth * scale}px`;
      marker.style.top = `${y + Number(marker.dataset.y) / 100 * wrap.clientHeight * scale}px`;
    });
    el('hw-zoom-out').disabled = scale <= 1;
    el('hw-zoom-in').disabled = scale >= 5;
  }
  function zoom(next, cx = wrap.clientWidth / 2, cy = wrap.clientHeight / 2) {
    next = clamp(next, 1, 5);
    const ratio = next / scale;
    x = cx - (cx - x) * ratio; y = cy - (cy - y) * ratio;
    scale = next; transform();
  }
  function reset() { scale = 1; x = y = 0; transform(); }
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
  el('hw-zoom-in').addEventListener('click', () => zoom(scale * 1.4));
  el('hw-zoom-out').addEventListener('click', () => zoom(scale / 1.4));
  el('hw-reset').addEventListener('click', reset);
  wrap.addEventListener('dblclick', reset);
  // Leave ordinary page scrolling intact; modified scrolling zooms the plan.
  wrap.addEventListener('wheel', event => {
    if (!event.ctrlKey && !event.metaKey) return;
    event.preventDefault(); const bounds = wrap.getBoundingClientRect();
    zoom(scale * (event.deltaY > 0 ? .85 : 1 / .85), event.clientX - bounds.left, event.clientY - bounds.top);
  }, { passive: false });
  wrap.addEventListener('keydown', event => {
    if (event.target !== wrap) return;
    if (event.key === '+' || event.key === '=') zoom(scale * 1.4);
    else if (event.key === '-') zoom(scale / 1.4);
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
    transform();
  });
  function endPointer(event) {
    pointers.delete(event.pointerId);
    if (pointers.size) startGesture(); else wrap.classList.remove('is-dragging');
  }
  wrap.addEventListener('pointerup', endPointer);
  wrap.addEventListener('pointercancel', endPointer);
  image.addEventListener('load', transform);
  new ResizeObserver(transform).observe(wrap);
  showFloor(floors[0]);
})();
