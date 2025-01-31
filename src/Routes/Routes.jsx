import {
    createBrowserRouter,
  } from "react-router-dom";

import Home from "../pages/Home/Home/Home";
import MainLayout from "../Layout/MainLayout";

import SignUp from "../pages/SignUp/SignUp"
import SignIn from "../pages/Login/SignIn";
import AllArtifacts from "../pages/Common/AllArtifacts";
import AddArtifacts from "../pages/AddArtifacts/AddArtifacts";
import ArtifactsDetailsPage from "../pages/ArtifactsDetailsPage/ArtifactsDetailsPage";
import BookingDetails from "../pages/BookingDetails/BookingDetails";
import Profile from "../pages/Profile";
import About from "../pages/Common/About";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        { 
            path: '/',
            element:<Home></Home>,
        },
        {
          path: '/signIn',
          element: <SignIn></SignIn>
        },
        {
          path: '/register',
          element: <SignUp></SignUp>
        },
        {
          path: '/all-artifacts',
          element: <AllArtifacts></AllArtifacts>
        },
        {
          path: '/add-artifacts',
          element: <AddArtifacts></AddArtifacts>
        }
        ,
        {
          path: '/artifacts/bookingDetails',
          element: <BookingDetails  ></BookingDetails >
        },
        {
          path: '/profile',
          element: <Profile  ></Profile >
        },
        {
          path: '/about',
          element: <About  ></About >
        },
       ]
    },
  ]);