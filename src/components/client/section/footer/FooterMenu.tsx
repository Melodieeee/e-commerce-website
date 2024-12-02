import React from "react";
import {
  Box,
  Typography,
  Stack,
  Link,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const iconMapper = {
  call: <CallOutlinedIcon />,
  mail: <MailOutlinedIcon />,
  location: <LocationOnOutlinedIcon />,
};

interface FooterMenuItemContent {
  label: string;
  iconType?: keyof typeof iconMapper;
  href?: string;
}

interface FooterMenuItemProps {
  title: string;
  content: (FooterMenuItemContent | string)[];
  icon: boolean;
}

const FooterMenuItem: React.FC<FooterMenuItemProps> = ({
  title,
  content,
  icon,
}) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("md"));

  return isXs ? (
    <Accordion sx={{ boxShadow: 'none', border: 0, '&:before': { display: 'none' } }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6" color="textPrimary">
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction="column" spacing={1}>
          {content.map((item, index) => {
            const label = typeof item === "string" ? item : item.label;
            const IconComponent =
              typeof item === "string"
                ? null
                : icon && item.iconType
                ? iconMapper[item.iconType]
                : null;
            const href = typeof item === "string" ? "#" : item.href;
            return (
              <Stack
                key={index}
                direction="row"
                spacing={1}
                alignItems="center"
              >
                {IconComponent}
                <Link href={href} variant="subtitle1" color="textSecondary">
                  {label}
                </Link>
              </Stack>
            );
          })}
        </Stack>
      </AccordionDetails>
    </Accordion>
  ) : (
    <Box>
      <Typography variant="h6" color="textPrimary" gutterBottom>
        {title}
      </Typography>
      <Stack direction="column" spacing={1}>
        {content.map((item, index) => {
          const label = typeof item === "string" ? item : item.label;
          const IconComponent =
            typeof item === "string"
              ? null
              : icon && item.iconType
              ? iconMapper[item.iconType]
              : null;
          const href = typeof item === "string" ? "#" : item.href;
          return (
            <Stack key={index} direction="row" spacing={1} alignItems="center">
              {IconComponent}
              <Link href={href} variant="subtitle1" color="textSecondary"
              sx={{ 
                wordBreak: 'break-all',
                
              }}>
                {label}
              </Link>
            </Stack>
          );
        })}
      </Stack>
    </Box>
  );
};

export default FooterMenuItem;
