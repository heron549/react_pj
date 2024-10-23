import { useContext, useEffect, useState, useRef } from "react";
import { MovieContext } from "./movieProvider";
import { Link } from "react-router-dom";
import "../sample1.css";

function Movie() {
  const { movieData, setPage, fetchMovieData } = useContext(MovieContext);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef();

  // 무한 스크롤 구현
  useEffect(() => {
    const loadMoreMovies = (entries) => {
      if (entries[0].isIntersecting && !loading) {
        setLoading(true);
        setPage((prevPage) => prevPage + 1);
      }
    };

    const observer = new IntersectionObserver(loadMoreMovies, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loading, setPage]);

  // movieData가 업데이트될 때 로딩 상태 초기화
  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
  }, [loading]);

  return (
    <div>
      <header>
        <div className="netflixLogo">
          <a id="logo">
            {/* <img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/logo.PNG?raw=true"alt="Logo Image"/> */}
            <button className="btn">
              <span className="text">Movie</span>
            </button>
          </a>
        </div>
        <nav className="main-nav">
          {/* <Link to={`${process.env.PUBLIC_URL}/`}>현재상영작</Link>
          <Link to={`${process.env.PUBLIC_URL}/upcoming`}>개봉예정작</Link>
          <Link to={`${process.env.PUBLIC_URL}/coin`}>코인</Link> */}
          <Link to="/">현재상영작</Link>
          <Link to="/upcoming">개봉예정작</Link>
          <Link to="/coin">코인</Link>
        </nav>
      </header>
      <section className="main-container">
        <div className="location" id="home">
          <h1 id="home">현재상영작</h1>
          <div className="box">
            {movieData.length === 0 ? (
              <div className="newtons-cradle">
                <div className="newtons-cradle__dot"></div>
                <div className="newtons-cradle__dot"></div>
                <div className="newtons-cradle__dot"></div>
                <div className="newtons-cradle__dot"></div>
              </div>
            ) : (
              movieData.map((movie) => (
                <Link to={`/movie/${movie.id}`} key={movie.id}>
                  {movie.poster_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                    />
                  )}
                </Link>
              ))
            )}
          </div>
          <div ref={observerRef} style={{ height: "20px", margin: "20px" }} />
          {loading && (
            <div className="loading-container">
              <div className="newtons-cradle">
                <div className="newtons-cradle__dot"></div>
                <div className="newtons-cradle__dot"></div>
                <div className="newtons-cradle__dot"></div>
                <div className="newtons-cradle__dot"></div>
              </div>
              <p>Loading more movies...</p>
            </div>
          )}
        </div>
      </section>{" "}
      {/* 여기서 section 태그를 닫아줍니다 */}
    </div>
  );
}

export default Movie;
