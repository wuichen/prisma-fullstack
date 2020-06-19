import { InputGroup, Checkbox, Button } from 'oah-ui';
import { Card, CardBody, CardHeader, CardFooter } from 'oah-ui';

import React, { useContext, useState } from 'react';
import Auth, { Group } from 'components/Auth';
import Socials from 'components/Auth/Socials';
import {
  useLoginMutation,
  useFindManyCompanyQuery,
  useFindManyPlatformQuery,
} from 'generated';
import { LayoutContext } from 'layouts/Admin';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Container, Row, Col } from 'oah-ui';
export default function Login() {
  const { me } = useContext(LayoutContext);
  const { data: companiesData, loading, error } = useFindManyCompanyQuery({
    variables: {
      where: {
        owner: {
          id: {
            equals: me.id,
          },
        },
      },
    },
    skip: !me?.id,
  });

  const { data: platformsData } = useFindManyPlatformQuery({
    variables: {
      where: {
        owner: {
          id: {
            equals: me.id,
          },
        },
      },
    },
    skip: !me?.id,
  });

  // const [login] = useLoginMutation();
  // const { refetch } = useContext(LayoutContext);
  const router = useRouter();
  // const [state, setState] = useState({
  //   email: '',
  //   password: '',
  //   checkbox: false,
  // });

  // const onChange = (value: any, name: string) => {
  //   setState({ ...state, [name]: value });
  // };

  // const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   login({
  //     variables: {
  //       email: state.email,
  //       password: state.password,
  //     },
  //   }).then(({ data, errors }) => {
  //     if (!errors && data?.login && refetch) {
  //       refetch().then(() => router.push('/admin'));
  //     }
  //   });
  // };

  return (
    <Auth title="Entrance" subTitle="Hello! Please Select a workspace to enter">
      <Container>
        <h2>
          My Platforms <Button>Create</Button>
        </h2>

        <Row>
          {platformsData?.findManyPlatform?.map((platform) => {
            return (
              <Col breakPoint={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <Card>
                  <CardHeader>{platform.name}</CardHeader>
                  <CardBody>{platform.description}</CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>
        <h2>
          My Companies <Button>Create</Button>
        </h2>

        <Row>
          {companiesData?.findManyCompany?.map((company) => {
            return (
              <Col breakPoint={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <Card>
                  <CardHeader>{company.name}</CardHeader>
                  <CardBody>{company.description}</CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>

      {/* <form onSubmit={onSubmit}>
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
      </p> */}
    </Auth>
  );
}
