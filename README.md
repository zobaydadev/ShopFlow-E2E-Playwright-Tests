# ShopFlow E2E Playwright Tests

End-to-end UI and API tests with Playwright and TypeScript.

- UI: the Swag Labs demo shop (https://www.saucedemo.com), covering login, cart, checkout and sorting
- API: JSONPlaceholder (https://jsonplaceholder.typicode.com), covering list, read, filter, create, update, delete and 404

## Highlights
- Page Object Model with typed locators
- Custom fixtures (`loggedIn` gives a test an already authenticated inventory page)
- Data-driven negative login tests
- Separate `ui` and `api` Playwright projects
- Screenshot and trace on failure, HTML report
- CI on every push and a nightly scheduled run with GitHub Actions
- Dockerfile based on the official Playwright image

## Structure
```
pages/       LoginPage, InventoryPage, CartPage
fixtures/    app.ts            page objects and the loggedIn fixture
tests/ui/    login, cart-and-checkout, sorting
tests/api/   posts
playwright.config.ts
```

## Run
```bash
npm install
npx playwright install chromium
npm test              # everything
npm run test:ui       # UI project only
npm run test:api      # API project only
npm run report        # open the HTML report
```

## Run with Docker
```bash
docker build -t shopflow-playwright-tests .
docker run --rm --ipc=host shopflow-playwright-tests
```
