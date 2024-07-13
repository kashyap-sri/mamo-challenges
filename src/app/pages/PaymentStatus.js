// react imports
import React from 'react';
import { useNavigate } from 'react-router-dom';

// third party imports
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { Button } from '@mui/material';


// in-app imports
import Header from '../components/Header';


const PaymentStatus = ({
    status
}) => {
    const navigate = useNavigate();

    const getStatusIcon = () => {
        if (status === 'success') {
            return <CheckCircleIcon 
                color="success"
                fontSize="large"
            />
        } else if (status === 'failure') {
            return <ErrorIcon 
            color="error"
            fontSize="large"
        />
        }
    };

    const getStatusObj = () => {
        const searchParams = new URLSearchParams(window.location.search);
        const paramsObj = [];
        for (const param of searchParams) {
            paramsObj.push(
                {
                    label: param?.[0],
                    value: param?.[1]
                }
            )
        }
        console.log(paramsObj)
        return paramsObj;
    };

    return (
        <div className="payments-status">
            <Header />
            <div className="payments-status__wrapper">
                <div className="payments-status__status-icon">
                    {getStatusIcon()}
                </div>
                <div className="payments-status__title">
                    {
                        status === "success" ?
                        'Payment Successful' :
                        'Payment Failed'
                    }
                </div>
                <div className="payments-status__data">
                    {
                        getStatusObj()?.map(
                            (item, index) => (
                                <div key={`payments-status__item--${index}`} className={`payments-status__item`}>
                                    <div className="payments-status__label">
                                        {item?.label}:
                                    </div>
                                    <div className="payments-status__value">
                                        {item?.value}
                                    </div>
                                </div>
                            )
                        )
                    }
                </div>
                <Button
                    variant="contained"
                    onClick={() => navigate('/')}
                  >Make another payment
                  </Button>    
            </div>
        </div>
    )
};

export default PaymentStatus;
