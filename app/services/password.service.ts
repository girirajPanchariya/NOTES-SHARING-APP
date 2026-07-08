export async function generatePassword() {
  const res = await fetch(
    "/api/share/generate-password"
  );

  return res.json();
}

export async function verifyPassword(
  token: string,
  password: string
) {
  const res = await fetch(
    `/api/share/${token}/unlock`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
      }),
    }
  );

  return res.json();
}