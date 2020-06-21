import React from 'react';
import Router, { useRouter } from 'next/router';
import { openModal } from '@redq/reuse-modal';
import SearchBox from 'components/SearchBox/SearchBox';
import { SearchContext } from 'contexts/search/search.context';
import { AuthContext } from 'contexts/auth/auth.context';
import AuthenticationForm from '../../SignInOutForm/Form';
import { RightMenu } from './Menu/RightMenu/RightMenu';
import { LeftMenu } from './Menu/LeftMenu/LeftMenu';
import HeaderWrapper from './Header.style';
import LogoImage from 'image/logo-black.svg';
import UserImage from 'image/user.jpg';
import { isCategoryPage } from '../is-home-page';
import { useLogoutMutation } from 'generated';
type Props = {
  className?: string;
  token?: string;
  pathname?: string;
};

const Header: React.FC<Props> = ({ className }) => {
  const {
    authState: { isAuthenticated },
    authDispatch,
  } = React.useContext<any>(AuthContext);
  const { state, dispatch } = React.useContext(SearchContext);
  const { pathname, query } = useRouter();
  const [logout] = useLogoutMutation();
  const handleLogout = async () => {
    if (typeof window !== 'undefined') {
      await logout();
      localStorage.removeItem('access_token');
      authDispatch({ type: 'SIGN_OUT' });
      window.location.replace('/');
    }
  };

  const handleJoin = () => {
    authDispatch({
      type: 'SIGNIN',
    });

    openModal({
      show: true,
      overlayClassName: 'quick-view-overlay',
      closeOnClickOutside: true,
      component: AuthenticationForm,
      closeComponent: '',
      config: {
        enableResizing: false,
        disableDragging: true,
        className: 'quick-view-modal',
        width: 458,
        height: 'auto',
      },
    });
  };
  const onSearch = (text: any) => {
    dispatch({
      type: 'UPDATE',
      payload: {
        ...state,
        text,
      },
    });
  };

  const { text } = state;
  const onClickHandler = () => {
    const updatedQuery = query.category
      ? { text: text, category: query.category }
      : { text };
    Router.push({
      pathname: pathname,
      query: updatedQuery,
    });
  };
  const showSearch = isCategoryPage(pathname);
  return (
    <HeaderWrapper className={className}>
      <LeftMenu logo={LogoImage} />
      {showSearch && (
        <SearchBox
          className="headerSearch"
          handleSearch={(value: any) => onSearch(value)}
          onClick={onClickHandler}
          placeholder="Search anything..."
          hideType={true}
          minimal={true}
          showSvg={true}
          style={{ width: '100%' }}
          value={text || ''}
        />
      )}
      <RightMenu
        isAuthenticated={isAuthenticated}
        onJoin={handleJoin}
        onLogout={handleLogout}
        avatar={UserImage}
      />
    </HeaderWrapper>
  );
};

export default Header;
