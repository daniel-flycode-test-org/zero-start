import { useIntl } from 'react-intl';

export const useReactIntl = () => {
  const { formatMessage } = useIntl();
  const t = (msg: string) => formatMessage({ id: msg });
  return { t };
};
