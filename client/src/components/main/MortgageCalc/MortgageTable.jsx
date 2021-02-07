import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
    table: {
        borderCollapse: 'collapse',
        border: '1px solid black'
    },
    th: {
        border: '1px solid black'
    }
}))

export const MortgageTable = ({bank, tableObj}) => {
    const classes = useStyles()

    return (
        <table classNAme={classes.table}>
            <tr className={classes.tr}>
                <th className={classes.th}>Month</th>
                <th className={classes.th}>Total payment</th>
                <th className={classes.th}>Interest payment</th>
                <th className={classes.th}>Loan balance</th>
                <th className={classes.th}>Equity</th>
            </tr>
            {
                tableObj.map(el => (
                    <tr className={classes.tr}>
                        <th className={classes.th}>{el.month}</th>
                        <th className={classes.th}>{el.totalPayment}</th>
                        <th className={classes.th}>{el.interestPayment}</th>
                        <th className={classes.th}>{el.loanBalance}</th>
                        <th className={classes.th}>{el.equity}</th>
                    </tr>
                ))
            }

        </table>
    )
}
