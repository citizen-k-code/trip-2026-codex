'use strict';
document.querySelectorAll('.print').forEach(button => button.addEventListener('click', () => window.print()));
const status = document.getElementById('save-status');
const boxes = [...document.querySelectorAll('[data-task]')];
let canSave = true;
function updateProgress() {
  if (!status) return;
  const count = boxes.filter(box => box.checked).length;
  status.textContent = `${count} of ${boxes.length} tasks checked. ${canSave ? 'Saved on this browser only.' : 'Storage unavailable; checks last only while this page stays open.'} Checking a task does not make a booking.`;
}
boxes.forEach(box => {
  const key = `nepal-bhutan-2026:${box.dataset.task}`;
  try { box.checked = localStorage.getItem(key) === 'done'; } catch { canSave = false; }
  box.addEventListener('change', () => {
    try { localStorage.setItem(key, box.checked ? 'done' : ''); } catch { canSave = false; }
    updateProgress();
  });
});
updateProgress();
