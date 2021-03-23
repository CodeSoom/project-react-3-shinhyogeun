import { fetchYouTubeMusics } from './api';

import MUSICS from '../../fixtures/musics';

describe('api', () => {
  function mockFetch(data) {
    global.fetch = jest.fn().mockResolvedValue({
      async json() { return data; },
    });
  }

  describe('fetchYouTubeMusics', () => {
    beforeEach(() => {
      mockFetch(MUSICS);
    });

    it('유튜브에서 받은 음악Data를 돌려준다.', async () => {
      const musics = await fetchYouTubeMusics('DEAN의 노래');

      expect(musics).toEqual(MUSICS);
    });
  });
});
