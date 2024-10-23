// movieProvider.js
import React, { createContext, useState, useEffect } from "react";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movieData, setMovieData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // 더 이상 데이터가 있는지 여부

  // 영화 데이터를 가져오는 함수
  const fetchMovieData = async () => {
    try {
      const url = `https://api.themoviedb.org/3/movie/now_playing?language=ko&page=${page}&region=KR`
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDVmOGM2ZDQ1NjE3MTkzMGVmMTc4Mzk2OWE2MDNmYSIsIm5iZiI6MTcyOTY0Mzg2OS4wNjgyNDEsInN1YiI6IjY3MTVhMzE5Y2VmMTQ2MjhmZWY2MDU5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._4mK5XYIJwOEjK0tAPH_NQvIEEp_KUmj9hx-nHyjw7w",
        },
      };

      const response = await fetch(url, options);
      const json = await response.json();

      // 기존 데이터에 새 데이터 추가 (중복 제거)
      setMovieData((prevData) => {
        const existingIds = new Set(prevData.map((movie) => movie.id)); // 기존 영화 ID 집합
        const newMovies = json.results.filter(
          (movie) => !existingIds.has(movie.id)
        ); // 중복된 영화 제거
        return [...prevData, ...newMovies]; // 중복 제거 후 기존 데이터에 추가
      });

      // 더 이상 데이터가 없을 때
      if (json.results.length === 0) {
        setHasMore(false); // 데이터가 더 이상 없음을 표시
      }
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  useEffect(() => {
    fetchMovieData(); // 처음 데이터 로드
  }, []); // 컴포넌트가 마운트될 때 한 번만 호출

  useEffect(() => {
    if (hasMore) {
      // 데이터가 더 있는 경우에만 페이지가 변경될 때마다 호출
      fetchMovieData();
    }
  }, [page, hasMore]); // page와 hasMore가 변경될 때마다 useEffect 재실행

  return (
    <MovieContext.Provider value={{ movieData, setPage, fetchMovieData }}>
      {children}
    </MovieContext.Provider>
  );
};