import { fetchYouTubeMusics, xxx } from './api';

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

    context('nextPageToken이 없을 때', () => {
      it('유튜브에서 받은 음악Data를 돌려준다.', async () => {
        const musics = await fetchYouTubeMusics('DEAN의 노래');

        expect(musics).toEqual(MUSICS);
      });
    });

    context('nextPageToken이 있을 때', () => {
      it('다음페이지 음악Data를 돌려준다.', async () => {
        const musics = await fetchYouTubeMusics('DEAN의 노래', 'NEXT_PAGE_TOKEN');

        expect(musics).toEqual(MUSICS);
      });
    });
  });

  it('xxx', () => {
    // For Coverage
    expect(xxx()).toBe('지우기');
  });
});
