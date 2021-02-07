import React, { useState } from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import List from '@material-ui/core/List'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Modal from 'react-modal'


const useStyles = makeStyles((theme) => ({
    list: {
        background: "#e8e8e8",
        textAlign: "center"
    },
    item: {
        background: "white",
        display: "inline-block",
        boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)"
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
}))


export const Bank = ({ bank, removeBank, openModal }) => {
    const classes = useStyles()
    console.log(openModal)
    return (
        <List key={bank.id} className={classes.list}>
            <ListItem className={classes.item}>
                <ListItemText>Bank name: {bank.name}</ListItemText>
                <ListItemText>Interest rate: {bank.interestRate}</ListItemText>
                <ListItemText>Maximum loan: {bank.maximumLoan}</ListItemText>
                <ListItemText>Minimum down payment: {bank.minimumDownPayment}</ListItemText>
                <ListItemText>Loan term: {bank.loanTerm}</ListItemText>

                <ListItem>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => removeBank(bank._id)}
                    >
                        Delete
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => 
                            openModal(bank)
                        }
                    >
                        Edit
                    </Button>
                </ListItem>
            </ListItem>
        </List>
    )
}
