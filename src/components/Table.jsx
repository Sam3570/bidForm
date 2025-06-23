import React, { useState, useEffect } from 'react';
import { Select, MenuItem, Button } from '@mui/material';
import axios from 'axios';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  TablePagination,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';

const columns = [
  { id: 'bidNumber', label: 'Bid Number' },
  { id: 'rfpDocFile', label: 'PDF' },
  { id: 'bidEndDate', label: 'Bid End Date' },
  { id: 'location', label: 'Location' },
  { id: 'department', label: 'Department' },
  { id: 'address', label: 'Address' },
  { id: 'bidType', label: 'Bid Type' },
  { id: 'itemCategory', label: 'Item Category' },
  { id: 'specification', label: 'Specification' },
  { id: 'quantity', label: 'Quantity' },
  { id: 'catalogueSpecLink', label: 'Catalogue Speclink' },
  { id: 'price', label: 'Price' },
  { id: 'bidPrice', label: 'Bid Price' },
  { id: 'emd', label: 'EMD' },
  { id: 'bidStatus', label: 'Bid Status' },
  { id: 'ourStatus', label: 'Our Status' },
  { id: 'liBidder', label: 'L1 Bidder' },
  { id: 'liModel', label: 'L1 Model' },
  { id: 'liPrice', label: 'L1 Price' },
  { id: 'conclusion', label: 'Conclusion' },
  { id: 'actions', label: 'Actions' }
];

const EditableTable = ({search,handleOpen,setModalData}) => {
  // --------------
  // const [onHover,setOnHover] = useState(false)
  // --------------


  const [data, setData] = useState([]);
  const [editRowId, setEditRowId] = useState(null);
  const [editedRow, setEditedRow] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    axios.get('https://ixkkba6jb4.execute-api.ap-south-1.amazonaws.com/api/fetch-bids')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleEditClick = (row) => {
    setEditRowId(row.bidId);
    setEditedRow({ ...row });
  };

  const handleCancelClick = () => {
    setEditRowId(null);
    setEditedRow({});
  };

  const handleSaveClick = async () => {
    try {
        console.log("save-button")
      await axios.put(`https://ixkkba6jb4.execute-api.ap-south-1.amazonaws.com/api/update-bid/${editRowId}`, editedRow);
      const updatedData = data.map(item => item._id === editRowId ? editedRow : item);
      setData(updatedData);
      handleCancelClick();
    } catch (error) {
      console.error('Error updating row:', error);
    }
  };

  const handleChange = (e) => {
    setEditedRow({ ...editedRow, [e.target.name]: e.target.value });
  };

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };


      const lowerSearch = search.toLowerCase();

      const filteredItems = data.filter((item) =>
        item.bidNumber?.toLowerCase().includes(lowerSearch) ||
        item.specification?.toLowerCase().includes(lowerSearch) ||
        item.makeModel?.toLowerCase().includes(lowerSearch) || 
        item.location?.toLowerCase().includes(lowerSearch) ||
        item.department?.toLowerCase().includes(lowerSearch) ||
        item.address?.toLowerCase().includes(lowerSearch) ||
        item.bidType?.toLowerCase().includes(lowerSearch) ||
        item.itemCategory.toLowerCase().includes(search.toLowerCase())
      );

  const paginatedRows = filteredItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
// d-flex justify-items-center
  return (
    <section className='w-full p-6 '>
      <div className='overflow-y-auto max-h-[400px]'>
      {/* <div className='justify-self-start py-6'><h1 className='text-3xl'>Active Bid</h1></div> */}
    <Paper className="w-full overflow-hidden shadow-md rounded-lg">
      <TableContainer className="max-h-[440px]">
        <Table className='min-w-full' stickyHeader>
          <TableHead >
            <TableRow >
              {columns.map(column => (
                <TableCell key={column.id} className="font-semibold"
                sx={{
                  whiteSpace: 'nowrap',      // prevents wrapping
                  width: column.width || 'auto', // set appropriate width if needed
                  backgroundColor: '#F8FAFC',
                  fontWeight: 'bold',
                  
                }}
                >
                  {column.id === 'bidNumber' ? (
                    <span className="flex items-center gap-1">
                      {column.label} <UnfoldMoreIcon className="cursor-pointer text-sm" />
                    </span>
                  ) : column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map(row => (
              <TableRow key={row.bidId} hover>
                <TableCell>
                  {editRowId === row.bidId ? (
                    <TextField name="bidNumber" value={editedRow.bidNumber} onChange={handleChange} size="small" />
                  ) : (
                    row.bidNumber
                  )}
                </TableCell>

                <TableCell>
                  <a href={row.rfpDocFile} target="_blank" rel="noopener noreferrer">
                    <PictureAsPdfIcon className="text-blue-600" />
                  </a>
                </TableCell>
                  
                <TableCell>
                  {editRowId === row.bidId ? (
                    <TextField name="bidEndDate" value={editedRow.bidEndDate} onChange={handleChange} size="small" />
                  ) : (
                    row.bidEndDate.replace("T"," ")
                  )}
                </TableCell>

                <TableCell>
                  {editRowId === row.bidId ? (
                    <TextField name="location" value={editedRow.location} onChange={handleChange} size="small" />
                  ) : (
                    row.location
                  )}
                </TableCell>


                <TableCell>
                  {editRowId === row.bidId ? (
                    <TextField name="department" value={editedRow.department} onChange={handleChange} size="small" />
                  ) : (
                    // <p onMouseEnter={()=>{setOnHover(true)}} onMouseLeave={()=>{setOnHover(false)}} >{onHover?row.department:row.department.slice(0,9)+"...."}</p>
                  <button onClick={()=>{setModalData(row.department);handleOpen()}}>Show Details</button>
                  )}
                </TableCell>
                <TableCell>
                  {editRowId === row.bidId ? (
                    <TextField name="address" value={editedRow.address} onChange={handleChange} size="small" />
                  ) : (
                    row.address.slice(0,9)
                  )}
                </TableCell>

              <TableCell>
            {editRowId === row.bidId ? (
              <Select
                value={editedRow.bidType || ""}
                onChange={handleChange}
                size="small"
                name="bidType"
                fullWidth
                displayEmpty
              >
                <MenuItem value="" disabled>Bid Type</MenuItem>
                <MenuItem value="CATEGORIZED">CATEGORIZED</MenuItem>
                <MenuItem value="BOQ">BOQ</MenuItem>
                <MenuItem value="MP TENDER">MP TENDER</MenuItem>
                <MenuItem value="FINANCIAL">FINANCIAL</MenuItem>
              </Select>
            ) : (
              row.bidType
            )}
              </TableCell>

              <TableCell>
                  {editRowId === row.bidId ? (
                    <TextField name="itemCategory" value={editedRow.itemCategory} onChange={handleChange} size="small" />
                  ) : (
                    row.itemCategory
                  )}
                </TableCell>

                <TableCell>
                  {editRowId === row.bidId ? (
                    <TextField name="specification" value={editedRow.specification} onChange={handleChange} size="small" />
                  ) : (
                    row.specification
                  )}
                </TableCell>

                <TableCell>
                  {editRowId === row.bidId ? (
                    <TextField name="quantity" value={editedRow.quantity} onChange={handleChange} size="small" />
                  ) : (
                    row.quantity
                  )}
                </TableCell>

                <TableCell>
                  {editRowId === row.bidId ? (
                    <TextField name="catalogueSpecLink" value={editedRow.catalogueSpecLink} onChange={handleChange} size="small" />
                  ) : (
                    <a target="_blank" href={row.catalogueSpecLink} >Link</a>
                  )}
                </TableCell>


                <TableCell>
                  {editRowId === row.bidId ? (
                    <TextField name="price" value={editedRow.price} onChange={handleChange} size="small" />
                  ) : (
                    row.price
                  )}
                </TableCell>

                  {/* ----------------- */}
                <TableCell>
                  {editRowId === row.bidId ? (
                    <TextField name="bidPrice" value={editedRow.bidPrice} onChange={handleChange} size="small" />
                  ) : (
                    row.bidPrice
                  )}
                </TableCell>


                <TableCell>
                  {editRowId === row.bidId ? (
                    <TextField name="emd" value={editedRow.emd} onChange={handleChange} size="small" />
                  ) : (
                    row.emd
                  )}
                </TableCell>

                <TableCell>
                  {editRowId === row.bidId ? (
                    <TextField name="bidStatus" value={editedRow.bidStatus} onChange={handleChange} size="small" />
                  ) : (
                    row.bidStatus
                  )}
                </TableCell>

                <TableCell>
                  {editRowId === row.bidId ? (
                    <TextField name="ourStatus" value={editedRow.ourStatus} onChange={handleChange} size="small" />
                  ) : (
                    row.ourStatus
                  )}
                </TableCell>


                <TableCell>
                  {editRowId === row.bidId ? (
                    <TextField name="liBidder" value={editedRow.liBidder} onChange={handleChange} size="small" />
                  ) : (
                    row.liBidder
                  )}
                </TableCell>


                <TableCell>
                  {editRowId === row.bidId ? (
                    <TextField name="liModel" value={editedRow.liModel} onChange={handleChange} size="small" />
                  ) : (
                    row.liModel
                  )}
                </TableCell>


                <TableCell>
                  {editRowId === row.bidId ? (
                    <TextField name="liPrice" value={editedRow.liPrice} onChange={handleChange} size="small" />
                  ) : (
                    row.liPrice
                  )}
                </TableCell>


                <TableCell>
                  {editRowId === row.bidId ? (
                    <TextField name="conclusion" value={editedRow.conclusion} onChange={handleChange} size="small" />
                  ) : (
                    row.conclusion
                  )}
                </TableCell>

                {/* ------------------------------------------------ */}






                <TableCell>
                  {editRowId === row.bidId ? (
                    <div className="flex gap-2">
                      <IconButton onClick={handleSaveClick}><SaveIcon /></IconButton>
                      <IconButton onClick={handleCancelClick}><CancelIcon /></IconButton>
                    </div>
                  ) : (
                    <IconButton onClick={() => handleEditClick(row)}><EditIcon /></IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Paper>
    </div>
    </section>
  );
};

export default EditableTable;



