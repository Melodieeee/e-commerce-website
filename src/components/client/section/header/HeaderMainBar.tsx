import React, { useState, useEffect } from "react";
import { colors } from "@/styles/tailwind-colors";
import { Box } from "@mui/joy";
import Button from "@mui/joy/Button";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import { isUserLoggedIn } from "@/utils/auth";
import { paths } from "@/paths";
import { useCart } from '@/context/CartContext';

interface NavBarProps {
  onCartButtonClick: () => void;
}

const NavBar: React.FC<NavBarProps> = ({  onCartButtonClick }) => {

  const { cartItems } = useCart();
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.subtotal, 0);

  // Account button
  const [isClient, setIsClient] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleAccountClick = async () => {
    const loggedIn = await isUserLoggedIn();
    if (loggedIn) {
      window.location.href = paths.client.profile;
    } else {
      window.location.href = paths.client.signIn;
    }
  };

  return (
    <div className="flex justify-between items-center mx-2 my-2">
      <Box className="bg-primary w-20 h-1 xl:flex hidden" />
      <div className="flex flex-grow space-x-2 lg:justify-around xl:justify-end">
        {/* Order Tracking Button */}
        <Button
            component="a"         
            href={paths.client.orderTracking}
            variant="plain"
            startDecorator={<LocalShippingOutlinedIcon />}
            className="flex-2 text-primary flex-grow xl:flex-grow-0"
            sx={{
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
                color: colors.hover as string,
              },
            }}
          >
            <span className="hidden sm:inline">Order Tracking</span>
          </Button>

        {/* Blog Button */}
        <Button        
            variant="plain"
            component="a"
            href={paths.client.blog}
            startDecorator={<RateReviewOutlinedIcon />}
            className="flex-2 text-primary flex-grow xl:flex-grow-0"
            sx={{
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
                color: colors.hover as string,
              },
            }}
          >
            <span className="hidden sm:inline">Blog</span>
          </Button>

        {/* Account Button */}
        <Button         
          variant="plain"
          type="button"
          startDecorator={<AccountCircleOutlinedIcon />}
          className="flex-2 text-primary flex-grow xl:flex-grow-0"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          sx={{
            backgroundColor: "transparent",
            "&:hover": {
              backgroundColor: "transparent",
              color: colors.hover as string,
            },
          }}
          onClick={handleAccountClick}
        >
          <span className="hidden sm:inline">Account</span>
        </Button>
        <Button
          onClick={() => onCartButtonClick()}         
          variant="plain"
          startDecorator={<ShoppingCartOutlinedIcon />}
          className="flex-2 text-primary flex-grow xl:flex-grow-0"
          sx={{
            backgroundColor: "transparent",
            "&:hover": {
              backgroundColor: "transparent",
              color: colors.hover as string,
            },
          }}
        >
          <span className="hidden sm:inline">
            Items({itemCount}) ${totalPrice.toFixed(2)}
          </span>
        </Button>

      </div>
    </div>
  );
};

export default NavBar;
