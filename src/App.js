import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" exact element={<MovieList />} />
          <Route path="/details/:movieId" exact element={<MovieDetails />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
