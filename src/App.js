import React from "react";
import {Route, Switch} from 'react-router-dom';
import PizzaForm from "./Components/PizzaForm";
import Home from "./Components/Home"

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path ='/'>
          <Home />
        </Route>
        <Route path ='/pizza'>
          <PizzaForm />
        </Route>
      </Switch>
    </div>
  );
};
export default App;
