import React from "react";
import Box from '@mui/joy/Box';
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import { Typography } from "@mui/material";

export default function SubscribeBar() {
    const [radius, setRadius] = React.useState(5);
    const [childHeight, setChildHeight] = React.useState(32);
  
    return (
      <Box className="bg-primary text-white p-6">
        <Box
          className="max-w-container mx-auto"
          sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              md: 'column',
              lg: 'row'
            },
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2
          }}
        >
          <Typography
            className="text-md text-center lg:text-left"
            sx={{
              mb: { xs: 1, md: 1, lg: 0 },
              mr: { lg: 3 } 
            }}
          >
            Subscribe to our newsletter today!
          </Typography>
          <Input
            size="md"
            placeholder="Enter your email address"
            endDecorator={
              <Button variant="soft" size="lg" color="primary">
                Subscribe
              </Button>
            }
            sx={{
              width: {
                xs: '100%', 
                md: '60%', 
                lg: '400px' 
              },
              '--Input-radius': `${radius}px`,
              '--Input-decoratorChildHeight': `${childHeight}px`,
              mx: 2 
            }}
          />
        </Box>
      </Box>
    );
  }
