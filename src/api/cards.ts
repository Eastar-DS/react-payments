export default async function getCards(signal?: AbortSignal) {
  const res = await fetch('/cards', { signal });
  if (!res.ok) throw Error('카드 목록을 불러올 수 없습니다.');
  return res.json();
}
