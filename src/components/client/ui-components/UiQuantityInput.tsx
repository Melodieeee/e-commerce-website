import React, { useState, useEffect } from "react";
import "@/style.css";
import { Container, TextField, Button } from "@mui/material";

interface QuantityInputProps {
  initialValue?: number;
  onChange?: (value: number) => void;
  onClick?: void;
}

const QuantityInput: React.FC<QuantityInputProps> = ({
  initialValue = 1,
  onChange,
}) => {
  const [value, setValue] = useState<number>(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]); // Update value when initialValue changes

  const increment = () => {
    setValue((prevValue) => prevValue + 1);
    onChange && onChange(value + 1); // Call onChange callback with updated value
  };

  const decrement = () => {
    if (value > 1) {
      setValue((prevValue) => prevValue - 1);
      onChange && onChange(value - 1); // Call onChange callback with updated value
    }
  };  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(e.target.value) || 1);
    onChange && onChange(parseInt(e.target.value) || 1);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onChange && onChange(value);
    }
  };


  return (
    <Container  sx={{boarder: "3px solid #000"}}>
      <button
        className="quantity-input__modifier quantity-input__modifier--left"
        onClick={decrement}
      >
        &mdash;
      </button>
      <input
        id="quantity-input"
        className="quantity-input__screen"
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        aria-label="Enter quantity"
      />
      <button
        className="quantity-input__modifier quantity-input__modifier--right"
        onClick={increment}
      >
        &#xff0b;
      </button>
    </Container>
  );
};

export default QuantityInput;
