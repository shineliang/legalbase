import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaExclamationTriangle, FaFireAlt, FaLightbulb, FaSearch, FaSort, FaTimesCircle } from 'react-icons/fa';

// 合规建议中心页面
const ComplianceRecommendations: React.FC = () => {
  // 过滤和搜索状态
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('risk');

  // 模拟数据
  const recommendationData = [
    {
      id: 1,
      title: '指定个人信息保护负责人并公布联系方式',
      risk: 'high',
      categories: ['数据隐私', '组织架构'],
      deadline: '2025-04-01',
      description: '根据《个人信息保护法》实施细则更新第四十九条，贵公司需指定个人信息保护负责人，负责监督个人信息处理活动与保护措施，并向员工公开联系方式。',
      riskNote: '未指定个人信息保护负责人可能导致最高100万元罚款，且相关业务被要求停止。',
      steps: [
        { id: 1, title: '选择合适人选', description: '通常由法务、合规或信息安全负责人担任', status: 'pending' },
        { id: 2, title: '明确职责范围', description: '制定职责说明书，包括监督权限、报告机制', status: 'pending' },
        { id: 3, title: '公司内部公示', description: '通过内部通知、员工手册等告知全体员工', status: 'pending' },
        { id: 4, title: '提供必要资源', description: '确保负责人有足够的资源和决策权', status: 'pending' }
      ],
      status: 'new'
    },
    {
      id: 2,
      title: '更新员工敏感信息收集同意书',
      risk: 'medium',
      categories: ['数据隐私', '文档管理'],
      deadline: '2025-03-15',
      description: '《个人信息保护法》实施细则更新明确要求，处理员工敏感个人信息(如生物识别、健康、位置信息等)时，需获得员工明确单独同意，且应明确告知处理目的和保存期限。',
      riskNote: '贵公司目前的员工隐私政策仅在入职文件中简单提及，并未针对敏感信息专门征得员工同意。',
      steps: [
        { id: 1, title: '梳理敏感信息清单', description: '梳理所有收集的员工敏感信息类型', status: 'in-progress', progress: 30 },
        { id: 2, title: '设计同意书模板', description: '针对不同敏感信息类型制定明确的同意书', status: 'pending' },
        { id: 3, title: '组织员工签署', description: '向现有员工发放并收集签名', status: 'pending' },
        { id: 4, title: '更新入职流程', description: '将同意书纳入标准入职流程', status: 'pending' }
      ],
      status: 'in-progress'
    },
    {
      id: 3,
      title: '建立个人信息分级分类管理制度',
      risk: 'low',
      categories: ['数据管理', '制度建设'],
      deadline: '2025-05-20',
      description: '进一步提升员工数据管理水平，建议建立明确的数据分类分级管理制度，对不同类型和敏感程度的员工数据制定差异化管理策略。',
      riskNote: '行业领先企业通常将员工数据分为公开、内部、保密、高度保密四级，并针对不同级别采取不同的权限控制和保护措施。',
      steps: [
        { id: 1, title: '数据清单建立', description: '梳理所有员工数据类型', status: 'completed' },
        { id: 2, title: '分级标准制定', description: '确定分级分类标准与管理规则', status: 'in-progress', progress: 60 },
        { id: 3, title: '系统权限配置', description: '根据分级调整系统权限设置', status: 'pending' },
        { id: 4, title: '员工培训宣导', description: '开展相关培训并强化意识', status: 'pending' }
      ],
      status: 'in-progress'
    },
    {
      id: 4,
      title: '更新员工考勤制度',
      risk: 'medium',
      categories: ['工时管理', '制度建设'],
      deadline: '2025-02-25',
      description: '依据新《劳动合同法》修正案更新考勤制度，明确加班管理流程',
      riskNote: '新规定对弹性工作制和加班计算方式有重大调整',
      steps: [
        { id: 1, title: '分析法规变化', description: '分析新法对现有制度的影响', status: 'completed' },
        { id: 2, title: '修订考勤制度', description: '更新考勤规则和加班管理流程', status: 'completed' },
        { id: 3, title: '员工公示与培训', description: '向全体员工宣导新规则', status: 'completed' },
        { id: 4, title: '系统配置更新', description: '更新考勤系统配置', status: 'completed' }
      ],
      status: 'completed'
    },
    {
      id: 5,
      title: '建立数据泄露应急响应流程',
      risk: 'high',
      categories: ['数据隐私', '风险管理'],
      deadline: '2025-02-18',
      description: '制定员工数据泄露应急处理流程，明确责任人和报告机制',
      riskNote: '数据泄露可能导致罚款和声誉损失，需建立快速响应机制',
      steps: [
        { id: 1, title: '成立应急团队', description: '确定各部门应急负责人', status: 'completed' },
        { id: 2, title: '制定响应流程', description: '编写响应流程和汇报机制', status: 'completed' },
        { id: 3, title: '准备通知模板', description: '准备内外部通知文件模板', status: 'completed' },
        { id: 4, title: '开展演练', description: '进行应急响应模拟演练', status: 'completed' }
      ],
      status: 'completed'
    }
  ];

  // 获取风险标签的样式
  const getRiskBadgeClass = (risk: string) => {
    switch (risk) {
      case 'high':
        return 'bg-danger';
      case 'medium':
        return 'bg-warning';
      case 'low':
        return 'bg-success';
      default:
        return 'bg-gray-500';
    }
  };

  // 获取步骤状态的样式
  const getStepStatusClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-success';
      case 'in-progress':
        return 'text-warning';
      case 'pending':
        return 'text-gray-400';
      default:
        return 'text-gray-400';
    }
  };

  // 获取推荐卡片的样式
  const getRecommendationCardClass = (risk: string) => {
    switch (risk) {
      case 'high':
        return 'border-l-4 border-danger';
      case 'medium':
        return 'border-l-4 border-warning';
      case 'low':
        return 'border-l-4 border-success';
      default:
        return '';
    }
  };

  // 过滤和排序推荐
  const filteredRecommendations = recommendationData
    .filter(rec => {
      // 搜索过滤
      if (searchQuery && !rec.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !rec.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // 风险级别过滤
      if (riskFilter !== 'all' && rec.risk !== riskFilter) {
        return false;
      }
      
      // 分类过滤
      if (categoryFilter !== 'all' && !rec.categories.some(cat => 
        cat.toLowerCase() === categoryFilter.toLowerCase()
      )) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      // 排序
      if (sortBy === 'risk') {
        const riskOrder = { high: 0, medium: 1, low: 2 };
        return riskOrder[a.risk as keyof typeof riskOrder] - riskOrder[b.risk as keyof typeof riskOrder];
      } else if (sortBy === 'deadline') {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      } else {
        return 0;
      }
    });

  // 计算剩余天数
  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">个性化合规建议中心</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 左侧 - 合规概览 */}
        <div className="lg:col-span-4">
          {/* 合规评分卡 */}
          <div className="card mb-6">
            <h2 className="text-lg font-semibold mb-4">合规评分卡</h2>
            <div className="flex flex-col items-center mb-6">
              {/* 圆形进度条 */}
              <div className="relative mb-4">
                <div className="w-48 h-48 rounded-full relative">
                  {/* 红色部分 (0-22%) */}
                  <div className="absolute inset-0 rounded-full border-[16px] border-danger" 
                       style={{ clipPath: 'polygon(50% 50%, 0 0, 22% 0)', transform: 'rotate(270deg)' }}></div>
                  {/* 黄色部分 (22-42%) */}
                  <div className="absolute inset-0 rounded-full border-[16px] border-warning" 
                       style={{ clipPath: 'polygon(50% 50%, 22% 0, 42% 0)', transform: 'rotate(270deg)' }}></div>
                  {/* 绿色部分 (42-100%) */}
                  <div className="absolute inset-0 rounded-full border-[16px] border-success" 
                       style={{ clipPath: 'polygon(50% 50%, 42% 0, 100% 0, 100% 100%, 0 100%, 0 0)', transform: 'rotate(270deg)' }}></div>
                  {/* 白色内圆 */}
                  <div className="absolute inset-[16px] bg-white rounded-full flex flex-col items-center justify-center">
                    <span className="text-5xl font-bold text-primary">78</span>
                    <span className="text-gray-500 text-sm">整体合规分数</span>
                  </div>
                </div>
              </div>
              
              {/* 风险统计 */}
              <div className="grid grid-cols-3 w-full gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-danger">5</p>
                  <p className="text-sm text-gray-500">高风险</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-warning">7</p>
                  <p className="text-sm text-gray-500">中风险</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-success">12</p>
                  <p className="text-sm text-gray-500">低风险</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* 行业标杆对比 */}
          <div className="card mb-6">
            <h2 className="text-lg font-semibold mb-4">行业标杆对比</h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">整体合规水平</span>
                  <span className="text-sm font-medium">78% / 82%</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '78%' }}></div>
                  <div className="h-4 w-1 bg-danger absolute -mt-1 rounded-sm" style={{ marginLeft: '82%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">您 / 行业平均</p>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">数据隐私</span>
                  <span className="text-sm font-medium">65% / 75%</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden relative">
                  <div className="h-full bg-primary rounded-full" style={{ width: '65%' }}></div>
                  <div className="h-4 w-1 bg-danger absolute -mt-1 rounded-sm" style={{ marginLeft: '75%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">您 / 行业平均</p>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">劳动合同</span>
                  <span className="text-sm font-medium">85% / 80%</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden relative">
                  <div className="h-full bg-primary rounded-full" style={{ width: '85%' }}></div>
                  <div className="h-4 w-1 bg-danger absolute -mt-1 rounded-sm" style={{ marginLeft: '80%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">您 / 行业平均</p>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">工时管理</span>
                  <span className="text-sm font-medium">90% / 85%</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden relative">
                  <div className="h-full bg-primary rounded-full" style={{ width: '90%' }}></div>
                  <div className="h-4 w-1 bg-danger absolute -mt-1 rounded-sm" style={{ marginLeft: '85%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">您 / 行业平均</p>
              </div>
            </div>
          </div>
          
          {/* 合规进度 */}
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">合规改进进度</h2>
            
            <div className="flex justify-between mb-3">
              <div>
                <h3 className="text-3xl font-bold">42%</h3>
                <p className="text-sm text-gray-500">风险减缓进度</p>
              </div>
              <div>
                <select className="bg-white border border-gray-300 text-gray-700 py-1 px-3 rounded text-sm focus:outline-none focus:ring-primary focus:border-primary">
                  <option>本月</option>
                  <option>本季度</option>
                  <option>本年度</option>
                </select>
              </div>
            </div>
            
            <div className="h-5 w-full bg-gray-200 rounded-full overflow-hidden mb-2">
              <div className="h-full flex">
                <div className="h-full bg-success" style={{ width: '20%' }}></div>
                <div className="h-full bg-warning" style={{ width: '22%' }}></div>
                <div className="h-full bg-danger" style={{ width: '58%' }}></div>
              </div>
            </div>
            
            <div className="flex justify-between text-xs">
              <span className="text-success">8项已完成</span>
              <span className="text-warning">9项进行中</span>
              <span className="text-danger">17项未开始</span>
            </div>
          </div>
        </div>
        
        {/* 右侧 - 建议列表 */}
        <div className="lg:col-span-8">
          {/* 筛选器 */}
          <div className="card mb-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-5">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="搜索合规建议..." 
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
              </div>
              <div className="md:col-span-2">
                <select 
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  value={riskFilter}
                  onChange={(e) => setRiskFilter(e.target.value)}
                >
                  <option value="all">所有风险等级</option>
                  <option value="high">高风险</option>
                  <option value="medium">中风险</option>
                  <option value="low">低风险</option>
                </select>
              </div>
              <div className="md:col-span-3">
                <select 
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="all">所有领域</option>
                  <option value="数据隐私">数据隐私</option>
                  <option value="数据管理">数据管理</option>
                  <option value="工时管理">工时管理</option>
                  <option value="组织架构">组织架构</option>
                  <option value="制度建设">制度建设</option>
                  <option value="文档管理">文档管理</option>
                  <option value="风险管理">风险管理</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <select 
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="risk">风险优先</option>
                  <option value="deadline">截止日期</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* 建议卡片列表 */}
          <div className="space-y-6">
            {filteredRecommendations.map((recommendation) => (
              <div 
                key={recommendation.id} 
                className={`card ${getRecommendationCardClass(recommendation.risk)} hover:shadow-md transition-shadow`}
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-xl font-medium mb-2">{recommendation.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className={`text-xs px-2 py-1 rounded-full text-white ${getRiskBadgeClass(recommendation.risk)}`}>
                        {recommendation.risk === 'high' ? '高风险' : recommendation.risk === 'medium' ? '中风险' : '低风险'}
                      </span>
                      {recommendation.categories.map((category, index) => (
                        <span key={index} className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-2 md:mt-0 text-right">
                    <div className={`font-medium ${recommendation.risk === 'high' ? 'text-danger' : recommendation.risk === 'medium' ? 'text-warning' : 'text-success'}`}>
                      {recommendation.status === 'completed' ? 
                        '已完成' : 
                        `截止日期: ${recommendation.deadline}`
                      }
                    </div>
                    {recommendation.status !== 'completed' && (
                      <div className="text-xs text-gray-500">
                        距今 {getDaysRemaining(recommendation.deadline)} 天
                      </div>
                    )}
                  </div>
                </div>
                
                <p className="mb-4">{recommendation.description}</p>
                
                <div className={`p-4 rounded-lg mb-4 ${
                  recommendation.risk === 'high' 
                    ? 'bg-red-50 border border-red-100' 
                    : recommendation.risk === 'medium'
                      ? 'bg-yellow-50 border border-yellow-100'
                      : 'bg-green-50 border border-green-100'
                }`}>
                  <div className="flex items-start">
                    <div className="mr-2 mt-0.5">
                      {recommendation.risk === 'high' 
                        ? <FaExclamationTriangle className="text-danger" />
                        : recommendation.status === 'completed'
                          ? <FaCheckCircle className="text-success" />
                          : <FaLightbulb className="text-warning" />
                      }
                    </div>
                    <div>
                      <strong className="text-sm">
                        {recommendation.risk === 'high' 
                          ? '风险提示:' 
                          : recommendation.status === 'completed'
                            ? '完成情况:'
                            : '建议提示:'
                        }
                      </strong>
                      <p className="text-sm">{recommendation.riskNote}</p>
                    </div>
                  </div>
                </div>
                
                <h4 className="font-medium mb-2">建议实施步骤</h4>
                <ol className="space-y-3 mb-4 relative before:absolute before:left-[15px] before:top-0 before:h-full before:w-0.5 before:bg-gray-200">
                  {recommendation.steps.map((step) => (
                    <li key={step.id} className="pl-10 relative">
                      <div className={`absolute left-[7px] top-1 w-[16px] h-[16px] rounded-full border-2 border-white z-10 ${
                        step.status === 'completed' 
                          ? 'bg-success' 
                          : step.status === 'in-progress' 
                            ? 'bg-warning' 
                            : 'bg-gray-300'
                      }`}></div>
                      <div className={`font-medium ${getStepStatusClass(step.status)}`}>
                        {step.title}
                        {step.status === 'in-progress' && step.progress && (
                          <span className="ml-2 text-xs">({step.progress}%)</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{step.description}</p>
                      {step.status === 'in-progress' && step.progress && (
                        <div className="w-full h-1 bg-gray-200 rounded-full mt-1">
                          <div 
                            className="h-full bg-warning rounded-full" 
                            style={{ width: `${step.progress}%` }}>
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ol>
                
                <div className="flex justify-end gap-3">
                  {recommendation.status === 'completed' ? (
                    <button className="btn btn-outline border border-gray-300 text-gray-700 hover:bg-gray-50">
                      查看详情
                    </button>
                  ) : (
                    <>
                      <button className="btn btn-outline border border-gray-300 text-gray-700 hover:bg-gray-50">
                        暂不处理
                      </button>
                      <button className="btn btn-primary">
                        {recommendation.status === 'in-progress' ? '继续处理' : '创建任务'}
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
            
            {/* 已完成建议 */}
            {recommendationData.filter(r => r.status === 'completed').length > 0 && (
              <div className="card">
                <h2 className="text-lg font-semibold mb-4">最近完成的合规任务</h2>
                <div className="divide-y">
                  {recommendationData
                    .filter(r => r.status === 'completed')
                    .map(rec => (
                      <div key={rec.id} className="py-3 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between mb-1">
                          <h3 className="font-medium">{rec.title}</h3>
                          <span className="text-xs text-success">完成于 {rec.deadline}</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-1">{rec.description}</p>
                        <a href="#" className="text-primary text-sm hover:underline">查看详情</a>
                      </div>
                    ))
                  }
                </div>
              </div>
            )}
            
            {/* 分页 */}
            <div className="flex justify-center mt-6">
              <nav aria-label="页面导航">
                <ul className="flex space-x-1">
                  <li>
                    <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-500 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                      上一页
                    </button>
                  </li>
                  <li>
                    <button className="px-3 py-1 rounded-md border border-primary bg-primary text-white">1</button>
                  </li>
                  <li>
                    <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50">2</button>
                  </li>
                  <li>
                    <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50">3</button>
                  </li>
                  <li>
                    <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50">
                      下一页
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceRecommendations; 