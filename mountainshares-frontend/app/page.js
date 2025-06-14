'use client';
import { useState } from 'react';
import StripePaymentForm from '../components/StripePaymentForm';
import TransactionReceipt from '../components/TransactionReceipt';

export default function Home() {
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptPaymentId, setReceiptPaymentId] = useState(null);

  const handlePurchaseComplete = (paymentId) => {
    setReceiptPaymentId(paymentId);
    setShowReceipt(true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-100 via-blue-50 to-green-100">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            MountainShares
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Blockchain-Powered Emergency Response for Appalachian Communities
          </p>
          <p className="text-lg text-green-700 font-medium">
            Real Utility • Verified Smart Contract • Debit Card Purchases Available
          </p>
        </div>

        {/* Purchase Interface */}
        <div className="mb-12">
          <StripePaymentForm onPurchaseComplete={handlePurchaseComplete} />
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl mb-4">💳</div>
            <h3 className="text-xl font-bold mb-2">Debit Card Purchases</h3>
            <p className="text-gray-600">Buy MountainShares directly with your debit or credit card</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl mb-4">⛓️</div>
            <h3 className="text-xl font-bold mb-2">Arbitrum Blockchain</h3>
            <p className="text-gray-600">Fast, low-cost transactions on verified smart contracts</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl mb-4">🏔️</div>
            <h3 className="text-xl font-bold mb-2">Emergency Response</h3>
            <p className="text-gray-600">Real-time coordination for mountain emergencies and community alerts</p>
          </div>
        </div>

        {/* Status Section */}
        <div className="text-center text-gray-500 text-sm">
          <p>Powered by Arbitrum • Stripe Payment Processing • Emergency Response Utility</p>
          <p className="mt-2">
            🚀 <span className="text-green-600 font-medium">Now accepting debit card purchases!</span>
          </p>
        </div>
      </div>

      {/* Receipt Modal */}
      {showReceipt && (
        <TransactionReceipt 
          paymentId={receiptPaymentId}
          onClose={() => setShowReceipt(false)}
        />
      )}
    </main>
  );
}
