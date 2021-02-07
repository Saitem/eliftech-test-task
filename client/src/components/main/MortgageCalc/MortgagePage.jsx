import { LinearProgress } from '@material-ui/core'
import React, { useState } from 'react'
import { MortgageCalc } from './MortgageCalc'
import { MortgageTable } from './MortgageTable'

export const MortgagePage = ({ banks, monthlyPayment, setBank, bank }) => {

    const [monthObj, setMonthObj] = useState([])
    const [error, setError] = useState('')
    const [result, setResult] = useState(0)
    const [tableObj, setTableObj] = useState([])
    const [mortgage, setMortgage] = useState([])

    // const handleClick = (initalLoan, interestRate, loanTerm, downPayment) => {
    //     let minPayment = bank.maximumLoan / 100 * bank.minimumDownPayment
    //     console.log(+initalLoan, interestRate, loanTerm)
    //     if (interestRate < minPayment) {
    //         setError(`Down payment is smaller than ${minPayment}!`)
    //     }
    //     if (+initalLoan > bank.maximumLoan) {
    //         setError(`Initial loan is bigger than ${bank.maximumLoan}!`)
    //     }
    //     // else {
    //         const monthPay = monthlyPayment(+initalLoan, +interestRate, +loanTerm)
    //         console.log('sklsks')
    //         // setResult(monthPay)
    //         table(monthPay, initalLoan, downPayment)
    //         // setMortgage({ monthPay, initalLoan, downPayment })
    //     // }
    // }

    const handleClick = (initialLoan, interestRate, loanTerm, downPayment) => {
        const monthPay = +monthlyPayment(+initialLoan, +interestRate, +loanTerm)
        let arr = []
        const table = [...Array(loanTerm).keys()].map(i => i + 1).forEach((el, i) => {
            i+=1
            
            const prevLoanBalance = i === 1 ? initialLoan : arr[i - 2].loanBalance
            const prevEquity = i === 1 ? downPayment : arr[i - 2].equity
     
            const rate = (interestRate / 12 / 100).toFixed(5)

            const interestPayment = prevLoanBalance * +rate
            
            const loanBalance = prevLoanBalance - (monthPay - interestPayment) > 0 ? (prevLoanBalance - (monthPay - interestPayment)) : 0
    
            arr.push({
                month: i,
                totalPayment: monthPay.toFixed(2),
                interestPayment: interestPayment.toFixed(2),
                loanBalance: loanBalance.toFixed(2),
               
            })
            
        })
        

        setTableObj(arr)
    }


    return (
        <div>
            <MortgageCalc
                banks={banks}
                monthlyPayment={monthlyPayment}
                setBank={setBank}
                bank={bank}
                handleClick={handleClick}
                result={result}
                error={error}
            />
            <MortgageTable
                bank={bank}
                tableObj={tableObj}
            />
        </div>
    )
}
