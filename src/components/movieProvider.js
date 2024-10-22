// movieProvider.js
import React, { createContext, useState, useEffect } from 'react';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movieData, setMovieData] = useState([]);
  
  const getMovieData = async () => {
    const url = "https://api.themoviedb.org/3/movie/now_playing?language=ko&page=1&region=KR";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: 
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDVmOGM2ZDQ1NjE3MTkzMGVmMTc4Mzk2OWE2MDNmYSIsIm5iZiI6MTcyOTYwMDY4OS43OTMwNjMsInN1YiI6IjY3MTVhMzE5Y2VmMTQ2MjhmZWY2MDU5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BXNDsWfDM5ZQsUfr9wF2cOyxQEVHWv55Gzj2gJ2ggDc"
      },
    };

    const response = await fetch(url, options);
    const json = await response.json();
    setMovieData(json.results);
  };

  useEffect(() => {
    getMovieData();
  }, []);

  return (
    <MovieContext.Provider value={{ movieData }}>
      {children}
    </MovieContext.Provider>
  );
};
