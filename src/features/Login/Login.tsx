import { Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { userLogin } from '../../app/appSlice';
import { LoginForm } from '../../models/appModel';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
};

const Login = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const onLogin = async (loginForm: LoginForm) => {
    dispatch(userLogin(loginForm));
    history.push('/');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onLogin}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label={t('login.username.title')}
        name="username"
        rules={[{ required: true, message: t('login.username.required') }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={t('login.password.title')}
        name="password"
        rules={[{ required: true, message: t('login.password.required') }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
