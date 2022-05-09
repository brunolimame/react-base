import { BrowserRouter,Routes, Route } from "react-router-dom";
import { Login } from "../../Auth/page/login";
import NotFound from "./NotFound"

function App() {
  return (
    <>
    <h3>painel</h3>
    <BrowserRouter>
      <Routes>
        <Route path="/" element="{inicial}"></Route>
        <Route path="*" element={<NotFound/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
