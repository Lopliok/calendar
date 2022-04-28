import React from 'react';
import { render, screen } from '@testing-library/react';
import { prefillLastWeek } from '../calendar/utils';

describe("Calculator tests", () => {
  test('adding 1 + 2 should return 3', () => {
    expect(prefillLastWeek([{
      czIdxWeekday: 0,
      date: new Date(2022, 1, 29),
      dayName: "pondělí",
      day: 29
    }])).toBe(3);
  });
})