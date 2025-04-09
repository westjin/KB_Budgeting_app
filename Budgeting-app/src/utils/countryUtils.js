export const countryNameMap = {
  US: 'United States',
  JP: 'Japan',
  AU: 'Australia',
  KR: 'South Korea',
  FR: 'France',
  DE: 'Germany',
  CN: 'China',
  // 필요한 국가 추가
};

export function getFlagEmoji(countryCode) {
  if (!countryCode) return '';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
