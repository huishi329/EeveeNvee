import LoginFormPage from "./components/LoginFormPage";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <h1>Hello from App</h1>
      <Switch>
        <Route path='/login'>
          <LoginFormPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
