import React, { useContext } from 'react';
import Link from 'next/link';
import {
  Button,
  Wrapper,
  Container,
  LogoWrapper,
  Heading,
  SubHeading,
  HelperText,
  Offer,
  Input,
  Divider,
  LinkButton,
} from './SignInOutForm.style';
import { Facebook, Google } from 'components/AllSvgIcon';
import { AuthContext } from 'contexts/auth/auth.context';
import { FormattedMessage } from 'react-intl';
import Image from 'components/Image/Image';
import PickBazar from '../../image/PickBazar.png';
import { useSignUpMutation } from 'generated';
import { closeModal } from '@redq/reuse-modal';

export default function SignOutModal() {
  const { authDispatch } = useContext<any>(AuthContext);
  const [signUp] = useSignUpMutation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const signUpCallback = (e) => {
    e.preventDefault();

    if (typeof window !== 'undefined') {
      signUp({
        variables: {
          email: email,
          password: password,
        },
      }).then(({ data, errors }) => {
        if (!errors && data?.signUp) {
          localStorage.setItem('access_token', data.signUp.token);
          authDispatch({ type: 'SIGNIN_SUCCESS' });
          closeModal();
          window.location.reload();
        }
      });
    }
  };
  const toggleSignInForm = () => {
    authDispatch({
      type: 'SIGNIN',
    });
  };

  return (
    <Wrapper>
      <Container>
        {/* <LogoWrapper>
          <Image url={PickBazar} />
        </LogoWrapper> */}

        <Heading>
          <FormattedMessage id="signUpBtnText" defaultMessage="Sign Up" />
        </Heading>

        <SubHeading>
          <FormattedMessage
            id="signUpText"
            defaultMessage="Every fill is required in sign up"
          />
        </SubHeading>
        <form onSubmit={signUpCallback}>
          <FormattedMessage
            id="emailAddressPlaceholder"
            defaultMessage="Email Address or Contact No."
          >
            {(placeholder) => (
              <Input
                type="email"
                placeholder={placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            )}
          </FormattedMessage>

          <FormattedMessage
            id="passwordPlaceholder"
            defaultMessage="Password (min 6 characters)"
          >
            {(placeholder) => (
              <Input
                type="password"
                placeholder={placeholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            )}
          </FormattedMessage>

          <HelperText style={{ padding: '20px 0 30px' }}>
            <FormattedMessage
              id="signUpText"
              defaultMessage="By signing up, you agree to Pickbazar's"
            />{' '}
            <Link href="/">
              <a>
                <FormattedMessage
                  id="termsConditionText"
                  defaultMessage="Terms &amp; Condtion"
                />
              </a>
            </Link>
          </HelperText>

          <Button
            type="submit"
            fullwidth
            title={'Continue'}
            intlButtonId="continueBtn"
            style={{ color: '#fff' }}
          />
        </form>
        <Divider>
          <span>
            <FormattedMessage id="orText" defaultMessage="or" />
          </span>
        </Divider>

        <Button
          fullwidth
          title={'Continue with Facebook'}
          iconPosition="left"
          className="facebook"
          icon={<Facebook />}
          iconStyle={{ color: '#ffffff', marginRight: 5 }}
          intlButtonId="continueFacebookBtn"
          style={{ color: '#fff' }}
        />

        <Button
          fullwidth
          title={'Continue with Google'}
          className="google"
          iconPosition="left"
          icon={<Google />}
          iconStyle={{ color: '#ffffff', marginRight: 5 }}
          intlButtonId="continueGoogleBtn"
          style={{ color: '#fff' }}
        />
        <Offer style={{ padding: '20px 0' }}>
          <FormattedMessage
            id="alreadyHaveAccount"
            defaultMessage="Already have an account?"
          />{' '}
          <LinkButton onClick={toggleSignInForm}>
            <FormattedMessage id="loginBtnText" defaultMessage="Login" />
          </LinkButton>
        </Offer>
      </Container>
    </Wrapper>
  );
}
