import axios from "axios"

// export instance of axios
export default axios.create({
  // base url for api server
  baseURL: "http://localhost:3001"
})
