import { Component } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import FindFeed from "./pages/FindFeed"
import NewFeed from "./pages/NewFeed"

export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<FindFeed />} />
            <Route path="/find_feed" element={<FindFeed />} />
            <Route path="/new_feed" element={<NewFeed />} />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}