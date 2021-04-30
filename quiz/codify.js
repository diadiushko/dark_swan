export default function codify(str) {
  for (const key in keyWords) {
    if (Array.isArray(keyWords[key])) {
      
    }
  }
  return str.fontcolor('green');
}

const keyWords = {
  purple: /\b(const|let|var|function|async|await|export|import|=>|if|else|while|for|do|in|of)\b/g,
  orange: [/\b(\d+)\b/g, /(?<=(const|let|var)\s*)[^\d](\w|\$|_)+/g],
  blue: /\b[^\d](\w|\$|_)+(?=\(.*\))/g,
  red: [
    /(?<=^\s*)\w+(?=\:)/gm,
    /(?<=(export|import)\s+)\b\w+\b/g,
    /(?<=\.)\b[^\d](\w|\$|_)+\b(?!\(.*\))/g,
  ],
  green: /('|"|`).+\1/g,
  cyan: /\b=\b/g,
};
