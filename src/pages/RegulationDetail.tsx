import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaArrowLeft, FaBookmark, FaCalendarAlt, FaChevronDown, FaChevronRight, FaDownload, FaExclamationTriangle, FaQuestionCircle, FaRegClock, FaTasks } from 'react-icons/fa';

// 法规详情页面
const RegulationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('original');
  
  // 模拟数据 - 假设根据 ID 获取法规详情
  const regulation = {
    id: parseInt(id || '1'),
    title: '《个人信息保护法》实施细则更新',
    impact: 'high',
    publishDate: '2025-02-28',
    effectiveDate: '2025-04-01',
    publisher: '国家网信办',
    level: '部门规章',
    scope: '全国范围内的个人信息处理者',
    content: `
      第二十五条 个人信息处理者处理敏感个人信息应当具有特定的目的和充分的必要性，采取严格保护措施；处理生物识别、医疗健康、金融账户、行踪轨迹等敏感个人信息的，还应当取得个人的单独同意。
      
      第四十九条 个人信息处理者应当设立个人信息保护负责人，由其负责对个人信息处理活动以及采取的保护措施等进行监督。个人信息处理者应当公开个人信息保护负责人的联系方式。
      
      第五十一条 个人信息处理者应当定期对其个人信息处理活动进行合规审计。
    `,
    explanation: `
      第二十五条对企业处理员工敏感个人信息提出了更高要求。作为企业，处理员工的生物识别（如指纹考勤）、医疗健康（如体检报告）、金融账户（如工资卡信息）、行踪轨迹（如GPS定位）等信息时，必须：
      
      - 有明确具体的业务目的，不能泛泛收集
      - 必须取得员工的单独同意书，不能默认包含在劳动合同中
      - 采取加密存储等严格技术措施保护
      
      第四十九条要求企业必须指定专人负责个人信息保护工作，HR部门需与IT、法务配合，明确责任人及联系方式，向员工公开。
      
      第五十一条新增的"定期合规审计"要求企业对员工数据处理活动进行系统检查，建议每季度至少进行一次内部审计。
    `,
    keyChanges: [
      '将员工考勤数据、绩效评估明确纳入敏感信息范畴',
      '要求建立专门的员工数据保护制度，不能仅依靠通用隐私政策',
      '员工个人信息处理须明确告知用途并记录同意过程',
      '增加了定期合规审计的频率要求和具体标准'
    ],
    caseReferences: [
      '某科技公司因未取得员工单独同意收集指纹信息用于考勤被处罚50万元，同时责令停止收集并删除已收集的生物识别信息。',
      '另一企业因在未告知员工的情况下监控员工电脑操作，被判定侵犯员工隐私权，赔偿相关员工损失并公开道歉。'
    ],
    companyImpact: {
      highRisks: [
        '指纹考勤系统未获取员工单独同意',
        '员工定位数据保存期限过长（当前超过6个月）',
        '未设立个人信息保护专员'
      ],
      industrySpecific: [
        '研发人员访问权限分级管理，避免全员可见敏感数据',
        '远程工作员工的个人电脑数据安全与隐私保护政策更新',
        '员工离职数据处理流程应更新，明确可保留与必须删除的信息类别'
      ],
      timeline: [
        { 
          title: '立即执行 (7天内)', 
          tasks: ['停止未经同意的指纹采集，切换到替代考勤方式'] 
        },
        { 
          title: '短期内完成 (30天内)', 
          tasks: [
            '指定个人信息保护负责人，公布联系方式',
            '修订员工隐私政策，分类明确各类数据处理目的'
          ] 
        },
        { 
          title: '中期计划 (90天内)', 
          tasks: [
            '建立员工数据分级分类管理制度',
            '完成历史数据清理，删除超期数据'
          ] 
        },
        { 
          title: '长期措施 (法规生效前)', 
          tasks: [
            '组织全员个人信息保护培训',
            '制定定期合规审计计划和流程'
          ] 
        }
      ]
    },
    faqs: [
      {
        question: '我们可以继续使用现有的指纹考勤系统吗？',
        answer: '根据更新后的规定，您需要满足三个条件才能继续使用：1.取得每位员工的单独书面同意，并明确告知用途和保存期限；2.提供替代考勤方式给不同意提供指纹的员工；3.对生物识别信息采取加密存储等特殊保护措施。如不符合这些条件，应暂停使用并转向卡片或人脸识别等替代方式。'
      },
      {
        question: '定期合规审计具体需要多久开展一次？',
        answer: '新规要求至少每季度进行一次内部审计，每年进行一次外部独立审计。审计内容包括个人信息收集范围、使用情况、存储安全性、第三方共享情况等，并形成书面报告留存备查。'
      },
      {
        question: '员工行踪轨迹信息具体指哪些？如何合规收集？',
        answer: '员工行踪轨迹信息包括GPS定位数据、打卡记录的位置信息、外勤管理系统中的位置数据等。根据新规要求，收集这些信息需要：1.工作必要性（如外勤管理）；2.最小范围原则（仅在工作时间记录）；3.员工明确知情同意；4.合理存储期限（不超过用工关系存续期）；5.定期删除或匿名化处理过期数据。'
      },
      {
        question: '个人信息保护负责人必须是专职岗位吗？',
        answer: '法规未要求必须设立专职岗位，可由公司现有管理人员兼任，但必须明确责任和权限。通常由法务、合规或信息安全负责人担任。该负责人应直接向企业最高管理层汇报工作，确保独立性。法规要求该负责人应具备相关专业知识和管理经验，企业应为其提供必要的资源支持。'
      },
      {
        question: '如何确定哪些员工信息属于"敏感个人信息"？',
        answer: '根据新规，员工敏感个人信息包括但不限于：生物识别信息（指纹、人脸等）、健康医疗信息（体检报告、病历）、金融信息（银行账户、薪资明细）、行踪轨迹、绩效评估数据、背景调查结果等。这些信息一旦泄露，可能导致员工名誉受损、遭受歧视或财产安全受损，因此需要采取更严格的保护措施。'
      }
    ],
    complianceItems: [
      { title: '任命个人信息保护负责人', required: true, progress: 0 },
      { title: '更新员工信息收集同意书', required: true, progress: 30 },
      { title: '建立合规审计制度', required: true, progress: 45 },
      { title: '员工数据分级分类管理', required: false, progress: 75 },
      { title: '员工隐私培训', required: false, progress: 60 }
    ],
    relatedRegulations: [
      { title: '《个人信息保护法》', type: '基础法律' },
      { title: '《数据安全法》', type: '相关法律' },
      { title: '《网络安全法》', type: '相关法律' },
      { title: '《员工个人信息保护规范》', type: '国家标准' }
    ]
  };

  // 获取影响级别样式
  const getImpactClass = (impact: string) => {
    switch (impact) {
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

  // 获取必要性标签样式
  const getRequiredClass = (required: boolean) => {
    return required ? 'bg-danger' : 'bg-warning';
  };

  const getProgressBarClass = (progress: number) => {
    if (progress < 30) return 'bg-danger';
    if (progress < 70) return 'bg-warning';
    return 'bg-success';
  };

  return (
    <div>
      {/* 返回按钮 */}
      <div className="mb-4">
        <Link 
          to="/" 
          className="inline-flex items-center text-gray-700 hover:text-primary transition-colors"
        >
          <FaArrowLeft className="mr-2" /> 返回仪表盘
        </Link>
      </div>
      
      {/* 法规标题区 */}
      <div className="card mb-6">
        <div className="md:flex md:justify-between md:items-center">
          <div>
            <h1 className="text-2xl font-bold mb-2">{regulation.title}</h1>
            <div className="flex items-center flex-wrap gap-2">
              <span className={`text-xs px-2 py-1 rounded-full text-white ${getImpactClass(regulation.impact)}`}>
                {regulation.impact === 'high' ? '高影响' : regulation.impact === 'medium' ? '中影响' : '低影响'}
              </span>
              <span className="text-sm text-gray-500">生效日期: {regulation.effectiveDate}</span>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <button className="btn btn-outline flex items-center">
              <FaBookmark className="mr-2" /> 收藏
            </button>
            <button className="btn btn-primary flex items-center">
              <FaTasks className="mr-2" /> 创建合规任务
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 左侧主内容区 */}
        <div className="md:col-span-2">
          <div className="card">
            <div className="border-b mb-6">
              <ul className="flex flex-wrap -mb-px">
                <li className="mr-2">
                  <button 
                    className={`inline-flex items-center py-3 px-4 text-sm font-medium border-b-2 ${
                      activeTab === 'original' 
                        ? 'text-primary border-primary' 
                        : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab('original')}
                  >
                    原文与解读
                  </button>
                </li>
                <li className="mr-2">
                  <button 
                    className={`inline-flex items-center py-3 px-4 text-sm font-medium border-b-2 ${
                      activeTab === 'impact' 
                        ? 'text-primary border-primary' 
                        : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab('impact')}
                  >
                    影响分析
                  </button>
                </li>
                <li className="mr-2">
                  <button 
                    className={`inline-flex items-center py-3 px-4 text-sm font-medium border-b-2 ${
                      activeTab === 'qa' 
                        ? 'text-primary border-primary' 
                        : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab('qa')}
                  >
                    常见问题
                  </button>
                </li>
              </ul>
            </div>
            
            <div className="px-1">
              {/* 原文与解读 */}
              {activeTab === 'original' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">重点条款解读</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <h3 className="text-lg font-medium mb-3">原文</h3>
                      <div className="bg-gray-50 p-4 rounded-lg font-serif leading-relaxed whitespace-pre-line">
                        {regulation.content}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-3">解读</h3>
                      <div className="border-l-4 border-primary pl-4 whitespace-pre-line">
                        {regulation.explanation}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-8">
                    <h3 className="text-lg font-medium mb-3">核心变化</h3>
                    <ol className="list-decimal pl-4 space-y-2">
                      {regulation.keyChanges.map((change, index) => (
                        <li key={index}>{change}</li>
                      ))}
                    </ol>
                  </div>
                  
                  <div className="bg-indigo-50 rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-3">案例参考</h3>
                    {regulation.caseReferences.map((caseRef, index) => (
                      <p key={index} className="mb-3">{caseRef}</p>
                    ))}
                  </div>
                </div>
              )}
              
              {/* 影响分析 */}
              {activeTab === 'impact' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">对贵公司的影响分析</h2>
                  
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
                    <h3 className="text-lg font-medium text-danger mb-3">高风险领域</h3>
                    <p className="mb-2">根据您企业的实际情况，以下领域需要优先整改：</p>
                    <ul className="list-disc pl-5 space-y-1">
                      {regulation.companyImpact.highRisks.map((risk, index) => (
                        <li key={index}>{risk}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <h3 className="text-lg font-medium mb-3">行业特定影响</h3>
                  <p className="mb-2">作为技术服务企业，贵公司除了一般企业HR数据合规外，还需特别注意：</p>
                  <ul className="list-disc pl-5 space-y-1 mb-8">
                    {regulation.companyImpact.industrySpecific.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  
                  <h3 className="text-lg font-medium mb-3">实施时间表</h3>
                  <div className="relative pl-8 space-y-6 mb-2">
                    {/* 时间轴轴线 */}
                    <div className="absolute left-3 top-2 h-full w-0.5 bg-blue-200"></div>
                    
                    {regulation.companyImpact.timeline.map((period, periodIndex) => (
                      <div key={periodIndex} className="relative">
                        {/* 时间点 */}
                        <div className="absolute left-0 top-1 w-6 h-6 bg-primary rounded-full -translate-x-3 flex items-center justify-center">
                          <span className="text-white text-xs">{periodIndex + 1}</span>
                        </div>
                        
                        <h4 className="font-medium text-primary mb-2">{period.title}</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {period.tasks.map((task, taskIndex) => (
                            <li key={taskIndex}>{task}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* 常见问题 */}
              {activeTab === 'qa' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">常见问题解答</h2>
                  
                  <div className="space-y-6">
                    {regulation.faqs.map((faq, index) => (
                      <div key={index} className="bg-white rounded-lg shadow-sm p-4">
                        <h3 className="text-primary font-medium mb-2 flex items-start">
                          <FaQuestionCircle className="text-primary mr-2 mt-1 flex-shrink-0" />
                          <span>{faq.question}</span>
                        </h3>
                        <div className="pl-7 border-l-2 border-gray-100">
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-4">没有找到您需要的答案？</h3>
                    <div className="flex">
                      <input 
                        type="text" 
                        placeholder="输入您的问题..." 
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                      <button className="btn btn-primary rounded-l-none">提问</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* 右侧边栏 */}
        <div className="md:col-span-1">
          {/* 法规基本信息 */}
          <div className="card mb-6">
            <h2 className="text-lg font-semibold mb-4">法规基本信息</h2>
            <table className="w-full">
              <tbody>
                <tr className="border-b">
                  <td className="py-2 text-gray-500 w-1/3">发布机构:</td>
                  <td className="py-2">{regulation.publisher}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-gray-500">发布日期:</td>
                  <td className="py-2">{regulation.publishDate}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-gray-500">实施日期:</td>
                  <td className="py-2">{regulation.effectiveDate}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-gray-500">法规级别:</td>
                  <td className="py-2">{regulation.level}</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-500">适用范围:</td>
                  <td className="py-2">{regulation.scope}</td>
                </tr>
              </tbody>
            </table>
            <div className="mt-4">
              <button className="btn btn-outline w-full flex items-center justify-center">
                <FaDownload className="mr-2" /> 下载原文
              </button>
            </div>
          </div>
          
          {/* 关键合规事项 */}
          <div className="card mb-6">
            <h2 className="text-lg font-semibold mb-4">关键合规事项</h2>
            <div className="space-y-4">
              {regulation.complianceItems.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                      <span className={`text-xs px-2 py-0.5 mr-2 rounded text-white ${getRequiredClass(item.required)}`}>
                        {item.required ? '必须' : '建议'}
                      </span>
                      <span>{item.title}</span>
                    </div>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full">
                    <div 
                      className={`h-full rounded-full ${getProgressBarClass(item.progress)}`}
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link to="/compliance" className="btn btn-primary w-full">查看详细建议</Link>
            </div>
          </div>
          
          {/* 相关法规 */}
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">相关法规</h2>
            <ul className="divide-y">
              {regulation.relatedRegulations.map((reg, index) => (
                <li key={index} className="py-2">
                  <a href="#" className="flex justify-between items-center hover:text-primary">
                    <span>{reg.title}</span>
                    <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                      {reg.type}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegulationDetail; 