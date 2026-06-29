export interface HotPlace {
  id: string;
  name: string;
  category: string;
  categoryGroup: 'cafe' | 'bakery' | 'restaurant';
  address: string;
  latitude: number;
  longitude: number;
  rating: number;
  reviewCount: number;
  score: number; // 1-100 인기 점수
  description: string;
  reasons: string[]; // 인기 이유/특징
  sources: {
    type: 'blog' | 'instagram' | 'naver';
    title: string;
    url: string;
  }[];
  imageUrl: string;
}

export interface SearchConfig {
  geminiApiKey: string;
  kakaoAppKey: string;
}
