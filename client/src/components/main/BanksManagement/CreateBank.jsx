import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';


export const CreateBank = ({createBank, bank, setBank}) => {
    const classes = useStyles();
    const [error, setError] = useState('')

    const constraintСheck = (value, key, type, min, max) => {
        if(value <= max && value >= min || type === 'string') {
            setBank({...bank, [key]: value})
        } else {
            return 
        }
    }

    return (
        <div>
            Name:<input
                type="text"
                value={bank.name}
                onChange={e => constraintСheck(e.target.value, 'name', 'string')}
            />
            
            Interest rate: <input
                type="number"
                value={bank.interestRate}
                onChange={e => constraintСheck(+e.target.value, 'interestRate', 'number', 1, 100)}
            />
            Maximum loan: <input
                type="number"
                value={bank.maximumLoan}
                onChange={e => constraintСheck(+e.target.value, 'maximumLoan', 'number', 1, 10000000)}
            />
            Minimum down payment: <input
                type="number"
                value={bank.minimumDownPayment}
                onChange={e => constraintСheck(+e.target.value, 'minimumDownPayment', 'number', 1, 100)}
            />
            Loan term: <input
                type="number"
                value={bank.loanTerm}
                onChange={e => constraintСheck(+e.target.value, 'loanTerm', 'number', 1, 100)}
            />
            {error}
            <button onClick={() => createBank(bank)}>Create</button>
        </div>
    );
}
