import React, { useState } from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaFileAlt, FaFileUpload, FaPencilAlt, FaRegClock, FaSearch, FaTimes } from 'react-icons/fa';

// 合同分析结果类型
interface AnalysisResult {
  riskLevel: 'high' | 'medium' | 'low';
  score: number;
  riskItems: RiskItem[];
  suggestedChanges: SuggestedChange[];
  summary: string;
  complianceStatus: 'compliant' | 'partially-compliant' | 'non-compliant';
}

// 风险项类型
interface RiskItem {
  id: number;
  clause: string;
  clauseNumber: string;
  content: string;
  severity: 'high' | 'medium' | 'low';
  issue: string;
  regulation: {
    name: string;
    article: string;
    url?: string;
  };
}

// 修改建议类型
interface SuggestedChange {
  id: number;
  clauseNumber: string;
  originalText: string;
  suggestedText: string;
  reason: string;
}

// 合同分析组件属性
interface ContractAnalyzerProps {
  onAnalysisComplete?: (result: AnalysisResult) => void;
}

// 合同分析组件
const ContractAnalyzer: React.FC<ContractAnalyzerProps> = ({ onAnalysisComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'risks' | 'suggestions'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [showOriginalContent, setShowOriginalContent] = useState(true);
  
  // 文件上传处理
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
      setAnalysisResult(null); // 重置之前的分析结果
    }
  };
  
  // 开始分析
  const startAnalysis = () => {
    if (!file) return;
    
    setIsAnalyzing(true);
    
    // 模拟分析过程
    setTimeout(() => {
      // 模拟分析结果
      const result: AnalysisResult = {
        riskLevel: 'medium',
        score: 68,
        complianceStatus: 'partially-compliant',
        summary: '该劳动合同整体合规性一般，存在5项主要风险，其中2项高风险条款可能导致法律纠纷。建议修改补充后再使用。',
        riskItems: [
          {
            id: 1,
            clause: '竞业限制',
            clauseNumber: '12.3',
            content: '乙方离职后两年内，不得从事与甲方相同或相似业务，甲方无需支付任何经济补偿。',
            severity: 'high',
            issue: '竞业限制未约定经济补偿金违反《劳动合同法》规定',
            regulation: {
              name: '《劳动合同法》',
              article: '第二十三条、第二十四条',
              url: '#'
            }
          },
          {
            id: 2,
            clause: '试用期',
            clauseNumber: '3.2',
            content: '试用期为六个月，在此期间甲方可随时解除与乙方的劳动关系，无需支付任何经济补偿。',
            severity: 'high',
            issue: '试用期内随时解除员工合同的条款违反法律规定',
            regulation: {
              name: '《劳动合同法》',
              article: '第二十一条',
              url: '#'
            }
          },
          {
            id: 3,
            clause: '员工保密',
            clauseNumber: '9.1',
            content: '乙方应对甲方的商业秘密及其他保密信息保密，该保密义务长期有效，无期限限制。',
            severity: 'medium',
            issue: '无期限保密义务可能被认为过于苛刻',
            regulation: {
              name: '《最高人民法院关于审理劳动争议案件适用法律若干问题的解释》',
              article: '第九条',
              url: '#'
            }
          },
          {
            id: 4,
            clause: '工作时间',
            clauseNumber: '5.3',
            content: '甲方可根据业务需要调整乙方工作时间，包括要求乙方加班，乙方应无条件服从。',
            severity: 'medium',
            issue: '无条件加班条款不符合劳动法对加班的限制规定',
            regulation: {
              name: '《劳动法》',
              article: '第四十一条',
              url: '#'
            }
          },
          {
            id: 5,
            clause: '个人信息',
            clauseNumber: '14.2',
            content: '乙方同意甲方收集、使用和处理乙方的个人信息，用于与雇佣相关的各种目的。',
            severity: 'low',
            issue: '个人信息收集描述过于宽泛，未明确具体用途和范围',
            regulation: {
              name: '《个人信息保护法》',
              article: '第十三条',
              url: '#'
            }
          }
        ],
        suggestedChanges: [
          {
            id: 1,
            clauseNumber: '12.3',
            originalText: '乙方离职后两年内，不得从事与甲方相同或相似业务，甲方无需支付任何经济补偿。',
            suggestedText: '乙方离职后与甲方存在竞业限制约定的，竞业限制期限不超过两年，甲方应按月向乙方支付不低于乙方离职前月工资的30%的补偿金。',
            reason: '《劳动合同法》第二十三条规定，用人单位与劳动者约定竞业限制的，应当在解除或者终止劳动合同后，在竞业限制期限内按月给予劳动者经济补偿。'
          },
          {
            id: 2,
            clauseNumber: '3.2',
            originalText: '试用期为六个月，在此期间甲方可随时解除与乙方的劳动关系，无需支付任何经济补偿。',
            suggestedText: '试用期为六个月，在此期间甲方可在乙方不符合录用条件的情况下解除劳动合同，并提前3日通知乙方。',
            reason: '《劳动合同法》第二十一条规定，在试用期中，除劳动者有《劳动合同法》第三十九条规定的情形外，用人单位不得解除劳动合同。用人单位在试用期解除劳动合同的，应当向劳动者说明理由。'
          },
          {
            id: 3,
            clauseNumber: '9.1',
            originalText: '乙方应对甲方的商业秘密及其他保密信息保密，该保密义务长期有效，无期限限制。',
            suggestedText: '乙方应对甲方的商业秘密及其他保密信息保密，该保密义务在劳动关系存续期间及劳动关系终止后2年内有效。',
            reason: '无限期保密义务可能被法院认为对劳动者不合理限制，建议设定合理期限。'
          },
          {
            id: 4,
            clauseNumber: '5.3',
            originalText: '甲方可根据业务需要调整乙方工作时间，包括要求乙方加班，乙方应无条件服从。',
            suggestedText: '甲方因生产经营需要安排乙方加班的，应当与工会和乙方协商，并依法支付加班工资。加班时间不得超过《劳动法》规定的限制。',
            reason: '《劳动法》规定，用人单位应当保证劳动者每周至少休息一日，并限制加班时间。加班应与员工协商，并支付不低于工资的150%、200%或300%的加班工资。'
          },
          {
            id: 5,
            clauseNumber: '14.2',
            originalText: '乙方同意甲方收集、使用和处理乙方的个人信息，用于与雇佣相关的各种目的。',
            suggestedText: '乙方同意甲方收集、使用和处理乙方的个人信息，用于人事管理、薪酬发放、绩效考核、福利提供等与雇佣直接相关的具体目的。甲方承诺遵循最小必要原则，不会过度收集乙方个人信息。',
            reason: '《个人信息保护法》要求个人信息处理者明确告知个人信息的处理目的、方式和范围，遵循最小必要原则。'
          }
        ]
      };
      
      setAnalysisResult(result);
      setIsAnalyzing(false);
      
      if (onAnalysisComplete) {
        onAnalysisComplete(result);
      }
    }, 3000);
  };
  
  // 获取风险项样式
  const getSeverityStyle = (severity: 'high' | 'medium' | 'low') => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  // 渲染分析结果
  const renderAnalysisResult = () => {
    if (!analysisResult) return null;
    
    const filteredRisks = analysisResult.riskItems.filter(
      item => item.clause.toLowerCase().includes(searchQuery.toLowerCase()) || 
             item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
             item.issue.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    return (
      <div className="mt-6">
        {/* 选项卡导航 */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === 'overview' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              总览
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === 'risks' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('risks')}
            >
              风险条款 ({analysisResult.riskItems.length})
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === 'suggestions' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('suggestions')}
            >
              修改建议 ({analysisResult.suggestedChanges.length})
            </button>
          </nav>
        </div>
        
        {/* 总览选项卡 */}
        {activeTab === 'overview' && (
          <div className="py-4">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-start">
                <div className="mr-6">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full border-4 border-blue-500 flex items-center justify-center mx-auto">
                      <span className="text-3xl font-bold">{analysisResult.score}</span>
                    </div>
                    <div className="mt-2 font-medium text-gray-700">合规得分</div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center mb-4">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      analysisResult.complianceStatus === 'compliant' 
                        ? 'bg-green-100 text-green-800' 
                        : analysisResult.complianceStatus === 'partially-compliant'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                    }`}>
                      {analysisResult.complianceStatus === 'compliant' 
                        ? '合规' 
                        : analysisResult.complianceStatus === 'partially-compliant'
                          ? '部分合规'
                          : '不合规'}
                    </div>
                    
                    <div className="ml-4 text-gray-500 text-sm">
                      风险等级: 
                      <span className={`ml-1 font-medium ${
                        analysisResult.riskLevel === 'high' 
                          ? 'text-red-600' 
                          : analysisResult.riskLevel === 'medium'
                            ? 'text-yellow-600'
                            : 'text-green-600'
                      }`}>
                        {analysisResult.riskLevel === 'high' 
                          ? '高风险' 
                          : analysisResult.riskLevel === 'medium'
                            ? '中度风险'
                            : '低风险'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-gray-700 mb-4">
                    {analysisResult.summary}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-red-50 p-3 rounded-lg text-center">
                      <div className="text-red-600 font-bold text-xl">
                        {analysisResult.riskItems.filter(item => item.severity === 'high').length}
                      </div>
                      <div className="text-gray-600 text-sm">高风险条款</div>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded-lg text-center">
                      <div className="text-yellow-600 font-bold text-xl">
                        {analysisResult.riskItems.filter(item => item.severity === 'medium').length}
                      </div>
                      <div className="text-gray-600 text-sm">中度风险条款</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg text-center">
                      <div className="text-green-600 font-bold text-xl">
                        {analysisResult.riskItems.filter(item => item.severity === 'low').length}
                      </div>
                      <div className="text-gray-600 text-sm">低风险条款</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-5">
                <h3 className="font-medium text-lg mb-3">主要风险条款</h3>
                <ul className="space-y-2">
                  {analysisResult.riskItems.slice(0, 3).map(item => (
                    <li key={item.id} className="flex items-start">
                      <div className={`h-5 w-5 rounded-full flex items-center justify-center text-white text-xs mr-2 ${
                        item.severity === 'high' 
                          ? 'bg-red-500'
                          : item.severity === 'medium'
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                      }`}>
                        {item.severity === 'high' ? 'H' : item.severity === 'medium' ? 'M' : 'L'}
                      </div>
                      <div>
                        <div className="font-medium">{item.clause} (第{item.clauseNumber}条)</div>
                        <div className="text-sm text-gray-600 mt-1">{item.issue}</div>
                      </div>
                    </li>
                  ))}
                </ul>
                <button 
                  className="text-blue-600 hover:text-blue-800 text-sm mt-4"
                  onClick={() => setActiveTab('risks')}
                >
                  查看全部 &rarr;
                </button>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-5">
                <h3 className="font-medium text-lg mb-3">修改建议重点</h3>
                <ul className="space-y-2">
                  {analysisResult.suggestedChanges.slice(0, 3).map(item => (
                    <li key={item.id} className="flex items-start">
                      <FaPencilAlt className="text-blue-500 mt-1 mr-2" />
                      <div>
                        <div className="font-medium">第{item.clauseNumber}条</div>
                        <div className="text-sm text-gray-600 mt-1 line-clamp-2">{item.reason}</div>
                      </div>
                    </li>
                  ))}
                </ul>
                <button 
                  className="text-blue-600 hover:text-blue-800 text-sm mt-4"
                  onClick={() => setActiveTab('suggestions')}
                >
                  查看全部修改建议 &rarr;
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* 风险条款选项卡 */}
        {activeTab === 'risks' && (
          <div className="py-4">
            <div className="mb-4 relative">
              <input
                type="text"
                placeholder="搜索风险条款..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              {searchQuery && (
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setSearchQuery('')}
                >
                  <FaTimes />
                </button>
              )}
            </div>
            
            <div className="space-y-4">
              {filteredRisks.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  没有找到匹配的风险条款
                </div>
              ) : (
                filteredRisks.map(item => (
                  <div 
                    key={item.id} 
                    className={`border rounded-lg ${getSeverityStyle(item.severity)} p-4`}
                  >
                    <div className="flex justify-between mb-2">
                      <div className="font-medium">{item.clause} (第{item.clauseNumber}条)</div>
                      <div className={`text-sm px-2 py-0.5 rounded ${
                        item.severity === 'high' ? 'bg-red-200 text-red-800' :
                        item.severity === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                        'bg-green-200 text-green-800'
                      }`}>
                        {item.severity === 'high' ? '高风险' : 
                         item.severity === 'medium' ? '中风险' : '低风险'}
                      </div>
                    </div>
                    
                    <div className="text-sm mb-3 bg-white rounded p-3 border border-gray-200">
                      {item.content}
                    </div>
                    
                    <div className="mb-2">
                      <span className="text-gray-600 font-medium">问题: </span>
                      <span>{item.issue}</span>
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      <span className="font-medium">法律依据: </span>
                      <a href={item.regulation.url} className="hover:underline">
                        {item.regulation.name} {item.regulation.article}
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
        
        {/* 修改建议选项卡 */}
        {activeTab === 'suggestions' && (
          <div className="py-4">
            <div className="flex justify-end mb-4">
              <button
                className={`text-sm px-3 py-1 rounded ${
                  showOriginalContent ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                }`}
                onClick={() => setShowOriginalContent(!showOriginalContent)}
              >
                {showOriginalContent ? '隐藏原文' : '显示原文'}
              </button>
            </div>
            
            <div className="space-y-6">
              {analysisResult.suggestedChanges.map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="bg-blue-50 px-4 py-3 border-b border-blue-100">
                    <div className="font-medium">第{item.clauseNumber}条修改建议</div>
                  </div>
                  
                  {showOriginalContent && (
                    <div className="px-4 py-3 bg-red-50 text-sm">
                      <div className="font-medium text-red-700 mb-1">原条款内容:</div>
                      <div className="bg-white p-3 rounded border border-red-100">
                        {item.originalText}
                      </div>
                    </div>
                  )}
                  
                  <div className="px-4 py-3 bg-green-50 text-sm">
                    <div className="font-medium text-green-700 mb-1">建议修改为:</div>
                    <div className="bg-white p-3 rounded border border-green-100">
                      {item.suggestedText}
                    </div>
                  </div>
                  
                  <div className="px-4 py-3 text-sm border-t border-gray-100">
                    <div className="font-medium mb-1">修改理由:</div>
                    <div className="text-gray-700">
                      {item.reason}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-lg font-medium mb-4">智能合同分析</h2>
        
        {!file && !analysisResult && (
          <div className="flex flex-col items-center justify-center py-8 px-4 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
            <FaFileAlt className="text-gray-400 text-5xl mb-4" />
            <div className="text-center">
              <p className="text-gray-600 mb-4">上传劳动合同文件进行合规性分析</p>
              <button
                className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                onClick={() => document.getElementById('contract-file-input')?.click()}
              >
                <FaFileUpload className="mr-2" />
                选择文件
              </button>
              <input
                id="contract-file-input"
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileChange}
              />
            </div>
          </div>
        )}
        
        {file && !analysisResult && !isAnalyzing && (
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg mb-4">
            <div className="flex items-center">
              <FaFileAlt className="text-blue-500 mr-3 text-xl" />
              <div>
                <div className="font-medium">{file.name}</div>
                <div className="text-sm text-gray-500">
                  {file.type || '未知文件类型'} • {Math.round(file.size / 1024)} KB
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                onClick={() => setFile(null)}
              >
                取消
              </button>
              <button
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={startAnalysis}
              >
                开始分析
              </button>
            </div>
          </div>
        )}
        
        {file && isAnalyzing && (
          <div className="p-8 text-center">
            <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto mb-4"></div>
            <div className="text-lg font-medium text-gray-700">正在分析合同...</div>
            <div className="text-sm text-gray-500 mt-2">这可能需要几分钟，我们正在检查合规性并识别潜在风险</div>
          </div>
        )}
        
        {/* 分析结果区域 */}
        {renderAnalysisResult()}
      </div>
    </div>
  );
};

export default ContractAnalyzer; 