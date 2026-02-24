// simple authentication util – in a real app this would hit your backend
export async function authenticate(user, pass) {
  // POST credentials to the auth server, which is proxied in development by Vite
  const res = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user, pass }),
  });
  const data = await res.json();
  return data.valid;
}
