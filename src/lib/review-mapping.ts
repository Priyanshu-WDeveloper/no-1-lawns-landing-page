const REVIEW_MAP: Record<string, string[]> = {
  '6a1faf156bfff47e24372372': ['6a1ec646f67c8896b7a1e876', '6a1ec65df67c8896b7a1e87a'],
  '6a1faf2c6bfff47e24372376': ['6a1ec65df67c8896b7a1e87a', '6a1ec670f67c8896b7a1e87e'],
  '6a1faeee6bfff47e2437236e': ['6a1ec670f67c8896b7a1e87e', '6a1ebcc636804898faf3770a'],
  '6a1faf896bfff47e24372382': ['6a1ebcc636804898faf3770a', '6a1ec646f67c8896b7a1e876'],
};

export function enrichWithReviewId<T extends { _id: string; reviewIds?: string[] }>(
  item: T,
): T {
  if (item.reviewIds && item.reviewIds.length > 0) return item;
  const mapped = REVIEW_MAP[item._id];
  if (!mapped) return item;
  return { ...item, reviewIds: mapped };
}
