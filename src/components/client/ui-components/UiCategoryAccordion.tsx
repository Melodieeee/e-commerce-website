import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  styled,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { ProductCategories } from "@/test-data/DemoComponents";
import { IProductCategory } from "@/lib/models/interfaces/IProductCategory";

interface CustomAccordionProps {
  category: IProductCategory;
}

const CustomAccordion = styled(Accordion)(({ theme }) => ({
  "&.MuiAccordion-root": {
    "&.Mui-expanded": {
      margin: 0,
    },
  },
}));


const UiCategoryAccordion: React.FC<CustomAccordionProps> = ( { category }) => {
  
  const allChildrenIds =
  ProductCategories.find((item) => item.categoryId === category.categoryId)?.children ?? [];

  return (
    <div>
      
      <CustomAccordion disabled={allChildrenIds.length === 0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Category</Typography>
        </AccordionSummary>
        <AccordionDetails> 
          {ProductCategories.map((category) => { // children categories
            if (allChildrenIds.includes(category.categoryId)) {
              return (
                <Button
                fullWidth // Makes the button occupy the whole row
                variant="text"
                size="small"
                sx={{
                  justifyContent: "flex-start", // Aligns content to the left
                  textAlign: "left", // Ensures the text inside the button is aligned to the left
                  borderBottom: "1px solid #ddd", // Adds a bottom border for separation
                  padding: "8px 16px", // Adjusts padding for better alignment
                }}
                  onClick={() => {
                    window.location.href = `/client/product-category/${category.name
                      .toLowerCase()
                      .split(" ")
                      .join("-")}?id=${category.categoryId}`;
                  }}
                >
                  {category.name}
                </Button>
              );
            }
            return null;
          })}
        </AccordionDetails>
      </CustomAccordion>
      <CustomAccordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Sale</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel
              label="On Sale"
              control={
                <Checkbox
                  size="small"
                  defaultChecked
                  sx={{
                    color: "primary",
                    "&.Mui-checked": {
                      color: "secondary",
                    },
                  }}
                />
              }
            />
            <FormControlLabel
              label="Not On Sale"
              control={
                <Checkbox
                  size="small"
                  defaultChecked
                  sx={{
                    color: "primary",
                    "&.Mui-checked": {
                      color: "secondary",
                    },
                  }}
                />
              }
            />
          </FormGroup>
        </AccordionDetails>
      </CustomAccordion>
    </div>
  );
};

export default UiCategoryAccordion;
