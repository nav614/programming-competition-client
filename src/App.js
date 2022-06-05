import { Spin } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';
import { useRoutes } from './routes';


function App() {
  const { login, logout, token, userId, userName, loading } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  return (
    <AuthContext.Provider value={{
      token,
      login,
      logout,
      userId,
      userName,
      isAuthenticated
    }}>
      {!loading && <Router>
        {isAuthenticated && <Navbar />}
        <div className='container'>
          {routes}
        </div>
      </Router>
      }
    </AuthContext.Provider>
  );
}

export default App;
