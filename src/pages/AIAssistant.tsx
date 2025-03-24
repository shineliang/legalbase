import React, { useState, useRef, useEffect } from 'react';
import { FaArrowRight, FaFile, FaPaperclip, FaQuestionCircle, FaRobot, FaSave, FaUser } from 'react-icons/fa';

// 模拟聊天消息类型
interface Message {
  id: number;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  attachments?: {
    name: string;
    type: string;
    size: string;
  }[];
  references?: {
    title: string;
    source: string;
    url: string;
  }[];
}

// AI智能合规助手页面
const AIAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: '您好！我是您的智能劳动法合规助手。我可以帮您解答劳动法相关问题，分析风险，提供合规建议，以及协助起草合同条款。请问有什么我可以帮您的？',
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
    if (!input.trim()) return;
    
    // 添加用户消息
    const newUserMessage: Message = {
      id: messages.length + 1,
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages([...messages, newUserMessage]);
    setInput('');
    setIsLoading(true);
    
    // 模拟AI回复延迟
    setTimeout(() => {
      let botReply: Message;
      
      // 根据用户输入生成不同的回复
      if (input.includes('终止') || input.includes('解雇') || input.includes('辞退')) {
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
          ]
        };
      } else if (input.includes('个人信息') || input.includes('数据')) {
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
          ]
        };
      } else if (input.includes('远程') || input.includes('考勤')) {
        botReply = {
          id: messages.length + 2,
          content:
            '远程工作员工的考勤管理合规要点包括：\n\n' +
            '1. 明确工作制度：\n' +
            '   - 在劳动合同或公司制度中明确远程工作的具体安排\n' +
            '   - 规定工作时间、考勤方式和绩效考核标准\n\n' +
            '2. 考勤记录保存：\n' +
            '   - 《劳动合同法》第六条要求用人单位保存劳动者考勤记录\n' +
            '   - 考勤记录应准确反映工作时间，作为加班工资计算依据\n\n' +
            '3. 避免的合规风险：\n' +
            '   - 禁止"隐形加班"或未支付加班费\n' +
            '   - 远程监控须遵守《个人信息保护法》获得员工同意\n' +
            '   - 不可强制要求员工24小时在线响应\n\n' +
            '4. 推荐做法：\n' +
            '   - 采用任务导向而非纯时长考核\n' +
            '   - 使用专业远程办公软件记录工作时间\n' +
            '   - 制定明确的响应时间预期\n' +
            '   - 定期沟通和反馈\n\n' +
            '我可以帮您起草一份《远程工作考勤管理规定》，需要包含哪些具体内容？',
          sender: 'assistant',
          timestamp: new Date()
        };
      } else if (input.includes('竞业限制') || input.includes('协议')) {
        botReply = {
          id: messages.length + 2,
          content:
            '我可以帮您起草竞业限制协议，以下是关键条款建议：\n\n' +
            '1. 竞业限制的范围：\n' +
            '   - 明确限制的地域范围（通常不超过企业实际经营区域）\n' +
            '   - 明确限制的行业和岗位（与原工作相同或类似）\n' +
            '   - 明确限制期限（法定不超过2年）\n\n' +
            '2. 经济补偿：\n' +
            '   - 明确月补偿标准（不低于离职前工资的30%或当地最低工资标准）\n' +
            '   - 明确支付方式和时间\n\n' +
            '3. 违约责任：\n' +
            '   - 规定违约金计算方式（通常不超过支付的经济补偿总额）\n' +
            '   - 规定停止违约行为的义务\n\n' +
            '4. 保密义务：\n' +
            '   - 明确需保密的商业秘密范围\n' +
            '   - 保密义务期限可长于竞业限制期限\n\n' +
            '您希望我为哪类岗位起草具体的竞业限制协议？请提供岗位信息、期望的限制范围和补偿标准，我可以为您量身定制。',
          sender: 'assistant',
          timestamp: new Date()
        };
      } else if (input.includes('分析') || input.includes('风险')) {
        botReply = {
          id: messages.length + 2,
          content:
            '要分析贵司劳动合同的合规风险，我需要查看您现有的合同文本。不过，以下是劳动合同常见的合规风险点：\n\n' +
            '1. 试用期设置不合规：\n' +
            '   - 试用期超过法定期限\n' +
            '   - 重复约定试用期\n' +
            '   - 试用期工资低于法定标准\n\n' +
            '2. 工作时间与加班条款：\n' +
            '   - 未明确工作时间制度\n' +
            '   - "包含加班费"条款无效\n' +
            '   - 强制放弃加班费权利的条款无效\n\n' +
            '3. 违约金与服务期：\n' +
            '   - 培训服务期过长\n' +
            '   - 违约金计算标准过高\n' +
            '   - 限制员工离职的不合理条款\n\n' +
            '4. 合同解除条件：\n' +
            '   - 扩大用人单位单方解除权利\n' +
            '   - 限制员工解除合同的权利\n\n' +
            '您可以上传贵司的劳动合同模板，我将为您提供详细的风险分析和修改建议。',
          sender: 'assistant',
          timestamp: new Date()
        };
      } else {
        botReply = {
          id: messages.length + 2,
          content:
            '感谢您的问题。作为劳动法合规助手，我可以协助您解答劳动法规相关问题、分析合规风险、提供建议和起草文件。\n\n' +
            '为了更准确地回答您的问题，我需要了解更多信息：\n\n' +
            '1. 您是想了解哪方面的劳动法规问题？\n' +
            '2. 您企业的行业和规模是？\n' +
            '3. 您是否面临具体的合规挑战？\n\n' +
            '您也可以尝试以下常见问题：\n' +
            '- 劳动合同签订的法律要求\n' +
            '- 试用期管理的合规要点\n' +
            '- 绩效考核与辞退的法律风险\n' +
            '- 加班管理与工资支付规定\n\n' +
            '或者您需要我分析特定文件或起草合规文件？',
          sender: 'assistant',
          timestamp: new Date()
        };
      }
      
      setMessages([...messages, newUserMessage, botReply]);
      setIsLoading(false);
    }, 1500);
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
  
  return (
    <div className="flex flex-col h-[calc(100vh-180px)]">
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-2">智能合规助手</h1>
        <p className="text-gray-600">您的AI劳动法律顾问，随时解答合规问题，提供专业建议</p>
      </div>
      
      <div className="flex flex-col flex-grow">
        {/* 主体区域 - 两列布局 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-grow">
          {/* 左侧边栏 */}
          <div className="md:col-span-1">
            <div className="card h-full">
              <h2 className="text-lg font-medium mb-4">推荐问题</h2>
              <div className="space-y-3">
                {suggestions.map((question, index) => (
                  <button
                    key={index}
                    className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm transition-colors"
                    onClick={() => setInput(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-3">上传文件分析</h3>
                <button className="w-full flex items-center justify-center p-3 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50">
                  <FaFile className="mr-2 text-gray-400" />
                  <span className="text-gray-500">上传合同/规章制度</span>
                </button>
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-3">快速操作</h3>
                <div className="space-y-2">
                  <button className="w-full text-left p-2 text-primary hover:bg-blue-50 rounded-lg text-sm transition-colors flex items-center">
                    <FaSave className="mr-2" />
                    保存对话记录
                  </button>
                  <button className="w-full text-left p-2 text-primary hover:bg-blue-50 rounded-lg text-sm transition-colors flex items-center">
                    <FaQuestionCircle className="mr-2" />
                    查看使用教程
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* 右侧聊天区域 */}
          <div className="md:col-span-3 card flex flex-col h-full p-0">
            {/* 聊天消息区域 */}
            <div className="flex-grow p-4 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg p-4 ${
                        message.sender === 'user' 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        {message.sender === 'assistant' ? (
                          <FaRobot className="mr-2 text-primary" />
                        ) : (
                          <FaUser className="mr-2 text-white" />
                        )}
                        <span className="font-medium">
                          {message.sender === 'user' ? '您' : '智能合规助手'}
                        </span>
                        <span className="ml-2 text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="whitespace-pre-line">{message.content}</div>
                      
                      {/* 附件 */}
                      {message.attachments && message.attachments.length > 0 && (
                        <div className="mt-3">
                          <p className={`text-xs ${message.sender === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
                            附件:
                          </p>
                          <div className="mt-1">
                            {message.attachments.map((file, index) => (
                              <div 
                                key={index}
                                className={`flex items-center p-2 rounded ${
                                  message.sender === 'user' ? 'bg-blue-600' : 'bg-gray-200'
                                }`}
                              >
                                <FaFile className="mr-2" />
                                <div>
                                  <p className="text-sm font-medium">{file.name}</p>
                                  <p className="text-xs">
                                    {file.type} | {file.size}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* 参考资料 */}
                      {message.references && message.references.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-xs text-gray-500">
                            参考资料:
                          </p>
                          <div className="mt-1 space-y-1">
                            {message.references.map((ref, index) => (
                              <div key={index} className="text-xs">
                                <a 
                                  href={ref.url} 
                                  className="text-blue-600 hover:underline"
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                >
                                  {ref.title}
                                </a>
                                <span className="text-gray-500"> - {ref.source}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg p-4 bg-gray-100 text-gray-800">
                      <div className="flex items-center">
                        <FaRobot className="mr-2 text-primary" />
                        <span className="font-medium">智能合规助手</span>
                        <div className="ml-3 flex space-x-1">
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            {/* 输入区域 */}
            <div className="p-4 border-t">
              <div className="flex">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <FaPaperclip />
                </button>
                <textarea
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                  placeholder="输入您的问题..."
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                ></textarea>
                <button
                  className="bg-primary text-white px-4 py-2 rounded-r-lg disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                >
                  发送 <FaArrowRight className="ml-1" />
                </button>
              </div>
              <div className="text-xs text-gray-500 mt-2">
                按 Enter 发送，Shift + Enter 换行。助手将根据中国劳动法规提供建议，但不构成法律意见。
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant; 