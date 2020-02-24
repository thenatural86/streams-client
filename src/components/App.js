import React from "react"
import { BrowserRouter, Route, Link } from "react-router-dom"

const pageOne = () => {
  return (
    <div>
      Page One
      <Link to="/pagetwo"> Navigate to Page Two</Link>
    </div>
  )
}

const pageTwo = () => {
  return (
    <div>
      <div>Page Two</div>
      <button>Click Me!</button>
      <Link to="/"> Navigate to Page One</Link>
    </div>
  )
}

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route path="/" exact component={pageOne} />
          <Route path="/pagetwo" component={pageTwo} />
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
