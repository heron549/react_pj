import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { UpcomingMovieContext } from './UpcomingMovieProvider';

function UpcomingMovieDetail() {
  const { upcomingMovies } = useContext(UpcomingMovieContext);
  const { movieId } = useParams(); // URL에서 movieId를 가져옴

  // upcomingMovies에서 해당 movieId에 맞는 영화 찾기
  const movie = upcomingMovies.find((movie) => movie.id.toString() === movieId);

  // movie가 존재하지 않으면 로딩 메시지
  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <img 
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} 
        alt={movie.title} 
      />
      <p>{movie.overview}</p>
      <p>개봉예정일: {movie.release_date}</p>
    </div>
  );
}

export default UpcomingMovieDetail;
