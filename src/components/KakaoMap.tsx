import { useEffect, useRef, useState } from 'react';
import { HotPlace } from '../types';

interface KakaoMapProps {
  places: HotPlace[];
  selectedPlace: HotPlace | null;
  onSelectPlace: (place: HotPlace) => void;
  kakaoAppKey: string;
  searchCenter: string;
}

declare global {
  interface Window {
    kakao: any;
  }
}

export default function KakaoMap({ places, selectedPlace, onSelectPlace, kakaoAppKey, searchCenter }: KakaoMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  // Kakao Map SDK script dynamic loading
  useEffect(() => {
    if (!kakaoAppKey) return;
    
    // Check if SDK already loaded
    if (window.kakao && window.kakao.maps) {
      setSdkLoaded(true);
      return;
    }

    const scriptId = 'kakao-map-sdk';
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoAppKey}&autoload=false&libraries=services`;
      script.async = true;
      document.head.appendChild(script);
    }

    script.onload = () => {
      window.kakao.maps.load(() => {
        setSdkLoaded(true);
      });
    };

    script.onerror = () => {
      setLoadError(true);
    };
  }, [kakaoAppKey]);

  // Initialize Map
  useEffect(() => {
    if (!sdkLoaded || !containerRef.current) return;

    // Set Yeongdeungpo as default center
    const options = {
      center: new window.kakao.maps.LatLng(37.5263, 126.8962),
      level: 4,
    };

    const map = new window.kakao.maps.Map(containerRef.current, options);
    mapInstanceRef.current = map;
  }, [sdkLoaded]);

  // Center map on searched address
  useEffect(() => {
    if (!mapInstanceRef.current || !sdkLoaded || !searchCenter) return;

    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(searchCenter, (result: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
        mapInstanceRef.current.setCenter(coords);
      }
    });
  }, [sdkLoaded, searchCenter]);

  // Render Custom Overlays as markers
  useEffect(() => {
    if (!mapInstanceRef.current || !sdkLoaded) return;

    // Remove existing markers
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    const bounds = new window.kakao.maps.LatLngBounds();
    let hasCoords = false;

    places.forEach((place) => {
      // Ensure we have coordinates
      if (!place.latitude || !place.longitude) return;

      const position = new window.kakao.maps.LatLng(place.latitude, place.longitude);
      bounds.extend(position);
      hasCoords = true;

      // Custom marker overlay styling
      const isSelected = selectedPlace?.id === place.id;
      const markerContent = document.createElement('div');
      
      // Styling properties
      markerContent.style.padding = '8px 12px';
      markerContent.style.background = isSelected ? '#3b82f6' : '#1e1b4b';
      markerContent.style.border = isSelected ? '2px solid #ffffff' : '1px solid #4f46e5';
      markerContent.style.borderRadius = '20px';
      markerContent.style.color = '#ffffff';
      markerContent.style.fontSize = '12px';
      markerContent.style.fontWeight = '600';
      markerContent.style.cursor = 'pointer';
      markerContent.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.4)';
      markerContent.style.transition = 'all 0.15s ease-in-out';
      markerContent.innerHTML = `☕ ${place.name}`;

      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: position,
        content: markerContent,
        yAnchor: 1.2,
      });

      customOverlay.setMap(mapInstanceRef.current);
      markersRef.current.push(customOverlay);

      // Event listener for overlay click
      markerContent.addEventListener('click', () => {
        onSelectPlace(place);
      });
    });

    // Fit map bounds to show all markers if we have more than one spot
    if (hasCoords && places.length > 1) {
      mapInstanceRef.current.setBounds(bounds);
    }
  }, [sdkLoaded, places, selectedPlace]);

  // Pan to selected spot
  useEffect(() => {
    if (!mapInstanceRef.current || !sdkLoaded || !selectedPlace) return;
    if (!selectedPlace.latitude || !selectedPlace.longitude) return;

    const moveLatLon = new window.kakao.maps.LatLng(selectedPlace.latitude, selectedPlace.longitude);
    mapInstanceRef.current.panTo(moveLatLon);
  }, [sdkLoaded, selectedPlace]);

  if (!kakaoAppKey) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#18181b', color: '#a1a1aa', border: '1px dashed #3f3f46', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
        <div>
          <p style={{ fontSize: '18px', fontWeight: '600', color: '#f4f4f5', marginBottom: '8px' }}>카카오 지도 API 키가 필요합니다</p>
          <p style={{ fontSize: '14px', maxWidth: '320px', lineHeight: '20px' }}>좌측 설정 패널에서 Kakao JavaScript App Key를 입력하시면 지도가 활성화됩니다.</p>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#18181b', color: '#ef4444', border: '1px solid #7f1d1d', borderRadius: '12px', padding: '24px' }}>
        <p>카카오 지도 SDK 로드 중 에러가 발생했습니다. 앱 키가 올바른지 확인해 주세요.</p>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '12px', overflow: 'hidden', border: '1px solid #27272a' }}>
      {!sdkLoaded && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(9, 9, 11, 0.8)' }}>
          <p style={{ color: '#60a5fa' }} className="pulse-soft">카카오 지도를 로드하는 중...</p>
        </div>
      )}
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
