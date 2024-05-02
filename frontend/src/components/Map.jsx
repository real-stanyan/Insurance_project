import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  height: "400px",
  width: "800px",
};
const center = {
  lat: 40.712776, // 示例中心位置，纽约市
  lng: -74.005974,
};
// const options = {
//   disableDefaultUI: true,
//   zoomControl: true,
// };

const libraries = ["places"];

const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API,
    libraries,
    loadAsync: true, // 确保此属性设置为true，以异步加载
  });

  const mapRef = useRef();
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;

    const service = new window.google.maps.places.PlacesService(mapRef.current);
    const request = {
      location: new google.maps.LatLng(center.lat, center.lng),
      radius: "5000",
      type: ["hospital"],
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        results.forEach((place) => {
          new google.maps.marker.AdvancedMarkerElement({
            position: place.geometry.location,
            map: mapRef.current,
            title: place.name,
          });
        });
      }
    });
  }, [isLoaded]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={12}
      //   options={options}
      onLoad={(map) => (mapRef.current = map)}
    >
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={{ lat: marker.lat, lng: marker.lng }}
        />
      ))}
    </GoogleMap>
  );
};

export default Map;
