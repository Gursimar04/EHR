import {
  BrowserRouter,Route,Routes
} from "react-router-dom";
import 'antd/dist/antd.css'; 
import Nav from './Components/Dummy'
import Doc from './Components/DummyDoctor'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/doctor" element={<Doc/>} />
      <Route exact path="/" element={<Nav/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
