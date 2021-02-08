import { LinearProgress } from '@material-ui/core'
import React, { useState } from 'react'
import { MortgageCalc } from './MortgageCalc'
import { MortgageTable } from './MortgageTable'
import { MortgageHistory } from './MortgageHistory'

export const MortgagePage = ({ banks, monthlyPayment, setBank, bank, createMortgage, historyTable, removeMortgage }) => {
    const [error, setError] = useState('')
    const [tableObj, setTableObj] = useState([])

    const handleValidation = (initialLoan, interestRate, loanTerm, downPayment) => {
        let isValid = true
        let minDownPayment = interestRate / 100 * initialLoan
        if(initialLoan === '' || downPayment === '') {
            isValid = false
            setError(`You haven't entered anything!`)
        }
        if(initialLoan > bank.maximumLoan) { 
            isValid = false
            setError(`Initial loan bigger than ${bank.maximumLoan}`)
        }
        if(minDownPayment > downPayment) { 
            isValid = false
            setError(`Down payment is less than the minimum ${minDownPayment}`)
        }
        if(initialLoan < 0) {
            isValid = false
            setError('Initial loan less than zero ')
        }
        if(isValid) {
            setError('')
            handleClick(initialLoan, interestRate, loanTerm, downPayment)
        }
    }

    const handleClick  = (initialLoan, interestRate, loanTerm, downPayment) => {
        const monthPay = +monthlyPayment(+initialLoan, +interestRate, +loanTerm)
        let arr = []
        const _ = [...Array(loanTerm).keys()].map(i => i + 1).forEach((el, i) => {
            i+=1
            
            const prevLoanBalance = i === 1 ? initialLoan : arr[i - 2].loanBalance
            const prevEquity = i === 1 ? downPayment : arr[i - 2].equity
     
            const rate = (interestRate / 12 / 100).toFixed(5)

            const interestPayment = prevLoanBalance * rate
            
            const loanBalance = prevLoanBalance - (monthPay - interestPayment) > 1 ? (prevLoanBalance - (monthPay - interestPayment)) : 0
            
            const equity = +prevEquity + (+monthPay - +interestPayment)

            arr.push({
                month: i,
                totalPayment: monthPay.toFixed(2),
                interestPayment: interestPayment.toFixed(2),
                loanBalance: loanBalance.toFixed(2),
                equity: equity.toFixed(2)
            })
        })

        setTableObj(arr)
 
        createMortgage({
            initialLoan,
            downPayment,
            historyTable: arr,
            bank: {
                name: bank.name,
                interestRate: bank.interestRate,
                loanTerm: bank.loanTerm
            },
            user_id: JSON.parse(localStorage.getItem('token')).user._id
        })
    }

    const showTable = id => {
        const table = historyTable.find(el => el._id === id)
        setTableObj(table.historyTable)
    }

    return (
        <div>
            <MortgageCalc
                banks={banks}
                monthlyPayment={monthlyPayment}
                setBank={setBank}
                bank={bank}
                handleClick={handleValidation}
                error={error}
            />
            <MortgageTable
                bank={bank}
                tableObj={tableObj}
            />
            <MortgageHistory
                historyTable={historyTable}
                removeMortgage={removeMortgage}
                showTable={showTable}
            />
        </div>
    )
}
