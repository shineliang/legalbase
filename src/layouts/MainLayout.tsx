import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaChartPie, FaClipboardCheck, FaExclamationTriangle, FaFileContract, FaSearch, FaRobot, FaBrain } from 'react-icons/fa';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* 顶部导航栏 */}
      <nav className="bg-success text-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/legalbase" className="text-xl font-bold">智能合规系统</Link>
              <div className="hidden md:flex items-center space-x-1">
                <Link to="/legalbase" className={`px-3 py-2 rounded-md ${isActive('/legalbase') ? 'bg-success-dark' : 'hover:bg-success-dark'}`}>
                  <span className="flex items-center">{React.createElement(FaChartPie, { className: "mr-2" })} 法规监控</span>
                </Link>
                <Link to="/legalbase/compliance" className={`px-3 py-2 rounded-md ${isActive('/legalbase/compliance') ? 'bg-success-dark' : 'hover:bg-success-dark'}`}>
                  <span className="flex items-center">{React.createElement(FaClipboardCheck, { className: "mr-2" })} 合规建议</span>
                </Link>
                <Link to="/legalbase/risk" className={`px-3 py-2 rounded-md ${isActive('/legalbase/risk') ? 'bg-success-dark' : 'hover:bg-success-dark'}`}>
                  <span className="flex items-center">{React.createElement(FaExclamationTriangle, { className: "mr-2" })} 风险预警</span>
                </Link>
                <Link to="/legalbase/contracts" className={`px-3 py-2 rounded-md ${isActive('/legalbase/contracts') ? 'bg-success-dark' : 'hover:bg-success-dark'}`}>
                  <span className="flex items-center">{React.createElement(FaFileContract, { className: "mr-2" })} 合同管理</span>
                </Link>
                <Link to="/legalbase/ai-hub" className={`px-3 py-2 rounded-md ${isActive('/legalbase/ai-hub') ? 'bg-success-dark' : 'hover:bg-success-dark'} relative`}>
                  <span className="flex items-center">{React.createElement(FaBrain, { className: "mr-2" })} AI合规中心</span>
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">新</span>
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <div className="relative mr-2">
                <input 
                  type="text" 
                  placeholder="搜索法规..." 
                  className="bg-success-light text-white placeholder-gray-200 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white w-full" 
                />
                {React.createElement(FaSearch, { className: "absolute right-3 top-3 text-gray-200" })}
              </div>
              <button className="bg-white text-success px-4 py-2 rounded-md hover:bg-gray-100">
                搜索
              </button>
              <Link to="/legalbase/assistant" className="ml-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md flex items-center">
                <FaRobot className="mr-2" /> AI助手
              </Link>
            </div>
          </div>
          
          {/* 移动端菜单 */}
          <div className="md:hidden mt-2">
            <div className="flex flex-col space-y-1">
              <Link to="/legalbase" className={`px-3 py-2 rounded-md ${isActive('/legalbase') ? 'bg-success-dark' : ''}`}>
                <span className="flex items-center">{React.createElement(FaChartPie, { className: "mr-2" })} 法规监控</span>
              </Link>
              <Link to="/legalbase/compliance" className={`px-3 py-2 rounded-md ${isActive('/legalbase/compliance') ? 'bg-success-dark' : ''}`}>
                <span className="flex items-center">{React.createElement(FaClipboardCheck, { className: "mr-2" })} 合规建议</span>
              </Link>
              <Link to="/legalbase/risk" className={`px-3 py-2 rounded-md ${isActive('/legalbase/risk') ? 'bg-success-dark' : ''}`}>
                <span className="flex items-center">{React.createElement(FaExclamationTriangle, { className: "mr-2" })} 风险预警</span>
              </Link>
              <Link to="/legalbase/contracts" className={`px-3 py-2 rounded-md ${isActive('/legalbase/contracts') ? 'bg-success-dark' : ''}`}>
                <span className="flex items-center">{React.createElement(FaFileContract, { className: "mr-2" })} 合同管理</span>
              </Link>
              <Link to="/legalbase/ai-hub" className={`px-3 py-2 rounded-md ${isActive('/legalbase/ai-hub') ? 'bg-success-dark' : ''}`}>
                <span className="flex items-center">{React.createElement(FaBrain, { className: "mr-2" })} AI合规中心</span>
                <span className="bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 ml-2">新</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      {/* 主内容区 */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-6">
          {children}
        </div>
      </main>
      
      {/* 页脚 */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-center md:text-left">&copy; 2025 智能合规系统. 保留所有权利.</p>
            </div>
            <div>
              <ul className="flex space-x-4">
                <li><a href="#" className="hover:text-gray-300">关于我们</a></li>
                <li><a href="#" className="hover:text-gray-300">帮助中心</a></li>
                <li><a href="#" className="hover:text-gray-300">隐私政策</a></li>
                <li><a href="#" className="hover:text-gray-300">服务条款</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout; 