# Blockchain PayPal DApp

## Introduction

Welcome to **Blockchain PayPal**, a decentralized payment platform built on the Ethereum blockchain. This project demonstrates my capabilities in full-stack development, smart contract development, and blockchain integration. It provides a secure and transparent system for creating and managing payment requests and transactions using blockchain technology.

## Features

- **Decentralized Payments**: A fully decentralized platform for managing payment requests and transactions.
- **Smart Contracts**: Secure and transparent management of payments using Ethereum smart contracts.
- **User Authentication**: Wallet-based authentication for secure and private user identity management.
- **Payment Requests**: Functionality to create and manage payment requests.
- **Transaction History**: Detailed transaction history for all payments and requests.
- **Responsive Design**: A user-friendly interface built with modern web technologies.

## Technology Stack

### Frontend
- **React.js**: A JavaScript library for building user interfaces.
- **Next.js**: A React framework for server-side rendering and static site generation.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **DaisyUI**: A component library based on Tailwind CSS.

### Backend
- **Next.js API Routes**: Serverless functions for handling backend logic.
- **MongoDB**: A NoSQL database for storing application data.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB.
- **Vercel**: A platform for hosting the Next.js application.

### Blockchain
- **Truffle Framework**: A development environment for Ethereum smart contracts.
- **Ganache**: A personal blockchain for Ethereum development.
- **Sepolia Testnet**: A public Ethereum test network for testing smart contracts.
- **Solidity**: The programming language for writing Ethereum smart contracts.

## Project Structure

### Smart Contracts

The core of the Blockchain PayPal DApp is the `Paypal` smart contract. It manages the creation, payment, and tracking of payment requests. Key functionalities include:
- **Name Registration**: Registering a user’s name to their wallet address.
- **Payment Requests**: Creating payment requests specifying the amount and message.
- **Request Payment**: Paying a specific request with ETH.
- **Transaction History**: Viewing the transaction history of payments and requests.

### Frontend Implementation

The frontend is built using React.js and Next.js, with Tailwind CSS and DaisyUI for styling. It interacts with the smart contract to handle user registration, payment requests, and transaction history.

### Key Components

1. **Add Name to Wallet**: Allows users to associate a name with their wallet address.
2. **Create Payment Request**: Users can create payment requests specifying the recipient, amount, and message.
3. **Pay Request**: Functionality to pay an existing payment request.
4. **View Requests and History**: Display current payment requests and transaction history.

## How to Run the Project

1. **Clone the Repository**:
    ```sh
    git clone https://github.com/mrmartin1998/blockchain-paypal.git
    cd blockchain-paypal
    ```

2. **Install Dependencies**:
    ```sh
    npm install
    ```

3. **Start Ganache** (Personal Ethereum Blockchain):
    ```sh
    ganache-cli
    ```

4. **Deploy Smart Contracts**:
    ```sh
    truffle migrate --network development
    ```

5. **Run the Application**:
    ```sh
    npm run dev
    ```

6. **Open in Browser**:
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Conclusion

This project demonstrates my ability to develop a full-stack decentralized application using modern technologies. It showcases my skills in smart contract development, blockchain integration, and building responsive web applications. Thank you for reviewing my project!

---

*Feel free to reach out to me for any questions or further discussions about this project.*

---

**Contact Information:**

- **Email**: martinemilbrabenec@gmail.com
- **LinkedIn**: [Martin Emil Brabenec](https://www.linkedin.com/in/martin-emil-brabenec-33b818148/)
- **GitHub**: [mrmartin1998](https://github.com/mrmartin1998/)
