import React, { useState, useRef, useEffect } from "react";
import { Typography, Card, useTheme } from "@mui/material";
import { SketchPicker } from "react-color";

interface ColorPickerProps {
  index: number;
  selectedCardIndex: number | null;
  maxHeight: number;
  onColorSelected: (index: number, color: string) => void; // Callback for color selection
  initialColor?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  index,
  selectedCardIndex,
  maxHeight,
  onColorSelected,
  initialColor
}) => {
  const [color, setColor] = useState<string>(initialColor? initialColor : "#000000"); // Initial color state
  
  const [showPicker, setShowPicker] = useState(false); // State to control visibility of color picker
  const pickerRef = useRef<HTMLDivElement>(null);

  const handleCardClick = () => {
    setShowPicker(!showPicker); // Toggle the color picker
    onColorSelected(index, color); // Call the callback function to update selectedOptions with the selected color
  };

  const handleClosePicker = () => {
    setShowPicker(false); // Close the color picker
  };

  const handleColorChange = (newColor: any) => {
    setColor(newColor.hex); // Update color state when color changes
    onColorSelected(index, newColor.hex); // Call the callback function to update selectedOptions with the selected color
  };

  const handlePickerClick = (e: React.MouseEvent) => {
    // Prevent clicks inside the color picker from closing it
    e.stopPropagation();
  };

  useEffect(() => {
    const handleWindowResize = () => {
      // Recalculate the picker position when the window is resized
      if (pickerRef.current && showPicker) {
        const { top, left } = pickerRef.current.getBoundingClientRect();
        pickerRef.current.style.top = `${top + 30}px`;
        pickerRef.current.style.left = `${left}px`;
      }
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [showPicker]);

  useEffect(() => {
    if (showPicker) {
      // Update the selected color in the parent component when the color picker is shown
      onColorSelected(index, color);
    }
  }, [showPicker]); // Only update when the color picker is shown

  return (
    <>
      <Card
        onClick={handleCardClick}
        style={{
          backgroundColor: color,
          width: "90px",
          height: `${maxHeight}px`, // Set height to maxHeight if there is an image
          borderRadius: "5px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          border:
            index === selectedCardIndex
              ? `2px solid ${useTheme().palette.secondary.main}`
              : "2px solid transparent",
          cursor: "pointer",
        }}
      />
      <Typography
        ref={pickerRef}
        variant="body2"
        align="center"
        gutterBottom
        style={{ marginTop: "auto", marginBottom: "auto" }}
      >
        Choose Color
      </Typography>
      {/* Render the color picker when showPicker is true */}
      {showPicker && (
        <div
          style={{
            position: "absolute",
            zIndex: 1000,
            // Center the picker horizontally
          }}
          onClick={handlePickerClick}
        >
          <SketchPicker
            color={color}
            onChange={handleColorChange}
          />
        </div>
      )}
      {showPicker && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 999,
          }}
          onClick={handleClosePicker}
        />
      )}
    </>
  );
};

export default ColorPicker;
