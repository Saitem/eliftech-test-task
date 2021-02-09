import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button';

export const MortgageCalc = ({ banks, bank, setBank, handleClick, error }) => {
    const [initalLoan, setInitialLoan] = useState('')
    const [downPayment, setDownPayment] = useState('')

    const getBank = (value) => {
        console.log(value)
        const findedBank = banks.find(bank => bank._id === value)
        setBank(findedBank)
    }

  
    return (
        <>
            <Box display="flex" p={2} justifyContent="center">
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
                <select
                    value={bank._id}
                    onChange={e => getBank(e.target.value)}
                >
                    <option value="value">Enter bank</option>
                    {banks.map(bank => (
                        <option key={bank._id} value={bank._id}>{bank.name}</option>
                    ))}
                </select>
                <Button variant="contained" color="primary"
                    onClick={() => handleClick(initalLoan, bank.interestRate, bank.loanTerm, downPayment)}
                >Calculate</Button>
                {/* <button onCLick={() => getBank()}>click</button> */}
            </Box>
            <Box display="flex" justifyContent="center" color='red'>{error}</Box>
        </>
    )
}