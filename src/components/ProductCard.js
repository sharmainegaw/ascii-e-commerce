import { Card, CardContent, Grid, Typography } from "@mui/material";
import Box from '@mui/material/Box';

export default function ProductCard(props) {
  return (
    <Box sx={{boxShadow: 2}}>
      <Card>
        <CardContent>
          <Typography align="center" sx={{ fontSize: props.size }}>
            {props.face}
          </Typography>
          <Grid container justifyContent="space-between">
            <div>
              <Typography variant="overline" display="block">
                size
              </Typography>
              {props.size}px
            </div>
            <p>${props.price}</p>
          </Grid>
          <Typography align="right" variant="caption" display="block">
            {props.date}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}