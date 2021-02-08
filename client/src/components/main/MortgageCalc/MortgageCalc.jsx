import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button';

export const MortgageCalc = ({ banks, monthlyPayment, bank, setBank, handleClick, error }) => {
    const [initalLoan, setInitialLoan] = useState('')
    const [downPayment, setDownPayment] = useState('')
  
    return (
        <>
            <Box display="flex" justifyContent="center">
                <br />

                <TextField
                    id="filled-basic"
                    label="Initial loan:"
                    variant="filled"
                    value={initalLoan}
                    type='number'
                    onChange={e => setInitialLoan(e.target.value)}
                />

                <br />

                <TextField
                    id="filled-basic"
                    label="Down payment::"
                    variant="filled"
                    value={downPayment}
                    onChange={e => setDownPayment(e.target.value)}
                />
                <br />
                <select>
                    {banks.map(bank => (
                        <option value={bank.name} onClick={() => setBank(bank)}>{bank.name}</option>
                    ))}
                </select>
                <Button variant="contained" color="primary"
                    onClick={() => handleClick(initalLoan, bank.interestRate, bank.loanTerm, downPayment)}
                >Calculate</Button>
            </Box>
            <Box display="flex" justifyContent="center" color='red'>{error}</Box>
        </>
    )
}