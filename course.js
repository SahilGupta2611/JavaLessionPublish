(() => {
const KEY = 'java-backend-course-progress-v1';
let state = {completed: {1: true, 3: true}};
try { const saved = JSON.parse(localStorage.getItem(KEY));
  if (saved && typeof saved.completed === 'object' && saved.completed !== null) {
    for (let day = 1; day <= 30; day++) {
      if (typeof saved.completed[day] === 'boolean') state.completed[day] = saved.completed[day];
    }
  }
} catch (_) {}
function status(day) { return state.completed[day] ? 'Complete' : day === 2 ? 'In progress' : day <= 9 && day >= 4 ? 'Available · Pending' : day === 1 || day === 3 ? 'Pending' : 'Coming soon'; }
function paint() {
  document.querySelectorAll('[data-status-day]').forEach(el => {
    const day = Number(el.dataset.statusDay); el.textContent = status(day);
    el.classList.toggle('complete', !!state.completed[day]);
    el.classList.toggle('progress', day === 2 && !state.completed[day]);
  });
  const count = document.getElementById('complete-count');
  if (count) count.textContent = Object.values(state.completed).filter(v => v === true).length;
  document.querySelectorAll('[data-finish-day]').forEach(button => {
    const day = Number(button.dataset.finishDay);
    button.textContent = state.completed[day] ? 'Completed ✓' : 'Finish lesson · Mark complete';
    button.disabled = !!state.completed[day];
  });
}
function save(day, complete) {
  state.completed[day] = complete;
  let persisted = true;
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (_) { persisted = false; }
  paint();
  const msg = document.getElementById('completion-message');
  if (msg) msg.textContent = persisted ? (complete ? 'Completed. Your Home card is updated in this browser.' : 'Lesson marked pending in this browser.') : 'Progress updated for this visit. Browser storage is unavailable.';
}
document.querySelectorAll('[data-finish-day]').forEach(button => button.addEventListener('click', () => save(Number(button.dataset.finishDay), true)));
document.querySelectorAll('[data-reset-day]').forEach(button => button.addEventListener('click', () => save(Number(button.dataset.resetDay), false)));
const reset = document.getElementById('reset-progress');
if (reset) reset.addEventListener('click', () => {
  state = {completed: {1: true, 3: true}};
  let persisted = true;
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (_) { persisted = false; }
  paint();
  document.getElementById('completion-message').textContent = persisted ? 'Progress reset: Day 1 and Day 3 complete; Day 2 in progress; Days 4–9 pending.' : 'Progress reset for this visit. Browser storage is unavailable.';
});
window.addEventListener('storage', e => {
  if (e.key !== KEY) return;
  try { const saved = JSON.parse(e.newValue); if (saved && saved.completed) { state = saved; paint(); } } catch (_) {}
});
document.querySelectorAll('pre').forEach(pre => {
  pre.tabIndex = 0; pre.setAttribute('aria-label', 'Code example, scroll horizontally if needed');
  const wrap = document.createElement('div'); wrap.className = 'code-wrap';
  pre.before(wrap); wrap.append(pre);
  const button = document.createElement('button'); button.type = 'button'; button.className = 'copy'; button.textContent = 'Copy'; button.setAttribute('aria-label', 'Copy code example');
  wrap.append(button);
  button.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(pre.textContent); button.textContent = 'Copied'; }
    catch (_) { button.textContent = 'Select code'; }
    setTimeout(() => button.textContent = 'Copy', 1800);
  });
});
const frame = document.getElementById('day-two-frame');
if (frame) frame.addEventListener('load', () => {
  try {
    const doc = frame.contentDocument;
    const counter = doc.getElementById('counter');
    function lastSlide() {
      const slides = [...doc.querySelectorAll('.slide')];
      const onLast = slides.length > 0 && !slides[slides.length - 1].hidden;
      document.getElementById('day-two-finish').hidden = !onLast;
      document.getElementById('day-two-hint').hidden = onLast;
    }
    if (counter) new MutationObserver(lastSlide).observe(counter, {childList:true,subtree:true,characterData:true});
    lastSlide();
  } catch (_) {
    document.getElementById('day-two-hint').textContent = 'Open the original lesson below if the embedded view is unavailable.';
  }
});
paint();
})();