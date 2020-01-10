import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AppContext, actionTypes } from './AppContext';

const columns = [
  {
    id: 'name',
    label: 'Name',
    minWidth: 170
  },
  {
    id: 'displayName',
    label: 'Display Name',
    minWidth: 100
  },
  {
    id: 'description',
    label: 'Description',
    minWidth: 170,
  },
  {
    id: 'dataType',
    label: 'Data Type',
    minWidth: 80,
  },
  {
    id: 'indexed',
    label: 'Indexed',
    minWidth: 80,
    format: true
  },
  {
    id: 'sortable',
    label: 'Sortable',
    minWidth: 80,
    format: true
  },
  {
    id: 'required',
    label: 'Required',
    minWidth: 80,
    format: true
  },
  {
    id: 'requestContext',
    label: 'Request Context',
    minWidth: 120,
    format: true
  },
  {
    id: 'constraints',
    label: 'Constraints',
    // minWidth: 170,
    format: true
  },
  {
    id: 'actions',
    label: '',
    minWidth: 200
  }
];

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  tableWrapper: {
    maxHeight: 850,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function AttributesDataGrid() {
  const [{ attributes }, dispatch] = useContext(AppContext)
  const [page, setPage] =  React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [attribute, setAttribute] = useState()
  const [dialog, setDialog] = useState({ delete: false, product: false});
  const classes = useStyles();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const handleDeleteClick = (rowData) => {
    setDialog({ ...dialog, delete: true })
    setAttribute(rowData)
  }

  const handleOnDeleteCancel = () => {
    setAttribute()
    setDialog({...dialog, delete: false})
  }

  const handleOnDeleteConfirm = () => {
    dispatch({
      type: actionTypes.DELETE_ATTRIBUTE,
      payload: attribute
    })
    setAttribute()
    setDialog({...dialog, delete: false})
  }

  return (
    <Paper className={classes.root}>
      <div className={classes.tableWrapper}>
      <Toolbar>
        <Typography variant="h6">
          Table of Attributes
        </Typography>
      </Toolbar>
        <Table stickyHeader aria-label="sticky table" height="80vh">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {attributes?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map(column => {
                    const value = row[column.id];
                      return (column.id === 'actions') ? (
                        <TableCell>
                          <Button
                            variant="outlined"
                            color="primary"
                            className={classes.button}
                            // onClick={(e) => handleEditClick(row)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outlined"
                            color="secondary"
                            className={classes.button}
                            onClick={(e) => handleDeleteClick(row)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      ) : (
                        <TableCell key={column.id} align={column.align}>
                          {
                            (column.format && Array.isArray(value)) && (value.map(val => (
                              <div >&bull; {val.constraintType.name}("{val.value}")</div>
                            )))
                          }
                          {
                            column.format && typeof value === "boolean" && JSON.stringify(value)
                          }
                          {
                            !column.format && value
                          }
                        </TableCell>
                      )
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={attributes?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      {/* <Dialog open={dialog.category} onClose={() => setDialog({...dialog, product: false})}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="name"
                label="Name"
                fullWidth
                value={product?.name || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="displayName"
                label="Display Name"
                fullWidth
                value={product?.displayName || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="description"
                label="Description"
                fullWidth
                value={product?.description || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <p>Assigned Events</p>
              {
                state?.attributes?.map(item => (
                  <div>
                    <Checkbox
                      checked={product?.attributes?.includes(item.name)}
                      onChange={() => handleAssignedEventChange(item.name)}
                      color="primary"
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    {item.displayName}
                  </div>
                ))
              }
            </Grid>

          </Grid>
          <DialogActions>
            <Button onClick={() => setDialog({...dialog, product: false})} variant="contained">
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              color="primary"
              variant="contained"
            >
              Save
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
*/}
      <Dialog
        open={dialog.delete}
        onClose={() => setDialog({...dialog, delete: false})}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Delete Event?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this event?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleOnDeleteCancel}
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            onClick={handleOnDeleteConfirm}
            color="secondary"
            variant="contained"
            autoFocus
          >
            Yes, delete.
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}