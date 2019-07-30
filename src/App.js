import React from 'react';
import './App.css';
import NavBarContainer from './containers/NavBarContainer/NavBarContainer';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomeContainer from './containers/HomeContainer/HomeContainer';
import CoursesContainer from './containers/CoursesContainer/CoursesContainer';
import FooterContainer from './containers/FooterContainer/FooterContainer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBarContainer></NavBarContainer>
        <Switch>
          <Route path="/courses" component={CoursesContainer} />
          <Route path="/" component={HomeContainer} />
        </Switch>
        <FooterContainer></FooterContainer>
      </BrowserRouter>
    </div>
  );
}

export default App;
