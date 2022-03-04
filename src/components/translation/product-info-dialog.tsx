import type { FC } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  Typography
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import type { Product } from '../../types/product';
import { AutocompleteField } from '../autocomplete-field';
import { InputField } from '../input-field';

interface ProductInfoDialogProps {
  onClose: () => void;
  open: boolean;
  product: Product;
}

const compositionOptions = ['Leather', 'Metal'];

export const ProductInfoDialog: FC<ProductInfoDialogProps> = (props) => {
  const { t } = useTranslation();

  const { open, onClose, product } = props;
  const formik = useFormik({
    initialValues: {
      brand: product?.brand || '',
      chargeTax: product?.chargeTax || true,
      description: product?.description || '',
      displayName: product?.displayName || '',
      composition: product?.composition || [],
      sku: product?.sku || '',
      submit: null
    },
    validationSchema: Yup.object().shape({
      brand: Yup.string().max(255).required('Brand is required'),
      chargeTax: Yup.boolean(),
      description: Yup.string().max(500).required('Description is required'),
      displayName: Yup.string().max(255).required('Display name is required'),
      composition: Yup.array(),
      sku: Yup.string().max(255).required('SKU is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        toast.success('Product updated');
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        onClose?.();
      } catch (err) {
        console.error(err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  return (
    <Dialog
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          width: '100%'
        }
      }}
      TransitionProps={{
        onExited: () => formik.resetForm()
      }}
    >
      <DialogTitle>{t('translations.information.edit_product')}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <InputField
              disabled
              error={Boolean(formik.touched.brand && formik.errors.brand)}
              fullWidth
              helperText={formik.touched.brand && formik.errors.brand}
              label={t('translations.information.brand_name')}
              name="brand"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.brand}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <InputField
              disabled
              error={Boolean(formik.touched.sku && formik.errors.sku)}
              fullWidth
              helperText={formik.touched.sku && formik.errors.sku}
              label="SKU"
              name="sku"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.sku}
            />
          </Grid>
          <Grid item xs={12}>
            <InputField
              error={Boolean(
                formik.touched.displayName && formik.errors.displayName
              )}
              fullWidth
              helperText={
                formik.touched.displayName && formik.errors.displayName
              }
              label={t('translations.information.display_name')}
              name="displayName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.displayName}
            />
          </Grid>
          <Grid item xs={12}>
            <InputField
              error={Boolean(
                formik.touched.description && formik.errors.description
              )}
              fullWidth
              helperText={
                formik.touched.description && formik.errors.description
              }
              label={t('translations.information.description')}
              multiline
              name="description"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              rows={4}
              value={formik.values.description}
            />
          </Grid>
          <Grid item xs={12}>
            <AutocompleteField
              error={Boolean(
                formik.touched.composition && formik.errors.composition
              )}
              filterSelectedOptions
              helperText={
                formik.touched.composition && formik.errors.composition
              }
              label={t('translations.information.composition')}
              multiple
              onChange={(event, value) => {
                formik.setFieldValue('composition', value);
              }}
              options={compositionOptions}
              placeholder="Feature"
              value={formik.values.composition}
            />
          </Grid>
          <Grid
            item
            md={9}
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
            xs={12}
          >
            <Checkbox
              checked={formik.values.chargeTax}
              onChange={(event) => {
                formik.setFieldValue('chargeTax', event.target.checked);
              }}
            />
            <Typography color="textPrimary" variant="body1">
              {t('translations.information.charge_text')}
            </Typography>
          </Grid>
          {formik.errors.submit && (
            <Grid item xs={12}>
              <FormHelperText error>{formik.errors.submit}</FormHelperText>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose} variant="text">
          {t('app.action.cancel')}
        </Button>
        <Button
          color="primary"
          onClick={() => {
            formik.handleSubmit();
          }}
          variant="contained"
        >
          {t('app.action.save_changes')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ProductInfoDialog.defaultProps = {
  open: false
};

ProductInfoDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  // @ts-ignore
  product: PropTypes.object
};
