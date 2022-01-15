import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../utils/constants';

export const TransactionContext = React.createContext({});

const { ethereum } = window;
const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

  return transactionsContract;
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem('transactionCount')
  );
  const [transactions, setTransactions] = useState([]);

  const handleChange = (e, name) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: e.target.value
    }));
  };

  const getAllTransactions = async () => {
    try {
      if (!ethereum) alert('Please, install metamask');
      const transactionContract = getEthereumContract();
      const availableTransactions = await transactionContract.getAllTransactions();
      const serializedTransactions = availableTransactions.map((transaction) => ({
        addressTo: transaction.receiver,
        addressFrom: transaction.sender,
        timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
        message: transaction.message,
        keyword: transaction.keyword,
        amount: parseInt(transaction.amount._hex) / 10 ** 10
      }));
      setTransactions(serializedTransactions);
    } catch (e) {
      console.log(e);
    }
  };

  const checkIfWalletConnected = async () => {
    try {
      getAllTransactions();
      if (!ethereum) return alert('Please install metamask');
      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        // getAllTransactions();
      } else {
        console.warn('No accounts found!');
      }

      console.log(accounts);
    } catch (err) {
      console.log(err);
      throw new Error('No ethereum object.');
    }
  };

  const checkIfTransactionExists = async () => {
    try {
      const transactionContract = getEthereumContract();
      const newTransactionCount = await transactionContract.getTransactionCount();

      localStorage.setItem('transactionCount', newTransactionCount);
    } catch (e) {
      console.log(e);
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert('Please install metamask');
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      setCurrentAccount([accounts[0]]);
    } catch (err) {
      throw new Error('No ethereum object.');
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert('Please install metamask to continue');
      const { addressTo, amount, keyword, message } = formData;
      const transactionContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);

      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: '0x5208', // 21000 GWEI
            value: parsedAmount._hex
          }
        ]
      });

      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );
      setIsLoading(true);
      console.log(`Loading - ${transactionHash.hash}`);

      await transactionHash.wait();
      console.log(`Success - ${transactionHash.hash}`);
      setIsLoading(false);

      const newTransactionCount = await transactionContract.getTransactionCount();
      setTransactionCount(newTransactionCount.toNumber());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
    checkIfTransactionExists();
  }, [transactionCount]);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        setFormData,
        handleChange,
        sendTransaction,
        isLoading,
        transactions
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
