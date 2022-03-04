import { useState } from 'react';
import type { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Theme } from '@material-ui/core';
import { MainNavbar } from '../components/main-navbar';
import { MainSidebar } from '../components/main-sidebar';
import { Footer } from '../components/footer';

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayoutRoot = styled('div')(() => ({
  paddingTop: 64
}));

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  return (
    <MainLayoutRoot>
      <MainNavbar onOpenSidebar={() => setOpenSidebar(true)} />
      <MainSidebar
        onClose={() => setOpenSidebar(false)}
        open={lgDown && openSidebar}
      />
      {children}
      <Footer />
    </MainLayoutRoot>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node
};
