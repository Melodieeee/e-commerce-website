import React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      {/* TODO: Change to actural URI */}
      <Link color="inherit" href="https://mui.com/">
        Imaginarium Of Vancouver
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
