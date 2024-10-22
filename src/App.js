// App.js
import logo from './logo.svg';
import './App.css';
import Movie from './components/movie';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { MovieProvider } from './components/movieProvider'; // MovieProvider 임포트

function App() {
  return (
    <MovieProvider> {/* MovieProvider로 감싸줌 */}
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Movie />} />
          </Routes>
        </div>
      </Router>
    </MovieProvider>
  );
}

export default App;
