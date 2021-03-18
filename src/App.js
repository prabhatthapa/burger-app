import logo from "./logo.svg";
import "./App.css";
import Layout from "./Components/Layouts/Layout";
import BurgerBuilder from "./Containers/BurgerBuilder/BurgerBuilder";

function App() {
  return (
    <div className="App">
      <Layout>
        <BurgerBuilder />
      </Layout>
    </div>
  );
}

export default App;
