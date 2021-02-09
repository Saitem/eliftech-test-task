import React, { useState } from 'react'
import { MortgageCalc } from './MortgageCalc'
import { MortgageTable } from './MortgageTable'
import { MortgageHistory } from './MortgageHistory'

export const MortgagePage = ({ banks, monthlyPayment, setBank, bank, createMortgage, historyTable, removeMortgage }) => {
    const [error, setError] = useState('')
    const [tableObj, setTableObj] = useState([])


    
    const handleValidationClick = (initialLoan, interestRate, loanTerm, downPayment) => {
        let isValid = true
        let minDownPayment = (bank.minimumDownPayment / 100) * initialLoan

        if(!bank.name) {
            isValid = false
            setError('Select bank!')
            return 
        }
        if(initialLoan === '' || downPayment === '') {
            isValid = false
            setError(`You haven't entered anything!`)
            return
        }
        if(initialLoan > bank.maximumLoan) { 
            isValid = false
            setError(`Initial loan bigger than ${bank.maximumLoan}`)
            return 
        }
        if(minDownPayment > downPayment) { 
            isValid = false
            setError(`Down payment is less than the minimum ${minDownPayment} = ${bank.minimumDownPayment}%`)
            return 
        }
        if(initialLoan < 0) {
            isValid = false
            setError('Initial loan less than zero ')
            return
        }
        if(isValid) {
            setError('')
            generateTable(initialLoan, interestRate, loanTerm, downPayment)
        }
    }

    const generateTable  = (initialLoan, interestRate, loanTerm, downPayment) => {

        const monthPay = +monthlyPayment(+initialLoan, +interestRate, +loanTerm)
        let arr = []
  
        for(let i = 1; i <= loanTerm; i++) {
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
        }

        setTableObj(arr)

        if(JSON.parse(localStorage.getItem('token')) !== null)
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
                handleClick={handleValidationClick}
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
