/* eslint-disable */


const regex = /(\d{0,2}\/\d{0,2}\/\d{0,2})\s(\d{0,2}:\d{0,2})\s-\s([A-Za-z ]*):(.*)/gm;
let participants = {};
const stats = [];
let totalLetters = 0;
let totalWords = 0;
let totalParticipations = 0;
let totalLaughs = 0;
export function loadScript(data) {
  participants = {};
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
    totalLaughs += laughs;
    totalWords += current.text.split(' ').length;
  }
  generateStats();
}

function generateStats() {
  Object.keys(participants).forEach((participant) => {
    stats.push({
      participant,
      participations: participants[participant].countParticipations,
      laughs: participants[participant].countLaughs,
      letters: participants[participant].countLetters,
    })
  });
}

export function getParticipations() {
  const series = [];
  const labels = [];
  const results = stats.map(e => ({
    ...e,
    count: e.participations,
  }))
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
  const results = stats.map(e => ({
    ...e,
    count: e.laughs,
  }))
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
  const results = stats.map(e => ({
    ...e,
    count: e.letters,
  }))
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

export function getStats() {
  return stats;
}

export function getLettersCount() {
  return totalLetters;
}

export function getWordsCount() {
  return totalWords;
}

export function getLaughsCount() {
  return totalLaughs;
}
