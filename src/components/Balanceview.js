import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const Balanceview = ({ accounts }) => {

    return (
        
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Account Name</strong></TableCell>
                        <TableCell align="right"><strong>Type</strong></TableCell>
                        <TableCell align="right"><strong>Available</strong></TableCell>
                        <TableCell align="right"><strong>Current</strong></TableCell>
                        <TableCell align="right"><strong>Limit</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {accounts.map((row) => (
                        <TableRow
                            key={row.account_id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>

                            <TableCell align="right">{row.type}</TableCell>
                            <TableCell align="right"> {row.balances.available}{row.balances.iso_currency_code}</TableCell>
                            <TableCell align="right">{row.balances.current}{row.balances.iso_currency_code}</TableCell>
                            <TableCell align="right">{row.balances.limit}{row.balances.iso_currency_code}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Balanceview