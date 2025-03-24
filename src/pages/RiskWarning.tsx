import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaBell, FaCalendarAlt, FaExclamationTriangle, FaFilter, FaSearch, FaSort } from 'react-icons/fa';

// 风险预警页面
const RiskWarning: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'severity'>('newest');
  
  // 模拟数据 - 风险预警列表
  const warnings = [
    {
      id: 1,
      title: '《个人信息保护法》新规将影响指纹考勤合规性',
      severity: 'high',
      date: '2025-02-15',
      daysLeft: 45,
      regulation: '《个人信息保护法》实施细则',
      source: '法规变更',
      description: '新修订的实施细则将于45天后生效，明确将员工考勤数据纳入敏感信息范畴，要求取得单独同意并建立专项保护措施。贵公司现有的指纹考勤系统不符合新规定，需要立即调整。',
      status: 'unread'
    },
    {
      id: 2,
      title: '工资支付管理条例将调整，强制要求建立争议解决机制',
      severity: 'medium',
      date: '2025-03-01',
      daysLeft: 60,
      regulation: '《工资支付条例》修订草案',
      source: '法规预告',
      description: '人社部发布的最新草案要求所有企业建立内部工资争议调解机制，明确薪酬计算标准和加班费计算方式。建议公司更新薪酬管理制度，建立专门的争议解决通道。',
      status: 'active'
    },
    {
      id: 3,
      title: '本地劳动监察执法趋严，多家企业因加班管理被处罚',
      severity: 'medium',
      date: '2025-03-05',
      daysLeft: 0,
      regulation: '《劳动法》第三十六条、第四十一条',
      source: '执法趋势',
      description: '本地区劳动监察部门近期加大了对违规加班的执法力度，已有12家企业因违反工时规定被处罚，建议公司立即自查工时管理情况，确保符合法定标准。',
      status: 'resolved'
    },
    {
      id: 4,
      title: '涉外员工管理法规变更，影响国际派遣政策',
      severity: 'low',
      date: '2025-03-10',
      daysLeft: 75,
      regulation: '《外国人在中国就业管理规定》',
      source: '法规变更',
      description: '国家移民管理局发布的新规定调整了外籍员工就业许可申请流程和标准，增加了用人单位责任。如贵公司有外籍员工或海外派遣计划，需要更新相关政策和流程。',
      status: 'unread'
    },
    {
      id: 5,
      title: '行业协会发布员工数据保护新标准，建议参考执行',
      severity: 'low',
      date: '2025-03-15',
      daysLeft: 0,
      regulation: '《信息技术行业员工数据保护实践指南》',
      source: '行业标准',
      description: '行业协会发布的新标准虽非强制性规范，但作为行业最佳实践，建议公司参考执行。该指南详细规定了IT企业应如何保护、处理和管理员工数据。',
      status: 'active'
    }
  ];
  
  // 根据筛选条件过滤预警
  const filteredWarnings = warnings.filter(warning => {
    // 根据状态筛选
    if (activeFilter !== 'all' && warning.status !== activeFilter) {
      return false;
    }
    
    // 根据搜索词筛选
    if (searchTerm && !warning.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !warning.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // 根据排序方式排序
  const sortedWarnings = [...filteredWarnings].sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      // 按严重程度排序
      const severityOrder = { high: 3, medium: 2, low: 1 };
      return severityOrder[b.severity as keyof typeof severityOrder] - 
             severityOrder[a.severity as keyof typeof severityOrder];
    }
  });
  
  // 获取严重程度样式
  const getSeverityClass = (severity: string) => {
    switch (severity) {
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
  
  // 获取状态样式
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'unread':
        return 'bg-blue-100 text-blue-800';
      case 'active':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // 获取状态文本
  const getStatusText = (status: string) => {
    switch (status) {
      case 'unread':
        return '未读';
      case 'active':
        return '处理中';
      case 'resolved':
        return '已解决';
      default:
        return '未知';
    }
  };
  
  // 根据剩余天数获取样式
  const getDaysLeftClass = (days: number) => {
    if (days === 0) return 'text-gray-500';
    if (days <= 30) return 'text-danger';
    if (days <= 60) return 'text-warning';
    return 'text-success';
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">风险预警</h1>
        <p className="text-gray-600">实时监控法律风险，提前预警潜在合规问题</p>
      </div>
      
      {/* 统计概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="card flex items-center p-4">
          <div className="rounded-full bg-red-100 p-3 mr-4 text-danger">
            {React.createElement(FaExclamationTriangle, { size: 20 })}
          </div>
          <div>
            <p className="text-sm text-gray-500">高危风险</p>
            <p className="text-2xl font-bold">{warnings.filter(w => w.severity === 'high').length}</p>
          </div>
        </div>
        <div className="card flex items-center p-4">
          <div className="rounded-full bg-yellow-100 p-3 mr-4 text-warning">
            {React.createElement(FaExclamationTriangle, { size: 20 })}
          </div>
          <div>
            <p className="text-sm text-gray-500">中等风险</p>
            <p className="text-2xl font-bold">{warnings.filter(w => w.severity === 'medium').length}</p>
          </div>
        </div>
        <div className="card flex items-center p-4">
          <div className="rounded-full bg-green-100 p-3 mr-4 text-success">
            {React.createElement(FaExclamationTriangle, { size: 20 })}
          </div>
          <div>
            <p className="text-sm text-gray-500">低风险</p>
            <p className="text-2xl font-bold">{warnings.filter(w => w.severity === 'low').length}</p>
          </div>
        </div>
        <div className="card flex items-center p-4">
          <div className="rounded-full bg-blue-100 p-3 mr-4 text-blue-600">
            {React.createElement(FaBell, { size: 20 })}
          </div>
          <div>
            <p className="text-sm text-gray-500">未解决风险</p>
            <p className="text-2xl font-bold">{warnings.filter(w => w.status !== 'resolved').length}</p>
          </div>
        </div>
      </div>
      
      {/* 搜索和筛选 */}
      <div className="card mb-6">
        <div className="md:flex justify-between items-center">
          <div className="relative flex-grow md:max-w-md mb-4 md:mb-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {React.createElement(FaSearch, { className: "text-gray-400" })}
            </div>
            <input
              type="text"
              placeholder="搜索风险预警..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                className={`px-4 py-2 text-sm font-medium border ${
                  activeFilter === 'all' 
                    ? 'bg-primary text-white border-primary' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                } rounded-l-lg`}
                onClick={() => setActiveFilter('all')}
              >
                全部
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium border-t border-b border-r ${
                  activeFilter === 'unread' 
                    ? 'bg-primary text-white border-primary' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setActiveFilter('unread')}
              >
                未读
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium border-t border-b border-r ${
                  activeFilter === 'active' 
                    ? 'bg-primary text-white border-primary' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setActiveFilter('active')}
              >
                处理中
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium border-t border-b border-r ${
                  activeFilter === 'resolved' 
                    ? 'bg-primary text-white border-primary' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                } rounded-r-lg`}
                onClick={() => setActiveFilter('resolved')}
              >
                已解决
              </button>
            </div>
            
            <div className="inline-flex rounded-md shadow-sm">
              <button
                className={`px-4 py-2 text-sm font-medium border ${
                  sortOrder === 'newest' 
                    ? 'bg-primary text-white border-primary' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                } rounded-l-lg`}
                onClick={() => setSortOrder('newest')}
              >
                最新
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium border-t border-b border-r ${
                  sortOrder === 'severity' 
                    ? 'bg-primary text-white border-primary' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                } rounded-r-lg`}
                onClick={() => setSortOrder('severity')}
              >
                严重度
              </button>
            </div>
            
            <button className="px-4 py-2 text-sm font-medium bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 inline-flex items-center">
              {React.createElement(FaFilter, { className: "mr-2" })} 高级筛选
            </button>
          </div>
        </div>
      </div>
      
      {/* 预警列表 */}
      <div className="space-y-4 mb-6">
        {sortedWarnings.length > 0 ? (
          sortedWarnings.map(warning => (
            <div 
              key={warning.id} 
              className={`card p-0 overflow-hidden border-l-4 ${
                warning.severity === 'high' 
                  ? 'border-danger' 
                  : warning.severity === 'medium' 
                  ? 'border-warning' 
                  : 'border-success'
              }`}
            >
              <div className="p-5">
                <div className="md:flex justify-between items-start mb-3">
                  <div className="flex-grow">
                    <div className="flex items-center flex-wrap gap-2 mb-2">
                      <span className={`text-xs px-2 py-1 rounded-full text-white ${getSeverityClass(warning.severity)}`}>
                        {warning.severity === 'high' ? '高风险' : warning.severity === 'medium' ? '中风险' : '低风险'}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusClass(warning.status)}`}>
                        {getStatusText(warning.status)}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                        {warning.source}
                      </span>
                    </div>
                    <h3 className="text-lg font-medium">{warning.title}</h3>
                  </div>
                  <div className="flex items-center mt-3 md:mt-0">
                    <div className="text-right mr-4">
                      <div className="text-sm text-gray-500 mb-1">发布日期</div>
                      <div className="flex items-center">
                        {React.createElement(FaCalendarAlt, { className: "text-gray-400 mr-1" })}
                        <span>{warning.date}</span>
                      </div>
                    </div>
                    {warning.daysLeft > 0 && (
                      <div className="text-right">
                        <div className="text-sm text-gray-500 mb-1">剩余时间</div>
                        <div className={`font-medium ${getDaysLeftClass(warning.daysLeft)}`}>
                          {warning.daysLeft} 天
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{warning.description}</p>
                
                <div className="flex flex-wrap items-center justify-between">
                  <div className="text-sm">
                    <span className="text-gray-500">相关法规: </span>
                    <span className="text-primary">{warning.regulation}</span>
                  </div>
                  <div className="mt-3 md:mt-0">
                    <Link 
                      to={`/legalbase/regulation/${warning.id}`} 
                      className="text-primary hover:text-primary-dark inline-flex items-center"
                    >
                      查看详情 {React.createElement(FaArrowRight, { className: "ml-1" })}
                    </Link>
                  </div>
                </div>
              </div>
              
              {warning.status !== 'resolved' && (
                <div className="bg-gray-50 px-5 py-3 border-t flex justify-between items-center">
                  <div>
                    <button className="btn btn-sm btn-outline mr-2">
                      标为已读
                    </button>
                    <button className="btn btn-sm btn-primary">
                      创建合规任务
                    </button>
                  </div>
                  <div>
                    <button className="text-gray-400 hover:text-gray-600">
                      忽略
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="card py-8">
            <div className="text-center">
              <div className="text-gray-400 mb-3">
                {React.createElement(FaSearch, { size: 40, className: "mx-auto" })}
              </div>
              <h3 className="text-lg font-medium mb-1">未找到符合条件的风险预警</h3>
              <p className="text-gray-500">尝试调整搜索条件或筛选器</p>
            </div>
          </div>
        )}
      </div>
      
      {/* 风险预防 */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">风险预防建议</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">定期审查</h3>
            <p className="text-gray-600 mb-3">建议每月进行一次内部合规审计，重点关注高风险领域，如工时管理、个人信息保护等。</p>
            <button className="text-primary hover:text-primary-dark inline-flex items-center">
              查看审计指南 {React.createElement(FaArrowRight, { className: "ml-1" })}
            </button>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">员工培训</h3>
            <p className="text-gray-600 mb-3">对HR团队进行劳动法合规专项培训，提高风险识别和应对能力，降低合规风险。</p>
            <button className="text-primary hover:text-primary-dark inline-flex items-center">
              获取培训计划 {React.createElement(FaArrowRight, { className: "ml-1" })}
            </button>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">法规订阅</h3>
            <p className="text-gray-600 mb-3">订阅关键法规更新通知，及时了解劳动法规变化，提前做好应对准备。</p>
            <button className="text-primary hover:text-primary-dark inline-flex items-center">
              管理订阅 {React.createElement(FaArrowRight, { className: "ml-1" })}
            </button>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">法律咨询</h3>
            <p className="text-gray-600 mb-3">针对高风险预警，建议咨询专业劳动法律师，获取专业意见和解决方案。</p>
            <button className="text-primary hover:text-primary-dark inline-flex items-center">
              联系专家 {React.createElement(FaArrowRight, { className: "ml-1" })}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskWarning; 