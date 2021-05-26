import './App.scss'

import { Layout, Spin } from 'antd'
import { useSelector } from 'react-redux'

import { selectLoading } from './appSlice'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import About from '../features/About'
import Users from '../features/Users'
import Home from '../features/Home'

const { Header, Footer, Content } = Layout

function App() {
  const loading = useSelector(selectLoading)

  return (
    <Layout className="app">
      <Header>Header</Header>
      <Content>
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/users">Users</Link>
                </li>
              </ul>
            </nav>
            <Switch>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/users">
                <Users />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
      </Content>
      <Footer>Footer</Footer>
      <Spin spinning={loading} size="large" />
    </Layout>
  )
}

export default App
