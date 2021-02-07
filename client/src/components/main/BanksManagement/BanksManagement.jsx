import React from 'react'
import Box from '@material-ui/core/Box';
import { BanksList } from './BanksList'
import { CreateBank } from './CreateBank'

export const BanksManagement = ({ banks, createBank, removeBank, openModal, bank, setBank }) => {
    return (
        <div>
            <CreateBank
                createBank={createBank}
                bank={bank}
                setBank={setBank}
            />
            <Box display="flex" justifyContent="center" m={1} p={1} bgcolor="background.paper">
                <div>
                    BanksManagement
            <BanksList
                    banks={banks}
                    removeBank={removeBank}
                    openModal={openModal}
                    />
                </div>
            </Box>
        </div>
    )
}
