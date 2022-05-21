import { Box, Card, CardContent, Typography } from "@mui/material";

export default function ProductCard(props) {
  return (
    <Card sx={{boxShadow: 2, height: '100%'}}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
          <p>{props.size}px</p>
          <p>${props.price}</p>
        </Box>
        <Typography align="center" sx={{ fontSize: props.size }}>
          {props.face}
        </Typography>
        <Typography align="right" variant="caption" display="block">
          {props.date}
        </Typography>
      </CardContent>
    </Card>
  );
}