'use client';

import { useEffect, useState } from 'react';
import Web3 from 'web3';
import './globals.css';

const contractAbi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "requestor",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "toUser",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "message",
        "type": "string"
      }
    ],
    "name": "RequestCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "payer",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "requestor",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "RequestPaid",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      }
    ],
    "name": "addName",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_message",
        "type": "string"
      }
    ],
    "name": "createRequest",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_request",
        "type": "uint256"
      }
    ],
    "name": "payRequest",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "getMyRequests",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      },
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      },
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "getMyHistory",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "action",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "message",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "otherPartyAddress",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "otherPartyName",
            "type": "string"
          }
        ],
        "internalType": "struct Paypal.sendReceive[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "getMyName",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "hasName",
            "type": "bool"
          }
        ],
        "internalType": "struct Paypal.userName",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];

const contractAddress = '0x3846Ccc0C23bE16F7AFc29028030F5115D8f2992';

const Page = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [userAccount, setUserAccount] = useState('');
  const [name, setName] = useState('');
  const [requestUser, setRequestUser] = useState('');
  const [requestAmount, setRequestAmount] = useState('');
  const [requestMessage, setRequestMessage] = useState('');
  const [payRequestInput, setPayRequestInput] = useState('');
  const [payAmountInput, setPayAmountInput] = useState('');
  const [requests, setRequests] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const initWeb3AndContract = async () => {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3Instance = new Web3(window.ethereum);
        const contractInstance = new web3Instance.eth.Contract(contractAbi, contractAddress);
        const accounts = await web3Instance.eth.getAccounts();
        setWeb3(web3Instance);
        setContract(contractInstance);
        setUserAccount(accounts[0]);
      } catch (error) {
        console.error('User denied account access or Web3 initialization failed', error);
      }
    };

    if (typeof window.ethereum !== 'undefined') {
      initWeb3AndContract();
    } else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }, []);

  const addNameToWallet = async () => {
    try {
      const result = await contract.methods.addName(name).send({ from: userAccount });
      console.log('Name added:', result);
    } catch (error) {
      console.error(error);
    }
  };

  const createPaymentRequest = async () => {
    try {
      const result = await contract.methods.createRequest(requestUser, web3.utils.toWei(requestAmount, 'ether'), requestMessage).send({ from: userAccount });
      console.log('Request created:', result);
      viewPaymentRequests();
    } catch (error) {
      console.error(error);
    }
  };

  const payRequest = async () => {
    if (!payRequestInput || isNaN(payRequestInput) || payRequestInput < 0) {
      console.error('Invalid request ID');
      return;
    }

    if (!payAmountInput || isNaN(payAmountInput) || payAmountInput <= 0) {
      console.error('Invalid or empty amount');
      return;
    }

    try {
      console.log('Paying request ID:', payRequestInput);
      const etherValue = web3.utils.toWei(payAmountInput, 'ether');
      const result = await contract.methods.payRequest(payRequestInput).send({
        from: userAccount,
        value: etherValue,
      });
      console.log('Request paid:', result);
      viewPaymentRequests();
    } catch (error) {
      console.error('Error paying request:', error);
    }
  };

  const viewPaymentRequests = async () => {
    try {
      const result = await contract.methods.getMyRequests(userAccount).call();
      const formattedRequests = result[0].map((requestor, index) => ({
        index,
        requestor,
        amount: result[1][index],
        message: result[2][index],
        name: result[3][index],
      }));
      setRequests(formattedRequests);
      console.log('Current Requests:', formattedRequests);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const viewTransactionHistory = async () => {
    try {
      const result = await contract.methods.getMyHistory(userAccount).call();
      setHistory(result);
      console.log('Transaction History:', result);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-6">Web3 PayPal System</h1>
      <div className="space-y-6">
        {/* Add Name Section */}
        <section>
          <h2 className="text-2xl font-semibold">Add Name to Wallet</h2>
          <input
            type="text"
            className="border rounded p-2 text-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          <button className="ml-4 btn" onClick={addNameToWallet}>
            Add Name
          </button>
        </section>

        {/* Create Payment Request Section */}
        <section>
          <h2 className="text-2xl font-semibold">Create a Payment Request</h2>
          <input
            type="text"
            className="border rounded p-2 text-black"
            value={requestUser}
            onChange={(e) => setRequestUser(e.target.value)}
            placeholder="Enter user address"
          />
          <input
            type="number"
            className="border rounded p-2 ml-2 text-black"
            value={requestAmount}
            onChange={(e) => setRequestAmount(e.target.value)}
            placeholder="Enter amount"
          />
          <input
            type="text"
            className="border rounded p-2 ml-2 text-black"
            value={requestMessage}
            onChange={(e) => setRequestMessage(e.target.value)}
            placeholder="Enter message"
          />
          <button className="ml-4 btn" onClick={createPaymentRequest}>
            Create Request
          </button>
        </section>

        {/* Pay Request Section */}
        <section>
          <h2 className="text-2xl font-semibold">Pay a Request</h2>
          <input
            type="number"
            className="border rounded p-2 text-black"
            value={payRequestInput}
            onChange={(e) => setPayRequestInput(e.target.value)}
            placeholder="Enter request ID"
          />
          <input
            type="number"
            className="border rounded p-2 ml-2 text-black"
            value={payAmountInput}
            onChange={(e) => setPayAmountInput(e.target.value)}
            placeholder="Enter amount to pay"
          />
          <button className="ml-4 btn" onClick={payRequest}>
            Pay
          </button>
        </section>

        {/* View Requests and History */}
        <section>
          <h2 className="text-2xl font-semibold">Requests and History</h2>
          <button className="ml-4 btn" onClick={viewPaymentRequests}>
            View Requests
          </button>
          <button className="ml-4 btn" onClick={viewTransactionHistory}>
            View History
          </button>
        </section>

        {/* Requests Display */}
        {requests.length > 0 && (
          <section>
            <h3 className="text-xl font-semibold">Current Requests</h3>
            <ul>
              {requests.map((request) => (
                <li key={request.index}>
                  ID: {request.index}, Requestor: {request.requestor}, Name: {request.name}, Amount: {web3.utils.fromWei(request.amount, 'ether')} ETH, Message: {request.message}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};

export default Page;
