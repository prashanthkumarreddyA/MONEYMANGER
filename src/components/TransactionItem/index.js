// Write your code here
import './index.css'

const TransactionItem = props => {
  const {transactionDetials} = props
  const {id, titleInput, amountInput, typeInput} = transactionDetials

  const onClickDeleteButton = () => {
    const {deleteTransaction} = props
    deleteTransaction(id)
  }

  return (
    <li>
      <div className="list-item">
        <p>{titleInput}</p>
        <p>{amountInput}</p>
        <p>{typeInput}</p>
        <button type="button" onClick={onClickDeleteButton}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}
export default TransactionItem
