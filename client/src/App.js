import React, { useState, useEffect } from 'react'
import {
  Route,
  BrowserRouter as Router
} from 'react-router-dom'
import API from './api/API'
import { Header } from './components/layout/Header'
import { BanksManagement } from './components/main/BanksManagement/BanksManagement'
import { makeStyles } from '@material-ui/core/styles'
import { BankModal } from './components/main/BanksManagement/BankModal'
import { MortgagePage } from './components/main/MortgageCalc/MortgagePage'
import { SignUp } from './components/auth/SignUp'
import { SignIn } from './components/auth/SignIn'

// import { MortgageTable } from './components/main/MortgageCalc/MortgageTable'

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
  const [modalIsOpen, setIsOpen] = useState(false)
  const [banks, setBanks] = useState([])
  const [bank, setBank] = useState({})
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')

  const openModal = (bank) => {
    setIsOpen(true)
    setBank(bank)
  }

  const createMortgage = async (mortgage) => {
    // console.log(getFormLocalStorage('token').user._id)
    const res = await API.createMortgage('/' + getFormLocalStorage('token').user._id, mortgage, getFormLocalStorage('token').token)
    // console.log(mortgage)
  }

  const signUp = async (func) => {
    let user = {
      username,
      password,
    }
    const res = await API.signup(user)
    if (res.status === 200 && func !== undefined) {
      func()
      setUsername('')
      setPassword('')
    }
  }

  const addToLocalStorage = value => localStorage.setItem('token', JSON.stringify(value))

  const getFormLocalStorage = value => JSON.parse(localStorage.getItem(value))


  const signIn = async () => {
    let user = {
      username,
      password
    }

    if (username.trim() !== '' && password.trim() !== '') {

      const res = await API.signin(user)
      try {
        if (res.token !== undefined) {
          await addToLocalStorage(res)
          setUsername('')
          setPassword('')
          setErr('')
        }
      } catch {
        setErr('Error')
      }
    }
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const getBanks = async () => {
    let data = await API.getAll()
    setBanks(data)
  }

  useEffect(() => {
    getBanks()
  }, [])


  const createBank = async () => {
    let check = false
    for(let key in bank) {
      if(bank[key] !== '')
        check = true
      else 
        check = false
    }
    
    if(check) {
      const newBank = await API.create(bank)
      setBanks([...banks, newBank])
      setBank({ name: '', interestRate: '', maximumLoan: '', minimumDownPayment: '', loanTerm: '' })
      setErr('')
    } else {
      setErr('Something went wrong!')
    }
  }

  const removeBank = async id => {
    const res = await API.remove(id)
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

  console.log(bank)

  return (
    <Router>
      <div className="App">
        <Header />
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
          />
        </Route>
        <Route path='/signin'>
          <SignIn
            username={username}
            setUsername={un => setUsername(un)}
            password={password}
            setPassword={pw => setPassword(pw)}
            signIn={signIn}
          />
        </Route>
        <Route path='/signup'>
          <SignUp
            username={username}
            setUsername={un => setUsername(un)}
            password={password}
            setPassword={pw => setPassword(pw)}
            signUp={signUp}
          />
        </Route>
      </div>
    </Router>
  );
}

export default App;
