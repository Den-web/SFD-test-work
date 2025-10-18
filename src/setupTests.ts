import "@testing-library/jest-dom";
// AntD and rc-table/jsdom environment mocks
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// jsdom doesn't implement getComputedStyle fully; provide minimal stub needed by rc-util
if (!window.getComputedStyle) {
  // @ts-expect-error test env
  window.getComputedStyle = () => ({ getPropertyValue: () => "" });
}
