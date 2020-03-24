import React from "react"
import { Link } from "react-router-dom"
import GoogleAuth from "./GoogleAuth"

//Use Link from react router dom to create inner app links to home page
const Header = () => {
  return (
    <div
      // style={{ backgroundColor: "#a478c1" }}
      className="ui secondary pointing menu"
    >
      {/* link to root route */}
      <Link to="/" className="item">
        Stream-Tastic!
      </Link>
      <div className="right menu">
        {/* link to root route */}
        <Link to="/" className="item">
          All Streams
        </Link>
        {/* login/logout button */}
        <GoogleAuth />
      </div>
    </div>
  )
}

export default Header
