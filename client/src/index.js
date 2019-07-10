import React from 'react'
import ReactDOM from 'react-dom'
import 'semantic-ui/dist/semantic.min.css'
import './index.css'
import axios from 'axios'
import App from './App'

axios.defaults.baseURL = process.env.REACT_APP_API_URL

ReactDOM.render(<App />, document.getElementById('root'))
