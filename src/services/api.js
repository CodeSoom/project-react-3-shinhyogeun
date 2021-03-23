export async function fetchYouTubeMusics(keyword, nextPageToken = '') {
  const key = process.env.API_KEY;
  const url = 'https://www.googleapis.com/youtube/v3/search?'
    + `key=${key}`
    + '&'
    + `q=${keyword}`
    + '&'
    + `${nextPageToken ? `pageToken=${nextPageToken}` : ''}`
    + '&'
    + 'maxResults=10'
    + '&'
    + 'part=snippet'
    + '&'
    + 'fields=(nextPageToken,items(id,snippet(title,channelTitle,description,thumbnails)))';
  const response = await fetch(url);
  const data = await response.json();

  return data;
}

export function xxx() {
  // Todo : 지우기
}
