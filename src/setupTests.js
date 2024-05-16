// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
const error = console.error;

console.error = (...args) => {
  if (args.length === 1 && typeof args[0] === 'string' && args[0].includes('Could not parse CSS stylesheet')) {
    return;
  }
  error.apply(console, args);
};