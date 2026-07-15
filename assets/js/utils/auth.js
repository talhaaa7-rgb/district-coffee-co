/**
 * auth.js
 * Mock authentication. There is no backend in this project, so "accounts"
 * live in localStorage and passwords are stored in plain text. This is
 * ONLY acceptable because it's a front-end teaching project with no real
 * user data — never do this in a real, deployed app.
 */

const USERS_KEY = 'dcc_users';
const SESSION_KEY = 'dcc_current_user';

/** @function 37: mockSignup - creates a new mock account and logs them in */
function mockSignup(name, email, password) {
  const users = Storage.get(USERS_KEY, []);

  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    return { success: false, message: 'An account with that email already exists.' };
  }

  users.push({ name, email, password });
  Storage.set(USERS_KEY, users);
  Storage.set(SESSION_KEY, { name, email });

  return { success: true };
}

/** @function 38: mockLogin - checks credentials against stored mock users */
function mockLogin(email, password) {
  const users = Storage.get(USERS_KEY, []);
  const match = users.find(u =>
    u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!match) {
    return { success: false, message: 'Incorrect email or password.' };
  }

  Storage.set(SESSION_KEY, { name: match.name, email: match.email });
  return { success: true };
}

/** @function 39: getCurrentUser - returns the logged-in mock session, or null */
function getCurrentUser() {
  return Storage.get(SESSION_KEY, null);
}

/** @function 40: logout - clears the mock session */
function logout() {
  Storage.set(SESSION_KEY, null);
  window.location.href = resolveLink('index.html');
}
/**
 * Admin authentication is separate from customer accounts. There is
 * exactly one demo admin credential, hardcoded here since there's no
 * backend to store it securely. This is fine for a front-end teaching
 * project demo, but would never be acceptable in a real deployed app.
 */
const ADMIN_CREDENTIALS = { username: 'admin@districtcoffee.com', password: 'admin123' };
const ADMIN_SESSION_KEY = 'dcc_admin_session';

/** @function 51: adminLogin - checks credentials against the single demo admin account */
function adminLogin(username, password) {
  if (username.toLowerCase() === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    Storage.set(ADMIN_SESSION_KEY, { username, loggedInAt: new Date().toISOString() });
    return { success: true };
  }
  return { success: false, message: 'Incorrect admin username or password.' };
}

/** @function 52: getAdminSession - returns the current admin session, or null */
function getAdminSession() {
  return Storage.get(ADMIN_SESSION_KEY, null);
}

/** @function 53: adminLogout - clears the admin session */
function adminLogout() {
  Storage.set(ADMIN_SESSION_KEY, null);
  window.location.href = resolveLink('pages/admin-login.html');
}

/** @function 54: handleAdminLoginSubmit - validates + submits the admin login form */
function handleAdminLoginSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const username = form.querySelector('#admin-username');
  const password = form.querySelector('#admin-password');

  [username, password].forEach(clearFieldError);
  let valid = true;

  if (!isRequired(username.value)) {
    showFieldError(username, 'Enter the admin username.');
    valid = false;
  }
  if (!isRequired(password.value)) {
    showFieldError(password, 'Enter the admin password.');
    valid = false;
  }
  if (!valid) return;

  const result = adminLogin(username.value.trim(), password.value);
  if (!result.success) {
    showToast(result.message, 'error');
    return;
  }

  window.location.href = resolveLink('pages/admin.html');
}

/** @function 41: handleLoginSubmit - validates + submits the login form */
function handleLoginSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const email = form.querySelector('#login-email');
  const password = form.querySelector('#login-password');

  [email, password].forEach(clearFieldError);
  let valid = true;

  if (!isRequired(email.value) || !isValidEmail(email.value)) {
    showFieldError(email, 'Enter a valid email.');
    valid = false;
  }
  if (!isRequired(password.value)) {
    showFieldError(password, 'Enter your password.');
    valid = false;
  }
  if (!valid) return;

  const result = mockLogin(email.value.trim(), password.value);
  if (!result.success) {
    showToast(result.message, 'error');
    return;
  }

  showToast('Welcome back!', 'success');
  window.location.href = resolveLink('pages/account.html');
}

/** @function 42: handleSignupSubmit - validates + submits the signup form */
function handleSignupSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.querySelector('#signup-name');
  const email = form.querySelector('#signup-email');
  const password = form.querySelector('#signup-password');

  [name, email, password].forEach(clearFieldError);
  let valid = true;

  if (!isRequired(name.value)) {
    showFieldError(name, 'Enter your name.');
    valid = false;
  }
  if (!isRequired(email.value) || !isValidEmail(email.value)) {
    showFieldError(email, 'Enter a valid email.');
    valid = false;
  }
  if (!isRequired(password.value) || password.value.length < 6) {
    showFieldError(password, 'Password must be at least 6 characters.');
    valid = false;
  }
  if (!valid) return;

  const result = mockSignup(name.value.trim(), email.value.trim(), password.value);
  if (!result.success) {
    showToast(result.message, 'error');
    return;
  }

  showToast('Account created!', 'success');
  window.location.href = resolveLink('pages/account.html');
}
