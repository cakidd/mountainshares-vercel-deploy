import MountainSharesStatus from '../components/MountainSharesStatus';
import PurchaseInterface from '../components/PurchaseInterface';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-100 via-blue-50 to-green-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            MountainShares
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Blockchain-Powered Emergency Response for Appalachian Communities
          </p>
          <p className="text-lg text-green-700 font-medium">
            Real Utility • Verified Smart Contract • Community Impact
          </p>
        </div>

        {/* Status and Purchase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <MountainSharesStatus />
          <PurchaseInterface />
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl mb-4">🏔️</div>
            <h3 className="text-xl font-bold mb-2">Emergency Response</h3>
            <p className="text-gray-600">Real-time coordination for mountain emergencies and community alerts</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl mb-4">⛓️</div>
            <h3 className="text-xl font-bold mb-2">Arbitrum Blockchain</h3>
            <p className="text-gray-600">Fast, low-cost transactions on verified smart contracts</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl mb-4">🤝</div>
            <h3 className="text-xl font-bold mb-2">Community Driven</h3>
            <p className="text-gray-600">Decentralized governance for Appalachian mountain communities</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          <p>Powered by Arbitrum • Deployed on Vercel • Open Source</p>
          <p className="mt-2">
            API Status: 
            <span className="text-green-600 font-medium ml-1">Operational</span>
          </p>
        </div>
      </div>
    </main>
  );
}
