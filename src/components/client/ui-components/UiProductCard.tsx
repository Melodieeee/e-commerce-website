import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  CardActions,
  Box,
  colors,
} from "@mui/material";
import Link from "next/link";

interface ProductCardProps {
  product: {
    productId: string;
    productName: string;
    productCoverPic: string;
    minSelection: [string, number];
    // Add other product properties as needed
  };
}

const MultiActionAreaCard: React.FC<ProductCardProps> = ({ product }) => {
  const productName = product.productName.toLowerCase().split(" ").join("-");

  return (
    <Card sx={{ maxWidth: 220 }}>
      <Link href={`/client/product/${productName}?id=${product.productId}`}>
        <CardActionArea>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CardMedia
              component="img"
              image={product.productCoverPic}
              alt={product.productName}
              sx={{ width: 220, height: 150, objectFit: "cover" }}
            />
          </Box>
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              align="center"
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {product.productName}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              {product.minSelection[0]} starts at ${product.minSelection[1]}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions >
          <Box          
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginBottom: 1,
              marginTop: 0,
            }}
          >
            <Button sx={{ fontFamily: "inherit" }} className="text-primary border-primary" variant="outlined" size="small" color="secondary">
              Customize
            </Button>
          </Box>
        </CardActions>
      </Link>
    </Card>
  );
};

export default MultiActionAreaCard;
