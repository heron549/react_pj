import React, { createContext, useState, useEffect } from "react";

export const UpcomingMovieContext = createContext();

export const UpcomingMovieProvider = ({ children }) => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // 더 이상 데이터가 있는지 여부
  const [loading, setLoading] = useState(false); // 로딩 상태

  // 개봉 예정 영화를 가져오는 함수
  const fetchUpcomingMovies = async () => {
    if (loading || !hasMore) return; // 로딩 중이거나 더 이상 데이터가 없는 경우 함수 종료

    setLoading(true); // 로딩 시작

    try {
      const url = `https://api.themoviedb.org/3/movie/upcoming?language=ko&page=${page}&region=KR`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDVmOGM2ZDQ1NjE3MTkzMGVmMTc4Mzk2OWE2MDNmYSIsIm5iZiI6MTcyOTY4MTU1MS45NjQ4ODQsInN1YiI6IjY3MTVhMzE5Y2VmMTQ2MjhmZWY2MDU5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cy8APScDJeJMTjPs4mCnYa2ZlG40Pe2ayTYaK6ecAaE", // 환경 변수로 변경하는 것이 좋음
        },
      };

      const response = await fetch(url, options);
      const json = await response.json();

      // 기존 데이터에 새 데이터 추가 (중복 제거)
      setUpcomingMovies((prevData) => {
        const existingIds = new Set(prevData.map((movie) => movie.id)); // 기존 영화 ID 집합
        const newMovies = json.results.filter(
          (movie) => !existingIds.has(movie.id)
        ); // 중복된 영화 제거
        return [...prevData, ...newMovies]; // 중복 제거 후 기존 데이터에 추가
      });

      // 더 이상 데이터가 없을 때
      if (json.results.length === 0 || page >= json.total_pages) {
        setHasMore(false); // 데이터가 더 이상 없음을 표시
      }
    } catch (error) {
      console.error("Error fetching upcoming movie data:", error);
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  useEffect(() => {
    fetchUpcomingMovies(); // 처음 데이터 로드
  }, []); // 컴포넌트가 마운트될 때 한 번만 호출

  useEffect(() => {
    fetchUpcomingMovies(); // page가 변경될 때마다 호출
  }, [page]); // page가 변경될 때마다 useEffect 재실행

  return (
    <UpcomingMovieContext.Provider value={{ upcomingMovies, setPage, hasMore }}>
      {children}
    </UpcomingMovieContext.Provider>
  );
};
