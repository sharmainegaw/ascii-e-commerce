import { Card, CardContent, Grid, Typography } from "@mui/material";
import Box from '@mui/material/Box';

export default function ProductCard(props) {
  return (
    <Card sx={{boxShadow: 2, height: '100%'}}>
      <CardContent>
        <Grid container justifyContent="space-between">
          <p>{props.size}px</p>
          <p>${props.price}</p>
        </Grid>
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