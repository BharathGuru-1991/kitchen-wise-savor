
import React, { ReactNode } from 'react';
import { ShoppingCart } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                <ShoppingCart size={24} className="text-primary" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">FreshKeep</h1>
            </div>
            <nav>
              <ul className="flex space-x-6">
                <li className="text-primary font-medium">Inventory</li>
                <li className="text-gray-500 hover:text-gray-900">Recipes</li>
                <li className="text-gray-500 hover:text-gray-900">Stats</li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center py-6">
            <p className="text-sm text-gray-500">&copy; 2025 FreshKeep. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                Help
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
