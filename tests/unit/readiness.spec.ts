import { describe, it, expect } from 'vitest';
import { ReadinessCalculator } from '../../src/modules/readiness/calculator';
import { Sport } from '@prisma/client';

describe('Readiness Calculator', () => {
  describe('Weight configuration', () => {
    it('should load default weights for general sport', () => {
      const calculator = new ReadinessCalculator(Sport.GENERAL);
      const weights = calculator['weights'];

      expect(weights.hrv).toBe(0.22);
      expect(weights.sleep).toBe(0.22);
      expect(weights.rhr).toBe(0.12);
      expect(weights.load).toBe(0.14);
      expect(weights.stiffness).toBe(0.12);
      expect(weights.soreness).toBe(0.12);
      expect(weights.reset).toBe(0.06);
    });

    it('should load sport-specific weights for running', () => {
      const calculator = new ReadinessCalculator(Sport.RUNNING);
      const weights = calculator['weights'];

      expect(weights.hrv).toBe(0.20);
      expect(weights.sleep).toBe(0.20);
      expect(weights.load).toBe(0.20);
    });
  });

  describe('Score calculations', () => {
    it('should normalize z-scores correctly', () => {
      const calculator = new ReadinessCalculator();

      const normalized = calculator['normalizeScore'](0);
      expect(normalized).toBe(0.5);

      const high = calculator['normalizeScore'](3);
      expect(high).toBe(1);

      const low = calculator['normalizeScore'](-3);
      expect(low).toBe(0);
    });

    it('should calculate z-score correctly', () => {
      const calculator = new ReadinessCalculator();

      const zScore = calculator['calculateZScore'](70, 65, 5);
      expect(zScore).toBe(1);

      const zScoreNeg = calculator['calculateZScore'](60, 65, 5);
      expect(zScoreNeg).toBe(-1);
    });

    it('should handle edge cases in load ratio', () => {
      const calculator = new ReadinessCalculator();

      expect(calculator['normalizeLoadRatio'](0.7)).toBe(0.9);
      expect(calculator['normalizeLoadRatio'](1.0)).toBe(1.0);
      expect(calculator['normalizeLoadRatio'](1.4)).toBe(0.5);
      expect(calculator['normalizeLoadRatio'](1.6)).toBe(0.3);
    });
  });

  describe('Statistical functions', () => {
    it('should calculate mean correctly', () => {
      const calculator = new ReadinessCalculator();

      expect(calculator['mean']([1, 2, 3, 4, 5])).toBe(3);
      expect(calculator['mean']([10, 20])).toBe(15);
      expect(calculator['mean']([])).toBe(0);
    });

    it('should calculate standard deviation correctly', () => {
      const calculator = new ReadinessCalculator();

      const std = calculator['std']([2, 4, 6, 8]);
      expect(std).toBeCloseTo(2.236, 2);

      expect(calculator['std']([5])).toBe(0);
      expect(calculator['std']([])).toBe(0);
    });
  });

  describe('Survey scaling', () => {
    it('should scale subjective metrics correctly', () => {
      const calculator = new ReadinessCalculator();

      expect(calculator['scale'](10)).toBe(1);
      expect(calculator['scale'](5)).toBe(0.5);
      expect(calculator['scale'](0)).toBe(0);

      expect(calculator['inverseScale'](10)).toBe(0);
      expect(calculator['inverseScale'](5)).toBe(0.5);
      expect(calculator['inverseScale'](0)).toBe(1);
    });
  });
});