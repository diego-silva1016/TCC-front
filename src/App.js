import { LoginContextProvider } from "./contexts/LoginContext/index.js";
import { ToastContextProvider } from "./contexts/ToastContext/index.js";
import Router from "./Routes/index.js";

function App() {
  return (
    <LoginContextProvider>
      <ToastContextProvider>
        <Router />
      </ToastContextProvider>
    </LoginContextProvider>
  );
}

export default App;
