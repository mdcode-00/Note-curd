const API_BASE = import.meta.env.VITE_API_URL

export async function fetchNotes() {
  const res = await fetch(`${API_BASE}/notes`);
  return res.json();
}

export async function createNote(payload) {
  const res = await fetch(`${API_BASE}/notes/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function updateNote(id, payload) {
  const res = await fetch(`${API_BASE}/notes/update/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function deleteNote(id) {
  const res = await fetch(`${API_BASE}/notes/delete/${id}`, {
    method: 'DELETE',
  });
  return res.json();
}