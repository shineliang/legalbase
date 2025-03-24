import React, { useState, useRef, useEffect } from 'react';
import { FaArrowRight, FaFile, FaPaperclip, FaQuestionCircle, FaRobot, FaSave, FaUser, FaFileUpload, FaMicrophone, FaImage, FaFileAlt, FaChartBar, FaSearch, FaExclamationTriangle } from 'react-icons/fa';

// 消息类型扩展
interface Message {
  id: number;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  attachments?: {
    name: string;
    type: string;
    size: string;
    analysis?: DocumentAnalysis;
  }[];
  references?: {
    title: string;
    source: string;
    url: string;
  }[];
  visualData?: VisualData;
}

// 可视化数据类型
interface VisualData {
  type: 'chart' | 'summary' | 'compliance-score' | 'risk-analysis';
  data: any;
}

// 文档分析结果
interface DocumentAnalysis {
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  complianceIssues: {
    severity: 'low' | 'medium' | 'high';
    description: string;
    recommendation: string;
    relatedLaw: string;
  }[];
  summary: string;
}

// AI智能合规助手页面
const AIAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [activeMode, setActiveMode] = useState<'chat' | 'document-analysis' | 'compliance-check'>('chat');
  const [analyzingDocument, setAnalyzingDocument] = useState(false);
  const [documentToAnalyze, setDocumentToAnalyze] = useState<File | null>(null);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: '您好！我是您的智能劳动法合规助手。我可以帮您解答劳动法相关问题，分析风险，提供合规建议，以及协助起草合同条款。请问有什么我可以帮您的？\n\n现在我支持更多功能：\n- 上传文件进行合规分析\n- 语音对话\n- 生成可视化报告和建议',
      sender: 'assistant',
      timestamp: new Date(Date.now() - 60000),
    }
  ]);
  
  const [suggestions] = useState([
    '如何合规地终止试用期员工合同？',
    '最新的个人信息保护法对员工数据有何影响？',
    '远程工作员工的考勤管理有哪些合规要点？',
    '帮我起草一份竞业限制协议',
    '分析我司劳动合同的合规风险'
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // 自动滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // 发送消息
  const sendMessage = () => {
    if (!input.trim() && !documentToAnalyze) return;
    
    // 添加用户消息
    const newUserMessage: Message = {
      id: messages.length + 1,
      content: input || (documentToAnalyze ? `请分析这份文档: ${documentToAnalyze.name}` : ''),
      sender: 'user',
      timestamp: new Date(),
      attachments: documentToAnalyze ? [{
        name: documentToAnalyze.name,
        type: documentToAnalyze.type,
        size: `${Math.round(documentToAnalyze.size / 1024)} KB`
      }] : undefined
    };
    
    setMessages([...messages, newUserMessage]);
    setInput('');
    setIsLoading(true);
    
    if (documentToAnalyze) {
      // 模拟文档分析
      analyzeDocument(documentToAnalyze, newUserMessage.id);
    } else {
      // 普通消息响应
      setTimeout(() => {
        generateAIResponse(input);
        setIsLoading(false);
      }, 1500);
    }
    
    setDocumentToAnalyze(null);
  };
  
  // 模拟文档分析
  const analyzeDocument = (file: File, messageId: number) => {
    setAnalyzingDocument(true);
    
    // 模拟分析过程
    setTimeout(() => {
      const documentAnalysis: DocumentAnalysis = {
        riskScore: Math.floor(Math.random() * 100),
        riskLevel: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
        complianceIssues: [
          {
            severity: 'high',
            description: '第12条竞业限制条款未明确约定补偿金金额',
            recommendation: '明确约定月补偿金不低于离职前工资的30%',
            relatedLaw: '《劳动合同法》第二十三条、第二十四条'
          },
          {
            severity: 'medium',
            description: '试用期设置超过法定期限',
            recommendation: '根据合同期限调整试用期，不超过6个月',
            relatedLaw: '《劳动合同法》第十九条'
          },
          {
            severity: 'low',
            description: '缺少个人信息处理告知条款',
            recommendation: '增加个人信息收集使用的目的、方式和范围说明',
            relatedLaw: '《个人信息保护法》第十四条'
          }
        ],
        summary: '该合同整体合规性一般，存在3项合规风险，建议修改完善后再使用。主要问题集中在竞业限制条款补偿金约定不明确、试用期设置过长等方面。'
      };
      
      // 更新附件中的分析结果
      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages];
        const userMessageIndex = updatedMessages.findIndex(m => m.id === messageId);
        
        if (userMessageIndex !== -1 && updatedMessages[userMessageIndex].attachments) {
          updatedMessages[userMessageIndex].attachments![0].analysis = documentAnalysis;
        }
        
        // 添加AI回复
        updatedMessages.push({
          id: prevMessages.length + 1,
          content: `我已完成对${file.name}的分析，发现了${documentAnalysis.complianceIssues.length}个合规问题，整体风险级别为${
            documentAnalysis.riskLevel === 'high' ? '高' : documentAnalysis.riskLevel === 'medium' ? '中' : '低'
          }。\n\n${documentAnalysis.summary}\n\n您希望我详细解释哪个问题，或者需要我为您生成修改建议吗？`,
          sender: 'assistant',
          timestamp: new Date(),
          visualData: {
            type: 'risk-analysis',
            data: documentAnalysis
          }
        });
        
        return updatedMessages;
      });
      
      setAnalyzingDocument(false);
      setIsLoading(false);
    }, 3000);
  };
  
  // 生成AI回复
  const generateAIResponse = (userInput: string) => {
    let botReply: Message;
    
    // 添加用户消息定义
    const newUserMessage: Message = {
      id: messages.length + 1,
      content: userInput,
      sender: 'user',
      timestamp: new Date()
    };
    
    // 根据用户输入生成不同的回复
    if (userInput.includes('终止') || userInput.includes('解雇') || userInput.includes('辞退')) {
      botReply = {
        id: messages.length + 2,
        content: 
          '关于终止试用期员工合同，您需要注意以下几点：\n\n' +
          '1. 法律依据：《劳动合同法》第21条规定，用人单位在试用期解除劳动合同的，应当向劳动者说明理由。\n\n' +
          '2. 合法理由：只有当员工不符合录用条件时才可在试用期解除合同。常见合法理由包括：\n' +
          '   - 不能胜任工作岗位要求\n' +
          '   - 严重违反公司规章制度\n' +
          '   - 欺诈行为导致录用\n\n' +
          '3. 正确流程：\n' +
          '   - 保留明确的绩效评估记录\n' +
          '   - 提前书面通知（建议至少3天）\n' +
          '   - 办理工作交接\n' +
          '   - 一次性结清工资\n\n' +
          '4. 风险提示：未按程序解除合同可能导致违法解除的风险，建议您：\n' +
          '   - 准备充分的证据材料\n' +
          '   - 确保遵循公司内部流程\n' +
          '   - 文件保留双方签字\n\n' +
          '需要我为您起草一份试用期解除通知书模板吗？',
        sender: 'assistant',
        timestamp: new Date(),
        references: [
          {
            title: '《中华人民共和国劳动合同法》第二十一条',
            source: '全国人大常委会',
            url: '#'
          },
          {
            title: '最高人民法院关于审理劳动争议案件适用法律若干问题的解释（三）',
            source: '最高人民法院',
            url: '#'
          }
        ],
        visualData: {
          type: 'compliance-score',
          data: {
            scores: [
              { category: '程序合规', score: 85 },
              { category: '证据准备', score: 70 },
              { category: '补偿合规', score: 90 },
              { category: '解除理由', score: 65 }
            ],
            overallScore: 78
          }
        }
      };
    } else if (userInput.includes('个人信息') || userInput.includes('数据')) {
      botReply = {
        id: messages.length + 2,
        content: 
          '《个人信息保护法》对员工数据处理有重大影响，主要体现在：\n\n' +
          '1. 告知同意要求：\n' +
          '   - 收集员工个人信息前必须明确告知处理目的、方式、范围等\n' +
          '   - 处理敏感个人信息（如生物识别、健康数据）需单独同意\n\n' +
          '2. 最小必要原则：\n' +
          '   - 只能收集与雇佣目的相关的必要信息\n' +
          '   - 不得过度收集员工个人信息\n\n' +
          '3. 安全保障义务：\n' +
          '   - 采取加密等技术措施保护员工数据\n' +
          '   - 制定内部管理制度和操作规程\n\n' +
          '4. 合规建议：\n' +
          '   - 更新员工隐私政策\n' +
          '   - 对现有人事数据进行合规评估\n' +
          '   - 制定数据分级分类管理制度\n' +
          '   - 明确内部责任人\n\n' +
          '具体到您企业的情况，建议重点关注员工考勤、监控和绩效评估数据的处理。我可以帮您制定详细的员工数据合规方案，您需要我针对哪方面深入分析？',
        sender: 'assistant',
        timestamp: new Date(),
        references: [
          {
            title: '《中华人民共和国个人信息保护法》',
            source: '全国人大常委会',
            url: '#'
          },
          {
            title: '国家网信办《App个人信息收集使用合规指南》',
            source: '国家互联网信息办公室',
            url: '#'
          }
        ],
        visualData: {
          type: 'chart',
          data: {
            chartType: 'radar',
            labels: ['告知同意', '安全保障', '权利响应', '敏感信息保护', '最小必要'],
            datasets: [
              {
                label: '行业平均水平',
                data: [60, 65, 55, 70, 75]
              },
              {
                label: '贵公司当前水平',
                data: [45, 60, 40, 50, 65]
              },
              {
                label: '合规目标',
                data: [85, 90, 80, 85, 90]
              }
            ]
          }
        }
      };
    } else if (userInput.includes('远程') || userInput.includes('考勤')) {
      botReply = {
        id: messages.length + 2,
        content:
          '远程工作员工的考勤管理合规要点包括：\n\n' +
          '1. 明确工作制度：\n' +
          '   - 在劳动合同或公司制度中明确远程工作的具体安排\n' +
          '   - 约定工作时间、考核方式和通信要求\n\n' +
          '2. 灵活考勤方式：\n' +
          '   - 可采用任务导向替代传统打卡\n' +
          '   - 电子化工作记录和报告机制\n\n' +
          '3. 加班管理：\n' +
          '   - 明确远程加班申请和批准流程\n' +
          '   - 保留加班记录和凭证\n\n' +
          '4. 数据隐私：\n' +
          '   - 远程监控需经员工同意\n' +
          '   - 不得过度收集个人信息\n\n' +
          '5. 合规建议：\n' +
          '   - 制定专门的远程工作政策\n' +
          '   - 员工培训和沟通机制\n' +
          '   - 定期评估和调整\n\n' +
          '我可以根据您公司的具体情况，提供定制化的远程工作考勤制度设计方案。',
        sender: 'assistant',
        timestamp: new Date(),
        references: [
          {
            title: '《关于完善灵活就业人员参加基本养老保险政策措施的通知》',
            source: '人力资源社会保障部',
            url: '#'
          }
        ]
      };
    } else if (userInput.includes('起草') || userInput.includes('协议') || userInput.includes('合同')) {
      botReply = {
        id: messages.length + 2,
        content: '好的，我可以帮您起草一份竞业限制协议。请问您需要包含哪些特定条款或限制条件？或者您可以提供一些基本信息，如限制期限、地域范围、补偿标准等，我会根据最新法规为您生成一份合规的协议模板。',
        sender: 'assistant',
        timestamp: new Date()
      };
    } else {
      // 默认回复
      botReply = {
        id: messages.length + 2,
        content: '感谢您的咨询。为了更准确地回答您的问题，我需要更多相关信息。您可以：\n\n1. 提供更多具体细节\n2. 上传相关文件让我分析\n3. 选择一个具体的合规领域深入讨论',
        sender: 'assistant',
        timestamp: new Date()
      };
    }
    
    setMessages([...messages, newUserMessage, botReply]);
    setIsLoading(false);
  };
  
  // 使用建议问题
  const useQuestion = (question: string) => {
    setInput(question);
  };
  
  // 处理输入框按键事件
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  
  // 触发文件上传
  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  // 处理文件选择
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setDocumentToAnalyze(files[0]);
      setInput(`请分析这份文档: ${files[0].name}`);
    }
  };
  
  // 处理语音输入
  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      // 开始录音的模拟
      setTimeout(() => {
        setIsRecording(false);
        setInput('我想了解最新的劳动合同法对试用期的规定');
      }, 3000);
    }
  };
  
  // 切换模式
  const switchMode = (mode: 'chat' | 'document-analysis' | 'compliance-check') => {
    setActiveMode(mode);
  };
  
  // 渲染附件
  const renderAttachment = (attachment: NonNullable<Message['attachments']>[number], messageId: number) => {
    return (
      <div className="flex items-center p-3 bg-gray-50 rounded-md my-2 border border-gray-200" key={attachment.name}>
        <FaFileAlt className="text-blue-500 mr-3 text-xl" />
        <div className="flex-1">
          <div className="font-medium">{attachment.name}</div>
          <div className="text-sm text-gray-500">{attachment.type} • {attachment.size}</div>
          
          {attachment.analysis && (
            <div className="mt-2 pt-2 border-t border-gray-200">
              <div className="flex items-center">
                <div className={`rounded-full h-3 w-3 mr-2 ${
                  attachment.analysis.riskLevel === 'high' ? 'bg-red-500' : 
                  attachment.analysis.riskLevel === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`}></div>
                <div className="text-sm font-medium">
                  风险等级: {
                    attachment.analysis.riskLevel === 'high' ? '高风险' : 
                    attachment.analysis.riskLevel === 'medium' ? '中度风险' : '低风险'
                  }
                </div>
                <div className="ml-4 text-sm font-medium">
                  合规分数: {100 - attachment.analysis.riskScore}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {!attachment.analysis && (
          <div className="text-blue-500 text-sm cursor-pointer hover:underline">
            分析中...
          </div>
        )}
      </div>
    );
  };

  // 渲染可视化数据
  const renderVisualData = (visualData: VisualData) => {
    if (visualData.type === 'risk-analysis') {
      const analysis = visualData.data as DocumentAnalysis;
      
      return (
        <div className="bg-white rounded-lg border border-gray-200 p-4 my-3">
          <h3 className="font-medium text-lg mb-3">文档风险分析</h3>
          
          <div className="flex items-center mb-4">
            <div className="w-20 h-20 rounded-full border-4 border-blue-500 flex items-center justify-center mr-4">
              <span className="text-2xl font-bold">{100 - analysis.riskScore}</span>
            </div>
            
            <div>
              <div className="text-lg font-medium">合规得分</div>
              <div className={`inline-block px-2 py-1 rounded-full text-white text-sm ${
                analysis.riskLevel === 'high' ? 'bg-red-500' : 
                analysis.riskLevel === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
              }`}>
                {analysis.riskLevel === 'high' ? '高风险' : 
                 analysis.riskLevel === 'medium' ? '中度风险' : '低风险'}
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">发现的合规问题:</h4>
            <ul className="space-y-2">
              {analysis.complianceIssues.map((issue, index) => (
                <li key={index} className="bg-gray-50 p-3 rounded">
                  <div className="flex items-center mb-1">
                    <div className={`h-2 w-2 rounded-full mr-2 ${
                      issue.severity === 'high' ? 'bg-red-500' : 
                      issue.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <div className="font-medium">{issue.description}</div>
                  </div>
                  <div className="text-sm text-gray-700 ml-4 mb-1">
                    <span className="text-gray-500">建议: </span>
                    {issue.recommendation}
                  </div>
                  <div className="text-xs text-gray-500 ml-4">
                    {issue.relatedLaw}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
    
    if (visualData.type === 'compliance-score') {
      const { scores, overallScore } = visualData.data;
      
      return (
        <div className="bg-white rounded-lg border border-gray-200 p-4 my-3">
          <h3 className="font-medium text-lg mb-3">合规评估</h3>
          
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 rounded-full border-4 border-blue-500 flex items-center justify-center mr-4">
              <span className="text-xl font-bold">{overallScore}</span>
            </div>
            
            <div className="flex-1">
              <div className="text-lg font-medium">总体评分</div>
              <div className="text-sm text-gray-500">根据多个维度评估</div>
            </div>
          </div>
          
          <div className="space-y-2">
            {scores.map((item: {category: string, score: number}, index: number) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.category}</span>
                  <span className="font-medium">{item.score}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      item.score >= 80 ? 'bg-green-500' : 
                      item.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`} 
                    style={{ width: `${item.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    if (visualData.type === 'chart' && visualData.data.chartType === 'radar') {
      // 实际项目中这里可以使用Recharts等图表库渲染雷达图
      return (
        <div className="bg-white rounded-lg border border-gray-200 p-4 my-3">
          <h3 className="font-medium text-lg mb-2">数据合规对比分析</h3>
          <div className="text-center text-gray-500 p-8">
            [此处将显示雷达图，展示各项合规指标的对比]
          </div>
          <div className="flex flex-wrap gap-3">
            {visualData.data.labels.map((label: string, i: number) => (
              <div key={i} className="bg-gray-50 px-3 py-1 rounded-full text-sm">
                {label}
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* 模式选择 */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          <button 
            className={`px-6 py-3 font-medium text-sm ${activeMode === 'chat' ? 'bg-white text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => switchMode('chat')}
          >
            <FaRobot className="inline mr-2" />
            智能对话
          </button>
          <button 
            className={`px-6 py-3 font-medium text-sm ${activeMode === 'document-analysis' ? 'bg-white text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => switchMode('document-analysis')}
          >
            <FaFileAlt className="inline mr-2" />
            文档分析
          </button>
          <button 
            className={`px-6 py-3 font-medium text-sm ${activeMode === 'compliance-check' ? 'bg-white text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => switchMode('compliance-check')}
          >
            <FaExclamationTriangle className="inline mr-2" />
            合规检查
          </button>
        </div>
        
        {/* 主体内容 */}
        <div className="flex h-[calc(100vh-240px)]">
          {/* 聊天区域 */}
          <div className="flex-1 flex flex-col">
            {/* 消息列表 */}
            <div className="flex-1 p-5 overflow-y-auto">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`mb-4 ${message.sender === 'user' ? 'ml-auto max-w-[85%]' : 'mr-auto max-w-[85%]'}`}
                >
                  <div className="flex items-start">
                    {message.sender === 'assistant' && (
                      <div className="rounded-full bg-blue-100 p-2 mr-3">
                        <FaRobot className="text-blue-500" />
                      </div>
                    )}
                    
                    <div 
                      className={`rounded-lg p-4 ${
                        message.sender === 'user' 
                          ? 'bg-blue-500 text-white rounded-tr-none' 
                          : 'bg-gray-100 text-gray-800 rounded-tl-none'
                      }`}
                    >
                      <div className="whitespace-pre-line">{message.content}</div>
                      
                      {/* 附件 */}
                      {message.attachments && message.attachments.length > 0 && (
                        <div className="mt-2">
                          {message.attachments.map((attachment) => renderAttachment(attachment, message.id))}
                        </div>
                      )}
                      
                      {/* 引用来源 */}
                      {message.references && message.references.length > 0 && (
                        <div className="mt-3 pt-2 border-t border-gray-200 text-sm">
                          <div className="text-gray-500 mb-1">参考来源:</div>
                          {message.references.map((ref, index) => (
                            <a 
                              key={index} 
                              href={ref.url} 
                              className="block text-blue-600 hover:underline mb-1"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {ref.title} - {ref.source}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {message.sender === 'user' && (
                      <div className="rounded-full bg-gray-200 p-2 ml-3">
                        <FaUser className="text-gray-500" />
                      </div>
                    )}
                  </div>
                  
                  {/* 可视化数据 */}
                  {message.visualData && (
                    <div className={`${message.sender === 'user' ? 'ml-auto' : 'ml-12'} mt-2`}>
                      {renderVisualData(message.visualData)}
                    </div>
                  )}
                </div>
              ))}
              
              {/* 加载状态 */}
              {isLoading && (
                <div className="flex items-center ml-12 text-gray-500">
                  <div className="dot-typing mr-2"></div>
                  <span className="text-sm">
                    {analyzingDocument ? '正在分析文档...' : '正在思考...'}
                  </span>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* 输入区域 */}
            <div className="p-4 border-t border-gray-200">
              {/* 快捷提问区 */}
              {messages.length < 3 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm px-4 py-2 rounded-full"
                      onClick={() => {
                        setInput(suggestion);
                      }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
              
              <div className="flex items-center">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="输入您的问题或上传文档..."
                    className="w-full border border-gray-300 rounded-l-lg px-4 py-3 outline-none focus:border-blue-500"
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  
                  {documentToAnalyze && (
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs flex items-center">
                      <FaFile className="mr-1" />
                      {documentToAnalyze.name}
                      <button
                        className="ml-1 text-blue-800 hover:text-blue-600"
                        onClick={() => setDocumentToAnalyze(null)}
                      >
                        &times;
                      </button>
                    </div>
                  )}
                </div>
                
                {/* 工具按钮 */}
                <div className="flex">
                  <button 
                    className={`p-3 bg-gray-100 text-gray-600 hover:bg-gray-200 ${isRecording ? 'text-red-500' : ''}`}
                    onClick={handleVoiceInput}
                  >
                    <FaMicrophone />
                  </button>
                  <button 
                    className="p-3 bg-gray-100 text-gray-600 hover:bg-gray-200"
                    onClick={handleFileUploadClick}
                  >
                    <FaFileUpload />
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.txt"
                      className="hidden"
                    />
                  </button>
                  <button 
                    className="p-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
                    onClick={sendMessage}
                  >
                    <FaArrowRight />
                  </button>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 mt-2">
                上传文档以获取合规分析，或直接提问劳动法相关问题
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 录音中的状态指示 */}
      {isRecording && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-full flex items-center">
          <div className="animate-pulse mr-2">●</div>
          <span>正在录音...</span>
        </div>
      )}
      
      {/* 添加一些基本动画样式 */}
      <style>{`
        .dot-typing {
          position: relative;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: #9880ff;
          color: #9880ff;
          animation: dotTyping 1.5s infinite linear;
        }
        
        .dot-typing::before,
        .dot-typing::after {
          content: '';
          position: absolute;
          top: 0;
          left: -8px;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: #9880ff;
          color: #9880ff;
          animation: dotTyping 1.5s infinite linear;
          animation-delay: 0.5s;
        }
        
        .dot-typing::after {
          left: 8px;
          animation-delay: 1s;
        }
        
        @keyframes dotTyping {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.5;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default AIAssistant; 