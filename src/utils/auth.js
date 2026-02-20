// simple authentication util - the "backend" here is just hard-coded
export function authenticate(user, pass) {
  // pretend we check against a database
  return user === 'admin' && pass === 'password';
}
