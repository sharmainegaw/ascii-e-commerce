import { Card, CardContent, Typography } from "@mui/material";

export default function ProductCard(props) {
  return (
    <Card>
      <CardContent>
        <Typography align="center" sx={{ fontSize: props.size }}>
          {props.face}
        </Typography>
        <p>{props.price}</p>
        <p>{props.size}</p>
        <p>{props.date}</p>
      </CardContent>
    </Card>
  );
}