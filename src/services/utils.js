export function get(key) {
  return (obj) => obj[key];
}

export function translateTime(seconds) {
  const hour = parseInt(seconds / 3600, 10);
  const min = parseInt((seconds % 3600) / 60, 10);
  const sec = parseInt(seconds % 60, 10);

  const answer = [];

  if (hour) {
    answer.push(`${hour}:`);
  }

  if (min) {
    if (hour) {
      answer.push(`${min < 10 ? `0${min}:` : `${min}:`}`);
    } else {
      answer.push(`${min}:`);
    }
  } else if (hour) {
    answer.push('00:');
  } else {
    answer.push('0:');
  }

  answer.push(`${sec < 10 ? `0${sec}` : `${sec}`}`);
  return answer.join('');
}
