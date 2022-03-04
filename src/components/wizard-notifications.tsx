import { useState } from 'react';
import type { FC, ChangeEvent } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  Switch,
  Typography
} from '@material-ui/core';

interface WizardNotificationsProps {
  initialNotifications: {
    newCompanySignups: boolean;
    newOrders: boolean;
    publishErrors: boolean;
  };
  onNextStep: (newValues: Record<string, any>) => void;
  onPreviousStep: () => void;
}

const notificationOptions = [
  {
    name: 'newOrders',
    label: 'New Orders'
  },
  {
    name: 'newCompanySignups',
    label: ' New Company Signups'
  },
  {
    name: 'publishErrors',
    label: 'Publish Errors'
  }
];

export const WizardNotifications: FC<WizardNotificationsProps> = (props) => {
  const { initialNotifications, onNextStep, onPreviousStep } = props;
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleNotificationsChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setNotifications((prevNotifications) => ({
      ...prevNotifications,
      [event.target.name]: event.target.checked
    }));
  };

  return (
    <div>
      <form onSubmit={() => onNextStep({ notifications })}>
        <Typography
          color="textPrimary"
          sx={{
            mb: 5,
            mt: 2
          }}
          variant="h6"
        >
          Step 3. Notifications
        </Typography>
        <Card variant="outlined">
          <CardHeader
            subheader="Manage your alert notifications"
            title="Email Notifications"
          />
          <Divider />
          <List disablePadding>
            {notificationOptions.map((option, index) => (
              <ListItem
                divider={index + 1 < notificationOptions.length}
                key={option.name}
              >
                <Typography color="textPrimary" variant="body2">
                  {option.label}
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Switch
                  checked={notifications[option.name]}
                  name={option.name}
                  onChange={handleNotificationsChange}
                />
              </ListItem>
            ))}
          </List>
        </Card>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mt: 3
          }}
        >
          <Button
            color="primary"
            onClick={onPreviousStep}
            size="large"
            sx={{ mr: 2 }}
            type="button"
            variant="text"
          >
            Back
          </Button>
          <Button
            color="primary"
            size="large"
            type="submit"
            variant="contained"
          >
            Next Step
          </Button>
        </Box>
      </form>
    </div>
  );
};

WizardNotifications.propTypes = {
  // @ts-ignore
  initialNotifications: PropTypes.shape({
    newCompanySignups: PropTypes.bool.isRequired,
    newOrders: PropTypes.bool.isRequired,
    publishErrors: PropTypes.bool.isRequired
  }).isRequired,
  onNextStep: PropTypes.func.isRequired,
  onPreviousStep: PropTypes.func.isRequired
};
