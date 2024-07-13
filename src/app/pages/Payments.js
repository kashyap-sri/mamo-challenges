// react imports
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// third party imports

// in-app imports
import Header from '../components/Header';
import { TextField, Button, CircularProgress } from '@mui/material';

import { apiRequest } from '../../redux/root/actions';
import { PAYMENTS_APIS } from '../api/endpoints';


const Payments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paymentLink, setPaymentLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showIframe, setShowIframe] = useState(false);

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [currency, setCurrency] = useState("AED");
  const [amount, setAmount] = useState(null);

  const isPaymentDetailsFilled = () => {
    return firstName && lastName && email && amount;
  };

  const onInputChange = (attribute, updatedValue) => {
    switch (attribute) {
      case 'email': 
        setEmail(updatedValue);
        break;
      case 'firstName':
        setFirstName(updatedValue);
        break;
      case 'lastName':
        setLastName(updatedValue);
        break;
      case 'amount':
        setAmount(updatedValue);
        break;
      default:
        return;
    } 
  }

  const addIframeToPage = () => {
    const mamoDiv = document.getElementById('mamo-checkout');
    const paymentLink = mamoDiv.getAttribute('data-src');

    // Example of embedding an iframe
    const iframe = document.createElement('iframe');
    iframe.src = paymentLink;
    mamoDiv.appendChild(iframe);
    setShowIframe(true);
  };

  const getMamoPaymentsLink = async () => {
    const paymentsLinkRes = await dispatch(apiRequest(
      PAYMENTS_APIS.getPaymentsLink,
      {
        email,
        first_name: firstName,
        last_name: lastName,
        "title": "Chocolate Box - Small",
        "description": "12pcs Chocolate Box",
        "capacity": 1,
        "active": true,
        "return_url": "http://localhost:3000/payment-status",
        "failure_return_url": "http://localhost:3000/payment-status",
        "processing_fee_percentage": 3,
        "amount": amount,
        "amount_currency": currency,
        "link_type": "inline",
        "enable_tabby": false,
        "enable_message": false,
        "enable_tips": false,
        "save_card": "off",
        "enable_customer_details": false,
        "enable_quantity": false,
        "enable_qr_code": false,
        "send_customer_receipt": false,
        "hold_and_charge_later": false
      }, {
        'Authorization': `Bearer sk-a83af377-2fd5-4991-8202-e74801df8d98`,
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    ));
    if (paymentsLinkRes?.payment_url) {
      setPaymentLink(paymentsLinkRes?.payment_url);
      addIframeToPage()
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="payments">
      <Header />
      <div className="payments__form">
        <div className="payments__heading">
          Please enter below details to initiate payment
        </div>
        {
          loading ?
          <CircularProgress /> :
          <>
           {
             !showIframe && (
                <>
                  <TextField
                    id="outlined-basic" 
                    label="Email Address" 
                    variant="outlined"
                    onChange={(e) => onInputChange('email', e?.target?.value)}
                  />
                  <TextField
                    id="outlined-basic" 
                    label="First Name" 
                    variant="outlined"
                    onChange={(e) => onInputChange('firstName', e?.target?.value)}
                  />
                  <TextField
                    id="outlined-basic" 
                    label="Last Name" 
                    variant="outlined"
                    onChange={(e) => onInputChange('lastName', e?.target?.value)}
                  />
                  <TextField
                    id="outlined-basic" 
                    label="Amount" 
                    variant="outlined"
                    onChange={(e) => onInputChange('amount', e?.target?.value)}
                  />
                  <TextField
                    id="outlined-basic" 
                    label="Currency"
                    value={currency}
                    variant="outlined"
                    disabled
                  />
                  <Button
                    variant="contained"
                    disabled={!isPaymentDetailsFilled()}
                    onClick={() => getMamoPaymentsLink()}
                  >Proceed to payment
                  </Button>    
                </>
             )
           }
            {
              paymentLink && 
              <script src="https://assets.mamopay.com/public/checkout-inline.min.js"></script>
            }
            <div id='mamo-checkout' data-src={paymentLink}>
            </div>
          </>
        }
      </div>
      
    </div>
  );
};

export default Payments;
