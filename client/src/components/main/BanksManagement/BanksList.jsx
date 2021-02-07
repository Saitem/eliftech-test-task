import React from 'react'
import { Bank } from './Bank'

export const BanksList = ({ banks, removeBank, openModal }) => {
    return (
        <div>
            {banks.map(bank => (
                <Bank
                    bank={bank}
                    removeBank={removeBank}
                    openModal={openModal}
                />
            ))}
        </div>
    )
}
