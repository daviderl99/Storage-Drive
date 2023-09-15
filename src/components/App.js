import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './auth/Signup';
import Login from './auth/Login';
import Profile from './auth/Profile';
import PrivateRoute from './auth/PrivateRoute';
import ForgotPassword from './auth/ForgotPassword';
import UpdateProfile from './auth/UpdateProfile';
import Dashboard from './drive/Dashboard';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Drive */}
          <Route exact path='/' element={<PrivateRoute />}>
            <Route path='/' element={<Dashboard />} />
          </Route>
          <Route exact path='/folder/:folderId' element={<PrivateRoute />}>
            <Route path='/folder/:folderId' element={<Dashboard />} />
          </Route>
          {/* Profile */}
          <Route path='/user' element={<PrivateRoute />}>
            <Route path='/user' element={<Profile />} />
          </Route>
          <Route path='/update-profile' element={<PrivateRoute />}>
            <Route path='/update-profile' element={<UpdateProfile />} />
          </Route>

          {/* Auth */}
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
