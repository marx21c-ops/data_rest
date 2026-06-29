import { useState, useEffect } from 'react';
import { 
  Search, MapPin, Database, Sparkles, FileJson, 
  Info, MessageSquare, Send, Check
} from 'lucide-react';
import { HotPlace, SearchConfig } from './types';
import KakaoMap from './components/KakaoMap';

const MOCK_DATA: Record<string, (HotPlace & { categoryGroup: 'cafe' | 'bakery' | 'restaurant' })[]> = {
  '문래': [
    {
      id: 'munlae-1',
      name: '러스트 베이커리 (Rust Bakery)',
      category: '베이커리 카페',
      categoryGroup: 'cafe',
      address: '서울 영등포구 경인로79길 15',
      latitude: 37.5126,
      longitude: 126.8967,
      rating: 4.6,
      reviewCount: 1240,
      score: 96,
      description: '문래동 철공소 골목의 붉은 벽돌 감성을 대표하는 빈티지 베이커리 카페입니다. 크루아상, 페이스트리, 시나몬롤 등 매일 직접 구워내는 빵과 인더스트리얼 인테리어가 특징입니다.',
      reasons: ['인더스트리얼 인쇄소 개조 감성', '매일 갓 구운 크루아상 & 페이스트리', '인스타그램 감성 포토스팟 보유'],
      sources: [
        { type: 'blog', title: '문래동 핫플 탐방 - 러스트 베이커리 솔직 후기', url: '#' },
        { type: 'instagram', title: '#러스트베이커리 피드 언급 5k 이상', url: '#' }
      ],
      imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 'munlae-2',
      name: '폰트커피 문래점 (Pont Coffee)',
      category: '에스프레소 바 / 카페',
      categoryGroup: 'cafe',
      address: '서울 영등포구 문래동3가 57-3',
      latitude: 37.5140,
      longitude: 126.8988,
      rating: 4.5,
      reviewCount: 680,
      score: 91,
      description: '옛 철공소 건물의 높은 층고와 구조적 뼈대를 살리며 현대적 미니멀리즘을 더한 로스터리 카페입니다. 스페셜티 커피와 시그니처 드립 커피를 친절한 설명과 함께 즐길 수 있습니다.',
      reasons: ['스페셜티 커피 전문 로스터리', '옛 철공소 뼈대를 살린 모던 미니멀 공간', '친절하고 세심한 브루잉 바 설명'],
      sources: [
        { type: 'blog', title: '을지로와는 또 다른 문래의 모던 에스프레소 바, 폰트', url: '#' },
        { type: 'instagram', title: '#폰트커피 태그 트렌딩', url: '#' }
      ],
      imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 'munlae-b1',
      name: '쉐프조 (Chef Cho)',
      category: '베이커리 / 케이크',
      categoryGroup: 'bakery',
      address: '서울 영등포구 문래로 98',
      latitude: 37.5188,
      longitude: 126.8962,
      rating: 4.4,
      reviewCount: 950,
      score: 93,
      description: '서울 3대 딸기 케이크 맛집으로 잘 알려진 베이커리입니다. 신선하고 듬뿍 들어간 생딸기와 달지 않은 생크림이 조화를 이루는 딸기 돔 케이크가 대표 메뉴입니다.',
      reasons: ['생활의 달인 케이크 달인 출신', '동물성 생크림 100% 사용 딸기돔케이크', '다양한 천연발효종 건강 빵 라인업'],
      sources: [
        { type: 'blog', title: '서울 딸기 케이크 성지 문래 쉐프조 솔직 방문 후기', url: '#' }
      ],
      imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 'munlae-r1',
      name: '그믐족발 (Geumeum Jokbal)',
      category: '튀김족발 / 음식점',
      categoryGroup: 'restaurant',
      address: '서울 영등포구 경인로79길 21',
      latitude: 37.5123,
      longitude: 126.8964,
      rating: 4.5,
      reviewCount: 1530,
      score: 95,
      description: '문래동 창작촌에서 줄 서서 먹는 이색 튀김족발 전문점입니다. 겉은 바삭하고 속은 쫄깃한 특유의 꽈리튀김족발이 시그니처이며, 매콤한 비빔국수와의 궁합이 탁월합니다.',
      reasons: ['독보적인 꽈리고추 튀김족발 식감', '문래 창작촌 웨이팅 필수 대표 맛집', '바삭한 튀김 옷과 쫄깃한 육질'],
      sources: [
        { type: 'blog', title: '겉바속촉 끝판왕 문래동 그믐족발 꽈리튀김족발 내돈내산', url: '#' }
      ],
      imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=60'
    }
  ],
  '성수': [
    {
      id: 'seongsu-1',
      name: '대림창고 (Daelim Changgo)',
      category: '갤러리 카페',
      categoryGroup: 'cafe',
      address: '서울 성동구 성수이로 78',
      latitude: 37.5412,
      longitude: 127.0567,
      rating: 4.3,
      reviewCount: 4210,
      score: 98,
      description: '성수동의 옛 방직공장 창고 건물을 개조한 재생 건축의 대표작이자 원조 갤러리 카페입니다. 거대한 붉은 벽돌과 금속 프레임, 자연 채광 하에서 예술 작품과 음료를 함께 즐깁니다.',
      reasons: ['성수동 공장 개조 카페의 원조', '정기 미술 전시 및 설치미술 감상 가능', '웅장한 스케일과 자연 채광'],
      sources: [
        { type: 'blog', title: '성수 대림창고 갤러리 컬럼 리뷰', url: '#' }
      ],
      imageUrl: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 'seongsu-2',
      name: '어니언 성수 (Onion Seongsu)',
      category: '베이커리 카페',
      categoryGroup: 'cafe',
      address: '서울 성동구 아차산로9길 8',
      latitude: 37.5441,
      longitude: 127.0583,
      rating: 4.4,
      reviewCount: 3890,
      score: 97,
      description: '1970년대 지어진 낡은 슈퍼마켓과 금속 부품 공장 건물의 부서진 콘크리트 벽면과 녹슨 대문을 그대로 살린 초현실적 러프 감성 카페입니다. 시그니처 팡도르가 유명합니다.',
      reasons: ['허물어진 벽면의 재생 건축 매력', '슈가파우더 가득 얹은 시그니처 팡도르', '루프탑 야외 좌석의 자유로운 분위기'],
      sources: [
        { type: 'blog', title: '성수 어니언 팡도르 솔직 리뷰', url: '#' }
      ],
      imageUrl: 'https://images.unsplash.com/photo-1517256064527-09c53b2d0bc6?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 'seongsu-b1',
      name: '밀도 성수본점 (Meal°)',
      category: '식빵 전문 베이커리',
      categoryGroup: 'bakery',
      address: '서울 성동구 왕십리로 96',
      latitude: 37.5435,
      longitude: 127.0422,
      rating: 4.4,
      reviewCount: 2310,
      score: 94,
      description: '줄 서서 사는 식빵으로 유명한 성수동 대표 베이커리입니다. 물 대신 우유와 유기농 밀가루로 반죽하여 결이 살아있고 쫄깃한 식감의 리치 식빵과 담백 식빵이 큰 인기를 얻고 있습니다.',
      reasons: ['줄 서서 먹는 인생 식빵 성지', '생크림으로 만든 쫄깃하고 촉촉한 식감', '다양한 커스터드 크림 미니식빵'],
      sources: [
        { type: 'blog', title: '성수동 빵지순례 필수코스 밀도 식빵 보관 팁', url: '#' }
      ],
      imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 'seongsu-r1',
      name: '소문난성수감자탕',
      category: '감자탕 / 음식점',
      categoryGroup: 'restaurant',
      address: '서울 성동구 연무장길 45',
      latitude: 37.5427,
      longitude: 127.0561,
      rating: 4.5,
      reviewCount: 9840,
      score: 99,
      description: '백종원의 3대천왕 등에 소개되며 국내외 관광객의 성지가 된 24시간 감자탕 전문점입니다. 잡내 없이 맑고 깊은 국물과 두툼하고 부드럽게 뜯어지는 뼈 고기가 일품입니다.',
      reasons: ['3대천왕 방영된 24시간 감자탕 명소', '특제 간장 소스에 찍어 먹는 뼈고기', '칼칼하고 깊은 해장용 국물 맛'],
      sources: [
        { type: 'blog', title: '성수동 맛집 소문난성수감자탕 웨이팅 꿀팁', url: '#' }
      ],
      imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=60'
    }
  ],
  '을지로': [
    {
      id: 'euljiro-1',
      name: '커피한약방',
      category: '필터 커피 전문점',
      categoryGroup: 'cafe',
      address: '서울 중구 삼일대로12길 16-6',
      latitude: 37.5663,
      longitude: 126.9875,
      rating: 4.5,
      reviewCount: 2150,
      score: 95,
      description: '조선시대 서민 치료소인 혜민서 자리에 들어선 자개 인테리어의 극도 레트로 카페입니다. 좁디좁은 골목길 안에서 수동으로 커피 콩을 볶는 수제 필터 커피를 내어줍니다.',
      reasons: ['역사적 장소(혜민서 터)가 주는 무드', '앤티크한 괘종시계와 화려한 나전칠기 자개장', '직접 손으로 돌려 내리는 드립커피'],
      sources: [
        { type: 'blog', title: '혜민서 터 을지로 커피한약방과 혜민당 타르트', url: '#' }
      ],
      imageUrl: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 'euljiro-2',
      name: '호랑이 (Horangi)',
      category: '에스프레소 카페',
      categoryGroup: 'cafe',
      address: '서울 중구 을지로 157 대림상가 3층 375호',
      latitude: 37.5668,
      longitude: 126.9942,
      rating: 4.4,
      reviewCount: 1890,
      score: 93,
      description: '대림상가 데크 3층에 오순도순 자리 잡은 아주 좁고 클래식한 빈티지 카페입니다. 고소한 수제 두유 느낌이 감도는 시그니처 호랑이 라떼와 후르츠 산도가 가히 필수 코스로 꼽힙니다.',
      reasons: ['인생 라떼로 꼽히는 고소한 호랑이라떼', '대림상가 청년창업 골목 빈티지 매력', '가성비 훌륭한 레트로 커피 한 잔'],
      sources: [
        { type: 'blog', title: '힙지로 대림상가 호랑이 라떼 웨이팅 후기', url: '#' }
      ],
      imageUrl: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 'euljiro-b1',
      name: '분카샤 (Bunkasha)',
      category: '디저트 베이커리 / 카페',
      categoryGroup: 'bakery',
      address: '서울 중구 을지로14길 20 시티빌딩 2층',
      latitude: 37.5654,
      longitude: 126.9922,
      rating: 4.3,
      reviewCount: 840,
      score: 91,
      description: '을지로 골목 낡은 인쇄소 건물 2층에 조용히 자리 잡은 디저트 빵 맛집입니다. 새하얀 생크림 속에 딸기, 바나나, 키위 등 알록달록한 과일이 가득 박힌 일본식 후르츠 산도가 대표적입니다.',
      reasons: ['을지로 대표 원조 후르츠산도 맛집', '감성 넘치는 화이트 앤 우드 미니멀 공간', '과일이 아낌없이 채워진 비주얼 디저트'],
      sources: [
        { type: 'blog', title: '힙지로 후르츠산도 디저트 카페 분카샤 방문 후기', url: '#' }
      ],
      imageUrl: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 'euljiro-r1',
      name: '을지다락 (Eulji Darak)',
      category: '파스타 & 오므라이스 음식점',
      categoryGroup: 'restaurant',
      address: '서울 중구 수표로 10길 19 4층',
      latitude: 37.5645,
      longitude: 126.9901,
      rating: 4.4,
      reviewCount: 1720,
      score: 93,
      description: '을지로 인쇄 골목의 허름한 철문 뒤 계단을 타고 4층 다락방으로 올라가면 펼쳐지는 빈티지 양식 맛집입니다. 칼로 자르면 부드럽게 반으로 갈라져 펼쳐지는 시그니처 다락오므라이스가 유명합니다.',
      reasons: ['부드럽게 쏟아지는 특제 소스 오므라이스', '매콤하고 크리미한 매콤크림파스타', '을지로 인쇄소 건물 속 숨은 반전 공간'],
      sources: [
        { type: 'blog', title: '을지로 핫플 을지다락 오므라이스 비주얼 리뷰', url: '#' }
      ],
      imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=60'
    }
  ]
};

export default function App() {
  const [regionInput, setRegionInput] = useState('문래동');
  const [categoryType, setCategoryType] = useState<'cafe' | 'bakery' | 'restaurant' | 'all'>('cafe');
  
  // Initial states based on Mullae cafes
  const [places, setPlaces] = useState<HotPlace[]>(
    MOCK_DATA['문래'].filter(p => p.categoryGroup === 'cafe')
  );
  const [selectedPlace, setSelectedPlace] = useState<HotPlace | null>(
    MOCK_DATA['문래'].filter(p => p.categoryGroup === 'cafe')[0] || null
  );
  const [selectedSpotIds, setSelectedSpotIds] = useState<Set<string>>(
    new Set([MOCK_DATA['문래'].filter(p => p.categoryGroup === 'cafe')[0]?.id].filter(Boolean) as string[])
  );
  
  const [isLoading, setIsLoading] = useState(false);
  
  // API Configurations saved in localStorage with fallback to Vite env variables
  const [config] = useState<SearchConfig>({
    geminiApiKey: localStorage.getItem('gemini_api_key') || (import.meta.env.VITE_GEMINI_API_KEY as string) || '',
    kakaoAppKey: localStorage.getItem('kakao_app_key') || (import.meta.env.VITE_KAKAO_APP_KEY as string) || ''
  });

  // Chat interface states
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'bot', text: string }[]>([
    { sender: 'bot', text: '안녕하세요! 수집된 핫플레이스 데이터를 기반으로 분석을 도와드릴 도슨트AI 비서입니다. 궁금한 점을 질문해 주세요!' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Dynamic Kakao Map search center state
  const [searchCenterAddress, setSearchCenterAddress] = useState(
    MOCK_DATA['문래'].filter(p => p.categoryGroup === 'cafe')[0]?.address || '서울 영등포구 문래동'
  );

  // Auto search trigger on categoryType changes
  useEffect(() => {
    handleSearch();
  }, [categoryType]);

  // Address Geocoding using Kakao Map Web Service SDK
  const geocodeAddress = (address: string): Promise<{ lat: number, lng: number }> => {
    return new Promise((resolve) => {
      if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) {
        // Fallback to random coordinate close to Seoul center if Kakao Map API is not active
        const randomOffsetLat = (Math.random() - 0.5) * 0.015;
        const randomOffsetLng = (Math.random() - 0.5) * 0.015;
        resolve({ lat: 37.5263 + randomOffsetLat, lng: 126.8962 + randomOffsetLng });
        return;
      }
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          resolve({ lat: parseFloat(result[0].y), lng: parseFloat(result[0].x) });
        } else {
          // fallback
          resolve({ lat: 37.5263, lng: 126.8962 });
        }
      });
    });
  };

  const handleSearch = async () => {
    if (!regionInput.trim()) return;
    setIsLoading(true);
    
    // Normalize input to check if mock data is available
    const matchedKey = Object.keys(MOCK_DATA).find(key => regionInput.includes(key));

    try {
      if (config.geminiApiKey) {
        // Live Gemini API Web Grounding Search based on category and region
        const categoryTerm = categoryType === 'all' 
          ? 'popular hot spots (mix of cafes, bakeries, or dining places)' 
          : categoryType === 'cafe' ? 'trendy cafes' 
          : categoryType === 'bakery' ? 'famous bakeries or dessert shops' 
          : 'top restaurants/dining places';

        const prompt = `Find the top 4 most popular, trending, and highly-reviewed ${categoryTerm} in "${regionInput}", South Korea.
Provide structured data containing exact address, calculated popularity score (1-100), rating (1-5), review count, short description, 3 specific reason tags, and simulated blog/instagram reference links.
Response MUST be a valid JSON array matching this typescript interface:
interface HotPlace {
  id: string;
  name: string;
  category: string;
  categoryGroup: 'cafe' | 'bakery' | 'restaurant';
  address: string;
  rating: number;
  reviewCount: number;
  score: number; // 1-100 popularity score
  description: string; // approx 200 characters detailed review summary
  reasons: string[]; // exactly 3 short traits (e.g. "빈티지 감성", "팡도르 디저트")
  sources: { type: 'blog' | 'instagram'; title: string; url: string }[];
  imageUrl: string; // placeholder image URL
}
Generate only raw JSON without code fences (\`\`\`).`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${config.geminiApiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              responseMimeType: 'application/json'
            }
          })
        });

        if (!response.ok) {
          throw new Error('Gemini API call failed. Falling back to offline mock dataset.');
        }

        const data = await response.json();
        const rawJsonText = data.contents?.[0]?.parts?.[0]?.text || data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (!rawJsonText) {
          throw new Error('No content returned from Gemini.');
        }

        const parsedPlaces: any[] = JSON.parse(rawJsonText.trim());

        // Geocode each address sequentially for the map
        const placesWithCoords = await Promise.all(
          parsedPlaces.map(async (p, idx) => {
            const coords = await geocodeAddress(p.address);
            return {
              ...p,
              id: `gemini-${Date.now()}-${idx}`,
              latitude: coords.lat,
              longitude: coords.lng,
              rating: p.rating || 4.5,
              reviewCount: p.reviewCount || 100,
              score: p.score || 85,
              categoryGroup: p.categoryGroup || (categoryType === 'all' ? 'cafe' : categoryType),
              imageUrl: p.imageUrl || `https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&auto=format&fit=crop&q=60`
            };
          })
        );

        setPlaces(placesWithCoords);
        if (placesWithCoords.length > 0) {
          setSelectedPlace(placesWithCoords[0]);
          setSelectedSpotIds(new Set([placesWithCoords[0].id]));
          setSearchCenterAddress(placesWithCoords[0].address);
        }
      } else {
        // Fallback Mock data
        await new Promise(resolve => setTimeout(resolve, 800)); // simulate latency
        if (matchedKey && MOCK_DATA[matchedKey]) {
          // Filter mock data by categoryGroup
          const mockList = MOCK_DATA[matchedKey].filter(
            place => categoryType === 'all' || place.categoryGroup === categoryType
          );
          setPlaces(mockList);
          if (mockList.length > 0) {
            setSelectedPlace(mockList[0]);
            setSelectedSpotIds(new Set([mockList[0].id]));
            setSearchCenterAddress(mockList[0].address);
          } else {
            setPlaces([]);
            setSelectedPlace(null);
            setSelectedSpotIds(new Set());
          }
        } else {
          // Dynamic mock generation if key is not found to show active search
          const categoryLabel = categoryType === 'all' ? '인기 핫플' : categoryType === 'cafe' ? '카페' : categoryType === 'bakery' ? '베이커리' : '음식점';
          const dynamicMock: HotPlace[] = [
            {
              id: `dyn-1`,
              name: `${regionInput} 핫플레이스 ${categoryLabel} A`,
              category: `${categoryLabel} 전문점`,
              categoryGroup: categoryType === 'all' ? 'cafe' : categoryType,
              address: `서울시 ${regionInput} 중앙로 12`,
              latitude: 37.5263 + (Math.random() - 0.5) * 0.01,
              longitude: 126.8962 + (Math.random() - 0.5) * 0.01,
              rating: 4.6,
              reviewCount: 380,
              score: 92,
              description: `${regionInput}에서 가장 떠오르는 유명한 ${categoryLabel}입니다. 현지 감성과 특유의 트렌디한 메뉴 구성을 제공하여 SNS에서 이목을 끌고 있습니다.`,
              reasons: ['시그니처 메뉴 완비', '세련된 모던 인테리어', '주말 웨이팅 필수'],
              sources: [{ type: 'blog', title: `${regionInput} 숨겨진 핫플 정보 직접 탐방기`, url: '#' }],
              imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&auto=format&fit=crop&q=60'
            },
            {
              id: `dyn-2`,
              name: `${regionInput} 대표 ${categoryLabel} B`,
              category: `수제 ${categoryLabel}`,
              categoryGroup: categoryType === 'all' ? 'bakery' : categoryType,
              address: `서울시 ${regionInput} 가로수길 43`,
              latitude: 37.5263 + (Math.random() - 0.5) * 0.01,
              longitude: 126.8962 + (Math.random() - 0.5) * 0.01,
              rating: 4.4,
              reviewCount: 210,
              score: 87,
              description: '독특한 레트로 콘셉트 하에서 특색 있는 디저트와 식기류를 갖춘 공간입니다. 편안한 분위기가 강점입니다.',
              reasons: ['레트로 감성 아지트', '수제 가공 시그니처', '데이트 코스 최적'],
              sources: [{ type: 'instagram', title: `#${regionInput}맛집 추천 해시태그 급상승`, url: '#' }],
              imageUrl: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=500&auto=format&fit=crop&q=60'
            }
          ];
          setPlaces(dynamicMock);
          setSelectedPlace(dynamicMock[0]);
          setSelectedSpotIds(new Set([dynamicMock[0].id]));
          setSearchCenterAddress(dynamicMock[0].address);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSpotSelect = (id: string) => {
    const next = new Set(selectedSpotIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedSpotIds(next);
  };

  // Export selected places in the exact format needed for docent app imports
  const handleExportJSON = () => {
    const selectedPlaces = places.filter(p => selectedSpotIds.has(p.id));
    if (selectedPlaces.length === 0) {
      alert('추출할 스팟을 1개 이상 선택해 주세요.');
      return;
    }

    const docentStructure = {
      regionName: regionInput,
      themeTitle: `${regionInput} 핫플레이스 탐방 리스트`,
      coverImage: selectedPlaces[0].imageUrl,
      estimatedTime: selectedPlaces.length * 30,
      transportType: 'walk',
      spotCount: selectedPlaces.length,
      spots: selectedPlaces.map((p, idx) => ({
        id: `spot-${idx + 1}`,
        name: p.name,
        category: p.category,
        address: p.address,
        coords: {
          latitude: p.latitude,
          longitude: p.longitude
        },
        rating: p.rating,
        reviewCount: p.reviewCount,
        description: p.description,
        tags: p.reasons,
        sources: p.sources
      }))
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(docentStructure, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `docent-${regionInput}-spots.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Gemini analytics chatbot query handler
  const handleSendChatMessage = async () => {
    if (!chatInput.trim() || isChatLoading) return;
    
    const userQuery = chatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userQuery }]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      // Build search contextual string from currently loaded places
      const placesContext = places.map((p, idx) => (
        `[스팟 ${idx+1}] 이름: ${p.name}, 분류: ${p.category}, 주소: ${p.address}, 평점: ${p.rating}, 블로그/인스타 언급량: ${p.reviewCount}건, 핵심 키워드: ${p.reasons.join(', ')}. 특징: ${p.description}`
      )).join('\n\n');

      const chatPrompt = `You are a professional travel docent assistant. Analyzing these collected spots for "${regionInput}":
${placesContext}

Answer the user's question: "${userQuery}"
Provide practical, structured, and insightful advice based on the spot metrics above. Keep it concise, helpful, and in Korean.`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${config.geminiApiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: chatPrompt }] }]
        })
      });

      if (!response.ok) {
        throw new Error('Gemini API query failed.');
      }

      const resData = await response.json();
      const botReply = resData.contents?.[0]?.parts?.[0]?.text || resData.candidates?.[0]?.content?.parts?.[0]?.text || '답변을 불러오지 못했습니다.';
      
      setChatMessages(prev => [...prev, { sender: 'bot', text: botReply.trim() }]);
    } catch (err) {
      console.error(err);
      setChatMessages(prev => [...prev, { sender: 'bot', text: '오류가 발생했습니다. API 키 설정 혹은 네트워크 상태를 체크해 주세요.' }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-950 text-zinc-50 font-sans">
      
      {/* LEFT SIDEBAR: Controls, Config, & Exporter */}
      <div className="w-[380px] h-full flex flex-col border-r border-zinc-800 bg-zinc-900 bg-opacity-70 p-5 shrink-0 glass-panel">
        
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <Database className="w-6 h-6 text-indigo-400" />
          <div>
            <h1 className="text-lg font-bold tracking-tight">도슨트AI 수집기</h1>
            <p className="text-xs text-zinc-400">자료 조사 & 핫플레이스 수집 웹앱</p>
          </div>
        </div>

        {/* Region Search Input */}
        <div className="flex flex-col gap-2 mb-4">
          <label className="text-xs text-zinc-400 font-semibold tracking-wider uppercase">탐색 지역 입력</label>
          <div className="relative">
            <input 
              type="text" 
              value={regionInput} 
              onChange={(e) => setRegionInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="예: 문래동, 성수동, 을지로"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2.5 pl-3 pr-10 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <button 
              onClick={handleSearch}
              disabled={isLoading}
              className="absolute right-2 top-2 text-zinc-400 hover:text-white transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Selector Pills */}
        <div className="flex flex-col gap-2 mb-5">
          <label className="text-xs text-zinc-400 font-semibold tracking-wider uppercase">탐색 정보 종류 선택</label>
          <div className="grid grid-cols-4 gap-1.5 bg-zinc-950 p-1 rounded-lg border border-zinc-800">
            {[
              { id: 'all', label: '전체', icon: '✨' },
              { id: 'cafe', label: '카페', icon: '☕' },
              { id: 'bakery', label: '베이커리', icon: '🥐' },
              { id: 'restaurant', label: '맛집', icon: '🍽️' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryType(cat.id as any)}
                className={`py-1.5 rounded-md text-xs font-medium flex flex-col items-center justify-center gap-1 transition-all ${
                  categoryType === cat.id 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                }`}
              >
                <span className="text-sm">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Stats and Selected Count */}
        <div className="flex-1 overflow-y-auto mb-5">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
            <span>수집 결과 스팟: {places.length}개</span>
            <span className="text-indigo-400 font-bold">선택됨: {selectedSpotIds.size}개</span>
          </div>

          {/* Quick List with Checkbox */}
          <div className="flex flex-col gap-2">
            {places.map((place) => {
              const isChecked = selectedSpotIds.has(place.id);
              const isSelected = selectedPlace?.id === place.id;
              return (
                <div 
                  key={place.id}
                  onClick={() => {
                    setSelectedPlace(place);
                    setSearchCenterAddress(place.address);
                  }}
                  className={`flex items-center justify-between p-3 rounded-lg border text-sm cursor-pointer transition-all ${
                    isSelected ? 'bg-indigo-950 bg-opacity-20 border-indigo-500' : 'bg-zinc-950 bg-opacity-40 border-zinc-900 hover:border-zinc-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSpotSelect(place.id);
                      }}
                      className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                        isChecked ? 'bg-indigo-600 border-indigo-500' : 'border-zinc-700 hover:border-zinc-600'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5 text-white" />}
                    </button>
                    <div className="overflow-hidden">
                      <p className="font-semibold truncate text-zinc-100">{place.name}</p>
                      <p className="text-[10px] text-zinc-500 truncate">{place.address}</p>
                    </div>
                  </div>
                  <div className="text-xs text-zinc-400 shrink-0 font-bold bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                    ★ {place.rating}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Export Action Card */}
        <button 
          onClick={handleExportJSON}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl py-3 font-semibold flex items-center justify-center gap-2 shadow-lg transition-colors"
        >
          <FileJson className="w-4 h-4" />
          도슨트 JSON 데이터 추출
        </button>

      </div>

      {/* RIGHT SIDE: Map, Details, and AI Chat Panel */}
      <div className="flex-1 h-full flex flex-col overflow-hidden bg-zinc-950">
        
        {/* Upper layout: Map & Place Details Panel */}
        <div className="flex-1 flex overflow-hidden min-h-0">
          
          {/* Map Section */}
          <div className="flex-1 p-5 h-full relative">
            {isLoading ? (
              <div className="absolute inset-5 z-20 flex items-center justify-center bg-zinc-950 bg-opacity-70 border border-zinc-800 rounded-xl">
                <div className="text-center">
                  <Sparkles className="w-10 h-10 text-indigo-400 animate-spin mx-auto mb-3" />
                  <p className="text-sm font-semibold text-zinc-300">온라인 데이터 검색 및 크롤링 중...</p>
                  <p className="text-xs text-zinc-500 mt-1">블로그, 인스타그램 리뷰 정보를 인덱싱하고 있습니다.</p>
                </div>
              </div>
            ) : null}
            
            <KakaoMap 
              places={places} 
              selectedPlace={selectedPlace} 
              onSelectPlace={(p) => setSelectedPlace(p)}
              kakaoAppKey={config.kakaoAppKey}
              searchCenter={searchCenterAddress}
            />
          </div>

          {/* Place Details Inspector Panel: List-up all spots detailed information */}
          <div className="w-[420px] border-l border-zinc-900 bg-zinc-900 bg-opacity-30 h-full overflow-y-auto p-5 shrink-0 flex flex-col gap-5">
            
            {/* Header of details list */}
            <div className="shrink-0 border-b border-zinc-800 pb-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                {regionInput} {categoryType === 'all' ? '핫플 전체' : categoryType === 'cafe' ? '카페' : categoryType === 'bakery' ? '베이커리' : '맛집/음식점'} 상세 목록 ({places.length}개)
              </h2>
            </div>

            {places.length > 0 ? (
              <div className="flex flex-col gap-6 overflow-y-auto pr-1 flex-1">
                {places.map((place) => {
                  const isSelected = selectedPlace?.id === place.id;
                  const isChecked = selectedSpotIds.has(place.id);
                  return (
                    <div 
                      key={place.id}
                      onClick={() => {
                        setSelectedPlace(place);
                        setSearchCenterAddress(place.address);
                      }}
                      className={`flex flex-col gap-3.5 p-4 rounded-xl border transition-all hover-scale cursor-pointer text-left ${
                        isSelected 
                          ? 'bg-zinc-900 bg-opacity-80 border-indigo-500 ring-1 ring-indigo-500 ring-opacity-50 shadow-md' 
                          : 'bg-zinc-950 bg-opacity-40 border-zinc-800'
                      }`}
                    >
                      {/* Hero Image inside card */}
                      <div className="relative h-32 w-full rounded-lg overflow-hidden border border-zinc-900 shrink-0">
                        <img 
                          src={place.imageUrl} 
                          alt={place.name} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-zinc-950 bg-opacity-80 backdrop-blur-sm border border-zinc-800 px-2 py-0.5 rounded text-[10px] font-bold text-indigo-400">
                          인기 스코어: {place.score}/100
                        </div>
                      </div>

                      {/* Title & Core Stats */}
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[9px] font-bold text-indigo-400 bg-indigo-950 bg-opacity-50 border border-indigo-800 px-2 py-0.5 rounded-full uppercase tracking-wider">
                            {place.category}
                          </span>
                          {/* Toggle selection checkbox inside card */}
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSpotSelect(place.id);
                            }}
                            className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                              isChecked ? 'bg-indigo-600 border-indigo-500' : 'border-zinc-700 hover:border-zinc-600'
                            }`}
                          >
                            {isChecked && <Check className="w-3.5 h-3.5 text-white" />}
                          </button>
                        </div>
                        
                        <h3 className="text-base font-bold mt-1.5 text-zinc-50">{place.name}</h3>
                        <div className="flex items-center gap-1 mt-1 text-[11px] text-zinc-400">
                          <MapPin className="w-3 h-3 text-zinc-500 shrink-0" />
                          <span className="truncate">{place.address}</span>
                        </div>
                        
                        {/* Rating block */}
                        <div className="flex gap-4 mt-2.5 bg-zinc-900 bg-opacity-50 border border-zinc-950 rounded p-1.5 text-[10px]">
                          <div>
                            <span className="text-zinc-500 block">네이버 평점</span>
                            <span className="font-bold text-zinc-200">★ {place.rating} / 5</span>
                          </div>
                          <div className="border-l border-zinc-800 pl-3">
                            <span className="text-zinc-500 block">블로그/리뷰 수</span>
                            <span className="font-bold text-zinc-200">{place.reviewCount}건 이상</span>
                          </div>
                        </div>
                      </div>

                      {/* AI Summary */}
                      <div className="text-xs text-zinc-300 leading-relaxed bg-zinc-900 bg-opacity-30 p-2.5 rounded border border-zinc-800 border-opacity-50">
                        {place.description}
                      </div>

                      {/* Trait reasons */}
                      <div className="flex flex-wrap gap-1.5">
                        {place.reasons.map((reason, idx) => (
                          <span key={idx} className="text-[10px] bg-zinc-950 border border-zinc-800 px-2 py-0.5 rounded text-zinc-300">
                            ⚡ {reason}
                          </span>
                        ))}
                      </div>

                      {/* Sources */}
                      <div className="flex flex-col gap-1 mt-1 border-t border-zinc-900 pt-2">
                        {place.sources.map((source, idx) => (
                          <a 
                            key={idx} 
                            href={source.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[10px] text-indigo-400 hover:text-indigo-300 hover:underline flex items-center gap-1 truncate"
                          >
                            <Info className="w-3 h-3 shrink-0" />
                            <span>[{source.type.toUpperCase()}] {source.title}</span>
                          </a>
                        ))}
                      </div>

                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-center text-zinc-500">
                <div>
                  <MapPin className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
                  <p className="text-xs font-semibold">조건에 맞는 수집 결과가 없습니다.<br />지역 또는 카테고리를 변경해 보세요.</p>
                </div>
              </div>
            )}
            
          </div>

        </div>

        {/* Bottom layout: AI Data Chat Interface */}
        <div className="h-[260px] border-t border-zinc-900 bg-zinc-900 bg-opacity-20 flex flex-col overflow-hidden">
          
          {/* Chat Panel Header */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-zinc-900 bg-zinc-900 bg-opacity-40 justify-between shrink-0">
            <div className="flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">Gemini 기반 수집 정보 분석 챗봇</span>
            </div>
            {!config.geminiApiKey && (
              <span className="text-[10px] text-amber-500 font-bold bg-amber-950 bg-opacity-50 border border-amber-800 px-2 py-0.5 rounded-full">
                ※ API Key 입력 시 활성화
              </span>
            )}
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 min-h-0 bg-zinc-950 bg-opacity-20">
            {chatMessages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`max-w-[80%] rounded-xl p-3 text-xs leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-indigo-600 text-white ml-auto rounded-tr-none' 
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-300 mr-auto rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isChatLoading && (
              <div className="bg-zinc-900 border border-zinc-800 text-indigo-400 max-w-[80%] rounded-xl rounded-tl-none p-3 text-xs mr-auto pulse-soft">
                답변 분석 중...
              </div>
            )}
          </div>

          {/* Chat Input form */}
          <div className="p-3 bg-zinc-900 bg-opacity-40 border-t border-zinc-900 flex gap-2 shrink-0">
            <input 
              type="text" 
              value={chatInput} 
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendChatMessage()}
              placeholder={config.geminiApiKey ? "예: 이 중 네이버 평점이 가장 높고 사진 찍기 좋은 곳은?" : "API 키를 설정하고 질문을 시작해 보세요."}
              disabled={!config.geminiApiKey || isChatLoading}
              className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 disabled:opacity-50"
            />
            <button 
              onClick={handleSendChatMessage}
              disabled={!config.geminiApiKey || isChatLoading}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" /> 전송
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
