import React, { useState, useRef, useEffect } from "react";
import { Typography, Card, useTheme, Button } from "@mui/material";



interface BulkDiscount {
  quantity: number;
  percentageOff: number;
}

interface BulkDiscountCardProps {
    bulkDiscount: BulkDiscount;
    index: number;
    isSelected: boolean;
    handleCardClick: (index: number) => void;
  }
  
  const BulkDiscountCard: React.FC<BulkDiscountCardProps> = ({
    bulkDiscount,
    index,
    isSelected,
    handleCardClick,
  }) => {
    const theme = useTheme();
    
    return (
      <Card
        onClick={() => handleCardClick(index)}
        style={{
          width: "80px",
          justifyContent: "center",
          alignItems: "center",
          border: isSelected ? `2px solid ` : "2px solid transparent",
          cursor: "pointer",
        }}
      >
        <Typography variant="body1" gutterBottom align="center">
          {bulkDiscount.quantity} +
        </Typography>
        <Typography variant="body2" gutterBottom align="center">
          Save {bulkDiscount.percentageOff}%
        </Typography>
      </Card>
    );
  };
  

export default BulkDiscountCard;
