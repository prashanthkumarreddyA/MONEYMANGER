import {Component} from 'react'
import {v4} from 'uuid'
import MoneyDetails from '../MoneyDetails'

import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManger extends Component {
  state = {
    balance: 0,
    income: 0,
    expenses: 0,
    titleInput: '',
    amountInput: '',
    transactionList: [],
    typeInput: 'Income',
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, typeInput} = this.state
    console.log(typeInput)
    if (typeInput === 'Income') {
      this.setState(prevState => ({
        balance: prevState.balance + amountInput,
        income: prevState.income + amountInput,
      }))
    } else {
      this.setState(prevState => ({
        balance: prevState.balance - amountInput,
        expenses: prevState.expenses + amountInput,
      }))
    }

    const newTransaction = {
      id: v4(),
      titleInput,
      amountInput,
      typeInput,
    }

    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransaction],
      titleInput: '',
      amountInput: '',
      typeInput: '',
    }))
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmountInput = event => {
    this.setState({amountInput: Number(event.target.value)})
  }

  onChangeTypeInput = event => {
    this.setState({typeInput: event.target.value})
    console.log(event.target.value)
  }

  deleteTransaction = id => {
    this.setState(prevState => ({
      transactionList: prevState.transactionList.filter(
        eachTransaction => eachTransaction.id !== id,
      ),
    }))
  }

  render() {
    const {
      balance,
      income,
      expenses,
      titleInput,
      amountInput,
      transactionList,
    } = this.state
    return (
      <div>
        <div>
          <h1>Hi, Richard</h1>
          <p>Welcome back to your Money Manager</p>
        </div>
        <div>
          <MoneyDetails balance={balance} income={income} expenses={expenses} />
        </div>
        <div className="transaction-container">
          <div>
            <form onSubmit={this.onAddTransaction}>
              <h1>Add Transaction</h1>
              <label htmlFor="title">TITLE</label>
              <input
                type="text"
                id="title"
                value={titleInput}
                onChange={this.onChangeTitleInput}
              />
              <label htmlFor="amount">AMOUNT</label>
              <input
                type="number"
                id="amount"
                value={amountInput}
                onChange={this.onChangeAmountInput}
              />
              <select onChange={this.onChangeTypeInput}>
                {transactionTypeOptions.map(eachOption => (
                  <option
                    value={eachOption.displayText}
                    key={eachOption.displayText}
                  >
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
              <button type="submit">Add</button>
            </form>
          </div>
          <div>
            <h1>History</h1>
            <div className="history-names">
              <p>Title</p>
              <p>Amount</p>
              <p>Type</p>
            </div>
            <ul>
              {transactionList.map(eachTransaction => (
                <TransactionItem
                  key={eachTransaction.id}
                  transactionDetials={eachTransaction}
                  deleteTransaction={this.deleteTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManger
