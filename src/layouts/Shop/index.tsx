import React from 'react';
// import App from 'next/app';
import { ThemeProvider } from 'styled-components';
import { theme } from 'theme';
import { AuthProvider } from 'contexts/auth/auth.provider';
import { StickyProvider } from 'contexts/app/app.provider';
import { SearchProvider } from 'contexts/search/search.provider';
import { HeaderProvider } from 'contexts/header/header.provider';
import { LanguageProvider } from 'contexts/language/language.provider';

import AppLayout from 'containers/LayoutContainer/AppLayout';
import { useDeviceType } from 'helper/useDeviceType';
import { CartProvider } from 'contexts/cart/use-cart';
// Language translation files
import localEn from 'data/translation/en.json';
import localAr from 'data/translation/ar.json';
import localEs from 'data/translation/es.json';
import localDe from 'data/translation/de.json';
import localCn from 'data/translation/zh.json';
import localIl from 'data/translation/he.json';

import { GlobalStyle } from 'styled/global.style';

// Language translation Config
const messages = {
  en: localEn,
  ar: localAr,
  es: localEs,
  de: localDe,
  zh: localCn,
  he: localIl,
};
// need to provide types
const ShopApp = ({ children, userAgent, locale, query }) => {
  const deviceType = useDeviceType(userAgent);
  return (
    <ThemeProvider theme={theme}>
      <LanguageProvider messages={messages} initLocale={locale}>
        <CartProvider>
          <SearchProvider query={query}>
            <HeaderProvider>
              <StickyProvider>
                <AuthProvider>
                  <>
                    <AppLayout deviceType={deviceType}>{children}</AppLayout>
                    <GlobalStyle />
                  </>
                </AuthProvider>
              </StickyProvider>
            </HeaderProvider>
          </SearchProvider>
        </CartProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default ShopApp;
