import { CreateNote } from "../types/note";

const API = "/api/notes";

function authHeader() {
  return {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
}

export async function createNote(data: CreateNote) {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function getNotes() {
  const res = await fetch(API, {
    headers: authHeader(),
  });

  return res.json();
}

export async function getNote(id: string) {
  const res = await fetch(`${API}/${id}`, {
    headers: authHeader(),
  });

  return res.json();
}

export async function updateNote(id: string, body: any) {
  const res = await fetch(`${API}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify(body),
  });

  return res.json();
}

export async function deleteNote(id: string) {
  const res = await fetch(`${API}/${id}`, {
    method: "DELETE",
    headers: authHeader(),
  });

  return res.json();
}