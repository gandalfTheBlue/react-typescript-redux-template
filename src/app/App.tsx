import './App.scss'

import { Layout, Spin } from 'antd'
import { useSelector } from 'react-redux'

import { selectLoading } from './appSlice'

const { Header, Footer, Content } = Layout

function App() {
  const loading = useSelector(selectLoading)

  return (
    <Layout className="app">
      <Header>Header</Header>
      <Content>Content</Content>
      <Footer>Footer</Footer>
      <Spin spinning={loading} size="large" />
    </Layout>
  )
}

export default App
