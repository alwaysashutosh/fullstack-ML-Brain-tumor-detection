import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Components/Landing";
import Detection from "./Components/Detection";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/detect" element={<Detection />} />
      </Routes>
    </Router>
  );
}

export default App;