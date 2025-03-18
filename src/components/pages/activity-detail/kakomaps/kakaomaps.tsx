import { useEffect } from "react";
import MarkerInfo from "./markerInfo";
import ReactDOMServer from "react-dom/server";

interface GeocodeResult {
  x: string;
  y: string;
  address_name: string;
  place_name: string;
}

interface KakaoMapsProps {
  address: string | undefined;
}

export default function KakaoMaps({ address }: KakaoMapsProps) {
  useEffect(() => {
    if (!address) return;

    if (typeof window !== "undefined" && window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(
          address,
          (result: GeocodeResult[], status: number) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const lat = result[0].y;
              const lng = result[0].x;
              const addressName = result[0].address_name;
              const placeName = result[0].place_name;

              const container = document.getElementById("map");
              const options = {
                center: new window.kakao.maps.LatLng(lat, lng),
                level: 3,
              };
              const map = new window.kakao.maps.Map(container, options);
              const mapTypeControl = new window.kakao.maps.MapTypeControl();

              map.addControl(
                mapTypeControl,
                window.kakao.maps.ControlPosition.TOPRIGHT
              );

              const zoomControl = new window.kakao.maps.ZoomControl();
              map.addControl(
                zoomControl,
                window.kakao.maps.ControlPosition.RIGHT
              );

              const content = ReactDOMServer.renderToString(
                <MarkerInfo placeName={placeName || addressName} />
              );

              const position = new window.kakao.maps.LatLng(lat, lng);

              const customOverlay = new window.kakao.maps.CustomOverlay({
                map,
                position,
                content,
                yAnchor: 1,
              });
              customOverlay.setMap(map);
            } else {
              console.error("주소 변환 실패:", status);
            }
          }
        );
      });
    }
  }, [address]);

  return (
    <>
      <div
        id="map"
        className="w-[79rem] h-[45rem] rounded-[1.6rem]
      tablet:w-[42.9rem] tablet:h-[30.8rem] mobile:w-full"
      ></div>
    </>
  );
}
