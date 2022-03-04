import { useState, useEffect, useCallback } from 'react';
import type { FC, ChangeEvent, MouseEvent } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import numeral from 'numeral';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  InputBase,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@material-ui/core';
import { productApi } from '../api/product';
import { ResourceError } from '../components/resource-error';
import { ResourceUnavailable } from '../components/resource-unavailable';
import { Scrollbar } from '../components/scrollbar';
import type { Product, ProductVariant } from '../types/product';
import { useMounted } from '../hooks/use-mounted';
import { CustomCube as CubeIcon } from '../icons/custom-cube';
import gtm from '../lib/gtm';

interface VariantTableRowProps {
  onSaveQuantity: (id: string, quantity: number, mode: string) => void;
  variant: ProductVariant;
}

const VariantTableRow: FC<VariantTableRowProps> = (props) => {
  const { onSaveQuantity, variant, ...other } = props;
  const [mode, setMode] = useState('add');
  const [quantity, setQuantity] = useState('');
  const parsedQuantity = Number.parseInt(quantity, 10);

  const handleModeChange = (
    event: MouseEvent<HTMLElement>,
    newMode: string
  ): void => {
    if (newMode) {
      setMode(newMode);
    }
  };

  const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setQuantity(event.target.value);
  };

  const handleSaveQuantity = (): void => {
    onSaveQuantity?.(variant.id, parsedQuantity, mode);
    setQuantity('');
  };

  return (
    <TableRow {...other}>
      <TableCell>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <Avatar src={variant.image} sx={{ mr: 2 }} variant="rounded">
            <CubeIcon />
          </Avatar>
          <Typography color="inherit" variant="body2">
            {variant.name}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>{variant.quantity}</TableCell>
      <TableCell>{numeral(variant.price).format('$0,0.00')}</TableCell>
      <TableCell>{variant.sku}</TableCell>
      <TableCell sx={{ width: 333 }}>
        <Box sx={{ display: 'flex' }}>
          <ToggleButtonGroup exclusive onChange={handleModeChange} value={mode}>
            <ToggleButton value="add">Add</ToggleButton>
            <ToggleButton value="set">Set</ToggleButton>
          </ToggleButtonGroup>
          <InputBase
            inputProps={{
              sx: {
                px: 1.5,
                py: 1.75
              }
            }}
            onChange={handleQuantityChange}
            sx={{
              borderColor: 'neutral.300',
              borderRadius: 1,
              borderStyle: 'solid',
              borderWidth: 1,
              maxHeight: 48,
              mx: 1
            }}
            type="number"
            value={quantity}
          />
          <Button
            color="primary"
            disabled={
              Number.isNaN(parsedQuantity) ||
              parsedQuantity < 0 ||
              (parsedQuantity === 0 && mode === 'add')
            }
            onClick={handleSaveQuantity}
            variant="contained"
          >
            Save
          </Button>
        </Box>
      </TableCell>
    </TableRow>
  );
};

VariantTableRow.propTypes = {
  // @ts-ignore
  variant: PropTypes.object.isRequired,
  onSaveQuantity: PropTypes.func
};

interface ProductState {
  data?: Product;
  error?: string;
  isLoading: boolean;
}

export const ProductInventory: FC = () => {
  const mounted = useMounted();
  const [productState, setProductState] = useState<ProductState>({
    isLoading: true
  });
  const [variants, setVariants] = useState<ProductVariant[] | []>([]);

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
  }, [getProduct]);

  // Variants are sent in project's data
  useEffect(() => {
    setVariants(productState.data?.variants || []);
  }, [productState.data]);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const onSaveQuantity = (id: string, quantity: number, mode: string) => {
    const temp = [...variants];
    const index = temp.findIndex((variant) => variant.id === id);
    temp[index].quantity =
      mode === 'add' ? temp[index].quantity + quantity : quantity;
    setVariants(temp);
  };

  const displayLoading = productState.isLoading;
  const displayError = Boolean(!productState.isLoading && productState.error);
  const displayUnavailable = Boolean(
    !productState.isLoading && !productState.error && !variants.length
  );

  return (
    <>
      <Helmet>
        <title>Product: Inventory | Carpatin Dashboard</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          flexGrow: 1
        }}
      >
        <Card
          sx={{
            minHeight: 600,
            display: 'flex',
            flexDirection: 'column'
          }}
          variant="outlined"
        >
          <CardHeader title="Inventory Management" />
          <Divider />
          <Scrollbar>
            <Table sx={{ minWidth: 900 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Variant</TableCell>
                  <TableCell>Inventory</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>SKU</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {variants.map((variant) => (
                  <VariantTableRow
                    key={variant.id}
                    onSaveQuantity={onSaveQuantity}
                    variant={variant}
                  />
                ))}
              </TableBody>
            </Table>
          </Scrollbar>
          {displayLoading && (
            <Box sx={{ p: 2 }}>
              <Skeleton height={42} />
              <Skeleton height={42} />
              <Skeleton height={42} />
            </Box>
          )}
          {displayError && (
            <ResourceError
              error={productState.error}
              sx={{
                flexGrow: 1,
                m: 2
              }}
            />
          )}
          {displayUnavailable && (
            <ResourceUnavailable
              sx={{
                flexGrow: 1,
                m: 2
              }}
            />
          )}
        </Card>
      </Box>
    </>
  );
};
