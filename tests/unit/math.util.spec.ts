import { add, subtract } from '../../src/utils/math';
import { test, expect } from '@playwright/test';

// basic unit tests for math helpers

test('add returns the sum of two numbers', () => {
  expect(add(2, 3)).toBe(5);
  expect(add(-1, 1)).toBe(0);
});

test('subtract returns the difference of two numbers', () => {
  expect(subtract(5, 3)).toBe(2);
  expect(subtract(0, 5)).toBe(-5);
});