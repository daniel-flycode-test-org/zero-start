import type { FC } from 'react';
import toast from 'react-hot-toast';
import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core';

export const Account2FA: FC = () => {
  const handleActivate = (): void => {
    toast.success('Two-factor authentication activated');
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container spacing={4}>
          <Grid item md={5} xs={12}>
            <Typography color="textPrimary" variant="h6">
              Two-factor authentication (2FA) Test
            </Typography>
            <Typography color="textSecondary" variant="body2">
              Enhanced security for your mention account Test
            </Typography>
          </Grid>
          <Grid item md={7} xs={12}>
            <Button
              color="primary"
              onClick={handleActivate}
              size="large"
              variant="outlined"
            >
              Activate
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
