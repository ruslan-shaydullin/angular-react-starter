# Headless component tests

Angular uses its existing Karma/Jasmine toolchain; React uses CRA's Jest and Testing Library. Install root and application dependencies first. With Node 16.20 and a Chromium/Chrome binary available:

```sh
npm --prefix react test -- --runInBand
CHROME_BIN=/absolute/path/to/chromium npm --prefix angular run test:ci
```

ChromeHeadless is supplied by karma-chrome-launcher. Set CHROME_BIN only when Chrome is not installed at its normal system location. Tests use a fresh storage namespace and fixture per case, render the actual application module, and drive native DOM interactions. They do not require a backend or network API.

The root `npm run verify` runs both test suites and both production builds. CI uses a compatible Node 16 runtime and Chrome on the runner. Browser sandbox flags are not disabled by default. In constrained containers, supply a separately reviewed launcher rather than weakening the normal desktop run.
