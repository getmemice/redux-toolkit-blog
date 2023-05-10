import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./index.css"
import App from "./App"
import { store } from "./app/store"
import { Provider } from "react-redux"
import { fetchUsers } from "./features/users/usersSlice"
import { fetchPosts } from "./features/posts/postSlice"

store.dispatch(fetchPosts())
store.dispatch(fetchUsers())

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
