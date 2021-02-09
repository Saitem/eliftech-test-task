import React from 'react';
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button';

export const CreateBank = ({ createBank, bank, setBank }) => {

    const constraintСheck = (value, key, type, min, max) => {
        if (value <= max && value >= min || type === 'string') {
            setBank({ ...bank, [key]: value })
        } else {
            return
        }
    }

    return (
        <Box display="flex" p={2} justifyContent="center">
            <TextField
                id="filled-basic"
                label="Name:"
                variant="filled"
                type="text"
                value={bank.name}
                onChange={e => constraintСheck(e.target.value, 'name', 'string')}
            />

            <TextField
                id="filled-basic"
                label="Interest rate:"
                variant="filled"
                type="number"
                value={bank.interestRate}
                onChange={e => constraintСheck(+e.target.value, 'interestRate', 'number', 1, 100)}
            />
            <TextField
                id="filled-basic"
                label="Maximum loan:"
                variant="filled"
                type="number"
                value={bank.maximumLoan}
                onChange={e => constraintСheck(+e.target.value, 'maximumLoan', 'number', 1, 10000000)}
            />
            <TextField
                id="filled-basic"
                label="Minimum down payment:"
                variant="filled"
                type="number"
                value={bank.minimumDownPayment}
                onChange={e => constraintСheck(+e.target.value, 'minimumDownPayment', 'number', 1, 100)}
            />
            <TextField
                id="filled-basic"
                label="Loan term:"
                variant="filled"
                type="number"
                value={bank.loanTerm}
                onChange={e => constraintСheck(+e.target.value, 'loanTerm', 'number', 1, 100)}
            />
            
            <Button 
                variant="contained" color="primary"
                onClick={() => createBank(bank)}>Create</Button>
            
            
        </Box>
    );
}
