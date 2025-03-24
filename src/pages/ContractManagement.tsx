import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaCheck, FaCloudUploadAlt, FaEllipsisH, FaExclamationTriangle, FaFile, FaFileAlt, FaFileContract, FaFilter, FaPlus, FaSearch, FaSort, FaTimes, FaUser } from 'react-icons/fa';

// 合同管理页面
const ContractManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'expiring'>('newest');
  const [showUploadModal, setShowUploadModal] = useState(false);
  
  // 模拟数据 - 合同列表
  const contracts = [
    {
      id: 1,
      title: '标准劳动合同',
      template: true,
      type: '劳动合同',
      status: 'active',
      dateCreated: '2024-09-15',
      dateExpired: '2026-09-15',
      daysRemaining: 730,
      parties: ['公司', '员工'],
      hasRisks: false,
      usageCount: 156,
      lastUpdated: '2025-01-10',
      description: '用于正式员工入职的标准劳动合同模板，已包含最新法规要求的个人信息保护条款'
    },
    {
      id: 2,
      title: '张三 - 产品经理劳动合同',
      template: false,
      type: '劳动合同',
      status: 'signing',
      dateCreated: '2025-02-20',
      dateExpired: '2028-02-20',
      daysRemaining: 1095,
      parties: ['公司', '张三'],
      hasRisks: false,
      assignedTo: '李四（HR主管）',
      description: '产品经理张三的劳动合同，包含特殊的保密条款和知识产权约定'
    },
    {
      id: 3,
      title: '技术咨询服务合同',
      template: true,
      type: '服务合同',
      status: 'active',
      dateCreated: '2024-10-01',
      dateExpired: '2025-10-01',
      daysRemaining: 210,
      parties: ['公司', '服务供应商'],
      hasRisks: true,
      usageCount: 23,
      lastUpdated: '2024-12-20',
      risks: [
        '缺少数据处理相关条款',
        '知识产权归属约定不明确'
      ],
      description: '用于技术咨询服务的合同模板，适用于外部技术专家或咨询公司'
    },
    {
      id: 4,
      title: '王五 - 实习生协议',
      template: false,
      type: '实习协议',
      status: 'expiring',
      dateCreated: '2024-12-01',
      dateExpired: '2025-04-01',
      daysRemaining: 28,
      parties: ['公司', '王五'],
      hasRisks: false,
      assignedTo: '赵六（部门经理）',
      description: '市场部实习生王五的实习协议，为期4个月的实习期安排'
    },
    {
      id: 5,
      title: '保密与竞业限制协议',
      template: true,
      type: '补充协议',
      status: 'active',
      dateCreated: '2024-08-15',
      dateExpired: '2027-08-15',
      daysRemaining: 900,
      parties: ['公司', '员工'],
      hasRisks: true,
      usageCount: 68,
      lastUpdated: '2025-01-15',
      risks: [
        '竞业限制补偿金条款不符合最新法规标准',
        '限制范围过宽，可能面临法律挑战'
      ],
      description: '适用于关键岗位员工的保密与竞业限制协议，明确离职后的竞业限制范围和补偿标准'
    },
    {
      id: 6,
      title: '远程工作协议',
      template: true,
      type: '补充协议',
      status: 'draft',
      dateCreated: '2025-02-25',
      dateExpired: '不适用',
      daysRemaining: null,
      parties: ['公司', '员工'],
      hasRisks: false,
      lastUpdated: '2025-02-25',
      description: '规定远程工作的员工权益、工作时间统计方式、设备提供与维护责任等内容'
    },
    {
      id: 7,
      title: 'ABC科技有限公司 - 员工数据处理协议',
      template: false,
      type: '数据处理协议',
      status: 'expired',
      dateCreated: '2024-01-15',
      dateExpired: '2025-01-15',
      daysRemaining: -47,
      parties: ['公司', 'ABC科技有限公司'],
      hasRisks: true,
      assignedTo: '王经理（法务部）',
      risks: [
        '合同已过期，需要立即更新',
        '缺少必要的数据泄露通知条款'
      ],
      description: '规定第三方供应商处理员工数据的安全标准、责任和限制'
    }
  ];
  
  // 过滤合同
  const filterContracts = () => {
    return contracts.filter(contract => {
      // 根据标签筛选
      if (activeTab === 'templates' && !contract.template) return false;
      if (activeTab === 'contracts' && contract.template) return false;
      if (activeTab === 'risks' && !contract.hasRisks) return false;
      if (activeTab === 'expiring' && 
          (contract.daysRemaining === null || contract.daysRemaining > 30 || contract.status === 'expired')) return false;
      
      // 搜索条件
      if (searchTerm && 
          !contract.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !contract.type.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !(contract.description && contract.description.toLowerCase().includes(searchTerm.toLowerCase()))) {
        return false;
      }
      
      return true;
    });
  };
  
  // 排序合同
  const sortContracts = (contractsToSort: typeof contracts) => {
    return [...contractsToSort].sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
      } else {
        // 将null或过期的排在最后
        if (a.daysRemaining === null) return 1;
        if (b.daysRemaining === null) return -1;
        if (a.daysRemaining < 0 && b.daysRemaining < 0) return 0;
        if (a.daysRemaining < 0) return 1;
        if (b.daysRemaining < 0) return -1;
        return a.daysRemaining - b.daysRemaining;
      }
    });
  };
  
  // 获取状态样式
  const getStatusClass = (status: string) => {
    switch(status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'signing':
        return 'bg-blue-100 text-blue-800';
      case 'expiring':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // 获取状态文本
  const getStatusText = (status: string) => {
    switch(status) {
      case 'active':
        return '有效';
      case 'draft':
        return '草稿';
      case 'signing':
        return '签署中';
      case 'expiring':
        return '即将过期';
      case 'expired':
        return '已过期';
      default:
        return status;
    }
  };
  
  // 获取天数样式
  const getDaysClass = (days: number | null) => {
    if (days === null) return 'text-gray-500';
    if (days < 0) return 'text-red-600';
    if (days <= 30) return 'text-yellow-600';
    return 'text-green-600';
  };
  
  // 格式化天数显示
  const formatDays = (days: number | null) => {
    if (days === null) return '不适用';
    if (days < 0) return `已过期${Math.abs(days)}天`;
    return `${days}天`;
  };
  
  // 获取合同类型图标
  const getContractTypeIcon = (type: string) => {
    switch(type) {
      case '劳动合同':
        return <FaFileContract className="text-blue-500" />;
      case '服务合同':
        return <FaFile className="text-purple-500" />;
      case '实习协议':
        return <FaFileAlt className="text-green-500" />;
      case '补充协议':
        return <FaFileAlt className="text-orange-500" />;
      case '数据处理协议':
        return <FaFileAlt className="text-cyan-500" />;
      default:
        return <FaFile className="text-gray-500" />;
    }
  };
  
  const filteredContracts = sortContracts(filterContracts());
  
  // 合同数量统计
  const stats = {
    all: contracts.length,
    templates: contracts.filter(c => c.template).length,
    contracts: contracts.filter(c => !c.template).length,
    risks: contracts.filter(c => c.hasRisks).length,
    expiring: contracts.filter(c => c.daysRemaining !== null && c.daysRemaining > 0 && c.daysRemaining <= 30).length
  };
  
  // 上传模态框
  const UploadModal = () => {
    if (!showUploadModal) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">上传新合同</h3>
            <button 
              className="text-gray-400 hover:text-gray-600"
              onClick={() => setShowUploadModal(false)}
            >
              <FaTimes />
            </button>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              合同标题
            </label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="输入合同标题"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              合同类型
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary">
              <option>劳动合同</option>
              <option>服务合同</option>
              <option>实习协议</option>
              <option>补充协议</option>
              <option>数据处理协议</option>
              <option>其他</option>
            </select>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              合同文件
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50">
              <FaCloudUploadAlt className="mx-auto text-gray-400 text-3xl mb-2" />
              <p className="text-sm text-gray-500">点击上传文件或将文件拖放到此处</p>
              <p className="text-xs text-gray-400 mt-1">支持 PDF, DOCX, DOC 格式</p>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <button 
              className="btn btn-outline"
              onClick={() => setShowUploadModal(false)}
            >
              取消
            </button>
            <button className="btn btn-primary">
              上传
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold">合同管理</h1>
          <button 
            className="btn btn-primary flex items-center"
            onClick={() => setShowUploadModal(true)}
          >
            <FaPlus className="mr-2" /> 新建合同
          </button>
        </div>
        <p className="text-gray-600">管理企业合同模板和劳动协议</p>
      </div>
      
      {/* 合同统计 */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <button 
          className={`card flex items-center p-4 hover:bg-gray-50 transition-colors ${
            activeTab === 'all' ? 'border-primary' : ''
          }`}
          onClick={() => setActiveTab('all')}
        >
          <div className="mr-3">
            <span className="text-2xl font-bold">{stats.all}</span>
          </div>
          <div>
            <p className="text-sm text-gray-500">所有合同</p>
          </div>
        </button>
        
        <button 
          className={`card flex items-center p-4 hover:bg-gray-50 transition-colors ${
            activeTab === 'templates' ? 'border-primary' : ''
          }`}
          onClick={() => setActiveTab('templates')}
        >
          <div className="mr-3">
            <span className="text-2xl font-bold">{stats.templates}</span>
          </div>
          <div>
            <p className="text-sm text-gray-500">合同模板</p>
          </div>
        </button>
        
        <button 
          className={`card flex items-center p-4 hover:bg-gray-50 transition-colors ${
            activeTab === 'contracts' ? 'border-primary' : ''
          }`}
          onClick={() => setActiveTab('contracts')}
        >
          <div className="mr-3">
            <span className="text-2xl font-bold">{stats.contracts}</span>
          </div>
          <div>
            <p className="text-sm text-gray-500">实际合同</p>
          </div>
        </button>
        
        <button 
          className={`card flex items-center p-4 hover:bg-gray-50 transition-colors ${
            activeTab === 'risks' ? 'border-primary' : ''
          }`}
          onClick={() => setActiveTab('risks')}
        >
          <div className="mr-3 text-danger">
            <FaExclamationTriangle />
          </div>
          <div>
            <span className="text-xl font-bold">{stats.risks}</span>
            <p className="text-sm text-gray-500">风险合同</p>
          </div>
        </button>
        
        <button 
          className={`card flex items-center p-4 hover:bg-gray-50 transition-colors ${
            activeTab === 'expiring' ? 'border-primary' : ''
          }`}
          onClick={() => setActiveTab('expiring')}
        >
          <div className="mr-3 text-warning">
            <FaCalendarAlt />
          </div>
          <div>
            <span className="text-xl font-bold">{stats.expiring}</span>
            <p className="text-sm text-gray-500">即将到期</p>
          </div>
        </button>
      </div>
      
      {/* 搜索和筛选工具栏 */}
      <div className="card mb-6">
        <div className="md:flex justify-between items-center">
          <div className="relative flex-grow md:max-w-md mb-4 md:mb-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="搜索合同..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                className={`px-4 py-2 text-sm font-medium border ${
                  sortBy === 'newest' 
                    ? 'bg-primary text-white border-primary' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                } rounded-l-lg`}
                onClick={() => setSortBy('newest')}
              >
                最新创建
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium border-t border-b border-r ${
                  sortBy === 'expiring' 
                    ? 'bg-primary text-white border-primary' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                } rounded-r-lg`}
                onClick={() => setSortBy('expiring')}
              >
                即将到期
              </button>
            </div>
            
            <button className="px-4 py-2 text-sm font-medium bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 inline-flex items-center">
              <FaFilter className="mr-2" /> 高级筛选
            </button>
          </div>
        </div>
      </div>
      
      {/* 合同列表 */}
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full divide-y divide-gray-200 card">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                合同
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                类型
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                状态
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                剩余时间
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                合同方
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">操作</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredContracts.length > 0 ? (
              filteredContracts.map(contract => (
                <tr key={contract.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-start">
                      {contract.template && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded mr-2 mt-1">
                          模板
                        </span>
                      )}
                      <div>
                        <div className="font-medium text-gray-900">{contract.title}</div>
                        <div className="text-sm text-gray-500">{contract.dateCreated}</div>
                        {contract.hasRisks && (
                          <div className="mt-1 text-sm text-danger flex items-center">
                            <FaExclamationTriangle className="mr-1" /> 存在风险
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="mr-2">{getContractTypeIcon(contract.type)}</span>
                      <span>{contract.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(contract.status)}`}>
                      {getStatusText(contract.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={getDaysClass(contract.daysRemaining)}>
                      {formatDays(contract.daysRemaining)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      {contract.parties.map((party, i) => (
                        <div key={i} className="flex items-center">
                          <FaUser className="mr-1 text-gray-400" size={12} />
                          <span>{party}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-sm">
                    <button className="text-primary hover:text-primary-dark font-medium mr-3">
                      查看
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <FaEllipsisH />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center">
                  <div className="text-gray-400 mb-3">
                    <FaSearch size={32} className="mx-auto" />
                  </div>
                  <p className="text-gray-500">未找到符合条件的合同</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* 智能合同助手 */}
      <div className="card bg-blue-50 border border-blue-100">
        <div className="md:flex items-center">
          <div className="md:flex-1 mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">AI 合同智能助手</h3>
            <p className="text-gray-600">
              使用我们的 AI 助手快速创建、审查和优化合同，节省法务团队时间并提高合同质量
            </p>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-outline">
              审核合同
            </button>
            <button className="btn btn-primary">
              创建合同
            </button>
          </div>
        </div>
      </div>
      
      {/* 上传合同模态框 */}
      <UploadModal />
    </div>
  );
};

export default ContractManagement; 