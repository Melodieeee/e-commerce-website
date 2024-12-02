import React from "react";
import {
  Box,
  Grid,
  Link,
  Typography,
  Container,
  IconButton,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material";
import UiCopyright from "@/components/client/ui-components/UiCopyright";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FooterMenuItem from "./FooterMenu";
import WhiteLogo from "@/components/client/Ic/logos/WhiteLogo";
// Interfaces
import { ICompanyInfo } from "@/lib/models/interfaces/ICompanyInfo";
import { IProductCategory } from "@/lib/models/interfaces/IProductCategory";

interface FooterContainerProps {
  companyInfo: ICompanyInfo;
  productCategories: IProductCategory[];
}

const FooterContainer: React.FC<FooterContainerProps> = ({
  companyInfo,
  productCategories,
}) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  const allCategory = productCategories.find(
    (category) => category.categoryId === "all"
  );

  const allCategoryChildren = allCategory?.children || [];

  const filteredCategories = productCategories.filter((category) =>
    allCategoryChildren.includes(category.categoryId)
  );

  const content = filteredCategories.map((category) => category.name);

  return (
    <div className="mx-auto p-px m-3">
      <Container className="max-w-container">
        <Box
          component="footer"
          className="flex justify-between w-full"
          sx={{ position: "sticky", bottom: 0, pt: 2 }}
        >
          <Grid container spacing={2} className="justify-between">
            {/* LOGO Section */}
            <Grid
              item
              xs={12}
              sm={12}
              md={2}
              mx={5}
              mt={1}
              sx={{ textAlign: { xs: "center", sm: "center", md: "left" } }}
            >
              <Box sx={{ display: "inline-block" }}>
                <WhiteLogo />
              </Box>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                sx={{ mt: 2 }}
              >
                Follow us on social media
              </Typography>
              <IconButton aria-label="facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton aria-label="instagram">
                <InstagramIcon />
              </IconButton>
            </Grid>

            {/* Service */}
            <Grid item xs={12} sm={12} md={2}>
              <FooterMenuItem title="SERVICES" icon={false} content={content} />
            </Grid>

            {/* Information */}
            <Grid item xs={12} sm={12} md={2}>
              <FooterMenuItem
                title="INFORMATION"
                icon={false}
                content={["Order Tracking", "About us", "Contact us", "Blog"]}
              />
            </Grid>

            {/* Help */}
            <Grid item xs={12} sm={12} md={2}>
              <FooterMenuItem
                title="HELP"
                icon={false}
                content={["FAQ", "Shipping", "Return Policy", "Contact Us"]}
              />
            </Grid>
            {/* Contact */}
            <Grid item xs={12} sm={12} md={2}>
              <FooterMenuItem
                title="CONTACT US"
                icon={true}
                content={[
                  {
                    label: "Call " + `${companyInfo.phone}`,
                    iconType: "call",
                    href: `tel:${companyInfo.phone}`,
                  },
                  {
                    label: `${companyInfo.email}`,
                    iconType: "mail",
                    href: `mailto:${companyInfo.email}`,
                  },
                  {
                    label: `${companyInfo.address}`,
                    iconType: "location",
                    href: `https://www.google.com/maps/search/?api=1&query=${companyInfo.address}`,
                  },
                ]}
              />
            </Grid>

            <Grid item xs={12} sx={{ mx: 3 }}>
              <Divider />
            </Grid>

            {/* Copyright and Conditions */}
            <Grid
              item
              xs={12}
              marginX={3}
              container
              justifyContent="space-between"
              alignItems="center"
              sx={{ textAlign: { xs: "center", md: "left" } }}
            >
              <Grid item>
                <UiCopyright />
              </Grid>
              <Grid item>
                <Grid container spacing={2}>
                  <Grid item>
                    <Link href="#" variant="subtitle1" color="textSecondary">
                      Home
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="subtitle1" color="textSecondary">
                      Privacy Policy
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="subtitle1" color="textSecondary">
                      Terms of Use
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default FooterContainer;
