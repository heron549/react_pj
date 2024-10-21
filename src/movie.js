import { useEffect, useState } from "react";

function Movie() {
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [movieD, setMovieD] = useState([]); // 영화 데이터 상태

  const url =
    "https://api.themoviedb.org/3/movie/now_playing?language=ko&page=1&region=KR";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDVmOGM2ZDQ1NjE3MTkzMGVmMTc4Mzk2OWE2MDNmYSIsIm5iZiI6MTcyOTQ3MTc1MS4yOTQwNzIsInN1YiI6IjY3MTVhMzE5Y2VmMTQ2MjhmZWY2MDU5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.68wwi0FKt3GKexfarB70b9EwOjtjtJQO6VzyD_teZng",
    },
  };

  const getMovieD = async () => {
    const json = await (await fetch(url, options)).json();
    setMovieD(json.results); // 받아온 데이터를 상태로 설정
    setLoading(false); // 로딩 상태를 false로 변경
  };

  useEffect(() => {
    getMovieD();
  });

  return (
    <div>
      {loading ? ( // 로딩 중이면 로딩 메시지, 아니면 영화 리스트 출력
        <h1>Loading...</h1>
      ) : (
        <ul>
          {movieD.map((movie) => (
            <li key={movie.id}>{movie.title}</li> // 영화 제목 출력
          ))}
        </ul>
      )}
    </div>
  );
}

export default Movie;
