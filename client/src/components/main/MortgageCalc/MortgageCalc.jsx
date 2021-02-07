import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'

export const MortgageCalc = ({ banks, monthlyPayment, bank, setBank, handleClick, result, error }) => {
    const [initalLoan, setInitialLoan] = useState('')
    const [downPayment, setDownPayment] = useState('')


 
    return (
        <Box justifyContent="flex-end">
            <br />
            
            <TextField 
                id="filled-basic" 
                label="Initial loan:" 
                variant="filled" 
                value={initalLoan}
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
            <button
                onClick={() => handleClick(initalLoan, bank.interestRate, bank.loanTerm, downPayment)}
            >Calculate</button>
            {error}
            <br/>
            {result}
           
        </Box>
    )
}
