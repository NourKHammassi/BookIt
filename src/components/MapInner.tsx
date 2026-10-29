"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Property {
  id: string;
  title: string;
  city: string;
  pricePerNight: number;
  latitude: number | null;
  longitude: number | null;
  images: string[];
}

function createPriceIcon(price: number) {
  return L.divIcon({
    className: "",
    html: `<div style="background:#2B5EA7;color:white;padding:4px 8px;border-radius:8px;font-size:12px;font-weight:700;white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,0.2);border:2px solid white;">${price} TND</div>`,
    iconSize: [0, 0],
    iconAnchor: [30, 15],
  });
}

export default function MapInner({ properties }: { properties: Property[] }) {
  const validProps = properties.filter(
    (p) => p.latitude != null && p.longitude != null
  ) as (Property & { latitude: number; longitude: number })[];

  if (validProps.length === 0) return null;

  const avgLat =
    validProps.reduce((sum, p) => sum + p.latitude, 0) / validProps.length;
  const avgLng =
    validProps.reduce((sum, p) => sum + p.longitude, 0) / validProps.length;

  return (
    <MapContainer
      center={[avgLat, avgLng]}
      zoom={7}
      style={{ width: "100%", height: "100%" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {validProps.map((property) => (
        <Marker
          key={property.id}
          position={[property.latitude, property.longitude]}
          icon={createPriceIcon(property.pricePerNight)}
        >
          <Popup>
            <div style={{ minWidth: 180, fontFamily: "Outfit, sans-serif" }}>
              {property.images?.[0] && (
                <img
                  src={property.images[0]}
                  alt={property.title}
                  style={{
                    width: "100%",
                    height: 100,
                    objectFit: "cover",
                    borderRadius: 8,
                    marginBottom: 8,
                  }}
                />
              )}
              <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#1A3654" }}>
                {property.title}
              </p>
              <p style={{ margin: "4px 0 0", fontSize: 12, color: "#1A3654", opacity: 0.5 }}>
                {property.city}
              </p>
              <p style={{ margin: "6px 0 0", fontSize: 14, fontWeight: 700, color: "#2B5EA7" }}>
                {property.pricePerNight} TND
                <span style={{ fontWeight: 400, fontSize: 12, opacity: 0.5 }}> / night</span>
              </p>
              <a
                href={`/property/${property.id}`}
                style={{
                  display: "inline-block",
                  marginTop: 8,
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#2B5EA7",
                  textDecoration: "none",
                }}
              >
                View details →
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}