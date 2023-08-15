import { expect } from 'vitest';
import matchers from '@testing-library/jest-dom/matchers';

// extends Vitest's expect method with methods from testing-library
expect.extend(matchers);