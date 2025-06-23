import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  InputLabel,
  FormControl,
  Grid,
} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 1000,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  borderRadius: 2,
  maxHeight: '90vh',
  overflowY: 'auto',
};

const BidModal = ({ open, onClose }) => {
  const [bidTypeValid, setBidTypeValid] = useState(false);
  const [rfpDocFile, setRfpDocFile] = useState(null);
  const [formFields, setFormFields] = useState({
    bidNumber: '',
    bidEndDate: '',
    location: '',
    department: '',
    address: '',
    bidType: '',
    itemCategory: '',
    makeModel: '',
    specification: '',
    quantity: '',
    catalogueSpecLink: '',
    price: '',
    bidPrice: '',
    emd: '',
    bidStatus: 'OPEN',
    ourStatus: '',
    liBidder: '',
    liModel: '',
    liPrice: '',
    conclusion: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("formFields---->",formFields)
    if (!formFields.bidType) {
      setBidTypeValid(true);
      return alert('Bid Type is required');
    }

    const formData = new FormData();
    for (let key in formFields) formData.append(key, formFields[key]);
    formData.append('rfpDoc', rfpDocFile);

    try {
      console.log(formData)
      const response = await fetch('https://ixkkba6jb4.execute-api.ap-south-1.amazonaws.com/api/create-bid', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert('Bid Created Successfully!');
        window.location.reload();
      } else {
        alert('Failed to create bid!');
        console.error('Error:', data);
      }
    } catch (error) {
      console.error('Network Error:', error);
      alert('Something went wrong! Please try again.');
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style} component="form" onSubmit={handleSubmit}>
        <Typography variant="h6" mb={2} className='bg-blue-500 p-1 text-center rounded'>Create Bid</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}><TextField label="Bid Number" fullWidth name="bidNumber" required onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6}><input type="file" onChange={(e) => setRfpDocFile(e.target.files[0])} /></Grid>
          <Grid item xs={12} sm={6}><TextField label="Bid End Date" fullWidth type="datetime-local" name="bidEndDate" required onChange={handleChange} InputLabelProps={{ shrink: true }} /></Grid>
          <Grid item xs={12} sm={6}><TextField label="Location" fullWidth name="location" required onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6}><TextField label="Department" fullWidth name="department" required onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6}><TextField label="Address" fullWidth name="address" required onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required error={bidTypeValid}>
              <InputLabel>Bid Type</InputLabel>
              <Select name="bidType" value={formFields.bidType} label="Bid Type" onChange={handleChange}>
                <MenuItem value="CATEGORIZED">CATEGORIZED</MenuItem>
                <MenuItem value="BOQ">BOQ</MenuItem>
                <MenuItem value="MP TENDER">MP TENDER</MenuItem>
                <MenuItem value="FINANCIAL">FINANCIAL</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}><TextField label="Item Category" fullWidth name="itemCategory" required onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6}><TextField label="Make Model" fullWidth name="makeModel" required onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6}><TextField label="Specification" fullWidth name="specification" required onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6}><TextField label="Quantity" fullWidth name="quantity" required onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6}><TextField label="Catalogue Spec Link" fullWidth name="catalogueSpecLink" onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6}><TextField label="Price" fullWidth name="price" required onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6}><TextField label="Bid Price" fullWidth name="bidPrice" required onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6}><TextField label="EMD" fullWidth name="emd" required onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6}><TextField label="L1 Bidder" fullWidth name="liBidder" required onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6}><TextField label="L1 Model" fullWidth name="liModel" required onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6}><TextField label="L1 Price" fullWidth name="liPrice" required onChange={handleChange} /></Grid>
          <Grid item xs={12}><TextField label="Conclusion" fullWidth name="conclusion" onChange={handleChange} /></Grid>
        </Grid>
        <Box mt={3} display="flex" justifyContent="space-between">
          <Button variant="contained" className='bg-blue-500' type="submit">Save Bid</Button>
          <Button variant="outlined" color="error" onClick={onClose}>Close</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default BidModal;