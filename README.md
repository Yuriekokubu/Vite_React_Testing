# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

## Testing with Playwright 🧪

This project uses [Playwright](https://playwright.dev) to cover **every testing layer**.  The `tests/` directory is organised by purpose:

```
tests/
├─ e2e/                 # end-to-end scenarios against the running app
├─ unit/                # small utility/unit tests that run in Node
├─ component/           # React component/page interactions
└─ *_snapshots/         # visual snapshot subfolders created by Playwright
```

Each sub‑folder contains the relevant `*.spec.ts` (or `.js`) files; the runner
recurses through them automatically, so you can add more suites anywhere
beneath `tests/`.

- e2e directories hold flows such as login, todo, mobile layout and visual
  comparisons.
- unit tests verify small modules (e.g. `auth.util.spec.ts`).
- component tests live in `tests/component` and now act as simple page tests.
- snapshot folders are placed next to their corresponding specs for easy
  reference.

### Setup

```bash
npm install
npm run test:install    # install browsers and Playwright dependencies
```

### Useful scripts

```bash
npm run dev            # start dev server
npm run test           # run all Playwright tests (E2E + component + unit + production)
npm run test:ci        # CI-friendly output + HTML report
npm run test:headed    # run tests in headed browsers for debugging
npm run test:prod      # smoke tests against built output
```

There are also npm lifecycle hooks defined so that tests run automatically during
the build process:

- **prebuild** executes linting and the full Playwright suite (`npm run test:ci`).
- **postbuild** runs `npm run test:prod`, starting a static server on the `dist`
  directory and exercising the app once with Playwright.

This ensures quality both before and after producing production artifacts.

Playwright will spin up the Vite server automatically when needed. Results and artifacts land in `test-results/`.

### What the app does

The sample application now includes:

- a counter button (original template),
- a username input form (triggered by interaction test),
- **a simple login form** (username/password) with hard‑coded credential check,
  exercised by `tests/login.spec.ts` and backed by a small utility in
  `src/utils/auth.js` which itself is tested by `tests/auth.util.spec.ts`.
- **some utility modules** (`auth.js`, `math.js` in `src/utils/`) with
  corresponding unit tests in `tests/unit/` (`auth.util.spec.ts`,
  `math.util.spec.ts`).
- **a simple todo list** you can add items to – this is covered by both an
  end-to-end test (`tests/todo.spec.ts`) and a page test
  (`tests/component/TodoList.spec.tsx`).

Happy testing!
