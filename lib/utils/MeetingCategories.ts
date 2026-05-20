const CATEGORIES = [
  { id: "hiking", label: "등산·아웃도어", emoji: "🥾" },
  { id: "reading", label: "독서", emoji: "📚" },
  { id: "running", label: "러닝·운동", emoji: "🏃" },
  { id: "photo", label: "사진", emoji: "📷" },
  { id: "boardgame", label: "보드게임", emoji: "🎲" },
  { id: "craft", label: "공예·핸드메이드", emoji: "🧶" },
  { id: "music", label: "음악·악기", emoji: "🎵" },
  { id: "cooking", label: "쿠킹·미식", emoji: "🍳" },
  { id: "language", label: "외국어·공부", emoji: "📖" },
  { id: "movie", label: "영화·드라마", emoji: "🎥" },
  { id: "travel", label: "여행·캠핑", emoji: "🌍" },
  { id: "art", label: "미술·공예", emoji: "🎨" },
  { id: "fashion", label: "패션·뷰티", emoji: "👗" },
  { id: "beauty", label: "뷰티·미용", emoji: "💄" },
  { id: "health", label: "건강·스포츠", emoji: "🏃" },
  { id: "game", label: "게임·취미", emoji: "🎮" },
  { id: "instrument", label: "악기", emoji: "🎹" },
  { id: "other", label: "기타", emoji: "🌟" },
];

export default CATEGORIES;

const CATEGORY_LABELS: Record<string, string> = {
  hiking: "등산·아웃도어",
  reading: "독서",
  running: "러닝·운동",
  photo: "사진",
  boardgame: "보드게임",
  craft: "공예·핸드메이드",
  music: "음악·악기",
  cooking: "쿠킹·미식",
  language: "외국어·공부",
  movie: "영화·드라마",
  travel: "여행·캠핑",
  art: "미술·공예",
  fashion: "패션·뷰티",
  beauty: "뷰티·미용",
  health: "건강·스포츠",
  game: "게임·취미",
  instrument: "악기",
  other: "기타",
};

export { CATEGORY_LABELS };
