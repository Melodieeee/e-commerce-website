import * as React from 'react';
import Box from '@mui/joy/Box';
import Alert from '@mui/joy/Alert';
import Typography from '@mui/joy/Typography';
import { useTheme } from '@mui/material/styles';

// Alert API: https://mui.com/joy-ui/api/alert/

export default function UiAlertPromotionbar() { 

  // Use the theme to get the breakpoints (Set the height of the alert bar based on the breakpoints)
  const theme = useTheme();

  return (
    <Box>
      <Alert          
          sx={{ 
                width: '100%',     
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                textAlign: 'center',
                borderRadius: 0,
                height: '40px',                
                // When the screen size is small, the height of the promotion bar is 40px
                [theme.breakpoints.up('md')]: {
                  height: '50%',
                },
                // When the screen size is medium, the height of the promotion bar is 50px
                [theme.breakpoints.up('lg')]: {
                  height: '75%',
                },
            }}  
          variant="soft"
          color='neutral'           
        >
          <div>      
            <Typography level="body-md">
              This is a promotion bar
            </Typography>
          </div>
        </Alert>
    </Box>
  );
}