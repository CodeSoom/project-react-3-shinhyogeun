import { get } from './utils';

test('get', () => {
  const state = {
    name: 'BTS',
  };

  const f = get('name');
  const g = get('age');

  expect(f(state)).toBe('BTS');
  expect(g(state)).toBeUndefined();
});
