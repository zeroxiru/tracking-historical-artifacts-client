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
import PrivateRoutes from "./PrivateRoutes";
import MyLikedArtifacts from "../pages/MyLikedArtifacts/MyLikedArtifacts";
import MyArtifacts from "../pages/MyArtifacts/MyArtifacts";


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
          element: <PrivateRoutes>
            <AddArtifacts></AddArtifacts>
          </PrivateRoutes>
        }
        ,
        {
          path: '/artifacts/bookingDetails',
          element:<PrivateRoutes> <BookingDetails  ></BookingDetails></PrivateRoutes>
        },
        {
          path: '/profile',
          element: <PrivateRoutes><Profile  ></Profile ></PrivateRoutes>
        },
        {
          path: '/about',
          element: <About  ></About >
        },
        {
          path: '/artifacts/:id',
          element:
             <ArtifactsDetailsPage  ></ArtifactsDetailsPage >
         
        },
        {
          path: '/my-liked-artifacts',
          element:<PrivateRoutes>
             <MyLikedArtifacts></MyLikedArtifacts >
          </PrivateRoutes>
        },
        {
          path: '/my-artifacts',
          element:<PrivateRoutes>
             <MyArtifacts></MyArtifacts >
          </PrivateRoutes>
        },
       ]
    },
  ]);