export async function fetchYouTubeMusics(keyword, nextPageToken) {
  const key = process.env.API_KEY;
  const url = 'https://www.googleapis.com/youtube/v3/search?'
    + `key=${key}&q=${keyword} 플레이리스트&maxResults=6&part=snippet&type=video&`
    + 'fields=(nextPageToken,items(id,snippet(title,channelTitle,description,thumbnails)))&'
    + `${nextPageToken ? `pageToken=${nextPageToken}` : ''}`;
  const response = await fetch(url);
  const data = await response.json();

  return data;
}

export function xxx() {
  // Todo : 지우기
  return '지우기';
}
