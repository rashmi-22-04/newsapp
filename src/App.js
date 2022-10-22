import "./App.css";
import Navbar from "./components/Navbar";
import News from "./components/News";

import React, {useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = ()=> {
 
  const pageSize = 5;
  const apikey = process.env.REACT_APP_NEWS_API;
 
  const [progress,setProgress]=useState(0)
 



    
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            height={3}
            color="#f11946"
            progress={progress}
          />
          <Switch>
            <Route exact path="/" key="general">
              <News
                setProgress={setProgress}
                apikey={apikey}
                pageSize={pageSize}
                country="in"
                category="general"
              />
            </Route>
            <Route exact path="/business" key="business">
              <News
                setProgress={setProgress}
                apikey={apikey}
                pageSize={pageSize}
                country="in"
                category="business"
              />
            </Route>
            <Route exact path="/entertainment" key="entertainment">
              <News
                setProgress={setProgress}
                apikey={apikey}
                pageSize={pageSize}
                country="in"
                category="entertainment"
              />
            </Route>
            <Route exact path="/health" key="health">
              <News
                setProgress={setProgress}
                apikey={apikey}
                pageSize={pageSize}
                country="in"
                category="health"
              />
            </Route>
            <Route exact path="/science" key="science">
              <News
                setProgress={setProgress}
                apikey={apikey}
                pageSize={pageSize}
                country="in"
                category="science"
              />
            </Route>
            <Route exact path="/sports" key="sports">
              <News
                setProgress={setProgress}
                apikey={apikey}
                pageSize={pageSize}
                country="in"
                category="sports"
              />
            </Route>
            <Route exact path="/technology" key="technology">
              <News
                setProgress={setProgress}
                apikey={apikey}
                pageSize={pageSize}
                country="in"
                category="technology"
              />
            </Route>
            <Route exact path="/general" key="general">
              <News
                setProgress={setProgress}
                apikey={apikey}
                pageSize={pageSize}
                country="in"
                category="general"
              />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  
}

export default App;