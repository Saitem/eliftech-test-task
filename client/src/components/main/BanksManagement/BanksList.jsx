import React from 'react'
import { Bank } from './Bank'

export const BanksList = ({ banks, removeBank, openModal }) => {
    return (
        <div>
            {banks.map(bank => (
                <Bank
                    key={bank._id}
                    bank={bank}
                    removeBank={removeBank}
                    openModal={openModal}
                />
            ))}
        </div>
    )
}
