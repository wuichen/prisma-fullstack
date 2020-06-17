import React from 'react';
import { InputGroup, Button } from 'oah-ui';

import Auth, { Group } from 'Components/Auth';
import Link from 'next/link';

export default function RequestPassword() {
  return (
    <Auth title="Forgot Password" subTitle="Enter your email address and we’ll send a link to reset your password">
      <form>
        <InputGroup fullWidth>
          <input type="email" placeholder="Email Address" />
        </InputGroup>
        <Button status="Success" type="button" shape="SemiRound" fullWidth>
          Request Password
        </Button>
      </form>
      <Group>
        <Link href="/admin/auth/login">
          <a>Back to Log In</a>
        </Link>
        <Link href="/admin/auth/register">
          <a>Register</a>
        </Link>
      </Group>
    </Auth>
  );
}
