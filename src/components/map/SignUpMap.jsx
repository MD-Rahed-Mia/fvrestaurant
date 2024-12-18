import React, { useEffect, useRef, useState } from "react";
import { LoadScript, GoogleMap } from "@react-google-maps/api";
import toast from "react-hot-toast";

function SignUpMap({ coordinates, setCoordinates }) {
  const [newAddress, setNewAddress] = useState({
    latitude: 22.865322,
    longitude: 91.097044,
  });

  const mapRef = useRef(null);
  const prevCoordinates = useRef({ lat: null, lng: null });

  const mapStyles = {
    height: "300px",
    width: "100%",
  };

  const onLoad = (mapInstance) => {
    mapRef.current = mapInstance;
    addCenterMarker();
  };

  const handleMapIdle = () => {
    if (mapRef.current) {
      const center = mapRef.current.getCenter();
      const updatedCoordinates = {
        lat: parseFloat(center.lat().toFixed(6)),
        lng: parseFloat(center.lng().toFixed(6)),
      };

      // Only update if coordinates have changed
      if (
        prevCoordinates.current.lat !== updatedCoordinates.lat ||
        prevCoordinates.current.lng !== updatedCoordinates.lng
      ) {
        setCoordinates(updatedCoordinates);
        setNewAddress((prev) => ({
          ...prev,
          latitude: updatedCoordinates.lat,
          longitude: updatedCoordinates.lng,
        }));
        prevCoordinates.current = updatedCoordinates; // Update the ref
     //   console.log(`Map coordinates are: lat=${updatedCoordinates.lat}, lng=${updatedCoordinates.lng}`);
      }
    }
  };

  const addCenterMarker = () => {
    const mapContainer = document.getElementById("map");
    if (!mapContainer) {
      console.error("Map container not found!");
      return;
    }

    const centerMarker = document.createElement("div");
    centerMarker.style.background = 'url("/img/Location.png") no-repeat center';
    centerMarker.style.backgroundSize = "contain";
    centerMarker.style.height = "80px";
    centerMarker.style.width = "80px";
    centerMarker.style.position = "absolute";
    centerMarker.style.top = "50%";
    centerMarker.style.left = "50%";
    centerMarker.style.marginTop = "-40px";
    centerMarker.style.marginLeft = "-40px";
    document.getElementById("map").appendChild(centerMarker);
  };

  const findLocation = (event) => {
    event.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          mapRef.current.setCenter(userLocation);
          setCoordinates(userLocation);
        },
        () => {
          alert("Geolocation failed or is not supported by your browser.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    window.onload = addCenterMarker;
  }, []);

  return (
    <div className="max-w-lg mx-auto bg-white p-4 rounded-lg shadow-lg ">
      <h1 className="font-bold text-blue-600 text-xl text-center mb-4">
        Set Your Address
      </h1>

      <div className="container mx-auto p-4">
        <button
          id="find-location"
          className="bg-blue-500 text-white w-full px-4 py-2 rounded mb-4"
          onClick={findLocation}
        >
          Find Location
        </button>

        <LoadScript googleMapsApiKey="AIzaSyBbE_BV395ODtFKApBX_oK0KselqP0Tjcs">
          <GoogleMap
            id="map"
            mapContainerStyle={mapStyles}
            center={coordinates}
            zoom={15}
            onLoad={onLoad}
            onIdle={handleMapIdle}
            options={{
              gestureHandling: "greedy",
              fullscreenControl: false,
              streetViewControl: false,
            }}
          ></GoogleMap>
        </LoadScript>

        <div className="bg-white rounded-lg shadow-lg p-4 text-center flex items-center justify-between">
          <p>Lat: {newAddress.latitude.toFixed(6)}</p>
          <p>Long: {newAddress.longitude.toFixed(6)}</p>
        </div>
      </div>

      <button
        type="submit"
        disabled={newAddress.label === "out_of_zone"}
        className={`${
          newAddress.label === "out_of_zone"
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600"
        } text-white text-lg font-bold w-full my-3 px-4 py-3 rounded-xl text-center`}
      >
        {newAddress.label === "out_of_zone"
          ? "Service Not Available"
          : "Submit"}
      </button>
    </div>
  );
}

export default SignUpMap;
