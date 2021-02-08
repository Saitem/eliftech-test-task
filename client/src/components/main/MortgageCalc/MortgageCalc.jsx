import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button';

export const MortgageCalc = ({ banks, monthlyPayment, bank, setBank, handleClick, error }) => {
    const [initalLoan, setInitialLoan] = useState('')
    const [downPayment, setDownPayment] = useState('')
    const [checkError, setCheckError] = useState('')
    const checkInitialLoan = (value) => {
        if(initalLoan > bank.maximumLoan) {
            setCheckError(`Initial loan is bigger than ${bank.maximumLoan}!`)
        } else if(initalLoan < 0) {
            setCheckError('The down payment cannot be less than zero ')
        }

        setInitialLoan(value)
    }

    // const checkDownPayment = (value) => {
    //     let minPayment = +bank.minimumDownPayment / 100 * (+initialLoan)
    //     if(initalLoan > bank.maximumLoan) {
    //         setCheckError(`Down payment is bigger than ${bank.maximumLoan}!`)
    //     } else if(initalLoan < 0) {
    //         setCheckError('The down payment cannot be less than zero ')
    //     }

    //     setInitialLoan(value)
    // }

    return (
        <Box display="flex" justifyContent="center">
            <br />
            
            <TextField 
                id="filled-basic" 
                label="Initial loan:" 
                variant="filled" 
                value={initalLoan}
                type='number'
                onChange={e => checkInitialLoan(e.target.value)}
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
            {checkError}           
        </Box>
    )
}
