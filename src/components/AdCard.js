import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Box from '@mui/material/Box';

export default function AdCard(props) {
  return (
    <Box sx={{boxShadow: 2}}>
      <Card>
        <CardMedia
          component="img"
          alt="green iguana"
          image={`http://localhost:8000/ads/?r=${props.imageId}`}
        />
        <CardContent>
          <Typography variant="overline">
            sponsored ad
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}