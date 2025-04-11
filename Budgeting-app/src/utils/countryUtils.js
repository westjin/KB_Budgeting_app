export const countryNameMap = {
  US: 'United States',
  JP: 'Japan',
  AU: 'Australia',
  KR: 'South Korea',
  GB: 'United Kingdom',
  FR: 'France',
  DE: 'Germany',
  CA: 'Canada',
  CN: 'China',
  IT: 'Italy',
  ES: 'Spain',
  TH: 'Thailand',
  VN: 'Vietnam',
  MX: 'Mexico',
  IN: 'India',
  BR: 'Brazil',
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
