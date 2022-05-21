import { Box, CircularProgress } from "@mui/material";

export default function CustomProgress() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: 8}}>
      <CircularProgress />
    </Box>
  );
}
