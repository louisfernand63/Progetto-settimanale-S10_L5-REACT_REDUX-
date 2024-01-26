import React, { useEffect, useState } from "react";
import "./card.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

export default function Card({ info }) {
  const [mapPosition, setMapPosition] = useState([0, 0]);

  useEffect(() => {
    if (info && info.coord) {
      setMapPosition([info.coord.lat, info.coord.lon]);
    }
  }, [info]);

  console.log(mapPosition);

  return (
    <>
      {info && info.hasOwnProperty("name") ? (
        <>
          <div className="mt-4">
            <div className="d-flex flex-column align-items-center">
              <h3 className="mb-0 fs-2">
                {" "}
                {info.hasOwnProperty("name") ? info.name : "Loading..."}
              </h3>
              <p className="mb-0" style={{ fontSize: "4rem" }}>
                {parseInt(info.main.temp - 273) + "°"}
              </p>
              <p className="fw-bold mb-0">
                {capitalizeEveryWord(info.weather[0].description)}
              </p>
              <div>
                <span className="fw-bold fs-4 me-2">
                  MAX: {parseInt(info.main.temp_max - 273) + "°"}
                </span>
                <span> </span>{" "}
                <span className="fw-bold fs-4">
                  MIN: {parseInt(info.main.temp_min - 273) + "°"}
                </span>
              </div>
            </div>
          </div>

          <div className="container px-0">
            <div className="carousel-container2">
              <div className="d-flex justify-content-between mt-5 container px-0 ">
                <div>
                  <div className="wind d-flex p-3 rettangolo pe-0 carousel-slide2 me-3">
                    <div className="wind1">
                      <div
                        className="d-flex  align-items-center"
                        style={{ height: "20px" }}
                      >
                        <img
                          src="https://icons.iconarchive.com/icons/colebemis/feather/256/wind-icon.png"
                          alt=""
                          style={{ width: "20px" }}
                        />
                        <p className="my-0 ms-2 border-0">wind</p>
                      </div>

                      <p className="m-0 fw-bold py-2">
                        {parseInt(info.wind.speed)} m/s
                      </p>
                      <p className="m-0 fw-bold py-2">{info.wind.deg} gradi</p>
                    </div>
                    <div className="wind2">
                      <img
                        src="https://icons.iconarchive.com/icons/iynque/ios7-style/256/Compass-icon.png"
                        alt=""
                        style={{ width: "70px" }}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="visibility  p-3 bordo carousel-slide2 me-3">
                    <div
                      className="d-flex  align-items-center"
                      style={{ height: "20px" }}
                    >
                      <img
                        src="https://icons.iconarchive.com/icons/ionic/ionicons/256/eye-icon.png"
                        alt=""
                        style={{ width: "20px" }}
                      />
                      <p className="my-0 ms-2">VISIBILITA'</p>
                    </div>
                    <p className="secondo">{info.visibility / 1000} km</p>
                    <p>
                      {info.visibility > 5000
                        ? "Buona visibilità."
                        : "Poca visibilità."}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="umidity  p-3 bordo carousel-slide2 me-3">
                    <div
                      className="d-flex  align-items-center"
                      style={{ height: "20px" }}
                    >
                      <img
                        src="https://icons.iconarchive.com/icons/icons8/windows-8/256/Science-Humidity-icon.png"
                        alt=""
                        style={{ width: "20px" }}
                      />
                      <p className="my-0 ms-2">UMIDITA'</p>
                    </div>
                    <p className="secondo">{info.main.humidity} %</p>
                    <p>Punto di rugiada: 3°.</p>
                  </div>
                </div>

                <div>
                  <div className="pressione  p-3 bordo carousel-slide2 me-3">
                    <div
                      className="d-flex  align-items-center"
                      style={{ height: "20px" }}
                    >
                      <img
                        src="https://icons.iconarchive.com/icons/icons8/windows-8/256/Science-Pressure-icon.png"
                        alt=""
                        style={{ width: "20px" }}
                      />
                      <p className="my-0 ms-2">PRESSIONE</p>
                    </div>
                    <p className="secondo">{info.main.pressure} hPa</p>
                  </div>
                </div>

                <div>
                  <div className="sunrise p-3 bordo carousel-slide2 me-3">
                    <div
                      className="d-flex  align-items-center"
                      style={{ height: "20px" }}
                    >
                      <img
                        src="https://icons.iconarchive.com/icons/iconsmind/outline/256/Sunrise-icon.png"
                        alt=""
                        style={{ width: "20px" }}
                      />
                      <p className="my-0 ms-2">LEVATA DEL SOLE</p>
                    </div>
                    <p className="secondo">
                      {convertTimestampToTime(info.sys.sunrise)}{" "}
                    </p>
                    <p>Tramonto: {convertTimestampToTime(info.sys.sunset)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Aggiungi la mappa qui */}
          <MapContainer
            center={mapPosition}
            zoom={13}
            style={{ height: "300px" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <Marker position={mapPosition}>
              <Popup>{info.name}</Popup>
            </Marker>
          </MapContainer>
        </>
      ) : (
        <>
          <div className="mt-4">
            <div class="container">
              <div class="loader-container">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function convertTimestampToTime(timestamp) {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  return formattedTime;
}

function capitalizeEveryWord(sentence) {
  return sentence.replace(/\b\w/g, (match) => match.toUpperCase());
}
