import React, { useState, useContext, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Formik, Form as FormikForm, Field } from 'formik';

import Button from 'components/Button';
import ButtonArrow from 'components/Button/Button.Arrow';
import CopyToClipboard from 'components/CopyToClipboard';
import Heading from 'components/Heading';
import Hidden from 'components/Hidden';
import Form from 'components/Form/Form';
import Section from 'components/Section';
import SocialLinks from 'components/SocialLinks';
import { AddContext } from 'components/Add/Add.Context';

import media from 'landings/common/src/theme/narative/media';
import { apiCall, startAnimation } from 'utils';
import { SubmittedCheckIcon } from '../../icons/ui';

const validate = (values) => {
  let errors = {};

  if (!values.name) {
    errors.name = 'Hi, we’re Narative. What’s your name?';
  }

  if (!values.email) {
    errors.email = "This one's important!";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Forgot a character?';
  }

  if (!values.details) {
    errors.details = 'Could be anything, really.';
  }
  if (values.details.length > 289) {
    errors.details = 'Short and sweet, please!';
  }

  return errors;
};

function ContactForm({ baseDelay }: { baseDelay: number }) {
  const { toggleAdd } = useContext(AddContext);

  const [animation, setAnimation] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    startAnimation(() => {
      setAnimation('start');
    });
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    const { company, details, email, name } = values;

    const method = 'post';
    const endpoint = '/api/platform/inquiry';
    const data = {
      company,
      email,
      details,
      name,
    };

    try {
      const result = await apiCall({ method, endpoint, data });
      console.log(result);
      setFirstName(name.split(' ')[0]);
      setSubmitting(false);
      setSubmitted(true);
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <Section>
      {submitted ? (
        <SubmittedScreen>
          <SubmittedCheckIcon />
          <SubmittedHeader>Thank you, {firstName}</SubmittedHeader>
          <SubmittedText>A member of the Mercy team will be in touch with you soon.</SubmittedText>
          <SubmittedBackButton onClick={toggleAdd}>Go back</SubmittedBackButton>
          <SocialLinksContainer>
            <SocialLinks fill="black" />
          </SocialLinksContainer>
          <CopyRightContainer>© {new Date().getFullYear()} Mercy Studio Inc.</CopyRightContainer>
        </SubmittedScreen>
      ) : (
        <Formik
          onSubmit={handleSubmit}
          validate={validate}
          validateOnBlur={false}
          initialValues={{
            name: '',
            email: '',
            details: '',
          }}
          render={(props) => {
            return (
              <StyledFormikForm>
                <FormSection animation={animation} delay={baseDelay + 350} spacing="large">
                  <FormHeader morePadding>Tell us about you</FormHeader>
                  <span>
                    <Field component={Form.Text} label="your name" name="name" autoFocus={true} />
                    <Field component={Form.Text} label="email address" name="email" />
                    <Field component={Form.Text} label="company" name="company" />
                  </span>
                </FormSection>
                <FormSection animation={animation} delay={baseDelay + 480}>
                  <FormHeader>What’s on your mind?</FormHeader>
                  <Field
                    component={Form.Textarea}
                    label="let us know what you’d like to discuss"
                    name="details"
                    rows={1}
                  />
                </FormSection>
                <ButtonContainer animation={animation} delay={baseDelay + 610}>
                  <ButtonArrow isSubmitting={props.isSubmitting} color="black" type="submit" text="Send to Mercy" />
                </ButtonContainer>
                <MobileButtonContainer animation={animation} delay={baseDelay + 610}>
                  <Button isSubmitting={props.isSubmitting} text="Send to Mercy" />
                </MobileButtonContainer>
                <ContactByEmail animation={animation} delay={baseDelay + 610} />
              </StyledFormikForm>
            );
          }}
        />
      )}
    </Section>
  );
}

export default ContactForm;

const ContactByEmail = ({ animation, delay }) => (
  <>
    <ContactWithEmail animation={animation} delay={delay}>
      <ContactWithEmailText>
        <CopyToClipboard copyOnClick="careers@narative.co" iconFill="rgba(0,0,0,0.3)">
          Looking to be part of Mercy? Say hello at{' '}
          <button>
            careers@mercy.co <Hidden>Copy careers@mercy.co go clipboard.</Hidden>
          </button>
        </CopyToClipboard>
      </ContactWithEmailText>
    </ContactWithEmail>
    <MobileContactWithEmail href="mailto:contact@narative.co" animation={animation} delay={delay}>
      Looking to be part of Mercy? <br />
      Say hello at <span>careers@mercy.co</span>
    </MobileContactWithEmail>
  </>
);

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeUpAnimation = css`
  transition: opacity 0.5s linear ${(p) => p.delay}ms,
    transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.9) ${(p) => p.delay}ms;
  opacity: ${(p) => (p.animation ? 1 : 0)};
  transform: ${(p) => (p.animation ? 'translateY(0)' : 'translateY(20px)')};
`;

const FormHeader = styled(Heading.h2)`
  color: #000;
  width: 265px;
  padding-right: ${(p) => (p.morePadding ? '100px' : '76px')};

  ${media.tablet`
    width: 100%;
    padding: 0;
    margin-bottom: 5px;
    color: ${(p) => p.theme.colors.grey};
  `};
`;

const FormSection = styled.div`
  display: flex;
  margin-bottom: ${(p) => (p.spacing === 'large' ? '7rem' : '2.5rem')};

  ${media.tablet`
    margin-bottom: ${(p) => (p.spacing === 'large' ? '2rem' : '1rem')};
    flex-direction: column;
  `};

  ${fadeUpAnimation}
`;

const ContactWithEmailText = styled.div`
  padding-top: 55px;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.33);

  button {
    text-decoration: underline;
    font-weight: 600;

    &:focus {
      color: ${(p) => p.theme.colors.purple};
    }
  }
`;

const MobileContactWithEmail = styled.a`
  display: none;
  text-align: center;
  color: rgba(0, 0, 0, 0.33);
  margin-top: 40px;
  font-size: 18px;
  ${fadeUpAnimation}

  ${media.tablet`
    display: block;
  `};

  span {
    font-weight: 600;
  }
`;

const ContactWithEmail = styled.div`
  position: relative;
  padding-top: 55px;
  margin-left: 265px;
  ${fadeUpAnimation}

  &::after {
    content: '';
    height: 1px;
    width: 295px;
    position: absolute;
    left: 0;
    top: 55px;
    background: #c6c6c6;
  }

  &::before {
    content: '';
    height: 5px;
    width: 5px;
    border-radius: 50%;
    position: absolute;
    left: 0;
    top: 53px;
    background: #c6c6c6;
  }

  ${media.tablet`
    display: none;
  `};
`;
const StyledFormikForm = styled(FormikForm)`
  align-self: flex-end;
  position: relative;
  padding-bottom: 10rem;
  margin: 0 auto;
  background: #fff;
  z-index: 99999;

  ${media.desktop_large`
    margin-left: 0;
    width: 100%;
    padding: 0 4rem 5rem;
  `};

  ${media.desktop`
    margin: 0 auto;
    padding: 0 0 5rem;
  `};

  ${media.phablet`
    width: 100%;
  `};
`;

const fadeInAndScale = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

const SubmittedScreen = styled.div`
  width: 46rem;
  padding-bottom: 10rem;
  margin: 0 auto;
  align-self: flex-end;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  opacity: 0;
  animation: ${fadeIn} 1.2s ease forwards;

  ${media.desktop`
    padding-bottom: 0;
    margin: 0 auto;
    width: 100%;
    padding-bottom: 8rem;
  `};

  svg {
    margin-bottom: 3rem;
    opacity: 0;
    animation: ${fadeInAndScale} 1.15s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
  }
`;

const fadeInAndUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`;

const SubmittedHeader = styled(Heading.h2)`
  margin-bottom: 3rem;
  color: #000;
  opacity: 0;
  animation: ${fadeInAndUp} 1.15s cubic-bezier(0.165, 0.84, 0.44, 1) 100ms forwards;
`;

const SubmittedText = styled.p`
  color: ${(p) => p.theme.colors.grey};
  font-size: 2.2rem;
  max-width: 275px;
  margin-bottom: 3rem;
  opacity: 0;
  animation: ${fadeInAndUp} 1.15s cubic-bezier(0.165, 0.84, 0.44, 1) 200ms forwards;
`;

const SubmittedBackButton = styled.button`
  font-size: 18px;
  font-weight: 600;
  opacity: 0;
  animation: ${fadeInAndUp} 1.15s cubic-bezier(0.165, 0.84, 0.44, 1) 300ms forwards;
`;

const SocialLinksContainer = styled.div`
  width: 100%;
  max-width: 240px;
  display: flex;
  margin: 100px auto 50px;
  justify-content: space-between;
  opacity: 0;
  animation: ${fadeInAndUp} 1.15s cubic-bezier(0.165, 0.84, 0.44, 1) 400ms forwards;
`;

const CopyRightContainer = styled.div`
  font-size: 16px;
  color: ${(p) => p.theme.colors.grey};
  opacity: 0;
  animation: ${fadeInAndUp} 1.15s cubic-bezier(0.165, 0.84, 0.44, 1) 500ms forwards;
`;

const ButtonContainer = styled.div`
  margin-left: 265px;
  padding-top: 35px;
  ${fadeUpAnimation}

  ${media.tablet`
    display: none;
  `};
`;

const MobileButtonContainer = styled.div`
  display: none;

  ${fadeUpAnimation}

  ${media.tablet`
    display: block;
  `};
`;
