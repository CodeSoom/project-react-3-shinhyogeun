import { get, xxx } from './utils';

test('get', () => {
  const state = {
    name: 'BTS',
  };

  const getName = get('name');
  const getAge = get('age');

  expect(getName(state)).toBe('BTS');
  expect(getAge(state)).toBeUndefined();
});

test('xxx', () => {
  // For Coverage
  expect(xxx()).toBe('지우기');
});
