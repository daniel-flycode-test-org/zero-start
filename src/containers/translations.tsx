import { useState, useEffect, useCallback } from 'react';
import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Container, Divider, Grid, Typography } from '@material-ui/core';
import { productApi } from '../api/product';
import { ProductInfo } from '../components/translation/product-info';
import { ProductInfoDialog } from '../components/translation/product-info-dialog';
import { ProductVariants } from '../components/translation/product-variants';
import { ResourceError } from '../components/resource-error';
import { ResourceLoading } from '../components/resource-loading';
import type { Product } from '../types/product';
import { useMounted } from '../hooks/use-mounted';
import gtm from '../lib/gtm';

interface ProductState {
  data?: Product;
  error?: string;
  isLoading: boolean;
}

export const Translations: FC = () => {
  const mounted = useMounted();
  const [productState, setProductState] = useState<ProductState>({
    isLoading: true
  });
  const [openInfoDialog, setOpenInfoDialog] = useState(false);

  const getProduct = useCallback(async () => {
    setProductState(() => ({ isLoading: true }));

    try {
      const result = await productApi.getProduct();

      if (mounted.current) {
        setProductState(() => ({
          isLoading: false,
          data: result
        }));
      }
    } catch (err) {
      console.error(err);

      if (mounted.current) {
        setProductState(() => ({
          isLoading: false,
          error: err.message
        }));
      }
    }
  }, []);

  useEffect(() => {
    getProduct().catch(console.error);
  }, []);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const renderContent = () => {
    if (productState.isLoading) {
      return <ResourceLoading />;
    }

    if (productState.error) {
      return <ResourceError />;
    }

    return (
      <>
        <Box sx={{ p: 4 }}>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <Typography color="textPrimary" variant="h4">
              {productState.data.name}
            </Typography>
          </Box>
          <Grid
            container
            spacing={3}
            sx={{
              marginTop: 3
            }}
          >
            <Grid
              container
              item
              lg={12}
              spacing={3}
              sx={{
                height: 'fit-content',
                order: {
                  md: 2,
                  xs: 1
                }
              }}
              xs={12}
            >
              <Grid item xs={12}>
                <ProductInfo
                  onEdit={() => setOpenInfoDialog(true)}
                  product={productState.data}
                />
              </Grid>
              <Grid item xs={12}>
                <ProductVariants variants={productState.data?.variants} />
              </Grid>
            </Grid>
          </Grid>
          <ProductInfoDialog
            onClose={() => setOpenInfoDialog(false)}
            open={openInfoDialog}
            product={productState.data}
          />
          <Divider />
        </Box>
      </>
    );
  };

  return (
    <>
      <Helmet>
        <title>Product: Summary | Carpatin Dashboard</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          flexGrow: 1
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}
        >
          {renderContent()}
        </Container>
      </Box>
    </>
  );
};
