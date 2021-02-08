import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box'
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

  title: {
    margin: theme.spacing(4, 0, 2),
  },
  block: {
    margin: '10px',
    background: "white",
    display: "inline-block",
    boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
    borderRadius: '5px'
  },
  data: {
    margin: '10px',
  },

}))

export const MortgageHistory = ({ historyTable, showTable, removeMortgage }) => {
  const classes = useStyles();


  return (

    <Grid item>
        <Box display='flex'>
          {
            historyTable.map(history => (
              <Box className={classes.block}>
                <div className={classes.data}>
                  <ListItemText className={classes.listItem}>Bank name: {history.bank.name}</ListItemText>
                  <ListItemText>Loan: {history.initialLoan}</ListItemText>
                  <ListItemText>Down payment: {history.downPayment}</ListItemText>
                  <ListItemText>Interest Rate: {history.bank.interestRate}</ListItemText>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => showTable(history._id)}
                  >Show</Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => removeMortgage(history._id)}
                  >Remove</Button>
                </div>
              </Box>
            ))
          }
        </Box>
    </Grid>

  );
}

