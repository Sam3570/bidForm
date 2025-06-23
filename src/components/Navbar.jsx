
// New code 

import * as React from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Stack,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DownloadIcon from '@mui/icons-material/Download';

export default function BidDashboardHeader({ setOpen, setSearch,signOut}) {
  return (
    <Box sx={{ p: 3,}}>
      {/* Title and Subtitle */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Bid Tracker Dashboard
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Manage and track all your bids in one place
          </Typography>
        </Box>

        {/* Right-side Buttons */}
        <Stack direction="row" spacing={2}>
          <Button onClick={signOut}><ExitToAppIcon/>Sign Out</Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
          >
            Add Bid
          </Button>
        </Stack>
      </Box>

      {/* Search Bar and Filters */}
      <Box
        mt={2}
        p={2}
        bgcolor="white"
        borderRadius={2}
        display="flex"
        gap={2}
        alignItems="center"
        boxShadow={1}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Search by bid number, specification, location, department..."
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          disabled
        >
          Filters
        </Button>
      </Box>
    </Box>
  );
}
