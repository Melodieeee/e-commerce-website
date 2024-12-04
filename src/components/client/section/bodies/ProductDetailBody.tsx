import React, { useState, useEffect } from "react";
import { ProductBreadcrumbs } from "@/components/client/ui-components/UiBreadcrumb";
import {
  Container,
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  IconButton,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"; // Import DeleteIcon
import SwiperProductImage from "@/components/client/ui-components/UiSwiperProductImage";
import ProductAttributeSection from "@/components/client/ui-components/UiProductAttributeSection";
import ProductEditAttributeSection from "../../ui-components/UiProductEditAttributeSection";
import BulkDiscountCard from "@/components/client/ui-components/UiBulkDiscountCard";
import QuantityInput from "@/components/client/ui-components/UiQuantityInput";
import InputFileUpload from "@/components/client/ui-components/UiUploadFileBtn";
//import { getCartItems, saveCartItems } from "@/CartStorage";
import { useCart } from "@/context/CartContext";
import { IProduct } from "@/lib/models/interfaces/IProduct";
import { ISelection } from "@/lib/models/interfaces/ISelection";
import {
  ICartItem,
  getBulkDiscountFromQuantity,
} from "@/lib/models/interfaces/ICartItem";
import mongoose from "mongoose";

interface BodyComponentsProps {
  product: IProduct; // Define productName as a prop
  setIsCartDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const BodyComponents: React.FC<BodyComponentsProps> = ({
  product,
  setIsCartDrawerOpen,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const { addCartItem } = useCart();

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
  }>({});
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

  const [unitPrice, setUnitPrice] = useState<number>(0);
  // Effect to calculate subtotal whenever selectedOptions changes
  useEffect(() => {
    let subtotal = 0;
    for (const option in selectedOptions) {
      subtotal += selectedOptions[option].price;
    }
    setUnitPrice(parseFloat(subtotal.toFixed(2)));
  }, [selectedOptions]);

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

  const handleAddToCart = () => {
    const uploadedFileInfos = uploadedFiles.map((file) => {
      return {
        name: file.name,
        url: URL.createObjectURL(file),
      };
    });

    const addItem: ICartItem = {
      cartItemId: new mongoose.Types.ObjectId(),
      addTime: new Date(),
      product: product,
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

    console.log(addItem);
    //if error, do not save to cart
    if (product.isUploadFiles && addItem.customPics.length === 0) {
      alert("Please upload at least one art work.");
      return;
    }
    if (
      Object.keys(addItem.customChoices).length !== product.attributes.length
    ) {
      alert("Please select all options.");
      return;
    }
    if (addItem.specificInstruction.length > 1000) {
      alert("Specific instruction is too long.");
      return;
    }
    if (
      Object.values(addItem.customChoices).some(
        (choice) => choice.customChoice === "invalid size"
      )
    ) {
      alert("Please enter a valid size.");
      return;
    }
    if (
      Object.values(addItem.customChoices).some(
        (choice) => choice.customChoice === ""
      )
    ) {
      alert("Please enter some custom text.");
      return;
    }
    //if quantity is 0, do not save to cart
    if (addItem.quantity === 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    // const existingItems = getCartItems();
    // const updatedItems = [...existingItems, addItem];
    // saveCartItems(updatedItems);
    addCartItem(addItem);
    setIsCartDrawerOpen(true);
    //alert(JSON.stringify(selectedOptions));
  };

  const [inputValue, setInputValue] = useState<string>("");

  const handleSpecTxtChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  if (product) {
    return (
      <>
        <Container className="max-w-container mx-auto">
          {/* Breadcrumbs */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              marginBottom: 2,
              marginTop: 4,
              marginX: 5,
            }}
          >
            <ProductBreadcrumbs product={product} />
          </Box>

          {/* Product Details */}
          <Box>
            <Grid container spacing={2}>
              {/* LeftSide */}
              <Grid item xs={12} sm={5}>
                <Box sx={{ mx: 4, py: 2, px: 2 }}>
                  {/* Image */}
                  <Box sx={{ my: 2 }}>
                    {product.productPics && product.productPics.length > 0 && (
                      <SwiperProductImage productPics={product.productPics} />
                    )}
                  </Box>
                  {/* Description */}
                  <Box sx={{ py: 3, my: 2 }}>
                    <Typography variant="h6" component="h1" gutterBottom>
                      Description
                    </Typography>
                    <Typography variant="body1">
                      {product.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              {/* RightSide */}
              <Grid item xs={12} sm={7}>
                {/* Product name and SKU */}
                <Container sx={{ py: 2 }}>
                  <Box sx={{ my: 2, px: 3, py: 1 }}>
                    <Typography
                      sx={{ fontWeight: "bold" }}
                      variant="h4"
                      gutterBottom
                    >
                      {product.productName}
                    </Typography>

                    <Typography variant="body2" sx={{ mt: 2, fontSize: 12 }}>
                      {product.sku}
                    </Typography>
                    <Divider sx={{ my: 4 }} />
                  </Box>

                  {/* Product Options */}
                  <Box sx={{}}>
                    {product.attributes.map((attribute, index) => (
                      <ProductEditAttributeSection // Replace ProductAttributeSection with ProductEditAttributeSection
                        key={index}
                        attribute={attribute}
                        handleSelectionChange={handleSelectionChange}
                      />
                    ))}
                  </Box>
                  {/* Specific Instruction */}
                  <Container sx={{ my: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Specific Instructions (Optional)
                    </Typography>
                    <TextField
                      id="specific-instruction-textfield"
                      hiddenLabel
                      value={inputValue}
                      onChange={handleSpecTxtChange}
                      multiline
                      variant="filled"
                      rows={3}
                      sx={{
                        width: "100%",
                        border: inputValue
                          ? `2px solid #000`
                          : "2px solid transparent", // Border black if text is entered, else transparent
                        borderRadius: "5px",
                        overflowY: "auto",
                      }}
                    />
                  </Container>
                  {/* Bulk Discount */}
                  {product.bulkDiscounts.length > 0 && (
                    <Container sx={{ my: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        Save Big! Buy More!
                      </Typography>
                      <Box display="flex" flexWrap="wrap" gap={1} width="100%">
                        {product.bulkDiscounts.map((bulkDiscount, index) => (
                          <BulkDiscountCard
                            key={index}
                            index={index}
                            bulkDiscount={bulkDiscount}
                            isSelected={index === selectedBulkDiscountCardIndex}
                            handleCardClick={handleBulkDiscountCardClick}
                          />
                        ))}
                      </Box>
                    </Container>
                  )}
                  {/* File Upload */}
                  {product.isUploadFiles && (
                    <Container sx={{ my: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        Upload Art Works
                      </Typography>
                      <Typography variant="body2" sx={{ my: 1 }}>
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
                        <Typography
                          variant="body2"
                          sx={{ ml: 1, my: 1, color: "#FF0000" }}
                        >
                          You haven&apos;t uploaded any art works yet.
                        </Typography>
                      ) : (
                        <>
                          <Typography
                            variant="body2"
                            sx={{ ml: 1, my: 1, color: "#999" }}
                          >
                            {uploadedFiles.length} file(s) selected
                          </Typography>
                          <ul>
                            {uploadedFiles.map((file, index) => (
                              <li key={index}>
                                <Link
                                  variant="body2"
                                  sx={{ ml: 1, color: "#999" }}
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

                  {/* Subtotal */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                      py: 2,
                      px: 4,
                      my: 4,
                      mx: 3,
                    }}
                  >
                    {/* Price and Discount Section */}
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        $
                        {(
                          (((unitPrice * (100 - product.promoPercentageOff)) /
                            100) *
                            quantity *
                            (100 - bulkDiscountPercentageOff)) /
                          100
                        ).toFixed(2)}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        (Excl. of Tax)
                      </Typography>
                      {(product.promoPercentageOff > 0 ||
                        bulkDiscountPercentageOff > 0) && (
                        <Box
                          sx={{ display: "flex", alignItems: "center", mt: 1 }}
                        >
                          <Typography
                            variant="body1"
                            sx={{
                              textDecoration: "line-through",
                              color: "gray",
                              mr: 2,
                            }}
                          >
                            ${(unitPrice * quantity).toFixed(2)}
                          </Typography>
                          {product.promoPercentageOff > 0 && (
                            <Box
                              sx={{
                                backgroundColor: "#4caf50",
                                color: "#fff",
                                padding: "4px 8px",
                                borderRadius: "4px",
                                fontWeight: "bold",
                              }}
                            >
                              Save {product.promoPercentageOff}%
                            </Box>
                          )}
                          {bulkDiscountPercentageOff > 0 && (
                            <Box
                              sx={{
                                backgroundColor: "#4caf50",
                                color: "#fff",
                                padding: "4px 8px",
                                borderRadius: "4px",
                                fontWeight: "bold",
                                ml: 1,
                              }}
                            >
                              Bulk Save {bulkDiscountPercentageOff}%
                            </Box>
                          )}
                        </Box>
                      )}
                    </Box>

                    {/* Quantity Control Section */}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <QuantityInput
                        initialValue={quantity}
                        onChange={handleQuantityChange}
                      />
                    </Box>

                    {/* Add to Cart Button */}
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={handleAddToCart}
                      sx={{
                        borderRadius: 2,
                        fontWeight: "bold",
                        fontFamily: "inherit",
                      }}
                    >
                      Add to Cart
                    </Button>
                  </Box>
                </Container>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </>
    );
  }
};

export default BodyComponents;
