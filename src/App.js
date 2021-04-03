import { Route, Switch } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";
import Layout from "./Components/Layouts/Layout";
import BurgerBuilder from "./Containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./Containers/Checkout/Checkout";

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
