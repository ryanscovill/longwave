// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Configure testing library for React 18
import { configure } from '@testing-library/react';

configure({
  testIdAttribute: 'data-testid',
});

// Set up React 18 test environment
// @ts-ignore
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
