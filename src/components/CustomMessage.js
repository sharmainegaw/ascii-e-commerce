import { Box, Typography } from "@mui/material";

export default function CustomMessage(props) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: 8 }}>
      <Typography
        align="center"
        variant="h5"
      >
        {props.message}
      </Typography>
    </Box>
  );
}
