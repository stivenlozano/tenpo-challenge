import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { AuthContext } from './auth/Auth';
import Login from './pages/Login';
import Movies from './pages/Movies';
import Series from './pages/Series';
import MovieDetail from './pages/MovieDetail';
import SerieDetail from './pages/SerieDetail';

function App() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      <Router>
        <Routes>
          <Route path="/login" element={!token ? <Login /> : <Navigate to="/movies" />}/>

          <Route path="/movies" element={token ? <Movies /> : <Navigate to="/login" />}/>
          <Route path="/movies/:id" element={token ? <MovieDetail /> : <Navigate to="/login" />}/>
          <Route path="/series" element={token ? <Series /> : <Navigate to="/login" />}/>
          <Route path="/series/:id" element={token ? <SerieDetail /> : <Navigate to="/login" />}/>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
