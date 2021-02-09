import React from 'react'
import Box from '@material-ui/core/Box'
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
        <Box display="flex" justifyContent="center">
            <table className={classes.table}>
                <thead>
                    <tr className={classes.tr}>
                        <th className={classes.th}>Month</th>
                        <th className={classes.th}>Total payment</th>
                        <th className={classes.th}>Interest payment</th>
                        <th className={classes.th}>Loan balance</th>
                        <th className={classes.th}>Equity</th>
                    </tr>
                </thead>
                <tbody>
                {
                    tableObj.map(el => (
                        <tr 
                            key={el.month}
                            className={classes.tr}
                        >
                            <th className={classes.th}>{el.month}</th>
                            <th className={classes.th}>{el.totalPayment}</th>
                            <th className={classes.th}>{el.interestPayment}</th>
                            <th className={classes.th}>{el.loanBalance}</th>
                            <th className={classes.th}>{el.equity}</th>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </Box>
    )
}
