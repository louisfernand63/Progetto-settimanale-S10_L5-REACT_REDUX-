import React, { useState, useEffect } from "react";
import "./Forecast.css";
import { Col } from "react-bootstrap";

export default function Forecast({ query }) {
  const [datas, setForecast] = useState({});
  const [data, setData] = useState();

  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=1040b2dc283aedf2fa6837b77d2361be`
        );

        if (response.status === 400) {
          // Se la prima richiesta ha uno stato 400, effettua la seconda richiesta
          const fallbackResponse = await fetch(
            "https://api.openweathermap.org/data/2.5/forecast?q=london&appid=1040b2dc283aedf2fa6837b77d2361be"
          );
          const fallbackData = await fallbackResponse.json();
          setForecast(fallbackData);
        } else {
          // Se la prima richiesta va a buon fine, utilizza i dati restituiti
          const data = await response.json();
          setForecast(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    console.log(datas);
    fetchDatas();
  }, [query]);

  return (
    <>
      {datas.cod === "404" ? null : (
        <div className="carrello mt-3 container px-0">
          <div className="carousel-container">
            {datas.list &&
              datas.list.map((item) => (
                <>
                  <div>
                    <Col
                      key={item.dt}
                      className="carousel-slide d-flex flex-column"
                    >
                      <div>{convertTimestampToTime(item.dt)}</div>
                      <div>
                        <img
                          src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                          alt=""
                        />
                      </div>
                      <div>{parseInt(item.main.temp - 273.15) + "°"}</div>
                    </Col>
                  </div>
                  {/* 
                        <div>{voglio che qui mi stampi convertTimestampToTime(item.dt) ogni volta che il giorno della data cambia }</div> */}
                </>
              ))}
          </div>
        </div>
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

function convertTimestampToDate(timestamp) {
  const date = new Date(timestamp * 1000);
  const options = { weekday: "short", day: "numeric" };

  return date.toLocaleDateString("pt-PT", options);
}
