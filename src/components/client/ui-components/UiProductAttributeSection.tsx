import * as React from "react";
import {
  Typography,
  Box,
  Card,
  TextField,
  useTheme,
  Container,
} from "@mui/material";
import { useEffect, useState } from "react";
import ColorPicker from "@/components/client/ui-components/UiColorPicker";
import SizeInput from "@/components/client/ui-components/UiSizeInput";
import { ISelection } from "@/lib/models/interfaces/ISelection";
import { IAttribute } from "@/lib/models/interfaces/IAttribute";

interface ProductAttributeSectionProps {
  attribute: IAttribute;
  handleSelectionChange: (optionName: string, selection: ISelection) => void; // Add handleSelectionChange prop
}

const ProductAttributeSection: React.FC<ProductAttributeSectionProps> = ({
  attribute,
  handleSelectionChange,
}) => {
  // State to store the text field values
  const [textFieldValues, setTextFieldValues] = useState<string[]>([]);

  // Function to handle changes in the text field
  const handleTextFieldChange = (index: number, value: string) => {
    // Update the text field values array
    const updatedTextFieldValues = [...textFieldValues];
    updatedTextFieldValues[index] = value;
    setTextFieldValues(updatedTextFieldValues);

    // Update the corresponding selection name in selectedOptions
    const updatedSelection = {
      ...attribute.selections[index],
      customChoice: value,
    };
    handleSelectionChange(attribute.optionName, updatedSelection);
  };

  // Function to handle color selection
  const handleCustomColorSelected = (index: number, color: string) => {
    const updatedSelection = {
      ...attribute.selections[index],
      customChoice: color,
    };
    handleSelectionChange(attribute.optionName, updatedSelection);
  };

  // Function to handle size selection
  const handleCustomSizeSelected = (
    index: number,
    size: string,
    sizePrice: number
  ) => {
    const updatedSelection = {
      ...attribute.selections[index],
      //selectionName: size,
      customChoice: size,
      price: sizePrice,
    };
    console.log(attribute.selections[index], updatedSelection);
    handleSelectionChange(attribute.optionName, updatedSelection);
  };

  // Find the maximum height based on the length of the longest selectionName
  const maxLength = Math.max(
    ...attribute.selections.map((selection) => selection.selectionName.length)
  );

  // Calculate the height multiplier based on the maxLength
  const heightMultiplier = 4; // Adjust this value as needed
  const maxHeight = maxLength * heightMultiplier;

  const [selectedCardIndex, setSelectedCardIndex] = React.useState<
    number | null
  >(0);
  const theme = useTheme();

  useEffect(() => {
    // Initialize selected option when component mounts
    if (attribute.selections.length > 0) {
      const initialSelection = attribute.selections[0];
      handleSelectionChange(attribute.optionName, initialSelection);
    }
  }, []); // Empty dependency array ensures this effect runs only once, when the component mounts

  const handleCardClick = (index: number) => {
    // Check if the color picker is open
    if (
      attribute.selections[index].selectionName == "Custom Color" ||
      attribute.selections[index].selectionName == "Custom Size"
    ) {
      setSelectedCardIndex(index);
    } else {
      setSelectedCardIndex(index);
      const selection = attribute.selections[index];
      handleSelectionChange(attribute.optionName, selection); // Call handleSelectionChange with the selected selection

      console.log(
        "index",
        index,
        selectedCardIndex,
        "name: ",
        JSON.stringify(selection)
      );
    }
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }} gutterBottom>
        {attribute.optionName}
      </Typography>

      <Box display="flex" flexWrap="wrap" gap={1} width="100%">
        {attribute.selections.map((selection, index) => (
          <Box
            key={index}
            onClick={() => {
              handleCardClick(index);
            }}
            sx={{
              width:
                selection.selectionName === "Custom Text" ? "100%" : "auto", // 為Custom Text設定100%寬
              flex:
                selection.selectionName === "Custom Text"
                  ? "1 1 100%"
                  : "0 1 auto", // 為Custom Text提供彈性空間
            }}
          >
            {/* custom text */}
            {selection.selectionName === "Custom Text" ? (
              <>
                <TextField
                  hiddenLabel
                  id={`custom-text-textfield-${attribute.optionName}`}
                  defaultValue=""
                  multiline
                  variant="filled"
                  rows={3}
                  value={textFieldValues[index] || ""} // Bind value to state
                  onChange={(e) => handleTextFieldChange(index, e.target.value)} // Update state on change
                  sx={{
                    width: "100%", // Set width to match its container
                    border:
                      index === selectedCardIndex
                        ? `2px solid ${theme.palette.secondary.main}`
                        : "2px solid transparent",
                    borderRadius: "5px",
                    overflowY: "auto", // Enable vertical scrolling if needed
                  }}
                />
                {index === selectedCardIndex &&
                  textFieldValues[index]?.trim() === "" && (
                    <Typography
                      variant="body2"
                      align="left"
                      sx={{ color: "#FF0000" }}
                      gutterBottom
                    >
                      {"Please enter your custom text"}
                    </Typography>
                  )}
              </>
            ) : // custom color
            selection.selectionName === "Custom Color" ? (
              <ColorPicker
                index={index}
                selectedCardIndex={selectedCardIndex}
                maxHeight={maxHeight}
                onColorSelected={handleCustomColorSelected}
              />
            ) : // custom size
            selection.selectionName === "Custom Size" ? (
              <SizeInput
                index={index}
                selectedCardIndex={selectedCardIndex}
                maxHeight={maxHeight}
                price={selection.price}
                onSizeChange={handleCustomSizeSelected}
              />
            ) : (
              <Card
                style={{
                  width: "90px",
                  height: !selection.hasExplainPic ? `${maxHeight}px` : "auto", // Set height to maxHeight if there is an image
                  borderRadius: "5px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  border:
                    index === selectedCardIndex
                      ? `2px solid ${theme.palette.secondary.main}`
                      : "2px solid transparent",
                  cursor: "pointer",
                }}
              >
                {selection.hasExplainPic && (
                  <img
                    src={selection.explainPic}
                    alt={selection.selectionName}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "5px",
                    }}
                  />
                )}
                {!selection.hasExplainPic && (
                  <Typography
                    variant="body1"
                    align="center"
                    gutterBottom
                    style={{ marginTop: "auto", marginBottom: "auto" }}
                  >
                    {selection.selectionName}
                  </Typography>
                )}
              </Card>
            )}

            {selection.hasExplainPic && (
              <Typography
                variant="body1"
                align="center"
                gutterBottom
                style={{ marginTop: "", marginBottom: "0" }}
              >
                {selection.selectionName}
              </Typography>
            )}

            {selection.selectionName !== "Custom Size" && (
              <Typography variant="body2" align="center" gutterBottom>
                {`$${selection.price}`}
              </Typography>
            )}
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default ProductAttributeSection;
