import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProductBreadcrumbs } from "@/components/client/ui-components/UiBreadcrumb";
import NotFoundBody from "@/components/client/section/bodies/NotFoundBody";
import {
  Container,
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  useTheme,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"; // Import DeleteIcon
import SwiperProductImage from "@/components/client/ui-components/UiSwiperProductImage";
import ProductEditAttributeSection from "@/components/client/ui-components/UiProductEditAttributeSection";
import BulkDiscountCard from "@/components/client/ui-components/UiBulkDiscountCard";
import QuantityInput from "@/components/client/ui-components/UiQuantityInput";
import InputFileUpload from "@/components/client/ui-components/UiUploadFileBtn";
//import { editSpecificCartItem } from "@/CartStorage";
import { useCart } from "@/context/CartContext";
import { IProduct } from "@/lib/models/interfaces/IProduct";
import { ISelection } from "@/lib/models/interfaces/ISelection";
import {
  ICartItem,
  getBulkDiscountFromQuantity,
} from "@/lib/models/interfaces/ICartItem";
import { set } from "mongoose";
import mongoose from "mongoose";

interface BodyComponentsProps {
  product: IProduct;
  cartItem: ICartItem;
}

const BodyComponents: React.FC<BodyComponentsProps> = ({
  product,
  cartItem,
}) => {
  const router = useRouter();
  const [editCartItem, setEditCartItem] = useState<ICartItem>(cartItem);
  const { updateCartItem } = useCart();

  const [quantity, setQuantity] = useState<number>(editCartItem.quantity);
  const handleQuantityChange = (value: number) => {
    setQuantity(value);

    const { index: bulkIndex, bulkDiscountPercentageOff: bulkDiscount } =
      getBulkDiscountFromQuantity(product, value);
    setSelectedBulkDiscountCardIndex(bulkIndex);
    setBulkDiscountPercentageOff(bulkDiscount);
  };

  // Find the last index of bulk discounts array for the initial quantity
  const { index: bulkIniIndex, bulkDiscountPercentageOff: bulkIniDiscount } =
    getBulkDiscountFromQuantity(product, quantity);

  const [selectedBulkDiscountCardIndex, setSelectedBulkDiscountCardIndex] =
    useState<number>(bulkIniIndex);
  const [bulkDiscountPercentageOff, setBulkDiscountPercentageOff] =
    useState<number>(bulkIniDiscount);

  const handleBulkDiscountCardClick = (index: number) => {
    const clickedBulkDiscount = product.bulkDiscounts[index];
    setSelectedBulkDiscountCardIndex(index);
    setQuantity(clickedBulkDiscount.quantity);
    setBulkDiscountPercentageOff(clickedBulkDiscount.percentageOff);
  };

  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: ISelection;
  }>(cartItem.customChoices);
  // Function to handle selection change
  const handleSelectionChange = (optionName: string, selection: ISelection) => {
    if (selection.selectionName === "Custom Text") {
      // Find the text field input value
      const textFieldInput = document.getElementById(
        `custom-text-textfield-${optionName}`
      ) as HTMLInputElement;

      // Update the selection name with the text field input value
      const updatedSelection = {
        ...selection,
        customChoice: textFieldInput.value,
      };
      setSelectedOptions((prevOptions) => ({
        ...prevOptions,
        [optionName]: updatedSelection,
      }));
    } else {
      // For other selection types, update as usual
      console.log("Custom Color, Custom Size, Other Selection");
      setSelectedOptions((prevOptions) => ({
        ...prevOptions,
        [optionName]: selection,
      }));
    }
  };

  const [unitPrice, setUnitPrice] = useState<number>(cartItem.unitPrice);
  // Effect to calculate subtotal whenever selectedOptions changes
  useEffect(() => {
    let subtotal = 0;
    for (const option in selectedOptions) {
      subtotal += selectedOptions[option].price;
    }
    setUnitPrice(parseFloat(subtotal.toFixed(2)));
  }, [selectedOptions]);

  //cartItem.customPics

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFilesSelected = (files: FileList) => {
    const newFiles = Array.from(files);
    const totalFiles = uploadedFiles.length + newFiles.length;

    if (totalFiles > 5) {
      alert("You can upload up to 5 files only.");
      return;
    }

    setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleFileClick = (file: File) => {
    //only open the file in a new tab not truly upload a file
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL, "_blank");
  };

  const handleFileDelete = (index: number) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleUpdateCart = () => {
    // update the cart with the new item
    const uploadedFileInfos = uploadedFiles.map((file) => {
      return {
        name: file.name,
        url: URL.createObjectURL(file),
      };
    });

    const updatedItem: ICartItem = {
      cartItemId: cartItem.cartItemId,
      product: product,
      addTime: new Date(),
      quantity: quantity,
      unitPrice: unitPrice,
      promoPercentageOff: product.promoPercentageOff,
      bulkDiscountPercentageOff: bulkDiscountPercentageOff,
      subtotal: parseFloat(
        (
          (unitPrice *
            quantity *
            (100 - product.promoPercentageOff) *
            (100 - bulkDiscountPercentageOff)) /
          10000
        ).toFixed(2)
      ),
      customChoices: selectedOptions,
      customPics: uploadedFileInfos,
      specificInstruction:
        (
          document.getElementById(
            "specific-instruction-textfield"
          ) as HTMLInputElement
        )?.value || "",
    };

    console.log(updatedItem);

    //if error, do not save to cart
    if (product.isUploadFiles && updatedItem.customPics.length === 0) {
      alert("Please upload at least one art work.");
      return;
    }
    if (
      Object.keys(updatedItem.customChoices).length !==
      product.attributes.length
    ) {
      alert("Please select all options.");
      return;
    }
    if (updatedItem.specificInstruction.length > 1000) {
      alert("Specific instruction is too long.");
      return;
    }
    if (
      Object.values(updatedItem.customChoices).some(
        (choice) => choice.selectionName === "invalid size"
      )
    ) {
      alert("Please enter a valid size.");
      return;
    }
    if (
      Object.values(updatedItem.customChoices).some(
        (choice) => choice.selectionName === ""
      )
    ) {
      alert("Please enter some custom text.");
      return;
    }

    // Save the updated item to cart
    updateCartItem(updatedItem);
    // Redirect to cart page
    router.push("/client/cart/");
  };

  if (product && editCartItem) {
    return (
      <>
        <Container className="max-w-container mx-auto p-px m-7">
          <Box
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <ProductBreadcrumbs product={product} />
          </Box>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Box>
                  <SwiperProductImage productPics={product.productPics} />
                </Box>
              </Grid>

              <Grid item xs={12} sm={8}>
                <Box>
                  <Container>
                    <Typography variant="h5" component="h1" gutterBottom>
                      {product.productName}
                    </Typography>

                    <Typography variant="subtitle1">{product.sku}</Typography>
                  </Container>
                  {product.attributes.map((attribute, index) => (
                    <ProductEditAttributeSection
                      key={index}
                      attribute={attribute}
                      handleSelectionChange={handleSelectionChange}
                      customChoices={editCartItem.customChoices}
                    />
                  ))}
                  <Container sx={{ my: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Specific Instructions (Optional)
                    </Typography>
                    <TextField
                      id="specific-instruction-textfield"
                      hiddenLabel
                      defaultValue={editCartItem.specificInstruction}
                      multiline
                      variant="filled"
                      rows={3}
                      sx={{
                        width: "100%",
                        border: `2px solid ${useTheme().palette.primary.main}`,
                        borderRadius: "5px",
                        overflowY: "auto",
                      }}
                    />
                  </Container>
                  {product.bulkDiscounts.length > 0 && (
                    <Container sx={{ my: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        Save Big! Buy More!
                      </Typography>
                      <Box display="flex" flexWrap="wrap" gap={1} width="100%">
                        {product.bulkDiscounts.map((bulkDiscount, index) => {
                          return (
                            <BulkDiscountCard
                              key={index}
                              index={index}
                              bulkDiscount={bulkDiscount}
                              isSelected={
                                index === selectedBulkDiscountCardIndex
                              }
                              handleCardClick={handleBulkDiscountCardClick}
                            />
                          );
                        })}
                      </Box>
                    </Container>
                  )}
                  {product.isUploadFiles && (
                    <Container sx={{ my: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        Upload Art Works
                      </Typography>
                      <Typography variant="body1">
                        &lt;=400MB per image file, no more than 5 files
                      </Typography>

                      <InputFileUpload
                        onFilesSelected={handleFilesSelected}
                        buttonText={
                          uploadedFiles.length > 0 ? "Add More" : "Upload Files"
                        }
                        disabled={uploadedFiles.length >= 5}
                      />

                      {uploadedFiles.length === 0 ? (
                        <Typography variant="body1">
                          You haven't uploaded any art works yet.
                        </Typography>
                      ) : (
                        <>
                          <Typography variant="body1">
                            {uploadedFiles.length} file(s) selected
                          </Typography>
                          <ul>
                            {uploadedFiles.map((file, index) => (
                              <li key={index}>
                                <Link
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleFileClick(file)}
                                >
                                  {file.name}
                                </Link>
                                <IconButton
                                  onClick={() => handleFileDelete(index)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </Container>
                  )}
                  <Container sx={{ border: 1, my: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Subtotal
                    </Typography>
                    <Typography variant="body1">
                      Original: ${(unitPrice * quantity).toFixed(2)}
                    </Typography>
                    <Typography variant="body1">
                      Save {product.promoPercentageOff}% Bulk Save{" "}
                      {bulkDiscountPercentageOff}%
                    </Typography>
                    <Typography variant="body1">
                      Discounted Price: $
                      {(
                        (((unitPrice * (100 - product.promoPercentageOff)) /
                          100) *
                          quantity *
                          (100 - bulkDiscountPercentageOff)) /
                        100
                      ).toFixed(2)}
                    </Typography>

                    <QuantityInput
                      initialValue={quantity}
                      onChange={handleQuantityChange}
                    />

                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleUpdateCart}
                      sx={{ borderRadius: 5 }}
                    >
                      Update Cart
                    </Button>

                    <Typography variant="body2">
                      {JSON.stringify(selectedOptions)}
                      <br />
                      <br />
                      <br />
                      {JSON.stringify(cartItem)}
                    </Typography>
                  </Container>
                </Box>
              </Grid>

              <Grid item xs={12} sm={12}>
                <Typography variant="h6" component="h1" gutterBottom>
                  Description
                </Typography>
                <Typography variant="body1">{product.description}</Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </>
    );
  } else {
    return (
      <>
        <NotFoundBody />
      </>
    );
  }
};

export default BodyComponents;
