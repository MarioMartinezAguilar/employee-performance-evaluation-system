import  {BrowserRouter, Routes, Route } from 'react-router-dom';
import { Questions } from './pages/Questions';
import { RegisterForm } from './pages/ResisterForm';
import { Thanks } from './pages/Thanks';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Toaster } from 'react-hot-toast';
import { Dashboard } from './pages/Dashboard';
import { EmployeeStats } from './pages/EmployeeStats';
import { Reports } from './pages/reports';
import { Login } from './pages/Login';
import { ProtectedAdminRoute } from './components/ProtectedAdminRoute';
import {PublicRoute} from './components/PublicRoute';



function App() {
  return(
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<RegisterForm />} />
          <Route path='/questions'
            element={
              <ProtectedRoute>
                <Questions />
              </ProtectedRoute>
            } 
          />
            <Route path="/thanks" element={<Thanks />} />
            <Route path='/dashboard' 
            element={
                <ProtectedAdminRoute>
                    <Dashboard />
                </ProtectedAdminRoute>
              } 
            />
            <Route path='/employees/stats' 
            element={
                <ProtectedAdminRoute>
                  <EmployeeStats />
                </ProtectedAdminRoute>
              
              } 
            />
            <Route path='/reports'
             element={
                <ProtectedAdminRoute>
                  <Reports/>
                </ProtectedAdminRoute>
              } 
            />
            
            <Route path='/login'
              element={
                <PublicRoute>
                  <Login/>
                </PublicRoute>
                
              }
            />
            
          
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}


export default App
