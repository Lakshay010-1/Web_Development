import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import PageNotFound from './pages/PageNotFound'
import PlacesList from './components/PlacesList'
import Place from './components/Place'
import PlaceForm from './components/PlaceForm'
import { PlacesContextProvider } from './contexts/PlacesContext'
import { AuthContextProvider } from './contexts/AuthContext'
import ProtectedRoute from './pages/ProtectedRoute'
import MainLayout from './layouts/MainLayout'
import LoaderPage from './pages/LoaderPage'
import Loader from './components/Loader'

const Home = lazy(() => import("./pages/Home"))
const About = lazy(() => import("./pages/About"))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Login = lazy(() => import('./pages/Login'))
const Map = lazy(() => import('./pages/Map'))

export default function App() {
  return (
    <AuthContextProvider>
      <PlacesContextProvider>
        <BrowserRouter>
          <Suspense fallback={<Loader />}>

            <Routes>
              <Route element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path='/about' element={<About />} />

                <Route path='/map' element={<ProtectedRoute><Map /></ProtectedRoute>} >
                  <Route index element={<Navigate replace to="all" />} />
                  <Route path="all" element={<PlacesList tab={"all"} />} />
                  <Route path="all/:id" element={<Place />} />
                  <Route path="cities" element={<PlacesList tab={"cities"} />} />
                  <Route path="countries" element={<PlacesList tab={"countries"} />} />
                  <Route path="tovisit" element={<PlacesList tab={"tovisit"} />} />
                  <Route path="visited" element={<PlacesList tab={"visited"} />} />
                  <Route path="form" element={<PlaceForm />} />
                </Route>

                <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} >
                  <Route index element={<Navigate replace to="cities" />} />
                  <Route path="cities" element={<PlacesList tab={"cities"} />} />
                  <Route path="countries" element={<PlacesList tab={"countries"} />} />
                </Route>

                <Route path='/authenticate' element={<Login />} />
                <Route path='/*' element={<PageNotFound />} />

              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </PlacesContextProvider>
    </AuthContextProvider>
  )
}