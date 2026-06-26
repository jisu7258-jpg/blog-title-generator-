```javascript:서비스 워커 파일:sw.js
// 서비스 워커: 앱이 모바일 환경에서 부드럽고 오프라인 상태에서도 켜지도록 지원합니다.
const CACHE_NAME = 'title-generator-v2';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json'
];

// 서비스 워커 설치 및 리소스 캐싱
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 네트워크 요청 처리 (빠른 로딩 제공)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
