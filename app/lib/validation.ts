export function validateEmail(email: string) {
  const regex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(email);
}

export function validatePassword(password: string) {
  return password.length >= 6;
}

export function validateRequired(
  fields: Record<string, any>
) {
  return Object.values(fields).every(
    (field) =>
      field !== undefined &&
      field !== null &&
      field !== ""
  );
}