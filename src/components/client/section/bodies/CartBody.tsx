import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Box,
  Grid,
  Divider,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Tooltip,
  Stack,
  Typography,
  Link,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import HelpIcon from "@mui/icons-material/Help";
// import {
//   getCartItems,
//   deleteAllCartItems,
//   deleteCartItem,
//   editCartItemQuantity,
// } from "@/CartStorage";
import QuantityInput from "@/components/client/ui-components/UiQuantityInput";
import { ICartItem } from "@/lib/models/interfaces/ICartItem";
import LoadingButton from "@mui/lab/LoadingButton";
import { useCart } from "@/context/CartContext";

import { Add, Remove, Edit, Delete } from "@mui/icons-material";

const BodyComponents = () => {
  const router = useRouter();
  //const [cartItems, setCartItems] = useState<CartItem[]>(getCartItems());
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const { cartItems, removeCartItem, clearCart, updateCartItemQuantity } =
    useCart();

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
    const editProductName = editCartItem.product.productName
      .toLowerCase()
      .split(" ")
      .join("-");
    const href = `/client/cart/edit/${cartItemId}/${editProductName}?id=${editCartItem.product.productId}`;
    // Redirect to edit page
    router.push(href);
  };

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
    <>
      <Container>
        <Stack
          direction="row"
          spacing={5}
          sx={{ marginLeft: 2, marginTop: 2 }}
          alignItems="center"
        >
          <Typography variant="h5" fontWeight="fontWeightBold">
            Your Cart:{" "}
            {cartItems.reduce((total, item) => total + item.quantity, 0)} items
          </Typography>
          <Tooltip title="Delete All">
            <IconButton size="large" onClick={handleDeleteAllClick}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Stack>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            {cartItems.map((item, index) => (
              <Card
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  p: 2,
                  mb: 2,
                  mx: 2,
                }}
              >
                {/* Left Section: Image */}
                <CardMedia
                  component="img"
                  sx={{ width: 120, borderRadius: 2 }}
                  image={item.product.productPics[0]}
                  alt={item.product.productName}
                />
                {/* Middle Section: Product Details */}
                <CardContent sx={{ flex: 1, mx: 2 }}>
                  <Typography variant="h6">
                    {item.product.productName}
                  </Typography>
                  {/* <Typography variant="body2" color="text.secondary">
                      {JSON.stringify(item.customChoices)}</Typography> */}

                  {Object.keys(item.customChoices).map((key) => {
                    const choice = item.customChoices[key];
                    if (
                      choice.selectionName === "Custom Size" ||
                      choice.selectionName === "Custom Color" ||
                      choice.selectionName === "Custom Text"
                    ) {
                      return (
                        <Typography
                          key={key}
                          variant="body2"
                          color="text.secondary"
                        >
                          {key}: {choice.customChoice}
                        </Typography>
                      );
                    } else {
                      return (
                        <Typography
                          key={key}
                          variant="body2"
                          color="text.secondary"
                        >
                          {key}: {choice.selectionName}
                        </Typography>
                      );
                    }
                  })}

                  {item.customPics.length > 0 && (
                    <>
                      <Typography variant="body2" color="text.secondary">
                        Custom Pic: {item.customPics.length} file(s)
                      </Typography>
                      {item.customPics.map((fileInfo, index) => (
                        <Typography
                          key={index}
                          variant="body2"
                          color="text.secondary"
                        >
                          <Link
                            style={{ cursor: "pointer" }}
                            onClick={() => window.open(fileInfo.url, "_blank")}
                          >
                            {fileInfo.name}
                          </Link>
                        </Typography>
                      ))}
                    </>
                  )}

                  {item.specificInstruction && (
                    <Typography
                      color="text.secondary"
                      variant="body2"
                      component="span"
                      sx={{ fontStyle: "italic" }}
                    >
                      Specific Instruction: {item.specificInstruction}
                    </Typography>
                  )}

                  <Typography variant="body2" color="text.secondary">
                    Unit Price: ${item.unitPrice}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Estimated delivery: Wed, Dec 18th 2024
                  </Typography>
                </CardContent>

                {/* Right Section: Actions */}
                <Box
                  sx={{
                    my: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                  }}
                >
                  {/* Quantity Selector */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <QuantityInput
                      initialValue={item.quantity}
                      onChange={(value) => {
                        handleQuantityChange(index, value);
                      }}
                    />
                  </Box>

                  {/* Price and Discount Section */}
                  <Box sx={{ display: "flex", flexDirection: "column", pr: 4 }}>
  {/* Price Total */}
  <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "right" }}>
    $
    {(
      (((item.unitPrice * (100 - item.promoPercentageOff)) /
        100) *
        item.quantity *
        (100 - item.bulkDiscountPercentageOff)) /
      100
    ).toFixed(2)}
  </Typography>
  <Typography variant="body2" color="textSecondary" sx={{ textAlign: "right" }}>
    (Excl. of Tax)
  </Typography>

  {(item.promoPercentageOff > 0 || item.bulkDiscountPercentageOff > 0) && (
    <Box sx={{ display: "flex", flexDirection: "column", mt: 1 }}>
      {/* delete old price */}
      <Typography
        variant="body1"
        sx={{
          textDecoration: "line-through",
          color: "gray",
          mr: 2,
          textAlign: "right",
        }}
      >
        ${(item.unitPrice * item.quantity).toFixed(2)}
      </Typography>

      {/* save tags */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
        {item.promoPercentageOff > 0 && (
          <Box
            sx={{
              backgroundColor: "#4caf50",
              color: "#fff",
              padding: "2px 6px",
              borderRadius: "4px",
              fontWeight: "bold",
              fontSize: "0.75rem",
            }}
          >
            Save {item.promoPercentageOff}%
          </Box>
        )}
        {item.bulkDiscountPercentageOff > 0 && (
          <Box
            sx={{
              backgroundColor: "#4caf50",
              color: "#fff",
              padding: "2px 6px",
              borderRadius: "4px",
              fontWeight: "bold",
              fontSize: "0.75rem",
              ml: 1,
            }}
          >
            Bulk Save {item.bulkDiscountPercentageOff}%
          </Box>
        )}
      </Box>
    </Box>
  )}
</Box>


                  {/* Buttons */}
                  <Box sx={{ display: "flex", mr: 4, mt: 1 }}>
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
                  </Box>
                </Box>
              </Card>
            ))}
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                marginY: 1,
                paddingX: 3,
              }}
            >
              <Typography variant="h5">ORDER SUMMARY</Typography>
            </Box>
            <Divider
              sx={{
                height: 3,
                width: "95%",
                margin: "0 auto",
                marginBottom: 2,
                backgroundColor: "black",
              }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                marginY: 1,
                paddingX: 3,
              }}
            >
              <Box alignItems="center" sx={{ display: "flex" }}>
                <Typography variant="h6">Subtotal</Typography>
                <Tooltip title="before tax and shipping fee">
                  <HelpIcon sx={{ marginLeft: 0.5 }} />
                </Tooltip>
              </Box>
              <Box alignItems="center" sx={{ display: "flex" }}>
                <Typography variant="h6">
                  $
                  {(() => {
                    let total = 0;
                    cartItems.forEach((item) => {
                      total += item.subtotal;
                    });
                    return total.toFixed(2);
                  })()}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                marginY: 1,
                paddingX: 3,
              }}
            >
              <Typography variant="h6">Shipping</Typography>
              <Typography variant="h6">$0.00</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                marginY: 1,
                paddingX: 3,
              }}
            >
              <Typography variant="h6">GST/HST</Typography>
              <Typography variant="h6">$0.00</Typography>
            </Box>

            <Divider sx={{ height: 2, width: "90%", margin: "0 auto" }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                marginY: 1,
                paddingX: 3,
              }}
            >
              <Typography variant="h6">Grand Total</Typography>
              <Typography variant="h6">$0.00</Typography>
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
                onClick={() => router.push("/client/")}
                sx={{ marginX: 2.5, borderRadius: 5 }}
              >
                <Typography>Continue Shopping</Typography>
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default BodyComponents;
