import { ItemProps } from "@/components/ItemCard";

// Helper to convert text to term frequencies (TF)
function getTermFrequencies(text: string): Record<string, number> {
  const terms = text.toLowerCase().match(/\w+/g) || [];
  const freq: Record<string, number> = {};
  for (const term of terms) {
    freq[term] = (freq[term] || 0) + 1;
  }
  return freq;
}

// Calculate Cosine Similarity between two text inputs
export function calculateCosineSimilarity(textA: string, textB: string): number {
  const freqA = getTermFrequencies(textA);
  const freqB = getTermFrequencies(textB);

  const vocabulary = new Set([...Object.keys(freqA), ...Object.keys(freqB)]);

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (const term of Array.from(vocabulary)) {
    const a = freqA[term] || 0;
    const b = freqB[term] || 0;
    dotProduct += a * b;
    normA += a * a;
    normB += b * b;
  }

  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export function rankItemsBySimilarity(
  userPreferences: string[], 
  items: ItemProps[]
): ItemProps[] {
  const prefText = userPreferences.join(" ");

  const ranked = items.map(item => {
    const itemText = `${item.title} ${item.description} ${(item.tags || []).join(" ")}`;
    const similarity = calculateCosineSimilarity(prefText, itemText);
    return { ...item, similarity };
  });

  return ranked.sort((a, b) => (b.similarity || 0) - (a.similarity || 0));
}
