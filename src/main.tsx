import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Character from "./pages/Character";
import Results from "./pages/Results";
import "./index.css";
import UpdateProfile from "./pages/UpdateProfile";

// // FOR USE IF WE ARE SEEING STRANGE NAVIGATION
// const DebugLayout = () => {
//   const location = useLocation();
//   const navigationType = useNavigationType(); // "POP" | "PUSH" | "REPLACE"
//   useEffect(() => {
//     console.log("The current URL is", { ...location });
//     console.log("The last navigation action was", navigationType);
//   }, [location, navigationType]);
//   return <Outlet />;
// };

// RENDER APPLICATION
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* <Route element={<DebugLayout />}> */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="updateProfile" element={<UpdateProfile />} />
          <Route path="character/:id" element={<Character />} />
          <Route path="results/" element={<Results />} />
          <Route path="*" element={<Home />} />
        </Route>
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
