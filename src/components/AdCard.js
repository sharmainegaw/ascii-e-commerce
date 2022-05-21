import { Card, CardContent, Grid, Typography } from "@mui/material";
import Box from '@mui/material/Box';

export default function AdCard(props) {
  return (
    <Box sx={{boxShadow: 2}}>
      <Card>
        <CardContent>
          <Typography variant="overline">
            sponsored
          </Typography>
          <img
            className='ad'
            src={`http://localhost:8000/ads/?r=${props.imageId}`}
            alt='ad'/>
        </CardContent>
      </Card>
    </Box>
  );
}