import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  TextField,
  InputAdornment,
} from "@mui/material";
import { red } from "@mui/material/colors";

const extractDimensions = (size: string) => {
  const regex = /([\d.]+)\"\s*X\s*([\d.]+)\"/;
  const matches = size.match(regex);

  if (matches) {
    const initialWidth = parseFloat(matches[1]);
    const initialHeight = parseFloat(matches[2]);
    return { initialWidth, initialHeight };
  } else {
    throw new Error("Invalid size format");
  }
};

interface SizeInputProps {
  index: number;
  selectedCardIndex: number | null;
  maxHeight: number;
  price: number;
  onSizeChange: (index: number, size: string, sizePrice: number) => void;
  initialSize?: string;
}

const SizeInput: React.FC<SizeInputProps> = ({
  index,
  selectedCardIndex,
  maxHeight,
  price,
  onSizeChange,
  initialSize,
}) => {
  const [width, setWidth] = useState<number | null>(1);
  const [height, setHeight] = useState<number | null>(1);
  const [widthInputError, setWidthInputError] = useState(false);
  const [heightInputError, setHeightInputError] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [sizePrice, setSizePrice] = useState<number>(price);

  useEffect(() => {
    if (initialSize) {
      try {
        const { initialWidth, initialHeight } = extractDimensions(initialSize);
        setWidth(initialWidth);
        setHeight(initialHeight);
        setSizePrice(price * initialWidth * initialHeight);
        console.log(`Width: ${initialWidth}, Height: ${initialHeight}`);
      } catch (error: any) {
        console.error(error.message);
      }
    }
  }, [initialSize, price]);

  const handleCardClick = () => {
    console.log("card clicked");
    setShowInput(true);
    setSizeAndSizePrice(width, height);
  };

  const handleCloseInput = () => {
    setShowInput(false);
    console.log("card closed");
  };

  const setSizeAndSizePrice = (
    newWidth: number | null,
    newHeight: number | null
  ) => {
    if (newWidth !== null && newHeight !== null) {
      setSizePrice(price * newWidth * newHeight);
      onSizeChange(
        index,
        `${newWidth}" X ${newHeight}"`,
        parseFloat((price * newWidth * newHeight).toFixed(2))
      );
    } else {
      setSizePrice(0);
      onSizeChange(index, "invalid size", 0);
    }
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseFloat(e.target.value);
    if (inputValue <= 0.5 || isNaN(inputValue)) {
      setWidthInputError(true);
      setWidth(null);
      setSizeAndSizePrice(null, height);
    } else {
      setWidthInputError(false);
      setWidth(inputValue);
      setSizeAndSizePrice(inputValue, height);
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseFloat(e.target.value);
    if (inputValue <= 0.5 || isNaN(inputValue)) {
      setHeightInputError(true);
      setHeight(null);
      setSizeAndSizePrice(width, null);
    } else {
      setHeightInputError(false);
      setHeight(inputValue);
      setSizeAndSizePrice(width, inputValue);
    }
  };

  return (
    <>
      <Card
        onClick={handleCardClick}
        style={{
          width: "90px",
          height: `${maxHeight}px`,
          borderRadius: "5px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          border:
            index === selectedCardIndex
              ? `2px solid #000000`
              : "2px solid transparent",
          cursor: "pointer",
        }}
      >
        <Typography
          variant="body1"
          align="center"
          gutterBottom
          style={{ marginTop: "auto", marginBottom: "auto" }}
        >
          Customize
        </Typography>
      </Card>

      {showInput && (
        <div
          style={{
            position: "absolute",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "5px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <TextField
            label="Width"
            variant="standard"
            type="number"
            value={width}
            onChange={handleWidthChange}
            error={widthInputError}
            helperText={widthInputError ? "Must be greater than 0.5" : ""}
            sx={{ marginBottom: 1 }}
            InputProps={{
              endAdornment: <InputAdornment position="end">&quot;</InputAdornment>,
              inputProps: {
                step: 0.01,
                min: 0.51,
              },
            }}
            size="small"
          />
          <Typography variant="body1" gutterBottom sx={{ mx: 1 }}>
            X
          </Typography>
          <TextField
            label="Height"
            variant="standard"
            type="number"
            value={height}
            onChange={handleHeightChange}
            error={heightInputError}
            helperText={heightInputError ? "Must be greater than 0.5" : ""}
            sx={{ marginBottom: 1 }}
            InputProps={{
              endAdornment: <InputAdornment position="end">&quot;</InputAdornment>,
              inputProps: {
                step: 0.01,
                min: 0.51,
              },
            }}
            size="small"
          />
        </div>
      )}

      {showInput && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 999,
          }}
          onClick={handleCloseInput}
        />
      )}

      {(widthInputError || heightInputError) && (
        <Typography
          variant="body2"
          align="center"
          gutterBottom
          color={red[500]}
          style={{ marginTop: "auto", marginBottom: "auto" }}
        >
          Please enter a valid size
        </Typography>
      )}

      {width && height && (
        <>
          <Typography
            variant="body2"
            align="center"
            gutterBottom
            color="#000000"
            style={{ marginTop: "auto", marginBottom: "auto" }}
          >
            {`${width}" X ${height}"`}
          </Typography>
          <Typography variant="body2" align="center" gutterBottom>
            {`$${sizePrice.toFixed(2)}`}
          </Typography>
        </>
      )}
    </>
  );
};

export default SizeInput;
