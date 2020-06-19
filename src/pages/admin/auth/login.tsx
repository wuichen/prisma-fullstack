import { InputGroup, Checkbox, Button } from 'oah-ui';
import React, { useContext, useState } from 'react';
import Auth, { Group } from 'components/Auth';
import Socials from 'components/Auth/Socials';
import { useLoginMutation } from 'generated';
import { LayoutContext } from 'layouts/Admin';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Login() {
  const [login] = useLoginMutation();
  const { refetch } = useContext(LayoutContext);
  const router = useRouter();
  const [state, setState] = useState({
    email: '',
    password: '',
    checkbox: false,
  });

  const onChange = (value: any, name: string) => {
    setState({ ...state, [name]: value });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login({
      variables: {
        email: state.email,
        password: state.password,
      },
    }).then(({ data, errors }) => {
      if (!errors && data?.login && refetch) {
        localStorage.setItem('access_token', data?.login.token);
        refetch().then(() => router.push('/admin'));
      }
    });
  };

  return (
    <Auth title="Login" subTitle="Hello! Login with your email">
      <form onSubmit={onSubmit}>
        <InputGroup fullWidth>
          <input
            type="email"
            placeholder="Email Address"
            required
            value={state.email}
            onChange={(event) => onChange(event.target.value, 'email')}
          />
        </InputGroup>
        <InputGroup fullWidth>
          <input
            type="password"
            placeholder="Password"
            required
            value={state.password}
            onChange={(event) => onChange(event.target.value, 'password')}
          />
        </InputGroup>
        <Group>
          <Checkbox
            checked={state.checkbox}
            onChange={(value) => onChange(value, 'checkbox')}
          >
            Remember me
          </Checkbox>
          <Link href="/admin/auth/request-password">
            <a>Forgot Password?</a>
          </Link>
        </Group>
        <Button
          disabled={!state.email || !state.password}
          status="Success"
          shape="SemiRound"
          fullWidth
        >
          Login
        </Button>
      </form>
      <Socials />
      <p>
        Don&apos;t have account?{' '}
        <Link href="/admin/auth/register">
          <a>Register</a>
        </Link>
      </p>
    </Auth>
  );
}
