import { useState } from 'react'
// styles are omitted to avoid bundler issues during component testing

import TodoList from './TodoList';
import { authenticate } from './utils/auth';

function App() {
  const [count, setCount] = useState(0);
  const [username, setUsername] = useState('');
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // authentication helper imported below

  return (
    <>
      <div>
        {/* logos removed to simplify test environment */}
      </div>
      <h1>Vite + React</h1>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

      {/* login form */}
      {!isLoggedIn ? (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            // authenticate returns a promise now
            const ok = await authenticate(loginUser, loginPass);
            if (ok) {
              setIsLoggedIn(true);
            } else {
              alert('Invalid credentials');
            }
          }}
        >
          <div>
            <input
              placeholder="user"
              value={loginUser}
              onChange={(e) => setLoginUser(e.target.value)}
            />
          </div>
          <div>
            <input
              placeholder="password"
              type="password"
              value={loginPass}
              onChange={(e) => setLoginPass(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      ) : (
        <p>Logged in as {loginUser}</p>
      )}

      {/* simple username form checked by existing interaction.spec.ts */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          placeholder="ชื่อผู้ใช้งาน"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">ส่ง</button>
      </form>
      {username && <p>ยินดีต้อนรับ {username}</p>}

      {/* todo list component */}
      <TodoList />

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App
