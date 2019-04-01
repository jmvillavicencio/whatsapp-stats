/* eslint-disable */


const regex = /(\d{0,2}\/\d{0,2}\/\d{0,2})\s(\d{0,2}:\d{0,2})\s-\s([A-Za-z ]*):(.*)/gm;
const participants = {};
let totalLetters = 0;
let totalParticipations = 0;
export function loadScript(data) {
  let m;
  while ((m = regex.exec(data)) !== null) {
    const regexLaugh = /(?:^| )[ja]{3,}(?:$| )/gm;
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    const current = {
      participant: '',
      date: '',
      time: '',
      text: '',
    }
    m.forEach((match, groupIndex) => {
      if (groupIndex === 1) {
        current.date = match;
      } else if (groupIndex === 2) {
        current.time = match;
      } else if (groupIndex === 3) {
        current.participant = match;
      } else if (groupIndex === 4) {
        current.text = match;
      }
    });
    if (!participants[current.participant]) {
      participants[current.participant] = {
        countParticipations: 0,
        dates: {},
        countLetters: 0,
        countLaughs: 0,
        criterioNacho: 0,
      }
    }
    if (!participants[current.participant].dates[current.date]) {
      participants[current.participant].dates[current.date] = {
        countLetters: 0,
        countParticipations: 0,
      };
    }
    const laughs = regexLaugh.test(current.text) ? 1 : 0;
    const criterioNacho = current.text.length <= 10 ? 1 : 1.25;
    participants[current.participant].dates[current.date].countParticipations += 1;
    participants[current.participant].dates[current.date].countLetters += current.text.length;
    participants[current.participant].countLaughs += laughs;
    participants[current.participant].countLetters += current.text.length;
    participants[current.participant].countParticipations += 1;
    participants[current.participant].criterioNacho += criterioNacho;
    totalParticipations += 1;
    totalLetters += current.text.length;
  }
}

export function getParticipations() {
  const series = [];
  const labels = [];
  const results = [];
  Object.keys(participants).forEach((participant) => {
    results.push({
      participant,
      count: participants[participant].countParticipations,
    })
  });
  results.sort((a, b) => {
    return b.count - a.count;
  })
  results.forEach(({ participant, count }) => {
    labels.push(`${participant}`);
    series.push(count);
  });
  return {
    series, labels,
  };
}

export function getLaughs() {
  const series = [];
  const labels = [];
  const results = [];
  Object.keys(participants).forEach((participant) => {
    results.push({
      participant,
      count: participants[participant].countLaughs,
    })
  });
  results.sort((a, b) => {
    return b.count - a.count;
  })
  results.forEach(({ participant, count }) => {
    labels.push(`${participant}`);
    series.push(count);
  });
  return {
    series, labels,
  };
}

export function getLetters() {
  const series = [];
  const labels = [];
  const results = [];
  Object.keys(participants).forEach((participant) => {
    results.push({
      participant,
      count: participants[participant].countLetters,
    })
  });
  results.sort((a, b) => {
    return b.count - a.count;
  })
  results.forEach(({ participant, count }) => {
    labels.push(`${participant}`);
    series.push(count);
  });
  return {
    series, labels,
  };
}
