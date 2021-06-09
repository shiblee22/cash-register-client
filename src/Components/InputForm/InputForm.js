import moment from 'moment';
import React, { useEffect, useState } from 'react';
import FinalAmount from '../FinalAmount/FinalAmount';
import Transaction from '../Transaction/Transaction';

const InputForm = () => {
    const [time, setTime] = useState(moment().format('HH:mm'))
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'))
    const [amount, setAmount] = useState('')
    const [remark, setRemark] = useState('')
    const [transactionType, setTransactionType] = useState('plus')
    const [finalData, setFinalData] = useState({})
    const [transactions, setTransactions] = useState([])
    const [update, setUpdate] = useState(true)
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3001/addTransaction`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                time,
                date,
                amount,
                remark,
                transactionType

            })
        })
        .then(res =>{})
        const newFinalAmount = (transactionType === 'plus') ? (parseFloat(finalData.finalAmount) + parseFloat(amount)) : (parseFloat(finalData.finalAmount) - parseFloat(amount))

        fetch(`http://localhost:3001/updateFinalAmount`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({time, date, finalAmount: newFinalAmount, name: 'FinalAmount'})
        })
        .then(res => setUpdate(!update))

    }

    useEffect(() => {
        fetch(`http://localhost:3001/finalAmount`)
        .then(res => res.json())
        .then(data => {
            setFinalData(data[0])
        })
    },[update])

    useEffect(() => {
        fetch(`http://localhost:3001/transactions`)
        .then(res => res.json())
        .then(data => {
            setTransactions(data)
        })
    },[update])
    return (
        <div className="row">
            <div className="col-5 ms-0 mb-3">
                <input className='form-control' type='date' value={date} onChange={e => setDate(e.target.value)}></input>
            </div>
            <div className="col-5 offset-2 mb-3">
                <input className='form-control' type='time' value={time} onChange={e => setTime(e.target.value)}></input>
            </div>
            <div className="mb-3">
                <label htmlFor="amount" className='form-label'>Amount</label>
                <input className="form-control" type='number' required value={amount} onChange={e => setAmount(e.target.value)}></input>
            </div>
            <label className='form-label'>Transaction Type</label>
            <div className="col-1 mb-3">
                <select className="form-control" value={transactionType} onChange={e => setTransactionType(e.target.value)}>
                    <option value="plus">+</option>
                    <option value="minus">-</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="remark" className='form-label'>Remark</label>
                <input className="form-control" type='text' required value={remark} onChange={e => setRemark(e.target.value)}></input>
            </div>
            <FinalAmount finalData={finalData} />
            {
                transactions.map(tr => <Transaction key={tr._id} transaction={tr}/>)
            }
            <button className='form-control btn btn-primary' type='submit' onClick={handleSubmit} >Save</button>
        </div>
    );
};

export default InputForm;