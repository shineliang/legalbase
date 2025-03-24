import React, { useState } from 'react';
import { FaArrowRight, FaBrain, FaChartLine, FaClipboardCheck, FaFileAlt, FaLightbulb, FaRobot } from 'react-icons/fa';

import ContractAnalyzer from '../components/ContractAnalyzer';
import CompliancePredictor from '../components/CompliancePredictor';

// AI合规中心页面 - 整合多种AI功能
const AIComplianceHub: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('overview');
  
  // 渲染AI功能卡片
  const renderAIFeatureCard = (
    icon: React.ReactNode,
    title: string,
    description: string,
    section: string,
    isNew: boolean = false
  ) => {
    return (
      <div 
        className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => setActiveSection(section)}
      >
        <div className="p-5">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 text-xl">
              {icon}
            </div>
            {isNew && (
              <div className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                新功能
              </div>
            )}
          </div>
          <h3 className="font-medium text-lg mb-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-4">{description}</p>
          <div className="flex items-center text-blue-600 text-sm">
            <span>立即尝试</span>
            <FaArrowRight className="ml-1 text-xs" />
          </div>
        </div>
      </div>
    );
  };
  
  // 渲染概览页面
  const renderOverview = () => {
    return (
      <div>
        <h2 className="text-2xl font-medium mb-6">AI劳动法合规助手</h2>
        
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white mb-8">
          <div className="flex items-start">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm mr-5">
              <FaBrain className="text-2xl" />
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">企业劳动合规AI赋能</h3>
              <p className="opacity-90 mb-4">
                基于先进的人工智能技术，为您的企业提供全方位的劳动法规合规解决方案，预测风险，防范于未然。
              </p>
              <button 
                className="px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                onClick={() => setActiveSection('assistant')}
              >
                咨询AI助手
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {renderAIFeatureCard(
            <FaFileAlt />,
            "智能合同审核",
            "自动分析劳动合同条款，识别风险点，提供修改建议，确保合同合规性。",
            "contract-analyzer",
            true
          )}
          
          {renderAIFeatureCard(
            <FaChartLine />,
            "预测性合规分析",
            "分析法规变化趋势和企业特征，预测未来合规风险，提供提前应对建议。",
            "compliance-predictor",
            true
          )}
          
          {renderAIFeatureCard(
            <FaRobot />,
            "多模态AI助手",
            "通过对话、文件上传等多种方式，解答劳动法疑问，提供合规建议。",
            "assistant"
          )}
          
          {renderAIFeatureCard(
            <FaClipboardCheck />,
            "企业合规评估",
            "全面评估企业劳动用工现状，生成详细合规报告和改进方案。",
            "compliance-assessment"
          )}
          
          {renderAIFeatureCard(
            <FaLightbulb />,
            "智能文档生成",
            "自动生成劳动合同、员工手册、保密协议等法律文档，符合最新法规要求。",
            "document-generator"
          )}
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-medium text-lg mb-3">最近的AI互动历史</h3>
          <div className="space-y-3">
            <div className="flex items-start p-3 bg-white rounded border border-gray-200">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3">
                <FaRobot className="text-sm" />
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">
                  今天 10:23
                </div>
                <div className="font-medium">关于员工试用期解除的咨询</div>
                <div className="text-sm text-gray-600 mt-1">
                  您咨询了关于合规解除试用期员工合同的流程和注意事项...
                </div>
              </div>
            </div>
            
            <div className="flex items-start p-3 bg-white rounded border border-gray-200">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3">
                <FaFileAlt className="text-sm" />
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">
                  昨天 15:47
                </div>
                <div className="font-medium">劳动合同合规分析</div>
                <div className="text-sm text-gray-600 mt-1">
                  您上传了一份劳动合同模板进行分析，发现了5处合规风险...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* 返回按钮 */}
      {activeSection !== 'overview' && (
        <button 
          className="mb-6 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center text-sm"
          onClick={() => setActiveSection('overview')}
        >
          &larr; 返回功能概览
        </button>
      )}
      
      {/* 根据选择的部分渲染不同内容 */}
      {activeSection === 'overview' && renderOverview()}
      
      {activeSection === 'contract-analyzer' && (
        <div>
          <h2 className="text-2xl font-medium mb-6">智能合同审核</h2>
          <ContractAnalyzer />
        </div>
      )}
      
      {activeSection === 'compliance-predictor' && (
        <div>
          <h2 className="text-2xl font-medium mb-6">预测性合规分析</h2>
          <CompliancePredictor />
        </div>
      )}
      
      {activeSection === 'assistant' && (
        <div>
          <h2 className="text-2xl font-medium mb-6">多模态AI助手</h2>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <FaRobot className="text-5xl text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">您将被重定向到AI助手页面</h3>
            <p className="text-gray-600 mb-6">
              我们的AI助手提供了更丰富的交互功能，包括多模态对话、文件分析和智能推荐
            </p>
            <a 
              href="/assistant" 
              className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              前往AI助手页面
            </a>
          </div>
        </div>
      )}
      
      {activeSection === 'compliance-assessment' && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <FaClipboardCheck className="text-5xl text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-medium mb-2">企业合规评估功能即将推出</h3>
          <p className="text-gray-600 mb-6">
            我们正在努力开发这项功能，它将很快可用。敬请期待！
          </p>
        </div>
      )}
      
      {activeSection === 'document-generator' && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <FaLightbulb className="text-5xl text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-medium mb-2">智能文档生成功能即将推出</h3>
          <p className="text-gray-600 mb-6">
            我们正在努力开发这项功能，它将很快可用。敬请期待！
          </p>
        </div>
      )}
    </div>
  );
};

export default AIComplianceHub; 