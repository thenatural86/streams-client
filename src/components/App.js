import React from "react"
import { Router, Route, Switch } from "react-router-dom"
import StreamCreate from "./streams/StreamCreate"
import StreamEdit from "./streams/StreamEdit"
import StreamDelete from "./streams/StreamDelete"
import StreamList from "./streams/StreamList"
import StreamShow from "./streams/StreamShow"
import Header from "./Header"
import history from "../history"

// Router allows navigation around app by matching the url path.
const App = () => {
  return (
    <div className="ui container">
      {/* give all pages access to history object */}
      <Router history={history}>
        <div>
          {/* Header will on top of all pages in app */}
          <Header />
          {/* Wrap all routes for app in Switch */}
          <Switch>
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
