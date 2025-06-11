import {BrowserRouter, Route, Routes} from "react-router-dom";
import {LandingPage} from "./pages/LandingPage";
//import {NotFound} from "./pages/NotFound";
import {Login} from "./pages/Login";
import {Signup} from "./pages/Signup"
import {Dashboard}  from "./pages/Dashboard";
import { Upload } from "./pages/Upload";
import { Flashcards } from "./pages/Flashcards";
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path= "/"  element= {<LandingPage />} />
        <Route path= "/login" element={<Login/>} />
        <Route path= "/signup" element={<Signup/>} />
        <Route path= "/dashboard" 
              element={<Dashboard/>}/>
        {/*<Route path="*" element={<NotFound />} />*/}
        <Route path= "/upload" element={<Upload/>}/>
        <Route path= "/flashcards" element={<Flashcards/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
