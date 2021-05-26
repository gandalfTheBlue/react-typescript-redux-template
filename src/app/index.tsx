import './index.scss'
import 'antd/dist/antd.css'

import { Button } from 'antd'

import logo from '../logo.svg'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, selectLoading, showLoading } from './appSlice'
import { useEffect } from 'react'

function App() {
  const dispatch = useDispatch()
  const loading = useSelector(selectLoading)

  useEffect(() => {
    dispatch(showLoading())
    setTimeout(() => {
      dispatch(hideLoading())
    }, 5000)
  }, [dispatch])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {loading && (
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        )}
        <Button type="primary">Button</Button>
      </header>
    </div>
  )
}

export default App
