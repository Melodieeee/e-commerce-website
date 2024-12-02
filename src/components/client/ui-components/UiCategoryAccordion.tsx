import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button, FormGroup, FormControlLabel, Checkbox, styled } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

const CustomAccordion = styled(Accordion)(({ theme }) => ({
  '&.MuiAccordion-root': {
    '&.Mui-expanded': {
      margin: 0,
    },
  },
}));

const UiCategoryAccordion = () => {
  return (
    <div>
      <CustomAccordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Category</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Button variant="text" size="small">ChildCat1</Button>
          <Button variant="text" size="small">ChildCat2</Button>
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
                    color: 'primary',
                    '&.Mui-checked': {
                      color: 'secondary',
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
                    color: 'primary',
                    '&.Mui-checked': {
                      color: 'secondary',
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
