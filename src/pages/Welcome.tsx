import React from 'react';
import { Link } from 'react-router-dom';
import { FaChartLine, FaClipboardCheck, FaExclamationTriangle, FaFileContract, FaRobot } from 'react-icons/fa';

const Welcome: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-success to-success-dark text-white">
      <header className="py-4 px-6">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">智能劳动法合规系统</h1>
        </div>
      </header>
      
      <main className="flex-grow flex items-center">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">让劳动法合规变得简单高效</h2>
              <p className="text-xl mb-8">
                基于人工智能和大数据技术，提供全方位的劳动法合规解决方案，帮助企业降低法律风险，提高合规水平。
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-white bg-opacity-20 p-2 rounded-full mr-4">
                    {React.createElement(FaChartLine)}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">法规动态监控</h3>
                    <p>实时跟踪最新劳动法规变化，智能分析企业影响</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-white bg-opacity-20 p-2 rounded-full mr-4">
                    {React.createElement(FaClipboardCheck)}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">合规建议</h3>
                    <p>针对企业情况提供个性化合规建议和实施方案</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-white bg-opacity-20 p-2 rounded-full mr-4">
                    {React.createElement(FaExclamationTriangle)}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">风险预警</h3>
                    <p>提前识别潜在合规风险，及时发出预警通知</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-white bg-opacity-20 p-2 rounded-full mr-4">
                    {React.createElement(FaFileContract)}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">合同管理</h3>
                    <p>智能管理劳动合同，自动检测合规问题</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <Link 
                  to="/" 
                  className="btn bg-white text-success hover:bg-gray-100 px-8 py-3 rounded-lg font-medium inline-flex items-center"
                >
                  立即进入系统 
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -top-16 -left-16 w-32 h-32 bg-white bg-opacity-10 rounded-lg transform rotate-12"></div>
                <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-white bg-opacity-10 rounded-lg transform -rotate-12"></div>
                <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-8 rounded-2xl relative z-10">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                      {React.createElement(FaRobot, { className: "text-2xl mr-2" })}
                      <h3 className="font-bold">AI合规助手</h3>
                    </div>
                    <span className="bg-green-500 text-white text-xs px-2.5 py-1 rounded-full">在线</span>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="bg-white bg-opacity-20 rounded-lg p-3 max-w-xs ml-auto">
                      <p className="text-sm">我们公司计划推行远程办公，有哪些劳动法合规问题需要注意？</p>
                    </div>
                    
                    <div className="bg-white bg-opacity-10 rounded-lg p-3 max-w-md">
                      <p className="text-sm mb-2">您好！关于远程办公的劳动法合规事项，主要需要关注：</p>
                      <ol className="list-decimal text-sm pl-5 space-y-1">
                        <li>工作时间记录与管理</li>
                        <li>劳动合同条款更新</li>
                        <li>工伤认定问题</li>
                        <li>信息安全与隐私保护</li>
                      </ol>
                      <p className="text-sm mt-2">建议制定专门的远程办公政策，并获得员工书面确认。需要了解更多详情吗？</p>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="输入您的问题..." 
                      className="w-full bg-white bg-opacity-20 border border-white border-opacity-20 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 text-white placeholder-white placeholder-opacity-60"
                    />
                    <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="py-4 px-6 text-center text-white text-opacity-80">
        <p>© 2025 智能劳动法合规系统 | 保留所有权利</p>
      </footer>
    </div>
  );
};

export default Welcome; 