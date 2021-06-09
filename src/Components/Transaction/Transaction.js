import React from 'react';
import moment from 'moment';

const Transaction = ({ transaction }) => {
    const { date, amount, transactionType, remark } = transaction;
    const style = {};
    (transactionType === 'plus') ? style.color = 'green' : style.color = 'red';

    return (
        <div style={{ margin: '10px', border: '1px solid black' }}>
            <div className='row' style={style}>
                <div className="col-9">
                    <p>{moment(date).format('Do MMM YYYY')}</p>
                    <h3>{remark}</h3>
                </div>
                <div className="col-3">
                    <h3 style={{ marginTop: '10px' }}>{(transactionType === 'plus') ? '+' : '-'} {amount}</h3>
                </div>
            </div>
        </div>
    );
};

export default Transaction;