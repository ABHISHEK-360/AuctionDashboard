import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 12,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    align: 'center',
    marginTop: theme.spacing.unit * 1,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
    height: "10px"
  },
});

function CustomizedTable(props) {
  console.log('props in table', props);
  const { classes, players } = props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>S/N</CustomTableCell>
            <CustomTableCell>ID</CustomTableCell>
            <CustomTableCell>Player Name</CustomTableCell>
            <CustomTableCell>WhatsApp</CustomTableCell>
            <CustomTableCell align="right">Department</CustomTableCell>
            <CustomTableCell align="right">Role</CustomTableCell>
            <CustomTableCell align="right">Hostel</CustomTableCell>
            <CustomTableCell align="right">Price</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((row, index) => (
            <TableRow className={classes.row} key={row.id}>
              <CustomTableCell component="th" scope="row">
                {index+1}
              </CustomTableCell>
              <CustomTableCell component="th" scope="row">
                {row.id}
              </CustomTableCell>
              <CustomTableCell component="th" scope="row">
                {row.name}
              </CustomTableCell>
              <CustomTableCell component="th" scope="row">
                {row.whatsApp}
              </CustomTableCell>
              <CustomTableCell align="right">{row.dept}</CustomTableCell>
              <CustomTableCell align="right">{row.role}</CustomTableCell>
              <CustomTableCell align="right">{row.hostel}</CustomTableCell>
              <CustomTableCell align="right">{row.price}</CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);
