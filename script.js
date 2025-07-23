// 네이버 지도 API를 이용해 지도 표시 및 현재 위치 기능 구현

// 지도를 표시할 HTML 요소 선택
const mapContainer = document.getElementById('map'); 

// 네이버 지도 객체를 생성한다.
// 지도 중앙 좌표를 서울 시청으로 지정 (위도 37.5665, 경도 126.9780)
// zoomLevel은 지도 확대 정도로 10은 적당한 도시 수준
const map = new naver.maps.Map(mapContainer, {
  center: new naver.maps.LatLng(37.5665, 126.9780), // 서울 시청 좌표
  zoom: 10
});

// 현재 위치를 마커로 표시하기 위한 변수 선언
let currentMarker = null;

// "현재 위치로 이동" 버튼 선택
const locateBtn = document.getElementById('locateBtn');

// 버튼 클릭 시 현재 위치를 탐색하고 지도 중심을 이동하는 함수
locateBtn.addEventListener('click', () => {
  // 브라우저가 Geolocation 기능 지원 여부 확인
  if (navigator.geolocation) {
    // 위치 정보 요청 (비동기)
    navigator.geolocation.getCurrentPosition(position => {
      // 위도와 경도 값 가져오기
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      // 현재 위치를 네이버 지도 좌표 객체로 생성
      const latlng = new naver.maps.LatLng(lat, lng);

      // 지도의 중심 위치를 현재 위치로 이동
      map.setCenter(latlng);
      // 확대 레벨을 15로 확대 (자세히 보기)
      map.setZoom(15);

      // 기존 마커가 있으면 지도에서 제거
      if (currentMarker) {
        currentMarker.setMap(null);
      }

      // 현재 위치에 새로운 마커 생성 및 지도에 표시
      currentMarker = new naver.maps.Marker({
        position: latlng,
        map: map,
        title: "현재 위치"
      });
    }, error => {
      // 위치 정보를 가져오지 못했을 때 처리
      alert('현재 위치를 가져올 수 없습니다: ' + error.message);
    });
  } else {
    alert('이 브라우저에서는 위치 정보를 지원하지 않습니다.');
  }
});
