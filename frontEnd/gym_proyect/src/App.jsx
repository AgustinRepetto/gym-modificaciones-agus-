
import './App.css' // importa los estilos generales de la aplicación
import { Home } from '../src/pages/home/Home' // public
import { Login } from './pages/login/Login' // public
import { Profile } from './pages/profile/Profile' //private
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom' // importa las herramientas de ruteo de React Router
import { PrivateRoute, PublicRoute, AdminRoute } from '../Routes'
import { Register } from './pages/register/register'
import { CustomersPage } from './pages/customers/CustomersPage'
import { NotFound } from './pages/notFound/NotFound'
import { ProfesPage } from './pages/profesores/ProfesPage'
import { News } from './pages/news/News'

export function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
                {/* REDIRECCIÓN DE RAÍZ AL HOME */}
              <Route path='/' element={<Navigate to='/home' replace />} />
              
                {/* RUTAS ABIERTAS */}
                {/* RUTAS PARA NO LOGEADOS */}
              <Route element={<PublicRoute />}>

                <Route path="/home" element={<Home/>}/>
                <Route path="/auth/login" element={<Login/>}/>
                <Route path="/users" element={<Register/>}/>

                <Route path="*" element={<NotFound/>}/>
              </Route>

                {/* RUTAS PRIVADAS */}
              <Route element = {<PrivateRoute/>}>

                <Route path="/profile" element={<Profile/>}/>

              </Route>

                {/* RUTAS SOLO PARA ADMIN */}
              <Route element = {<AdminRoute/>}>

                <Route path="/customers" element={<CustomersPage/>}/>
                <Route path="/profesores" element={<ProfesPage/>}/>
                <Route path="/news" element={<News/>}/>

              </Route>

          </Routes>
      </BrowserRouter>
    
    </>
  );
}


