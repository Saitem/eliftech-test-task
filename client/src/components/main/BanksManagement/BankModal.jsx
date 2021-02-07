import React, {useState } from 'react'
import Modal from 'react-modal'
const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };


export const BankModal = ({ isOpen, closeModal, editBank, bank, setBank }) => {


    return (
          <Modal
                isOpen={isOpen}
                ariaHideApp={false}
                onRequestClose={closeModal}
                style={customStyles}
            >

                Bank name:
            <input
                    type="text"
                    value={bank.name}
                    onChange={e => setBank({...bank, name: e.target.value})}
                />
                <br/>
                Interest rate: 
            <input 
                type="text"
                value={bank.interestRate}
                onChange={e => setBank({...bank, interestRate: e.target.value})}
            />
            <br/>
            Maximum loan: 
            <input 
                type="text"
                value={bank.maximumLoan}
                onChange={e => setBank({...bank, maximumLoan: e.target.value})}
            />
            <br/>
            Minimum down payment: 
            <input 
                type="text"
                value={bank.minimumDownPayment}
                onChange={e => setBank({...bank, minimumDownPayment: e.target.value})}
            />
                <button onClick={() => (editBank(bank), closeModal())}>Edit</button>
                <button onClick={() => closeModal()}>Close</button>
            </Modal> 
    )}
