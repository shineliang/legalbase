import React, { useState } from 'react';
import { FaArrowRight, FaCalendarAlt, FaChartLine, FaExclamationTriangle, FaInfoCircle, FaLightbulb, FaRegClock } from 'react-icons/fa';

// 预测性合规分析组件
interface CompliancePredictorProps {
  companySize?: 'small' | 'medium' | 'large';
  industry?: string;
}

// 法规变化预测类型
interface RegulationTrend {
  id: number;
  title: string;
  probability: number; // 0-100
  impact: 'high' | 'medium' | 'low';
  timeframe: 'short' | 'medium' | 'long'; // 短期/中期/长期
  description: string;
  preparationSteps: string[];
}

// 风险预测类型
interface RiskPrediction {
  id: number;
  area: string;
  title: string;
  probability: number; // 0-100
  impact: 'high' | 'medium' | 'low';
  description: string;
  preventionSteps: string[];
}

const CompliancePredictor: React.FC<CompliancePredictorProps> = ({ 
  companySize = 'medium',
  industry = '科技/互联网'
}) => {
  const [activeTab, setActiveTab] = useState<'trends' | 'risks'>('trends');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  
  // 模拟的法规趋势预测数据
  const regulationTrends: RegulationTrend[] = [
    {
      id: 1,
      title: '个人信息保护法实施细则补充',
      probability: 92,
      impact: 'high',
      timeframe: 'short',
      description: '根据最近的政策动向，个人信息保护法实施细则预计将在3个月内出台补充规定，主要关注员工生物识别信息、办公场所监控和远程工作数据收集三个方面的规范。',
      preparationSteps: [
        '对现有的员工数据处理政策进行全面审计',
        '暂停使用未取得明确同意的生物识别设备',
        '制定专门的远程办公数据收集指南',
        '提前准备更新员工隐私政策'
      ]
    },
    {
      id: 2,
      title: '灵活用工管理新规',
      probability: 78,
      impact: 'medium',
      timeframe: 'medium',
      description: '随着远程办公和灵活用工模式的普及，预计人社部将在年内发布相关指导意见，规范灵活用工中的劳动合同签订、社保缴纳和工时管理等方面。',
      preparationSteps: [
        '梳理现有灵活用工人员的用工状态',
        '评估当前灵活用工方案的合规风险',
        '跟踪相关立法进展并参与讨论',
        '制定应急转型方案'
      ]
    },
    {
      id: 3,
      title: '劳动争议仲裁程序简化',
      probability: 65,
      impact: 'medium',
      timeframe: 'long',
      description: '为提高劳动争议解决效率，预计将推出仲裁程序简化措施，包括在线仲裁平台和简易程序适用范围扩大，这将加速劳动纠纷处理速度。',
      preparationSteps: [
        '加强内部调解机制建设',
        '完善劳动纠纷预警系统',
        '优化人事档案管理和证据保存',
        '对HR团队进行新规培训'
      ]
    },
    {
      id: 4,
      title: '跨境数据传输管理加强',
      probability: 88,
      impact: 'high',
      timeframe: 'medium',
      description: '随着数据安全法的持续落实，跨国企业员工数据的跨境传输将面临更严格的监管，预计将推出专门针对人力资源数据的跨境传输规定。',
      preparationSteps: [
        '梳理现有HR数据跨境传输现状',
        '落实数据分类分级管理',
        '准备数据出境安全评估申报材料',
        '设计符合本地化要求的HR数据存储方案'
      ]
    },
    {
      id: 5,
      title: '人工智能在就业中应用的伦理规范',
      probability: 72,
      impact: 'medium',
      timeframe: 'long',
      description: '随着AI技术在招聘、绩效评估等HR领域应用增加，预计将出台相关伦理指南和监管规定，重点关注算法公平性和个人隐私保护。',
      preparationSteps: [
        '审计现有AI工具的使用情况和决策逻辑',
        '确保AI系统决策过程可解释和透明',
        '建立人工审核机制作为AI决策的补充',
        '提前制定AI伦理使用指南'
      ]
    }
  ];
  
  // 模拟的风险预测数据
  const riskPredictions: RiskPrediction[] = [
    {
      id: 1,
      area: '数据合规',
      title: '员工监控措施合法性风险',
      probability: 82,
      impact: 'high',
      description: '根据贵公司现有的员工电脑监控和活动追踪措施，结合最新的个人信息保护法解释，存在被认定为过度监控的高风险。近期已有多起类似企业因此受到处罚或面临员工集体投诉。',
      preventionSteps: [
        '立即审查并调整现有监控范围和频率',
        '获取员工对必要监控的明确书面同意',
        '制定并公示监控目的、范围和数据使用规则',
        '为员工提供查询自己被收集数据的渠道'
      ]
    },
    {
      id: 2,
      area: '劳动用工',
      title: '加班管理合规风险',
      probability: 75,
      impact: 'high',
      description: '基于贵公司所在行业的加班文化和现有考勤记录分析，存在加班时长超出法定限制和加班费计算不规范的风险。行业内已有多家企业因类似问题面临集体劳动仲裁。',
      preventionSteps: [
        '全面审计近6个月加班记录',
        '完善加班申请和审批流程',
        '调整考勤系统确保准确记录工作时间',
        '制定加班替代方案如调休制度'
      ]
    },
    {
      id: 3,
      area: '薪酬福利',
      title: '绩效考核与奖金发放争议风险',
      probability: 65,
      impact: 'medium',
      description: '贵公司现行的绩效考核标准存在主观性较强、文档记录不完善的问题，结合最近的裁员计划，可能导致绩效不达标员工提出考核不公的争议。',
      preventionSteps: [
        '优化绩效考核指标使其更客观量化',
        '加强考核过程记录和证据保存',
        '定期与员工沟通绩效反馈',
        '完善绩效申诉机制'
      ]
    },
    {
      id: 4,
      area: '员工关系',
      title: '不当解雇风险',
      probability: 70,
      impact: 'high',
      description: '根据贵公司过去12个月的离职数据和行业趋势分析，在当前经济环境下存在因业务调整而批量裁员的可能，若程序不合规可能引发群体性劳动争议。',
      preventionSteps: [
        '制定合规的裁员预案和沟通方案',
        '梳理并完善现有劳动合同中的解除条款',
        '建立健全的员工绩效问题预警和辅导机制',
        '准备合理的经济补偿方案'
      ]
    },
    {
      id: 5,
      area: '社会保险',
      title: '社保缴纳基数不规范风险',
      probability: 68,
      impact: 'medium',
      description: '分析显示贵公司部分员工社保缴纳基数低于实际工资水平，随着社保征管并入税务部门，数据比对更加严格，面临补缴和罚款风险增加。',
      preventionSteps: [
        '全面审计现有社保缴纳情况',
        '逐步调整社保缴纳基数至合规水平',
        '完善薪酬结构设计',
        '关注地方政策变化及时应对'
      ]
    }
  ];
  
  // 根据时间范围获取标签样式
  const getTimeframeStyle = (timeframe: 'short' | 'medium' | 'long') => {
    switch (timeframe) {
      case 'short':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'long':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // 根据概率获取进度条样式
  const getProbabilityStyle = (probability: number) => {
    if (probability >= 80) return 'bg-red-500';
    if (probability >= 60) return 'bg-yellow-500';
    return 'bg-blue-500';
  };
  
  // 根据影响程度获取标签样式
  const getImpactStyle = (impact: 'high' | 'medium' | 'low') => {
    switch (impact) {
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
  
  // 切换筛选条件
  const toggleFilter = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter(f => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };
  
  // 获取筛选后的数据
  const getFilteredTrends = () => {
    if (selectedFilters.length === 0) return regulationTrends;
    
    return regulationTrends.filter(trend => {
      return selectedFilters.includes(trend.impact) || 
             selectedFilters.includes(trend.timeframe);
    });
  };
  
  const getFilteredRisks = () => {
    if (selectedFilters.length === 0) return riskPredictions;
    
    return riskPredictions.filter(risk => {
      return selectedFilters.includes(risk.impact) || 
             selectedFilters.includes(risk.area);
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-lg font-medium mb-4">预测性合规分析</h2>
        
        <div className="flex items-center text-sm text-gray-600 mb-6">
          <div className="flex items-center mr-4">
            <FaInfoCircle className="mr-1" />
            <span>公司规模: {companySize === 'small' ? '小型' : companySize === 'medium' ? '中型' : '大型'}</span>
          </div>
          <div className="flex items-center">
            <FaInfoCircle className="mr-1" />
            <span>行业: {industry}</span>
          </div>
        </div>
        
        {/* 选项卡导航 */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-3 px-6 font-medium text-sm border-b-2 ${
              activeTab === 'trends' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('trends')}
          >
            <FaChartLine className="inline-block mr-2" />
            法规趋势预测
          </button>
          <button
            className={`py-3 px-6 font-medium text-sm border-b-2 ${
              activeTab === 'risks' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('risks')}
          >
            <FaExclamationTriangle className="inline-block mr-2" />
            风险预警分析
          </button>
        </div>
        
        {/* 筛选区域 */}
        <div className="flex flex-wrap gap-2 mb-6">
          {activeTab === 'trends' ? (
            <>
              <button
                className={`px-3 py-1 text-xs rounded-full border ${
                  selectedFilters.includes('high') ? 'bg-red-100 text-red-800 border-red-200' : 'bg-gray-100 text-gray-600 border-gray-200'
                }`}
                onClick={() => toggleFilter('high')}
              >
                高影响
              </button>
              <button
                className={`px-3 py-1 text-xs rounded-full border ${
                  selectedFilters.includes('medium') ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : 'bg-gray-100 text-gray-600 border-gray-200'
                }`}
                onClick={() => toggleFilter('medium')}
              >
                中等影响
              </button>
              <button
                className={`px-3 py-1 text-xs rounded-full border ${
                  selectedFilters.includes('short') ? 'bg-red-100 text-red-800 border-red-200' : 'bg-gray-100 text-gray-600 border-gray-200'
                }`}
                onClick={() => toggleFilter('short')}
              >
                短期内(0-6个月)
              </button>
              <button
                className={`px-3 py-1 text-xs rounded-full border ${
                  selectedFilters.includes('medium') ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : 'bg-gray-100 text-gray-600 border-gray-200'
                }`}
                onClick={() => toggleFilter('medium')}
              >
                中期内(6-12个月)
              </button>
              <button
                className={`px-3 py-1 text-xs rounded-full border ${
                  selectedFilters.includes('long') ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-gray-100 text-gray-600 border-gray-200'
                }`}
                onClick={() => toggleFilter('long')}
              >
                长期内(1年以上)
              </button>
            </>
          ) : (
            <>
              <button
                className={`px-3 py-1 text-xs rounded-full border ${
                  selectedFilters.includes('high') ? 'bg-red-100 text-red-800 border-red-200' : 'bg-gray-100 text-gray-600 border-gray-200'
                }`}
                onClick={() => toggleFilter('high')}
              >
                高影响
              </button>
              <button
                className={`px-3 py-1 text-xs rounded-full border ${
                  selectedFilters.includes('medium') ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : 'bg-gray-100 text-gray-600 border-gray-200'
                }`}
                onClick={() => toggleFilter('medium')}
              >
                中等影响
              </button>
              <button
                className={`px-3 py-1 text-xs rounded-full border ${
                  selectedFilters.includes('数据合规') ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-gray-100 text-gray-600 border-gray-200'
                }`}
                onClick={() => toggleFilter('数据合规')}
              >
                数据合规
              </button>
              <button
                className={`px-3 py-1 text-xs rounded-full border ${
                  selectedFilters.includes('劳动用工') ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-100 text-gray-600 border-gray-200'
                }`}
                onClick={() => toggleFilter('劳动用工')}
              >
                劳动用工
              </button>
              <button
                className={`px-3 py-1 text-xs rounded-full border ${
                  selectedFilters.includes('薪酬福利') ? 'bg-purple-100 text-purple-800 border-purple-200' : 'bg-gray-100 text-gray-600 border-gray-200'
                }`}
                onClick={() => toggleFilter('薪酬福利')}
              >
                薪酬福利
              </button>
            </>
          )}
          
          {selectedFilters.length > 0 && (
            <button
              className="px-3 py-1 text-xs text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedFilters([])}
            >
              清除筛选
            </button>
          )}
        </div>
        
        {/* 法规趋势预测内容 */}
        {activeTab === 'trends' && (
          <div className="space-y-6">
            {getFilteredTrends().map(trend => (
              <div key={trend.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="border-b border-gray-100 px-5 py-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-lg">{trend.title}</h3>
                    <div className={`px-3 py-1 rounded-full text-xs ${getTimeframeStyle(trend.timeframe)}`}>
                      {trend.timeframe === 'short' ? '短期内(0-6个月)' : 
                       trend.timeframe === 'medium' ? '中期内(6-12个月)' : '长期内(1年以上)'}
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-2">
                    <div className="mr-4 w-24">
                      <div className="text-sm text-gray-500 mb-1">发生概率</div>
                      <div className="h-2 w-full bg-gray-200 rounded-full">
                        <div 
                          className={`h-2 rounded-full ${getProbabilityStyle(trend.probability)}`}
                          style={{ width: `${trend.probability}%` }}
                        ></div>
                      </div>
                      <div className="text-right text-xs text-gray-500 mt-1">{trend.probability}%</div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="text-sm text-gray-500 mr-2">影响程度:</div>
                      <div className={`px-2 py-0.5 rounded text-xs ${getImpactStyle(trend.impact)}`}>
                        {trend.impact === 'high' ? '高' : trend.impact === 'medium' ? '中' : '低'}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="px-5 py-4 bg-gray-50">
                  <div className="text-gray-700 text-sm">
                    {trend.description}
                  </div>
                  
                  <div className="mt-4">
                    <div className="font-medium text-sm mb-2 flex items-center">
                      <FaLightbulb className="text-yellow-500 mr-2" />
                      准备建议
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 pl-1">
                      {trend.preparationSteps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
            
            {getFilteredTrends().length === 0 && (
              <div className="text-center py-12 text-gray-500">
                没有找到匹配的法规趋势预测
              </div>
            )}
          </div>
        )}
        
        {/* 风险预警分析内容 */}
        {activeTab === 'risks' && (
          <div className="space-y-6">
            {getFilteredRisks().map(risk => (
              <div key={risk.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600 inline-block mb-2">
                        {risk.area}
                      </div>
                      <h3 className="font-medium text-lg">{risk.title}</h3>
                    </div>
                    <div className={`px-3 py-1 rounded text-xs ${getImpactStyle(risk.impact)}`}>
                      {risk.impact === 'high' ? '高风险' : risk.impact === 'medium' ? '中度风险' : '低风险'}
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <div className="text-sm text-gray-500 mb-1">风险概率</div>
                    <div className="flex items-center">
                      <div className="w-full h-2 bg-gray-200 rounded-full mr-2">
                        <div 
                          className={`h-2 rounded-full ${getProbabilityStyle(risk.probability)}`}
                          style={{ width: `${risk.probability}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 w-8">{risk.probability}%</div>
                    </div>
                  </div>
                </div>
                
                <div className="px-5 py-4">
                  <div className="text-gray-700 text-sm">
                    {risk.description}
                  </div>
                  
                  <div className="mt-4">
                    <div className="font-medium text-sm mb-2 flex items-center">
                      <FaExclamationTriangle className="text-yellow-500 mr-2" />
                      预防措施
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 pl-1">
                      {risk.preventionSteps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
            
            {getFilteredRisks().length === 0 && (
              <div className="text-center py-12 text-gray-500">
                没有找到匹配的风险预警
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompliancePredictor; 