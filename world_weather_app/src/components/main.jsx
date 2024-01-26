import {React, useEffect, useState } from 'react';
import Card from './card';
import Forecast from './forecast';

export default function Main({ query }) {
  const [result, setResult] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=1040b2dc283aedf2fa6837b77d2361be`
        );

        if (response.status === 400) {
          const fallbackResponse = await fetch(
            'https://api.openweathermap.org/data/2.5/weather?q=london&appid=1040b2dc283aedf2fa6837b77d2361be'
          );
          const fallbackData = await fallbackResponse.json();
          setResult(fallbackData);
        } else {
          const data = await response.json();
          setResult(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [query]);

  console.log(result);

  return (
    <>
      {result ? (
        <>
          <Card data={result} />
          <Forecast query={query} /> 
        </>
      ) : (
        "Loading..."
      )}
    </>
  );
}