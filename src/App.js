import logo from './logo.svg';
import './App.css';
import Movie from './components/movie';
import MovieDetail from './components/movieDetail';
import UpcomingMovie from './components/UpcomingMovie'; // UpcomingMovie 추가
import UpcomingMovieDetail from './components/UpcomingMovieDetail'; // UpcomingMovieDetail 추가
import Coin from './components/coin'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MovieProvider } from './components/movieProvider'; // MovieProvider 임포트
import { UpcomingMovieProvider } from './components/UpcomingMovieProvider'; // UpcomingMovieProvider 임포트

function App() {
  return (
    <MovieProvider> {/* MovieProvider로 감싸줌 */}
      <UpcomingMovieProvider> {/* UpcomingMovieProvider로 감싸줌 */}
        <Router>
          <div>
            <Routes>
              <Route path={`${process.env.PUBLIC_URL}/`} element={<Movie />} />
              <Route path="/movie/:movieId" element={<MovieDetail />} /> {/* 기존 경로 */}
              <Route path="/upcoming" element={<UpcomingMovie />} /> {/* 새로운 경로 */}
              <Route path="/upcoming/movie/:movieId" element={<UpcomingMovieDetail />} /> {/* 개봉 예정작 상세 경로 */}
              <Route path="/coin" element={<Coin />} /> {/* 개봉 예정작 상세 경로 */}
            </Routes>
          </div>
        </Router>
      </UpcomingMovieProvider>
    </MovieProvider>
  );
}

export default App;
