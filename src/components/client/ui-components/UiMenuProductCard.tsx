import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import { IProduct } from "@/lib/models/interfaces/IProduct";
import { paths } from "@/paths";
import { Typography } from "@mui/material";

interface ProductCardProps {
  products: IProduct[]; 
}

const ProductCard: React.FC<ProductCardProps> = ({ products }) => { 

  const getProductUrl = (productId: string) => {
    for (const product of products) {
      if (product.productId.includes(productId)) {
        return `/client/product/${product.productName.toLowerCase().split(" ").join("-")}?id=${product.productId}`;
      }
    }
    return paths.errors.notFound;
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 2fr))', gap: '10px'}}>
      {products.map((product) => (
        <Card
          key={product.productId}
          orientation="horizontal"
          variant="outlined"
          size="sm"
          sx={{ width: 200}}
          onClick={() => (window.location.href = getProductUrl(product.productId))}
          style={{ cursor: 'pointer' }}
        >
          <CardOverflow>
            <AspectRatio ratio="1" sx={{ width: 70 }}>
              <img src={product.productCoverPic} alt={product.productName} loading="lazy"/>
            </AspectRatio>
          </CardOverflow>
          <CardContent>
            <Typography variant="body2" sx={{ fontFamily: "Montserrat" }}>
              {product.productName}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductCard;
