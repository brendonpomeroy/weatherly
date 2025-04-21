import { LatLngExpression } from "leaflet";
import { ReactNode } from "react";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";

export interface PinMapProps {
  lng: number;
  lat: number;
  zoom: number;
  markerContent?: ReactNode;
}

export const PinMap: (props: PinMapProps) => ReactNode = (props) => {
  const position: LatLngExpression = [props.lat, props.lng];
  return (
    <MapContainer
      className="h-full w-full"
      center={position}
      zoom={props.zoom}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        {props.markerContent && <Popup>{props.markerContent}</Popup>}
      </Marker>
    </MapContainer>
  );
};
