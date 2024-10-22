import { useContext, useEffect, useState } from "react";
import { MovieContext } from "./movieProvider";
import { Link } from "react-router-dom";
import '../sample1.css';

function Movie() {
  const { movieData = [] } = useContext(MovieContext); // movieData의 기본값을 빈 배열로 설정
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // movieData가 업데이트될 때 로딩 상태를 업데이트
    if (movieData.length > 0) {
      setLoading(false); // 데이터가 있을 경우 로딩을 false로 설정
    } else {
      setLoading(true); // 데이터가 없으면 다시 로딩 상태로 설정
    }
  }, [movieData]);

  return (
    <div>
       {/* <!-- HEADER --> */}
    <header>
      <div class="netflixLogo">
        <a id="logo" href="#home"><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/logo.PNG?raw=true" alt="Logo Image"/></a>
      </div>      
      <nav class="main-nav">                
        <a href="#home">Home</a>
        <a href="#tvShows">TV Shows</a>
        <a href="#movies">Movies</a>
        <a href="#originals">Originals</a>
        <a href="#">Recently Added</a>
        <a target="_blank" href="https://codepen.io/cb2307/full/NzaOrm">Portfolio</a>        
      </nav>
      <nav class="sub-nav">
        <a href="#"><i class="fas fa-search sub-nav-logo"></i></a>
        <a href="#"><i class="fas fa-bell sub-nav-logo"></i></a>
        <a href="#">Account</a>        
      </nav>      
    </header>
    {/* <!-- END OF HEADER --> */}
    {/* <!-- MAIN CONTAINER --> */}
    <section class="main-container" >
    <div class="location" id="home">
    <h1 id="home">Popular on Netflix</h1>
    <div class="box">
    <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p1.PNG?raw=true" alt=""/></a>
    {movieData.map((movie) => (
            <a key={movie.id}>
              {movie.poster_path && (
                <img 
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                  alt={movie.title} 
                />
              )}
            </a>
          ))}
    </div>
    </div>
    </section>
    {/* <!-- END OF MAIN CONTAINER --> */}
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <ul>
          <li><Link to="/">Home</Link></li>
          {movieData.map((movie) => (
            <li key={movie.id}>
              <h2>{movie.title}</h2>
              {movie.poster_path && (
                <img 
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                  alt={movie.title} 
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Movie;
