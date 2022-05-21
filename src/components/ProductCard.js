import { Box, Card, CardContent, Typography } from "@mui/material";

export default function ProductCard(props) {
  return (
    <Card sx={{boxShadow: 2, height: '100%'}}>
      <CardContent>        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 1}}>
          <Typography variant="caption" display="block">
            {props.size}px
          </Typography>
          <Typography variant="caption" display="block">
            {props.date}
          </Typography>
        </Box>
        <Typography align="right" variant="h6" color="secondary" display="block">
          ${props.price}
        </Typography>
        <Typography align="center" sx={{ fontSize: props.size, paddingTop: 2}}>
          {props.face}
        </Typography>
      </CardContent>
    </Card>
  );
}