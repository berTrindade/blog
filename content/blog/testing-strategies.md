---
title: Modern Testing Strategies for Web Applications
date: 2025-05-12
category: Engineering
excerpt: Comprehensive testing strategies and best practices.
image: https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop
---

Testing is essential for building reliable applications. Let's explore modern testing strategies that work.

## The Testing Pyramid

Balance different types of tests:

- **Unit Tests**: Test individual functions (70%)
- **Integration Tests**: Test component interactions (20%)
- **E2E Tests**: Test complete user flows (10%)

## Unit Testing with Vitest

Write fast, focused unit tests:

```typescript
import { describe, it, expect } from 'vitest';

describe('calculateTotal', () => {
  it('should sum all items', () => {
    const items = [10, 20, 30];
    expect(calculateTotal(items)).toBe(60);
  });

  it('should return 0 for empty array', () => {
    expect(calculateTotal([])).toBe(0);
  });
});
```

## Component Testing with React Testing Library

Test components from the user's perspective:

```typescript
import { render, screen, fireEvent } from '@testing-library/react';

test('increments counter on button click', () => {
  render(<Counter />);
  const button = screen.getByRole('button', { name: /increment/i });
  fireEvent.click(button);
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});
```

## E2E Testing with Playwright

Test critical user journeys:

```typescript
import { test, expect } from '@playwright/test';

test('user can complete checkout', async ({ page }) => {
  await page.goto('/products');
  await page.click('text=Add to Cart');
  await page.click('text=Checkout');
  await page.fill('input[name="email"]', 'user@example.com');
  await page.click('button[type="submit"]');
  await expect(page.locator('text=Order confirmed')).toBeVisible();
});
```

## Test-Driven Development

Write tests first:

1. Write a failing test
2. Implement minimum code to pass
3. Refactor while keeping tests green

## Mocking and Stubbing

Isolate your tests:

```typescript
vi.mock('./api', () => ({
  fetchUser: vi.fn(() => Promise.resolve({ id: 1, name: 'John' }))
}));
```

Good tests give you confidence to refactor and ship faster.