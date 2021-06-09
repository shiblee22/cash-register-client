import React from 'react';
import moment from 'moment';

const FinalAmount = ({finalData}) => {
    const {date, finalAmount} = finalData;
    
    return (
        <div className='row' style={{margin: '10px', border: '1px solid black'}}>
            <div className="col-9">
                <p>{moment(date).format('Do MMM YYYY')}</p>
                <h3>Final Balance</h3>
            </div>
            <div className="col-3">
                <h3 style={{color: 'green', marginTop: '10px'}}>{finalAmount}</h3>
            </div>
        </div>
    );
};

export default FinalAmount;