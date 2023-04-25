export function getAllWords(text?: string) {
  if (!text) return null;
  var allWordsIncludingDups = text.split(" ");
  var wordSet = allWordsIncludingDups.reduce<Record<string, boolean>>(
    (prev, current) => {
      if (!/^\d+$/.test(current) && current) {
        prev[current] = true;
      }
      return prev;
    },
    {}
  );
  return Object.keys(wordSet);
}
