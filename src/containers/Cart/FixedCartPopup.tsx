import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { openModal, closeModal } from '@redq/reuse-modal';
import FixedCart from './FixedCart';
import CartPopupButton from 'components/CartPopup/CartPopupButton';
import { CURRENCY } from 'helper/constant';
import { FormattedMessage } from 'react-intl';
import { useCart } from 'contexts/cart/use-cart';

const CartPopupStyle = createGlobalStyle`
  .cartPopup{
    top: auto !important;
    left: auto !important;
    bottom: 50px !important;
    right: 50px !important;
    box-shadow: 0 21px 36px rgba(0, 0, 0, 0.16);
    transform-origin: bottom right;

    @media (max-width: 767px) {
      max-width: none!important;
      width: 100% !important;
      bottom: 0 !important;
      left: 0!important;
      background: #fff;
      overflow: initial !important;
      transform-origin: bottom center;
    }
  }

.fixedCartPopup{
  @media (min-width: 991px) {
    display: none;
  }
}
`;

type CartProps = {
  onCheckout?: (e: any) => void;
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};

const FixedCartPopup: React.FC<CartProps> = ({
  onCheckout,
  deviceType: { mobile, tablet, desktop },
}) => {
  const { isOpen, cartItemsCount, toggleCart, calculatePrice } = useCart();
  const handleModal = () => {
    openModal({
      show: true,
      config: {
        className: 'cartPopup',
        width: 'auto',
        height: 'auto',
        enableResizing: false,
        disableDragging: true,
        transition: {
          tension: 360,
          friction: 40,
        },
      },
      closeOnClickOutside: true,
      component: FixedCart,
      closeComponent: () => <div />,
      componentProps: {
        onCloseBtnClick: closeModal,
        scrollbarHeight: 370,
        onCheckout: onCheckout,
      },
    });
  };

  return (
    <>
      <CartPopupStyle />
      <CartPopupButton
        className='fixedCartPopup'
        itemCount={cartItemsCount}
        itemPostfix={
          cartItemsCount > 1 ? (
            <FormattedMessage id='cartItems' defaultMessage='items' />
          ) : (
            <FormattedMessage id='cartItem' defaultMessage='item' />
          )
        }
        price={calculatePrice()}
        pricePrefix={CURRENCY}
        onClick={handleModal}
      />
    </>
  );
};

export default FixedCartPopup;
