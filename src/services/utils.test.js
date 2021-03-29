import { get, translateTime } from './utils';

test('get', () => {
  const state = {
    name: 'BTS',
  };

  const getName = get('name');
  const getAge = get('age');

  expect(getName(state)).toBe('BTS');
  expect(getAge(state)).toBeUndefined();
});

test('translateTime', () => {
  expect(translateTime(10)).toBe('0:10');
  expect(translateTime(100)).toBe('1:40');
  expect(translateTime(1020)).toBe('17:00');
  expect(translateTime(7250)).toBe('2:00:50');
  expect(translateTime(7300)).toBe('2:01:40');
  expect(translateTime(10000)).toBe('2:46:40');
});
