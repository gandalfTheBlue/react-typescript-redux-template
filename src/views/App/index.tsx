import './index.scss'
import 'antd/dist/antd.css'

import { Button } from 'antd'

import logo from '../../logo.svg'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

function App() {
  const { loading } = useSelector((state: RootState) => state.app)

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
