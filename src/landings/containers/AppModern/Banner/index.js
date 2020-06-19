import React from 'react';
import Fade from 'react-reveal/Fade';
import { Icon } from 'react-icons-kit';
import { playCircle } from 'react-icons-kit/fa/playCircle';
import { openModal, closeModal } from '@redq/reuse-modal';
import Text from 'landings/common/src/components/Text';
import Image from 'landings/common/src/components/Image';
import Button from 'landings/common/src/components/Button';
import Heading from 'landings/common/src/components/Heading';
import Rating from 'landings/common/src/components/Rating';
import Container from 'landings/common/src/components/UI/Container';
import BannerWrapper, {
  BannerContent,
  RatingInfo,
  BannerImage,
  ButtonGroup,
  VideoGroup,
  VideoWrapper,
  CustomerWrapper,
  ImageWrapper,
} from './banner.style';

import { client } from 'landings/common/src/data/AppModern';

import microsoft from 'landings/common/src/assets/image/appModern/envato-icon.png';
import bannerImg from 'landings/common/src/assets/image/appModern/banner2.png';
import videoBanner1 from 'landings/common/src/assets/image/appModern/video-1.png';
import videoBanner2 from 'landings/common/src/assets/image/appModern/video-2.png';
import circleBorder from 'landings/common/src/assets/image/appModern/shape.svg';
// close button for modal
const CloseModalButton = () => (
  <Button
    className="modalCloseBtn"
    variant="fab"
    onClick={() => closeModal()}
    icon={<i className="flaticon-plus-symbol" />}
  />
);

const ModalContent = () => (
  <VideoWrapper>
    <iframe title="Video" src="https://www.youtube.com/embed/8ME-QAlW6Ww" frameBorder="0" />
  </VideoWrapper>
);

const Banner = () => {
  // modal handler
  const handleVideoModal = () => {
    openModal({
      config: {
        className: 'video-modal',
        disableDragging: true,
        default: {
          width: 'auto',
          height: 'auto',
          x: 0,
          y: 0,
        },
      },
      component: ModalContent,
      componentProps: {},
      closeComponent: CloseModalButton,
      closeOnClickOutside: true,
    });
  };
  return (
    <BannerWrapper id="home">
      <Container>
        <BannerContent>
          <Fade up>
            <RatingInfo>
              <Rating rating={4} />
              4.9 of 5 By <img src={microsoft} alt="Microsoft" />
            </RatingInfo>
          </Fade>
          <Fade up delay={100}>
            <Heading
              as="h1"
              content="The Revolution of
          Ultimate Platform to
          monitor your task"
            />
          </Fade>
          <Fade up delay={200}>
            <Text
              content="Lorem ipsum dolor sit amet consectetur adipisicing elit sed eiusmod tempor incididunt labore dolore magna
          ipsum dolor sit amet consectetur."
            />
          </Fade>
          <Fade up delay={300}>
            <ButtonGroup>
              <Button className="primary" title="Start Free trail" />
              <Button
                className="text"
                variant="textButton"
                icon={<Icon icon={playCircle} />}
                iconPosition="left"
                title="Watch Video"
              />
            </ButtonGroup>
          </Fade>
          <VideoGroup>
            <img src={videoBanner1} onClick={handleVideoModal} alt="Microsoft" />
            <img src={videoBanner2} onClick={handleVideoModal} alt="Microsoft" />
          </VideoGroup>
        </BannerContent>
        <BannerImage>
          <Fade up delay={100}>
            <Image src={bannerImg} alt="Banner" />
          </Fade>
        </BannerImage>
      </Container>
      <CustomerWrapper>
        <Text content="Trusted by companies like:" />
        <ImageWrapper>
          {client.map((item) => (
            <Image key={`client-key${item.id}`} src={item.image} alt={item.title} />
          ))}
        </ImageWrapper>
      </CustomerWrapper>
      <img className="bannerBottomShape" src={circleBorder} alt="Bottom Circle" />
    </BannerWrapper>
  );
};

export default Banner;
