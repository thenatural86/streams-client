import React from "react"
import { Link } from "react-router-dom"
import GoogleAuth from "./GoogleAuth"

//Use Link from react router dom to create inner app links to home page
const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        Streamy
      </Link>
      <div className="right menu">
        <Link to="/" className="item">
          All Streams
        </Link>
        <GoogleAuth />
      </div>
    </div>
  )
}

export default Header
