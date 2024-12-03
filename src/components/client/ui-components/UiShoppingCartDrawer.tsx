import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import {
  Container,
  Box,
  Grid,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Tooltip,
  Stack,
  Typography,
  Link,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import HelpIcon from "@mui/icons-material/Help";
import QuantityInput from "@/components/client/ui-components/UiQuantityInput";
import { ICartItem } from "@/lib/models/interfaces/ICartItem";
import LoadingButton from "@mui/lab/LoadingButton";
import { useCart } from "@/context/CartContext";

interface ShoppingCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShoppingCartDrawer: React.FC<ShoppingCartDrawerProps> = ({
  isOpen,
  onClose
}) => {

  const router = useRouter();
  const { cartItems, removeCartItem, clearCart, updateCartItemQuantity } = useCart();

  const handleDeleteClick = (index: number) => {
    // deleteCartItem(index);
    // setCartItems(getCartItems());
    removeCartItem(index);
  };

  const handleDeleteAllClick = () => {
    // deleteAllCartItems();
    // setCartItems([]);
    clearCart();
  };

  const handleQuantityChange = (index: number, value: number) => {
    // editCartItemQuantity(index, value);
    // setCartItems(getCartItems());
    updateCartItemQuantity(index, value);

  };

  const handleEditClick = (index: number) => {
    console.log("Edit clicked");
    const editCartItem = { ...cartItems[index] };
    const cartItemId = editCartItem.cartItemId;
    const editProductName = editCartItem.product.productName.toLowerCase().split(" ").join("-");
    const href=`/client/cart/edit/${cartItemId}/${editProductName}?id=${editCartItem.product.productId}`;
    //set the cart drawer to close
    onClose();
    // Redirect to edit page
    router.push(href);
  };

  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  const handleCheckoutClick = () => {
    setIsCheckoutLoading(true);
    // Simulate checkout process
    setTimeout(() => {
      setIsCheckoutLoading(false);
    }, 2000);
    if (cartItems.length === 0) {
      setIsCheckoutLoading(false);
      alert("Your cart is empty!");
      return;
    }
    // Redirect to checkout page
    router.push("/client/checkout/sessionNumber");
  };

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      PaperProps={{ sx: { width: 460 } }}
    >
      <List>
        <Box sx={{ position: "relative", padding: 2 }}>
          <Box sx={{ marginLeft: 2, marginTop: 2 }}>
            <Typography variant="h5" fontWeight="fontWeightBold">Shopping Cart</Typography>
            <Typography variant="subtitle1" sx={{ marginLeft: 0.5, marginTop: 1 }}>
              {cartItems.reduce((total, item) => total + item.quantity, 0)} items
            </Typography>
          </Box>
          <Tooltip title="Delete All">
            <IconButton
              size="large"
              onClick={handleDeleteAllClick}
              sx={{ position: "absolute", top: 30, right: 40 }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {cartItems.map((item, index) => (
          <ListItem key={index}>
            <Container
              sx={{
                border: "1px solid black",
                padding: "1rem",
                borderRadius: 4,
              }}
            >
              <Stack direction="column" spacing={1}>
                <Grid container spacing={1}>
                  <Grid item xs={2} sm={4} md={2} lg={2} xl={2}>
                    <Box>
                      <img
                        src={item.product.productPics[0]}
                        alt={item.product.productName}
                        style={{ width: 100, height: 100 }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={10} sm={8} md={10} lg={10} xl={10}>
                    <Box>
                      <ListItemText primary={`${item.product.productName}`} />
                      <ListItemText primary={`$${item.unitPrice}`} />
                      <ListItemText
                        primary={`Bulk Discount: ${item.bulkDiscountPercentageOff}% off`}
                      />
                      <ListItemText
                        primary={`Promotion: ${item.promoPercentageOff}% off`}
                      />
                      <ListItemText primary={`Quantity: ${item.quantity}`} />
                      <ListItemText primary={`$${item.subtotal}`} />
                      {Object.keys(item.customChoices).map((key, index) => {
                        const choice = item.customChoices[key];
                        if (
                          choice.selectionName === "Custom Size" ||
                          choice.selectionName === "Custom Color" ||
                          choice.selectionName === "Custom Text"
                        ) {
                          return (
                            <ListItemText
                              key={index}
                              primary={`${key}: ${choice.customChoice}`}
                            />
                          );
                        } else {
                          return (
                            <ListItemText
                              key={index}
                              primary={`${key}: ${choice.selectionName}`}
                            />
                          );
                        }
                      })}

                      {item.customPics.length > 0 && (
                        <>
                          <ListItemText
                            primary={`Custom Pic: ${item.customPics.length} file(s)`}
                          />
                          {item.customPics.map((fileInfo, index) => (
                            <ListItemText key={index}>
                              <Link
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  window.open(fileInfo.url, "_blank")
                                }
                              >
                                {fileInfo.name}
                              </Link>
                            </ListItemText>
                          ))}
                        </>
                      )}

                      {item.specificInstruction && (
                        <ListItemText
                          primary={
                            <Typography
                              component="span"
                              sx={{ fontStyle: "italic" }}
                            >
                              Specific Instruction: {item.specificInstruction}
                            </Typography>
                          }
                        />
                      )}
                    </Box>
                  </Grid>
                </Grid>

                <Stack direction="row" spacing={2}>
                  <QuantityInput
                    initialValue={item.quantity}
                    onChange={(value) => {
                      handleQuantityChange(index, value);
                    }}
                  />

                  <Tooltip title="Edit">
                    <IconButton onClick={() => handleEditClick(index)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete">
                    <IconButton onClick={() => handleDeleteClick(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Stack>
            </Container>
          </ListItem>
        ))}
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            width: "100%",
            marginY: 2,
            paddingX: 5,
          }}
        >
          <Typography variant="h6">
            Total: $
            {(() => {
              let total = 0;
              cartItems.forEach((item) => {
                total += item.subtotal;
              });
              return total.toFixed(2);
            })()}
          </Typography>
          <Tooltip title="before tax and shipping fee">
            <HelpIcon />
          </Tooltip>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginY: 2,
          }}
        >
          <LoadingButton
            onClick={handleCheckoutClick}
            loading={isCheckoutLoading}
            variant="outlined"
            fullWidth
            sx={{ marginX: 2.5, borderRadius: 5 }}
          >
            <Typography>Checkout</Typography>
          </LoadingButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginY: 2,
          }}
        >
          <Button
            variant="outlined"
            fullWidth
            onClick={()=>router.push('/client/cart')}
            sx={{ marginX: 2.5, borderRadius: 5 }}
          >
            <Typography>View Cart</Typography>
          </Button>
        </Box>
      </List>
    </Drawer>
  );
};

export default ShoppingCartDrawer;
