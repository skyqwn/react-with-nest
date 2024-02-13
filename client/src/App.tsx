import React from "react";
import { isLoggedInVar } from "./apollo";
import Header from "./components/Header";
import Router from "./Router";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Header />
      <Toaster position="top-center" />
      <Router />
    </div>
  );
}

export default App;
