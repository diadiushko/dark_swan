export default function codify(str) {
  for (const color in keyWords) {
    const regExpArray = keyWords[color];
    for (const regExp of regExpArray) {
      const paletteColor = colors[color];
      str = painter(str, regExp, paletteColor);
    }
  }
  return str;
}

function painter(str, regExp, color) {
  return str.replace(regExp, (word) => word.fontcolor(color));
}

const colors = {
  green: '#9BE070',
  cyan: '#75E2E2',
  orange: '#DF8959',
  blue: '#6989DA',
  red: '#DC5B5B',
  purple: '#E079E9',
};
const keyWords = {
  cyan: [/[?!%^&*-+=]/g],
  green: [/('|`).*?\1/g],
  orange: [/\b(\d+)\b/g, /(?<=(const|let|var|typeof)\s*)[^\d ](\w|\$|_)+/g],
  blue: [/\b[^\d\.](\w|\$|_)+(?=\(.*\))/g],
  red: [
    /(?<=^\s*)\w+(?=\:)/gm,
    /(?<=(export|import)\s+)\b\w+\b/g,
    /(?<=\.)\b[^\d](\w|\$|_)+\b(?!\(.*\))/g,
    /\b(this|delete)\b/g,
  ],
  purple: [
    /\b(const|let|var|return|class|function|async|await|export|import|=>|if|else|while|for|do|in|of)\b/g,
  ],
};
