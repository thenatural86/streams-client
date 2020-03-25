import React from "react"
import { Router, Route, Switch } from "react-router-dom"
import StreamCreate from "./streams/StreamCreate"
import StreamEdit from "./streams/StreamEdit"
import StreamDelete from "./streams/StreamDelete"
import StreamList from "./streams/StreamList"
import StreamShow from "./streams/StreamShow"
import Header from "./Header"
// keeps track of the address bar in browser
import history from "../history"

// Router allows navigation around app by matching the url path.
const App = () => {
  return (
    <div className="ui container">
      {/* Use Router b/c we create history object ourselves */}
      {/* Listens to history for changes in URL. Gives all pages access to history object */}
      <Router history={history}>
        <div>
          {/* Header will be visible no matter what th path is */}
          {/* Header is a child of the Router and can make use of Link */}
          <Header />
          {/* Wrap all routes for app in Switch */}
          <Switch>
            {/* path prop decides if it should so component in screen or not. */}
            {/* exact makes sure that the extracted path === the path and react only renders that component*/}
            {/* REST-ful conventions */}
            <Route path="/" exact component={StreamList} />
            <Route path="/streams/new" exact component={StreamCreate} />
            <Route path="/streams/edit/:id" exact component={StreamEdit} />
            <Route path="/streams/delete/:id" exact component={StreamDelete} />
            <Route path="/streams/:id" exact component={StreamShow} />
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App
