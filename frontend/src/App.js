import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

// Sections
import Admin from "./Sections/Admin/"
import Main from "./Sections/Main/"
import Auth from "./Sections/Auth"

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/auth/*' element={<Auth />} />
        <Route path='/admin/*' element={<Admin />} />
        <Route path='/*' element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;