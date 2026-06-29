import React, { useState, useEffect } from 'react';
import { 
  Search, MapPin, Database, Sparkles, Key, FileJson, 
  Map as MapIcon, Layers, ChevronRight, Settings, Info, Star, MessageSquare, Send, Check
} from 'lucide-react';
import { HotPlace, SearchConfig } from './types';
import KakaoMap from './components/KakaoMap';

// Premium mock data for offline/default usage
const MOCK_DATA: Record<string, HotPlace[]> = {
  '문래': [
    {
      id: 'munlae-1',
      name: '러스트 베이커리 (Rust Bakery)',
      category: '베이커리 카페',
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
      id: 'munlae-3',
      name: '호텔 샌드 (Hotel Sand)',
      category: '디저트 카페',
      address: '서울 영등포구 도림로129길 9',
      latitude: 37.5132,
      longitude: 126.8955,
      rating: 4.4,
      reviewCount: 420,
      score: 87,
      description: '사막의 모래 언덕을 모티브로 한 이색적인 베이지 톤의 힙한 카페입니다. 특유의 따뜻하고 이국적인 인테리어와 모래 질감을 살린 시그니처 케이크들이 젊은 층에 인기입니다.',
      reasons: ['사막/모래 컨셉의 이국적 공간', '레몬 크림 샌드 케이크', '독특한 베이지 모노톤 사진 촬영지'],
      sources: [
        { type: 'blog', title: '도심 속 사막 모티브 카페, 호텔 샌드 문래 방문기', url: '#' },
        { type: 'instagram', title: '@hotelsand.official 피드 리액션', url: '#' }
      ],
      imageUrl: 'https://images.unsplash.com/photo-154118811-1e0d58224f24?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 'munlae-4',
      name: '평화 (Pyeonghwa)',
      category: '카페 & 와인바',
      address: '서울 영등포구 도림로131길 13',
      latitude: 37.5135,
      longitude: 126.8961,
      rating: 4.5,
      reviewCount: 310,
      score: 89,
      description: '낮에는 조용하고 어두운 무드의 필터 커피 전문점으로, 밤에는 빈티지 음악이 흐르는 차분한 내추럴 와인바로 변신하는 숨겨진 아지트 같은 공간입니다.',
      reasons: ['낮(커피)과 밤(와인)의 극적인 분위기 반전', 'LP와 재즈 중심의 아날로그 감성 사운드', '레트로 감성의 어두운 백그라운드 조명'],
      sources: [
        { type: 'blog', title: '나만 알고 싶은 문래동 빈티지 LP바 평화', url: '#' },
        { type: 'instagram', title: '#문래평화 분위기 맛집 태그', url: '#' }
      ],
      imageUrl: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=500&auto=format&fit=crop&q=60'
    }
  ],
  '성수': [
    {
      id: 'seongsu-1',
      name: '대림창고 (Daelim Changgo)',
      category: '갤러리 카페',
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
    }
  ],
  '을지로': [
    {
      id: 'euljiro-1',
      name: '커피한약방',
      category: '필터 커피 전문점',
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
    }
  ]
};

export default function App() {
  const [regionInput, setRegionInput] = useState('문래동');
  const [places, setPlaces] = useState<HotPlace[]>(MOCK_DATA['문래']);
  const [selectedPlace, setSelectedPlace] = useState<HotPlace | null>(MOCK_DATA['문래'][0]);
  const [selectedSpotIds, setSelectedSpotIds] = useState<Set<string>>(new Set([MOCK_DATA['문래'][0].id]));
  const [isLoading, setIsLoading] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  
  // API Configurations saved in localStorage
  const [config, setConfig] = useState<SearchConfig>({
    geminiApiKey: localStorage.getItem('gemini_api_key') || '',
    kakaoAppKey: localStorage.getItem('kakao_app_key') || ''
  });

  // Chat interface states
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'bot', text: string }[]>([
    { sender: 'bot', text: '안녕하세요! 수집된 핫플레이스 데이터를 기반으로 분석을 도와드릴 도슨트AI 비서입니다. 궁금한 점을 질문해 주세요!' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Sync keys to local storage
  const handleSaveConfig = (newConfig: SearchConfig) => {
    setConfig(newConfig);
    localStorage.setItem('gemini_api_key', newConfig.geminiApiKey);
    localStorage.setItem('kakao_app_key', newConfig.kakaoAppKey);
    setShowConfig(false);
  };

  // Dynamic Kakao Map search center state
  const [searchCenterAddress, setSearchCenterAddress] = useState(MOCK_DATA['문래'][0].address);

  // Address Geocoding using Kakao Map Web Service SDK
  const geocodeAddress = (address: string): Promise<{ lat: number, lng: number }> => {
    return new Promise((resolve) => {
      if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) {
        // Fallback to random coordinate close to Seoul center if Kakao Map API is not active
        resolve({
          lat: 37.5665 + (Math.random() - 0.5) * 0.03,
          lng: 126.9780 + (Math.random() - 0.5) * 0.03
        });
        return;
      }
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          resolve({ lat: parseFloat(result[0].y), lng: parseFloat(result[0].x) });
        } else {
          resolve({
            lat: 37.5665 + (Math.random() - 0.5) * 0.02,
            lng: 126.9780 + (Math.random() - 0.5) * 0.02
          });
        }
      });
    });
  };

  // Core Search & Scrape Action
  const handleSearch = async () => {
    if (!regionInput.trim()) return;
    setIsLoading(true);
    
    // Normalize input to check if mock data is available
    const matchedKey = Object.keys(MOCK_DATA).find(key => regionInput.includes(key));

    try {
      if (config.geminiApiKey) {
        // Live Gemini API Web Grounding Search
        const prompt = `Find the top 4 most popular, trending, and highly-reviewed hot cafes or spots in "${regionInput}", Seoul, South Korea.
Provide structured data containing exact address, calculated popularity score (1-100), rating (1-5), review count, short description, 3 specific reason tags, and simulated blog/instagram reference links.
Response MUST be a valid JSON array matching this typescript interface:
interface HotPlace {
  id: string;
  name: string;
  category: string;
  address: string;
  rating: number;
  reviewCount: number;
  score: number; // 1-100 popularity score
  description: string; // approx 200 characters detailed review summary
  reasons: string[]; // exactly 3 short traits (e.g. "빈티지 감성", "팡도르 디저트")
  sources: { type: 'blog' | 'instagram'; title: string; url: string }[];
  imageUrl: string; // placeholder cafe unsplash image URL
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
          const mockList = MOCK_DATA[matchedKey];
          setPlaces(mockList);
          setSelectedPlace(mockList[0]);
          setSelectedSpotIds(new Set([mockList[0].id]));
          setSearchCenterAddress(mockList[0].address);
        } else {
          // Dynamic mock generation if key is not found to show active search
          const dynamicMock: HotPlace[] = [
            {
              id: `dyn-1`,
              name: `${regionInput} 인디커피`,
              category: '커피 전문점',
              address: `${regionInput} 중앙로 12`,
              latitude: 37.5665,
              longitude: 126.9780,
              rating: 4.4,
              reviewCount: 150,
              score: 84,
              description: `${regionInput} 지역에서 고유한 원두 블렌딩과 감각적 조명 인테리어로 입소문을 타고 있는 조용한 신상 카페입니다.`,
              reasons: ['수제 원두 브루잉', '조용한 대화 공간', '레트로 필터 음악'],
              sources: [{ type: 'blog', title: `${regionInput} 골목 신상 힐링 카페 소개`, url: '#' }],
              imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&auto=format&fit=crop&q=60'
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
      alert('데이터 요청 중 문제가 발생했습니다. API 키나 오프라인 모크 캐시를 검토해 주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger search on mount
  useEffect(() => {
    handleSearch();
  }, []);

  // Handle Spot Checkbox Toggle
  const toggleSpotSelect = (id: string) => {
    const next = new Set(selectedSpotIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedSpotIds(next);
  };

  // Convert Gathered Data to main local-docent Course JSON File
  const handleExportJSON = () => {
    const selectedPlaces = places.filter(p => selectedSpotIds.has(p.id));
    if (selectedPlaces.length === 0) {
      alert('코스로 추출할 카페를 최소 1개 이상 선택해 주세요.');
      return;
    }

    const courseTemplate = {
      id: `course-${Date.now()}`,
      title: `${regionInput} 스토리 산책 코스`,
      subtitle: `${regionInput} 대표 카페들과 이야기`,
      description: `온라인 트렌드 데이터를 기반으로 엄선한 ${regionInput}의 핫플레이스 탐색 코스입니다.`,
      coverImage: selectedPlaces[0].imageUrl,
      estimatedTime: selectedPlaces.length * 30,
      difficulty: 'easy',
      spotCount: selectedPlaces.length,
      region: regionInput,
      order: 1,
      spots: selectedPlaces.map((p, idx) => ({
        id: `spot-${idx + 1}`,
        title: p.name,
        address: p.address,
        latitude: p.latitude,
        longitude: p.longitude,
        geofenceRadius: 50,
        storyCard: {
          title: `${p.name}의 숨은 이야기`,
          body: p.description,
          imageUrl: p.imageUrl
        },
        mission: {
          title: '현장 관찰 미션',
          description: `${p.reasons[0]}가 돋보이는 소품이나 건물 디자인 요소를 사진으로 찍고 기록해 보세요.`
        },
        question: {
          text: `이 공간이 가진 "${p.reasons[1]}" 매력은 여러분에게 어떤 영감을 주나요?`
        },
        order: idx + 1
      }))
    };

    // Trigger File Download
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(courseTemplate, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `course_${regionInput.replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Chat interface: submit message to Gemini using the list of places as context
  const handleSendChatMessage = async () => {
    if (!chatInput.trim() || isChatLoading) return;
    if (!config.geminiApiKey) {
      alert('Gemini API 키를 설정해야 실시간 AI 데이터 대화를 이용하실 수 있습니다.');
      return;
    }

    const userQuery = chatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userQuery }]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const placesContext = places.map(p => ({
        name: p.name,
        address: p.address,
        score: p.score,
        reasons: p.reasons,
        description: p.description,
        reviewCount: p.reviewCount,
        rating: p.rating
      }));

      const chatPrompt = `You are a helpful travel planner assistant. You are given a list of cafes/hotspots in "${regionInput}" gathered from online reviews.
Here is the gathered data in JSON format:
${JSON.stringify(placesContext, null, 2)}

User question: "${userQuery}"

Provide a concise, friendly response in Korean analyzing the data above. Recommend appropriate spots or answer their specific questions. Keep the layout clean and readable. Do not include raw JSON.`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${config.geminiApiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: chatPrompt }] }]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get answer from Gemini.');
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
        <div className="flex flex-col gap-2 mb-5">
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

        {/* API Settings Section */}
        <div className="mb-5">
          <button 
            onClick={() => setShowConfig(!showConfig)}
            className="flex items-center justify-between w-full bg-zinc-800 hover:bg-zinc-700 bg-opacity-50 text-xs px-3 py-2 rounded-lg text-zinc-300 transition-colors"
          >
            <span className="flex items-center gap-1.5"><Settings className="w-3.5 h-3.5" /> API 및 환경 키 설정</span>
            <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 ${showConfig ? 'rotate-90' : ''}`} />
          </button>

          {showConfig && (
            <div className="mt-3 p-3 bg-zinc-950 border border-zinc-800 rounded-lg flex flex-col gap-3">
              <div>
                <label className="text-[10px] text-zinc-500 font-bold block mb-1">GEMINI API KEY</label>
                <input 
                  type="password"
                  placeholder="AI 실시간 웹 검색 활성화"
                  value={config.geminiApiKey}
                  onChange={(e) => setConfig({ ...config, geminiApiKey: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-[10px] text-zinc-500 font-bold block mb-1">KAKAO JAVASCRIPT APP KEY</label>
                <input 
                  type="text"
                  placeholder="지도 뷰어 렌더링 활성화"
                  value={config.kakaoAppKey}
                  onChange={(e) => setConfig({ ...config, kakaoAppKey: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
              <button 
                onClick={() => handleSaveConfig(config)}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs py-1.5 font-semibold transition-colors"
              >
                설정 키 저장
              </button>
            </div>
          )}
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
                  onClick={() => setSelectedPlace(place)}
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

          {/* Place Details Inspector Panel */}
          <div className="w-[420px] border-l border-zinc-900 bg-zinc-900 bg-opacity-30 h-full overflow-y-auto p-5 shrink-0 flex flex-col">
            {selectedPlace ? (
              <div className="flex flex-col h-full gap-5">
                
                {/* Hero Image */}
                <div className="relative h-48 w-full rounded-xl overflow-hidden border border-zinc-800">
                  <img 
                    src={selectedPlace.imageUrl} 
                    alt={selectedPlace.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-zinc-950 bg-opacity-80 backdrop-blur-sm border border-zinc-800 px-3 py-1 rounded-full text-xs font-bold text-indigo-400">
                    인기 스코어: {selectedPlace.score}/100
                  </div>
                </div>

                {/* Cafe Title & Core Stats */}
                <div>
                  <span className="text-[10px] font-bold text-indigo-400 bg-indigo-950 bg-opacity-50 border border-indigo-800 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {selectedPlace.category}
                  </span>
                  <h2 className="text-xl font-bold mt-2 text-zinc-50">{selectedPlace.name}</h2>
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-zinc-400">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span>{selectedPlace.address}</span>
                  </div>
                  
                  {/* Reviews Summary */}
                  <div className="flex gap-4 mt-3 bg-zinc-950 bg-opacity-40 border border-zinc-900 rounded-lg p-2 text-xs">
                    <div>
                      <span className="text-zinc-500 block">네이버 평점</span>
                      <span className="font-bold text-zinc-200">★ {selectedPlace.rating} / 5</span>
                    </div>
                    <div className="border-l border-zinc-800 pl-4">
                      <span className="text-zinc-500 block">블로그/리뷰 수</span>
                      <span className="font-bold text-zinc-200">{selectedPlace.reviewCount}건 이상</span>
                    </div>
                  </div>
                </div>

                {/* AI Popularity Summary */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> AI 트렌드 요약 분석
                  </h3>
                  <p className="text-sm text-zinc-300 leading-relaxed bg-zinc-900 bg-opacity-40 p-3 rounded-lg border border-zinc-800 border-opacity-60">
                    {selectedPlace.description}
                  </p>
                </div>

                {/* Trait reasons list */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">핵심 강점 & 감성 태그</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPlace.reasons.map((reason, idx) => (
                      <span key={idx} className="text-xs bg-zinc-950 border border-zinc-800 px-2.5 py-1 rounded-md text-zinc-300">
                        ⚡ {reason}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Sources list */}
                <div className="flex flex-col gap-2 mt-auto">
                  <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">정보 출처 (인덱싱 링크)</h3>
                  <div className="flex flex-col gap-1.5">
                    {selectedPlace.sources.map((source, idx) => (
                      <a 
                        key={idx} 
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-indigo-400 hover:text-indigo-300 hover:underline flex items-center gap-1 truncate"
                      >
                        <Info className="w-3.5 h-3.5 shrink-0" />
                        <span>[{source.type.toUpperCase()}] {source.title}</span>
                      </a>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-center text-zinc-500">
                <div>
                  <MapPin className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
                  <p className="text-sm font-semibold">지도의 핫플레이스 마커나 목록을<br />선택하면 세부정보가 노출됩니다.</p>
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
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">Gemini 기반 수집 카페 정보 분석 챗봇</span>
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
