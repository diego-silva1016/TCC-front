import { LoginContextProvider } from "./contexts/LoginContext/index.js";
import Router from "./Routes/index.js";

function App() {
  return (
    <LoginContextProvider>
      <Router />
    </LoginContextProvider>
  );
}

export default App;
