import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardHeader,
  Divider,
  Link,
  useMediaQuery
} from '@material-ui/core';
import { Trans, useTranslation } from 'react-i18next';
import type { Theme } from '@material-ui/core';
import type { Product } from '../../types/product';
import { PropertyList } from '../property-list';
import { PropertyListItem } from '../property-list-item';

interface ProductInfoProps {
  onEdit: () => void;
  product: Product;
}

export const ProductInfo: FC<ProductInfoProps> = (props) => {
  const { t } = useTranslation();

  const { onEdit, product, ...other } = props;
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const username = 'Chen Simmons';

  const align = mdDown ? 'vertical' : 'horizontal';

  return (
    <Card variant="outlined" {...other}>
      <CardHeader
        action={
          <Button color="primary" onClick={onEdit} variant="text">
            {t('app.action.edit')}
          </Button>
        }
        title={t('translations.information.title')}
      />
      <Divider />
      <PropertyList>
        {/* Showcase for dynamic value */}
        <PropertyListItem
          align={align}
          label={t('translations.information.greeting')}
          value={t('translations.information.goodday', { username })}
        />
        <PropertyListItem
          align={align}
          label={t('translations.information.short_description')}
        >
          {/* Showcase for dynamic tag */}
          <Trans i18nKey="translations.information.product_best_msg">
            This is the <strong>Best</strong> product in the world!
          </Trans>
        </PropertyListItem>
        <PropertyListItem
          align={align}
          label={t('translations.information.product_variant_title')}
        >
          {/* Showcase for dynamic tag & pluaral */}
          <Trans
            i18nKey="translations.information.product_variant_description"
            count={product.variants.length}
          >
            {/* Showcase for tooltip & passing object */}
            The
            <strong title={t('translations.information.product_tooltip')}>
              {{ product }}
            </strong>
            has {{ product }} variant.
            {/* Showcase for dynamic react component */}
            <Link
              color="primary"
              variant="h6"
              component={RouterLink}
              to="#"
              underline="none"
            >
              Go to messages
            </Link>
            .
          </Trans>
        </PropertyListItem>
        <PropertyListItem
          align={align}
          label={t('translations.information.brand_name')}
          value={product.brand}
        />
        <PropertyListItem align={align} label="ID" value={product.id} />
        <PropertyListItem
          align={align}
          label={t('translations.information.display_name')}
          value={product.name}
        />
        <PropertyListItem
          align={align}
          label={t('translations.information.description')}
          value={t('translations.information.product_description')}
        />
        {/* Showcase for date time format */}
        <PropertyListItem
          align={align}
          label={t('translations.information.created')}
          value={t('app.date', {
            date: product.createdAt
          })}
        />
        {/* Showcase for string array translation */}
        <PropertyListItem
          align={align}
          label={t('translations.information.composition')}
          value={product.composition
            .map((value) => t(`product.composition.${value}`))
            .join(', ')}
        />
      </PropertyList>
    </Card>
  );
};

ProductInfo.propTypes = {
  onEdit: PropTypes.func,
  // @ts-ignore
  product: PropTypes.object.isRequired
};
