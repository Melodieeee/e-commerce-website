import React, { useState, useEffect } from "react";
import { FormControl, Button, Input, Box, MenuItem } from "@mui/joy";
import Menu from "@mui/joy/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/joy/IconButton";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import WhiteLogo from "@/components/client/Ic/logos/WhiteLogo";
import UiNavBar from "@/components/client/section/header/HeaderMainBar";
import ShoppingCartDrawer from "@/components/client/ui-components/UiShoppingCartDrawer";
import { ICartItem } from "@/lib/models/interfaces/ICartItem";
import { useCart } from "@/context/CartContext";
import { paths } from "@/paths";
import { colors } from "@/styles/tailwind-colors";
import { ICompanyInfo } from "@/lib/models/interfaces/ICompanyInfo";

interface HeaderMainContainerProps {
  isCartDrawerOpen?: boolean;
  setIsCartDrawerOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  companyInfo: ICompanyInfo;
}

const HeaderMainContainer: React.FC<HeaderMainContainerProps> = ({
  isCartDrawerOpen: isCartDrawerOpenProp,
  setIsCartDrawerOpen: setIsCartDrawerOpenProp,
  companyInfo,
}) => {
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isCartDrawerOpenInternal, setIsCartDrawerOpenInternal] = useState<boolean>(false);
  const { cartItems } = useCart();

  useEffect(() => {
    if (isCartDrawerOpenProp !== undefined) {
      setIsCartDrawerOpenInternal(isCartDrawerOpenProp);
    }
  }, [isCartDrawerOpenProp]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  // const itemCount = cartItems.length;
  // const totalPrice = cartItems.reduce((total, item) => total + item.subtotal, 0);

  const handleAccountClick = () => {
    window.location.href = paths.client.about;
  };

  const handleCartButtonClick = () => {
    if (window.location.pathname !== paths.client.cart) {
      setIsCartDrawerOpenInternal(true);
      if (setIsCartDrawerOpenProp) {
        setIsCartDrawerOpenProp(true);
      }
    }
  };

  if (!companyInfo) {
    return null;
  }

  return (
    <div className="max-w-container mx-auto p-px m-3">
      <UiNavBar onCartButtonClick={handleCartButtonClick} />
      <ShoppingCartDrawer
        isOpen={isCartDrawerOpenInternal}
        onClose={() => {
          setIsCartDrawerOpenInternal(false);
          if (setIsCartDrawerOpenProp) {
            setIsCartDrawerOpenProp(false);
            console.log("close", isCartDrawerOpenInternal, isCartDrawerOpenProp);
          }
        }}
      />
      <Box className="flex sm:hidden mx-auto justify-center items-center w-full" sx={{ pt: 2 }}>
        <WhiteLogo />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          p: 1,
          flexWrap: "nowrap", // Ensure children do not wrap to next line
          width: '100%',
          maxWidth: '100%', // Ensure the box does not exceed the parent width
          overflow: 'hidden', // Prevent overflow
        }}
      >
        <Box
          className="xl:hidden flex"
          sx={{ alignItems: "center", justifyContent: "flex-start", minWidth: 0 }}
        >
          <IconButton onClick={handleMenuOpen} aria-label="menu">
            <MenuIcon />
          </IconButton>
        </Box>

        <Menu open={Boolean(menuAnchorEl)} onClose={handleMenuClose} anchorEl={menuAnchorEl}>
          <MenuItem onClick={handleMenuClose}>Home</MenuItem>
          <MenuItem onClick={handleMenuClose}>About</MenuItem>
          <MenuItem onClick={handleMenuClose}>Contact</MenuItem>
        </Menu>

        <Box className="hidden sm:flex items-center" sx={{ flexGrow: 1, minWidth: 0 }}>
          <WhiteLogo />
        </Box>

        <Box sx={{ flexGrow: 1, mx: 1, minWidth: 0 }}>
          <FormControl sx={{ width: "100%" }}>
            <Input
              type="search"
              name="search"
              placeholder="Search"
              endDecorator={<SearchIcon />}
              size="lg"
              sx={{ width: "100%", minWidth: 0, fontFamily: "inherit" }}
            />
          </FormControl>
        </Box>

        {/* Call us */}
        <Button
          variant="plain"
          component="a"
          href={`tel:${companyInfo.phone}`}
          startDecorator={<PhoneOutlinedIcon />}
          aria-label="call us"
          className="flex-2 text-primary flex-grow xl:flex-grow-0"
          sx={{
            fontFamily: "inherit",
            backgroundColor: "transparent",
            "&:hover": {
              backgroundColor: "transparent",
              color: colors.hover as string,
            },
            whiteSpace: 'nowrap', // Prevent text from breaking to the next line
            minWidth: 0,
            flexShrink: 1,
          }}
        >
          <h1 className="hidden xl:flex" style={{ fontSize: "1.5rem" }}>
            {companyInfo.phone}
          </h1>
        </Button>

        {/* About us */}
        <Button
          variant="plain"
          component="a"
          href={paths.client.about}
          startDecorator={<ApartmentOutlinedIcon />}
          aria-label="about us"
          className="flex-2 text-primary flex-grow xl:flex-grow-0"
          sx={{
            fontFamily: "inherit",
            backgroundColor: "transparent",
            "&:hover": {
              backgroundColor: "transparent",
              color: colors.hover as string,
            },
            whiteSpace: 'nowrap', // Prevent text from breaking to the next line
            minWidth: 0,
            flexShrink: 1,
          }}
        >
          <h1 className="hidden xl:flex" style={{ fontSize: "1.5rem" }}>
            About us
          </h1>
        </Button>
      </Box>
    </div>
  );
};

export default HeaderMainContainer;
