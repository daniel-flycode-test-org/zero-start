import type { FC } from 'react';
import { useEffect } from 'react';
import NProgress from 'nprogress';
import { Box } from '@material-ui/core';

export const LoadingScreen: FC = () => {
  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        flexGrow: 1
      }}
    />
  );
};
