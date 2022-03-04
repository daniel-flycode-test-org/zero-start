import type { FC } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Button, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import type { SxProps } from '@material-ui/system';
import { Plus as PlusIcon } from '../icons/plus';
import { QuestionMarkOutlined as QuestionMarkIcon } from '../icons/question-mark-outlined';

interface ResourceUnavailableProps {
  onCreate?: () => void;
  sx?: SxProps;
}

const ResourceUnavailableRoot = styled('div')(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: theme.palette.neutral[100],
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(3)
}));

export const ResourceUnavailable: FC<ResourceUnavailableProps> = (props) => {
  const { t } = useTranslation();
  const { onCreate, ...other } = props;

  return (
    <ResourceUnavailableRoot {...other}>
      <QuestionMarkIcon sx={{ color: 'text.secondary' }} />
      <Typography color="textSecondary" sx={{ mt: 2 }} variant="body2">
        {t('app.no_resource')}
      </Typography>
      {onCreate && (
        <Button
          color="primary"
          onClick={onCreate}
          startIcon={<PlusIcon fontSize="small" />}
          sx={{ mt: 2 }}
          variant="contained"
        >
          {t('app.create_object')}
        </Button>
      )}
    </ResourceUnavailableRoot>
  );
};

ResourceUnavailable.propTypes = {
  onCreate: PropTypes.func
};
