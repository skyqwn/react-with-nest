import React from "react";
import { isLoggedInVar } from "./apollo";
import Header from "./components/Header";
import Router from "./Router";

function App() {
  return (
    <div>
      <Header />
      <Router />
    </div>
  );
}

export default App;
