"use client";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

// Kakao API 관련 타입 선언
type LatLng = { lat: number; lng: number };
type MapOptions = { center: LatLng; level: number };
type Map = {
  setCenter(latlng: LatLng): void;
  relayout(): void;
  getCenter(): LatLng;
};
type MarkerOptions = { position: LatLng; map: Map };
type Marker = { setPosition(latlng: LatLng): void };
type Geocoder = {
  addressSearch(
    address: string,
    callback: (result: GeocoderResult[], status: string) => void
  ): void;
};
type GeocoderResult = { address_name: string; x: string; y: string };
type DaumPostcode = { open(): void };
type Kakao = {
  maps: {
    LatLng: new (lat: number, lng: number) => LatLng;
    Map: new (container: HTMLElement, options: MapOptions) => Map;
    Marker: new (options: MarkerOptions) => Marker;
    services: { Geocoder: new () => Geocoder; Status: { OK: string } };
  };
};

declare global {
  interface Window {
    kakaoMapsAPI?: Kakao;
    daum?: {
      Postcode: new (options: {
        oncomplete: (data: AddressData) => void;
      }) => DaumPostcode;
    };
  }
}

interface AddressData {
  address: string;
}

export default function KakaoMapAddress() {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const loadPostcode = () => {
    if (!window.daum) {
      const script = document.createElement("script");
      script.src =
        "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
      script.async = true;
      script.onload = () => sample5_execDaumPostcode();
      document.head.appendChild(script);
    } else {
      sample5_execDaumPostcode();
    }
  };

  const sample5_execDaumPostcode = () => {
    if (!window.daum?.Postcode) {
      alert(
        "주소 검색 API가 아직 로드되지 않았습니다. 잠시 후 다시 시도해주세요."
      );
      return;
    }
    new window.daum.Postcode({
      oncomplete: (data: AddressData) => {
        const addr = data.address;
        setValue("address", addr, { shouldValidate: true });
        if (window.kakaoMapsAPI && window.kakaoMapsAPI.maps) {
          // undefined 체크
          const geocoder = new window.kakaoMapsAPI.maps.services.Geocoder();
          geocoder.addressSearch(addr, (results, status) => {
            if (status === window.kakaoMapsAPI!.maps.services.Status.OK) {
              // Non-null 단언
              const result = results[0];
              const coords = new window.kakaoMapsAPI!.maps.LatLng(
                Number(result.y),
                Number(result.x)
              );
              const mapContainer = document.getElementById(
                "map"
              ) as HTMLElement;
              const map = new window.kakaoMapsAPI!.maps.Map(mapContainer, {
                center: coords,
                level: 5,
              });
              const marker = new window.kakaoMapsAPI!.maps.Marker({
                position: coords,
                map: map,
              });
              mapContainer.style.display = "block";
              map.relayout();
              map.setCenter(coords);
              marker.setPosition(coords);
            }
          });
        }
      },
    }).open();
  };

  useEffect(() => {
    if (!window.kakaoMapsAPI) {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_API_KEY&libraries=services`;
      script.async = true;
      script.onload = () => {
        window.kakaoMapsAPI = window.kakao; // kakao 객체 할당
      };
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="주소를 입력해주세요."
        className="w-[79.2rem] tablet:w-[42.9rem] mobile:w-[34.3rem] h-[5.6rem] rounded-[0.4rem] border-black border-[0.1rem] p-[1.6rem] text-lg font-normal"
        {...register("address", { required: "주소를 입력해주세요." })}
        onClick={loadPostcode}
        readOnly
      />
      {typeof errors.address?.message === "string" && (
        <p className="text-red-500 text-sm mt-2">{errors.address.message}</p>
      )}
      <div
        id="map"
        style={{
          width: "100%",
          height: "300px",
          marginTop: "10px",
          display: "none",
        }}
      ></div>
    </div>
  );
}
