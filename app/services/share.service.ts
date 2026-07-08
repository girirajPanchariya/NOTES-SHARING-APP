const API = "/api/share";

function authHeader() {
  return {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
}

export async function createShare(data: any) {
  const res = await fetch(`${API}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function getShare(token: string) {
  const res = await fetch(`${API}/${token}`);

  return res.json();
}

export async function unlockShare(
  token: string,
  password: string
) {
  const res = await fetch(`${API}/${token}/unlock`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
    }),
  });

  return res.json();
}

export async function revokeShare(token: string) {
  const res = await fetch(`${API}/${token}/revoke`, {
    method: "PATCH",
    headers: authHeader(),
  });

  return res.json();
}

export async function getShareStats(token: string) {
  const res = await fetch(`${API}/${token}/stats`, {
    headers: authHeader(),
  });

  return res.json();
}