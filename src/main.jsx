import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ShopContextProvider } from './context/ShopContext.jsx'
import { Provider } from 'react-redux'
import store from './stores/index.js'

import { HelmetProvider } from 'react-helmet-async'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <HelmetProvider>
    <Provider store={store}>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <ShopContextProvider>
          <App />
        </ShopContextProvider>
      </BrowserRouter>
    </Provider>
  </HelmetProvider>
  // </React.StrictMode>
)
