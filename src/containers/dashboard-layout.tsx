import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { useMediaQuery } from '@material-ui/core';
import type { Theme } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { Footer } from '../components/footer';
import { DashboardNavbar } from '../components/dashboard-navbar';
import { DashboardSidebar } from '../components/dashboard-sidebar';
import { useSettings } from '../contexts/settings-context';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  height: '100%',
  paddingTop: 64
}));

const DashboardLayoutContent = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%'
}));

export const DashboardLayout: FC = () => {
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const { settings, saveSettings } = useSettings();

  const handlePinSidebar = (): void => {
    saveSettings({
      ...settings,
      pinSidebar: !settings.pinSidebar
    });
  };

  return (
    <DashboardLayoutRoot>
      <DashboardNavbar />
      {!mdDown && (
        <DashboardSidebar
          onPin={handlePinSidebar}
          pinned={settings.pinSidebar}
        />
      )}
      <DashboardLayoutContent
        sx={{
          ml: {
            md: settings.pinSidebar ? '270px' : '73px'
          }
        }}
      >
        <Outlet />
        <Footer />
      </DashboardLayoutContent>
    </DashboardLayoutRoot>
  );
};
