import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaChartLine, FaExclamationTriangle } from 'react-icons/fa';

// 仪表盘页面 - 法规动态监控
const Dashboard: React.FC = () => {
  // 模拟数据
  const timelineData = [
    {
      id: 1,
      date: '2025-03-01',
      impact: 'high',
      title: '《个人信息保护法》实施细则更新',
      description: '加强员工数据管理责任，明确处理边界',
      highlight: true
    },
    {
      id: 2,
      date: '2025-02-25',
      impact: 'medium',
      title: '《劳动合同法》第四次修正案',
      description: '调整非全日制用工管理规定，明确权益保障',
      highlight: false
    },
    {
      id: 3,
      date: '2025-02-18',
      impact: 'low',
      title: '《工伤保险条例》补充规定',
      description: '完善远程办公相关工伤认定标准',
      highlight: false
    },
    {
      id: 4,
      date: '2025-02-10',
      impact: 'medium',
      title: '《最低工资规定》年度调整',
      description: '全国各省市最低工资标准更新',
      highlight: false
    },
    {
      id: 5,
      date: '2025-01-28',
      impact: 'low',
      title: '《社保缴纳基数》调整通告',
      description: '2025年社保缴纳基数上下限更新',
      highlight: false
    }
  ];

  const heatmapData = [
    { id: 1, title: '个人信息保护法', impact: 'high' },
    { id: 2, title: '劳动合同法修正案', impact: 'high' },
    { id: 3, title: '工时管理规定', impact: 'high' },
    { id: 4, title: '员工隐私规范', impact: 'high' },
    { id: 5, title: '最低工资规定', impact: 'medium' },
    { id: 6, title: '社保缴纳标准', impact: 'medium' },
    { id: 7, title: '平等就业条例', impact: 'medium' },
    { id: 8, title: '工会法解释', impact: 'medium' },
    { id: 9, title: '招聘广告规范', impact: 'low' },
    { id: 10, title: '薪酬透明度要求', impact: 'low' }
  ];

  const categoryData = [
    { id: 1, name: '劳动合同', count: 4 },
    { id: 2, name: '薪资福利', count: 3 },
    { id: 3, name: '工时管理', count: 2 },
    { id: 4, name: '数据隐私', count: 5 },
    { id: 5, name: '员工权益', count: 3 }
  ];

  // 获取影响度的样式
  const getImpactClass = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-danger text-white';
      case 'medium':
        return 'bg-warning text-white';
      case 'low':
        return 'bg-success text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  // 获取热图的样式
  const getHeatmapStyle = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-gradient-to-r from-danger to-danger-light';
      case 'medium':
        return 'bg-gradient-to-r from-warning to-warning-light';
      case 'low':
        return 'bg-gradient-to-r from-success to-success-light';
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-400';
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">法规动态监控仪表盘</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 左侧时间轴 */}
        <div className="lg:col-span-3">
          <div className="card mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">法规更新时间轴</h2>
              <div className="relative">
                <select className="bg-white border border-gray-300 text-gray-700 py-1 px-3 pr-8 rounded text-sm focus:outline-none focus:ring-primary focus:border-primary">
                  <option>全部</option>
                  <option>高影响</option>
                  <option>中影响</option>
                  <option>低影响</option>
                </select>
              </div>
            </div>
            
            <div className="relative pl-6 pb-2">
              {/* 时间轴中线 */}
              <div className="absolute left-0 top-0 h-full w-0.5 bg-gray-200"></div>
              
              {/* 时间轴项目 */}
              {timelineData.map((item) => (
                <div key={item.id} className={`mb-6 relative ${item.highlight ? 'pl-3 py-2 bg-blue-50 rounded-lg border-l-4 border-primary' : ''}`}>
                  {/* 时间点 */}
                  <div className={`absolute left-0 top-1.5 w-3 h-3 rounded-full -translate-x-1.5 ${
                    item.impact === 'high' 
                      ? 'bg-danger' 
                      : item.impact === 'medium' 
                        ? 'bg-warning' 
                        : 'bg-success'
                  }`}></div>
                  
                  <div className="space-y-1">
                    <span className="text-sm text-gray-500">{item.date}</span>
                    <div>
                      <span className={`text-xs py-0.5 px-2 rounded-full ${getImpactClass(item.impact)}`}>
                        {item.impact === 'high' ? '高影响' : item.impact === 'medium' ? '中影响' : '低影响'}
                      </span>
                    </div>
                    <Link to={`/legalbase/regulation/${item.id}`} className="font-medium block hover:text-primary transition-colors">
                      {item.title}
                    </Link>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </div>
              ))}
              
              <div className="text-center mt-4">
                <button className="btn-outline-primary text-sm rounded-full px-4 py-1">
                  加载更多
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* 中央区域 */}
        <div className="lg:col-span-6">
          <div className="card mb-6">
            <ul className="flex border-b mb-4">
              <li className="mr-2">
                <button className="pb-2 px-1 font-medium text-primary border-b-2 border-primary">影响度热图</button>
              </li>
              <li className="mr-2">
                <button className="pb-2 px-1 font-medium text-gray-500 hover:text-gray-700">最新解读</button>
              </li>
              <li className="mr-2">
                <button className="pb-2 px-1 font-medium text-gray-500 hover:text-gray-700">我的关注</button>
              </li>
            </ul>
            
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">按企业影响度分类</h3>
                <select className="bg-white border border-gray-300 text-gray-700 py-1 px-3 rounded text-sm focus:outline-none focus:ring-primary focus:border-primary">
                  <option>全部行业</option>
                  <option>制造业</option>
                  <option>互联网/IT</option>
                  <option>零售业</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                {heatmapData.map((item) => (
                  <Link 
                    key={item.id} 
                    to={`/regulation/${item.id}`} 
                    className={`${getHeatmapStyle(item.impact)} p-3 rounded text-center text-white text-sm shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5`}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
              
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 bg-danger rounded-full mr-1"></span>
                  <span>高影响</span>
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 bg-warning rounded-full mr-1"></span>
                  <span>中影响</span>
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 bg-success rounded-full mr-1"></span>
                  <span>低影响</span>
                </div>
              </div>
            </div>
            
            <hr className="my-6" />
            
            <div>
              <h3 className="font-medium mb-4">重点法规变化</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between mb-1">
                    <h4 className="font-medium">《个人信息保护法》实施细则更新</h4>
                    <span className="text-xs py-0.5 px-2 rounded-full bg-danger text-white">高影响</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">新规明确员工敏感信息处理边界，要求建立专门制度，指定专人负责，定期培训与审计。</p>
                  <div className="text-xs text-gray-500">生效日期: 2025-04-01</div>
                  <Link to="/legalbase/regulation/1" className="text-primary text-sm flex items-center mt-2 hover:underline">
                    查看详情 <FaArrowRight className="ml-1" />
                  </Link>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between mb-1">
                    <h4 className="font-medium">《劳动合同法》第四次修正案</h4>
                    <span className="text-xs py-0.5 px-2 rounded-full bg-warning text-white">中影响</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">非全日制用工每周工作时间上限调整，权益保障进一步明确，需更新相关合同模板。</p>
                  <div className="text-xs text-gray-500">生效日期: 2025-05-01</div>
                  <Link to="/legalbase/regulation/2" className="text-primary text-sm flex items-center mt-2 hover:underline">
                    查看详情 <FaArrowRight className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 右侧区域 */}
        <div className="lg:col-span-3">
          <div className="card mb-6">
            <h2 className="text-lg font-semibold mb-4">按领域分类</h2>
            
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              {/* 这里可以添加一个饼图，但为了简单起见，我们先使用列表 */}
              <div className="text-center text-gray-500 mb-2">法规分布</div>
              <div className="flex h-32 items-end justify-center space-x-2">
                {categoryData.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-primary group relative"
                    style={{ 
                      height: `${(item.count / Math.max(...categoryData.map(c => c.count))) * 100}%`,
                      width: '18%'
                    }}
                  >
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-700 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {item.name}: {item.count}条
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <ul className="space-y-1">
              {categoryData.map((item) => (
                <li key={item.id}>
                  <a href="#" className="flex justify-between items-center py-2 px-3 rounded hover:bg-gray-50">
                    <span>{item.name}</span>
                    <span className="bg-primary text-white text-xs rounded-full py-0.5 px-2">{item.count}</span>
                  </a>
                </li>
              ))}
            </ul>
            
            <div className="mt-6">
              <Link to="/legalbase/compliance" className="btn btn-primary w-full flex justify-center items-center">
                查看合规建议
              </Link>
            </div>
          </div>
          
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">合规状态概览</h2>
            
            <div className="text-center mb-6">
              <div className="relative inline-block">
                {/* 圆环进度条 */}
                <div className="w-32 h-32 rounded-full border-8 border-gray-200 relative">
                  <div 
                    className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-primary" 
                    style={{ 
                      clipPath: 'polygon(50% 50%, 100% 0, 100% 100%, 0 100%, 0 0)',
                      transform: 'rotate(79.2deg)'
                    }}
                  ></div>
                </div>
                
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="text-3xl font-bold text-primary">78%</div>
                  <div className="text-sm text-gray-500">合规率</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                <div className="text-xs text-gray-500 mb-1">待解决</div>
                <div className="text-xl font-bold text-danger">5</div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                <div className="text-xs text-gray-500 mb-1">进行中</div>
                <div className="text-xl font-bold text-warning">7</div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                <div className="text-xs text-gray-500 mb-1">已合规</div>
                <div className="text-xl font-bold text-success">42</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">合规进度</span>
              <span className="text-xs text-gray-500">42 / 54 项</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div className="bg-primary h-2.5 rounded-full" style={{ width: '78%' }}></div>
            </div>
            
            <div className="text-center">
              <Link to="/legalbase/compliance" className="text-primary text-sm hover:underline flex items-center justify-center">
                查看详细报告 <FaArrowRight className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 