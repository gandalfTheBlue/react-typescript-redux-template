import './App.scss';

import { Layout, Spin } from 'antd';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import About from '../features/About';
import Home from '../features/Home';
import Login from '../features/Login';
import Users from '../features/Users';
import { selectLoading } from './appSlice';
import '../i18n/config';

const { Header, Footer, Content } = Layout;

function App() {
  const loading = useSelector(selectLoading);

  return (
    <Layout className="app">
      <Header>Header</Header>
      <Content className="app-content">
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
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
        </Router>
      </Content>
      <Footer>Footer</Footer>
      <Spin spinning={loading} size="large" />
    </Layout>
  );
}

export default App;
