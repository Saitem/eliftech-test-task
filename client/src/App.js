import React, { useState, useEffect } from 'react'
import {
  Route,
  HashRouter as Router,
  Redirect,
  Switch
} from 'react-router-dom'
import API from './api/API'
import { Header } from './components/layout/Header'
import { BanksManagement } from './components/main/BanksManagement/BanksManagement'
import { BankModal } from './components/main/BanksManagement/BankModal'
import { MortgagePage } from './components/main/MortgageCalc/MortgagePage'
import { SignUp } from './components/auth/SignUp'
import { SignIn } from './components/auth/SignIn'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

function App() {

  const initialBankState = { name: '', interestRate: '', maximumLoan: '', minimumDownPayment: '', loanTerm: '' }

  const [modalIsOpen, setIsOpen] = useState(false)
  const [banks, setBanks] = useState([])
  const [bank, setBank] = useState(initialBankState)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const [historyTable, setHistoryTable] = useState([])
  const [authErr, setAutherr] = useState('')
  const [isLogined, setIsLogined] = useState(false)

  const openModal = (bank) => {
    setIsOpen(true)
    setBank(bank)
  }


  const createMortgage = async (mortgage) => {
    const res = await API.createMortgage('/' + getFormLocalStorage('token').user._id, mortgage, getFormLocalStorage('token').token)
    setHistoryTable([...historyTable, res])
  }

  const removeMortgage = async id => {
    await API.removeMortgageHistory(getFormLocalStorage('token').user._id, id, getFormLocalStorage('token').token)
    getMortHistory()
  }

  const signUp = async (func) => {
    let user = {
      username,
      password,
    }

    const res = await API.signup(user)

    if (res.success) {
      func('/signIn')
      setUsername('')
      setPassword('')
      setAutherr('')
    } else {
      func('/signUp')
      setAutherr(res.err)
      setUsername('')
      setPassword('')
    }
  }

  const addToLocalStorage = value => localStorage.setItem('token', JSON.stringify(value))

  const getFormLocalStorage = value => JSON.parse(localStorage.getItem(value))

  const signIn = async (func) => {
    let user = {
      username,
      password
    }

    if (username.trim() !== '' && password.trim() !== '') {
      const res = await API.signin(user)

      if (res.success) {
        console.log(res)
        setIsLogined(res.success)
        addToLocalStorage(res)
        func('/banks')
        setUsername('')
        setPassword('')
      } else {
        func('/signIn')
        setAutherr('Invalid username or password!')
        setUsername('')
        setPassword('')
      }
    }
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const getBanks = async () => {
    let res = await API.getAll()
    if (res.status === 200)
      setBanks([...res.data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
  }

  const getMortHistory = async () => {
    if (getFormLocalStorage('token') !== null) {
      let data = await API.getMortgageHistory('/' + getFormLocalStorage('token').user._id, getFormLocalStorage('token').token)
      setHistoryTable(data)
    }
  }

  useEffect(() => {
    getBanks()
    getMortHistory()
  }, [])


  const createBank = async () => {
    const isBankRight = Object.keys(bank).some(key => !bank[key])
 
    if (!isBankRight) {
      const newBank = await API.create(bank)
      setBanks([newBank, ...banks])//.sort((a, b) => new Date(b) - new Date(a)))
      setBank(initialBankState)
      setErr('')
    } else {
      setErr('Something went wrong!')
      setBank(initialBankState)
    }
  }

  const removeBank = async id => {
    await API.remove(id)
    getBanks()
  }

  const editBank = async (editedBank) => {

    const res = await API.edit(bank._id, editedBank)

    if (res.status === 200 && bank) {
      const updBank = banks.map(bank => {
        if (bank._id === editedBank._id) {
          bank = editedBank
          return bank
        }
        return bank
      })
      setBanks(updBank)
    }
  }

  const monthlyPayment = (initalLoan, interestRate, loanTerm) => {
    let result = (initalLoan * (interestRate / 100 / 12) * Math.pow(1 + interestRate / 100 / 12, loanTerm)) / (Math.pow(1 + interestRate / 100 / 12, loanTerm) - 1)
    return result.toFixed(2)
  }

  return (

    <Router>
      <div className="App">
        <Header 
          setIsLogined={setIsLogined}
          isLogined={isLogined}
        />
        <Switch>
          <Redirect from='/' to='/banks' exact />
          <Route path='/banks'>
            <BanksManagement
              setBank={b => setBank(b)}
              createBank={createBank}
              banks={banks}
              bank={bank}
              setBank={setBank}
              removeBank={removeBank}
              openModal={openModal}
              err={err}
              is
            />

            <BankModal
              isOpen={modalIsOpen}
              ariaHideApp={false}
              closeModal={closeModal}
              style={customStyles}
              editBank={editBank}
              bank={bank}
              setBank={setBank}
            />
          </Route>
          <Route path='/calc'>
            <MortgagePage
              banks={banks}
              monthlyPayment={monthlyPayment}
              setBank={setBank}
              bank={bank}
              createMortgage={createMortgage}
              historyTable={historyTable}
              removeMortgage={removeMortgage}
            />
          </Route>
          <Route path='/signin'>
            <SignIn
              username={username}
              setUsername={un => setUsername(un)}
              password={password}
              setPassword={pw => setPassword(pw)}
              signIn={signIn}
              authErr={authErr}
            />
          </Route>
          <Route path='/signup'>
            <SignUp
              username={username}
              setUsername={un => setUsername(un)}
              password={password}
              setPassword={pw => setPassword(pw)}
              signUp={signUp}
              authErr={authErr}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
