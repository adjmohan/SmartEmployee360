import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Navigation from '../../components/ui/Navigation';
import AIChatbot from '../../components/ui/AIChatbot';
import ChatMessage from './components/ChatMessage';
import TypingIndicator from './components/TypingIndicator';
import QuickActionChips from './components/QuickActionChips';
import ChatInput from './components/ChatInput';
import ChatHeader from './components/ChatHeader';
import ConversationHistory from './components/ConversationHistory';
import FloatingChatButton from './components/FloatingChatButton';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const AIChatbotInterface = () => {
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const messagesEndRef = useRef(null);

  // Mock conversations data
  const [conversations, setConversations] = useState([
    {
      id: 1,
      title: 'Leave Balance Inquiry',
      lastMessage: 'You have 12 vacation days remaining',
      timestamp: new Date(Date.now() - 3600000),
      unreadCount: 0
    },
    {
      id: 2,
      title: 'Payroll Questions',
      lastMessage: 'Your next payday is January 31st',
      timestamp: new Date(Date.now() - 86400000),
      unreadCount: 2
    },
    {
      id: 3,
      title: 'Performance Review',
      lastMessage: 'Your Q4 review is scheduled for next week',
      timestamp: new Date(Date.now() - 172800000),
      unreadCount: 0
    }
  ]);

  // Mock messages data
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: `Hello! I'm your AI assistant for SmartEmployee360. I can help you with:\n\n• Leave balance and applications\n• Timesheet and attendance queries\n• Payroll and salary information\n• Performance review updates\n• Company policies and procedures\n• Profile management\n\nHow can I assist you today?`,
      isUser: false,
      timestamp: new Date(Date.now() - 300000),
      type: 'text',status: 'delivered'
    }
  ]);

  const [unreadCount, setUnreadCount] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (content) => {
    const userMessage = {
      id: Date.now(),
      content,
      isUser: true,
      timestamp: new Date(),
      type: 'text',
      status: 'sent'
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        content: generateAIResponse(content),
        isUser: false,
        timestamp: new Date(),
        type: 'text',
        status: 'delivered'
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const generateAIResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('leave') || input.includes('vacation') || input.includes('time off')) {
      return `Based on your employee record, here's your current leave status:\n\n• **Vacation Days:** 12 remaining (out of 25 annual)\n• **Sick Leave:** 8 days available\n• **Personal Days:** 3 days remaining\n• **Last Leave:** December 23-27, 2024 (Approved)\n\nYour next leave request can be submitted through the system. Would you like me to guide you through the application process?`;
    } else if (input.includes('timesheet') || input.includes('attendance') || input.includes('clock')) {
      return `Here's your current timesheet information:\n\n• **This Week:** 32 hours logged (as of today)\n• **Status:** On track for 40-hour week\n• **Last Clock-in:** Today at 9:15 AM\n• **Submission Deadline:** Friday, 5:00 PM\n\n**Recent Attendance:**\n• Monday: 8.5 hours\n• Tuesday: 8.0 hours\n• Wednesday: 7.5 hours\n• Thursday: 8.0 hours\n\nRemember to submit your timesheet before the deadline to ensure timely payroll processing.`;
    } else if (input.includes('pay') || input.includes('salary') || input.includes('payroll')) {
      return `Here's your payroll information:\n\n• **Next Payday:** January 31, 2025\n• **Pay Period:** January 16-31, 2025\n• **Gross Pay (YTD):** $52,000\n• **Net Pay (Last):** $3,245.67\n\n**Recent Pay Stub Available:**\n• Gross: $4,166.67\n• Federal Tax: $625.00\n• State Tax: $208.33\n• Social Security: $258.33\n• Medicare: $60.42\n• Health Insurance: $125.00\n\nYou can download your pay stubs from the Payroll section. Need help accessing them?`;
    } else if (input.includes('performance') || input.includes('review') || input.includes('evaluation')) {
      return `Your performance review information:\n\n• **Q4 2024 Review:** Scheduled for January 22, 2025\n• **Reviewer:** Sarah Johnson (Manager)\n• **Self-Assessment:** Due January 20, 2025\n• **Current Rating:** Exceeds Expectations (4.2/5.0)\n\n**Goal Progress:**\n• Project Leadership: 90% Complete ✅\n• Skill Development: 75% Complete 🔄\n• Team Collaboration: 100% Complete ✅\n\n**Action Items:**\n• Complete self-assessment form\n• Prepare examples of achievements\n• Review goal progress with manager\n\nWould you like me to help you prepare for your review?`;
    } else if (input.includes('policy') || input.includes('policies') || input.includes('handbook')) {
      return `I can help you find information about company policies:\n\n**Available Policy Documents:**\n• Employee Handbook (Updated Dec 2024)\n• Code of Conduct\n• Remote Work Policy\n• Leave and Attendance Policy\n• IT Security Guidelines\n• Expense Reimbursement Policy\n\n**Quick Policy Answers:**\n• **Remote Work:** Up to 3 days per week with manager approval\n• **Dress Code:** Business casual in office, professional for client meetings\n• **Lunch Break:** 1 hour, flexible timing\n• **Overtime:** Pre-approved, paid at 1.5x rate\n\nWhich specific policy would you like me to explain in detail?`;
    } else if (input.includes('profile') || input.includes('update') || input.includes('information')) {
      return `I can help you update your profile information:\n\n**Current Profile Status:**\n• **Name:** John Smith\n• **Employee ID:** EMP001\n• **Department:** Engineering\n• **Position:** Senior Developer\n• **Email:** john.smith@company.com\n• **Phone:** (555) 123-4567\n\n**Updatable Fields:**\n• Contact information (phone, emergency contact)\n• Address details\n• Banking information for payroll\n• Tax withholding preferences\n• Benefits selections\n\nWhich information would you like to update? I can guide you through the process.`;
    } else if (input.includes('help') || input.includes('support') || input.includes('contact')) {
      return `I'm here to help! Here are the ways I can assist you:\n\n**HR Support Topics:**\n• Leave and vacation management\n• Timesheet and attendance tracking\n• Payroll and compensation queries\n• Performance review guidance\n• Policy clarifications\n• Profile updates\n\n**Additional Support:**\n• **HR Department:** hr@company.com | (555) 100-2000\n• **IT Support:** it-help@company.com | (555) 100-3000\n• **Manager:** Sarah Johnson | sarah.j@company.com\n\n**Emergency Contacts:**\n• Security: (555) 100-9999\n• Employee Assistance Program: 1-800-EAP-HELP\n\nWhat specific area would you like help with?`;
    } else {
      return `I understand you're asking about HR-related topics. I'm designed to help with:\n\n• **Leave Management** - Check balances, apply for time off\n• **Attendance** - Timesheet help, clock-in/out issues\n• **Payroll** - Pay stubs, tax information, direct deposit\n• **Performance** - Review schedules, goal tracking\n• **Policies** - Company handbook, procedures\n• **Profile** - Update personal information\n\nCould you please be more specific about what you need help with? You can also use the quick action buttons below for common requests.`;
    }
  };

  const handleQuickAction = (action) => {
    const actionMessages = {
      leave_balance: 'What\'s my current leave balance?',
      apply_leave: 'I want to apply for leave',
      timesheet_status: 'Show me my timesheet status',
      pay_stub: 'I need to view my latest pay stub',
      performance_review: 'What\'s my performance review status?',
      update_profile: 'Help me update my profile information',
      company_policies: 'Show me company policies',
      contact_hr: 'I need to contact HR support'
    };
    
    handleSendMessage(actionMessages[action.id]);
  };

  const handleFileUpload = (file) => {
    const fileMessage = {
      id: Date.now(),
      content: `I've uploaded a document: ${file.name}. Can you help me with this?`,
      isUser: true,
      timestamp: new Date(),
      type: 'file',fileName: file.name,status: 'sent'
    };

    setMessages(prev => [...prev, fileMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        content: `I've received your document "${file.name}". I can help you with document-related queries such as:\n\n• Policy clarifications\n• Form completion guidance\n• Document submission procedures\n• Approval process information\n\nWhat specific help do you need with this document?`,
        isUser: false,
        timestamp: new Date(),
        type: 'text',status: 'delivered'
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleVoiceInput = (isRecording) => {
    if (isRecording) {
      // Voice recording started
      console.log('Voice recording started');
    } else {
      // Voice recording stopped - simulate voice message
      setTimeout(() => {
        handleSendMessage('I used voice input to ask about my leave balance');
      }, 1000);
    }
  };

  const handleSelectConversation = (conversationId) => {
    if (conversationId) {
      setCurrentConversationId(conversationId);
      // Load conversation messages here
      setMessages([
        {
          id: 1,
          content: 'Loading previous conversation...',
          isUser: false,
          timestamp: new Date(),
          type: 'text',
          status: 'delivered'
        }
      ]);
    } else {
      // New conversation
      setCurrentConversationId(null);
      setMessages([
        {
          id: 1,
          content: `Hello! I'm your AI assistant for SmartEmployee360. I can help you with:\n\n• Leave balance and applications\n• Timesheet and attendance queries\n• Payroll and salary information\n• Performance review updates\n• Company policies and procedures\n• Profile management\n\nHow can I assist you today?`,
          isUser: false,
          timestamp: new Date(),
          type: 'text',
          status: 'delivered'
        }
      ]);
    }
    
    if (isMobile) {
      setIsHistoryOpen(false);
    }
  };

  const handleDeleteConversation = (conversationId) => {
    setConversations(prev => prev.filter(conv => conv.id !== conversationId));
    if (currentConversationId === conversationId) {
      handleSelectConversation(null);
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (!isChatOpen) {
      setUnreadCount(0);
    }
  };

  const toggleHistory = () => {
    setIsHistoryOpen(!isHistoryOpen);
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSearch = () => {
    // Search functionality
    console.log('Search conversations');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Bot" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">AI Chatbot Interface</h1>
                <p className="text-muted-foreground">Conversational HR support powered by artificial intelligence</p>
              </div>
            </div>
          </div>

          {/* Features Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="MessageCircle" size={20} className="text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Natural Language Processing</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Communicate naturally with our AI assistant using everyday language for all your HR queries and requests.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={20} className="text-success" />
                </div>
                <h3 className="font-semibold text-foreground">Quick Actions</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Access common HR tasks instantly with smart suggestion chips and contextual quick action buttons.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Icon name="Shield" size={20} className="text-warning" />
                </div>
                <h3 className="font-semibold text-foreground">Secure & Personalized</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Get personalized responses about your leave balances, payroll, and performance with secure data validation.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="Mic" size={20} className="text-accent" />
                </div>
                <h3 className="font-semibold text-foreground">Voice Input</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Use voice commands for hands-free interaction, perfect for mobile users and accessibility needs.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
                  <Icon name="FileText" size={20} className="text-error" />
                </div>
                <h3 className="font-semibold text-foreground">Document Support</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Upload documents for policy clarifications, form assistance, and document-related queries.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Icon name="History" size={20} className="text-secondary" />
                </div>
                <h3 className="font-semibold text-foreground">Conversation History</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Access previous conversations with search functionality to find past HR interactions and responses.
              </p>
            </div>
          </div>

          {/* Getting Started */}
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Getting Started</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-primary-foreground">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Click the chat button</h4>
                  <p className="text-sm text-muted-foreground">Use the floating chat button in the bottom-right corner to open the AI assistant.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-primary-foreground">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Ask your question</h4>
                  <p className="text-sm text-muted-foreground">Type naturally or use quick action buttons for common HR queries like leave balance or payroll information.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-primary-foreground">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Get instant help</h4>
                  <p className="text-sm text-muted-foreground">Receive personalized responses with relevant information and follow-up actions.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sample Queries */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Sample Queries</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">Leave Management</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• "What's my current leave balance?"</li>
                  <li>• "How do I apply for vacation time?"</li>
                  <li>• "When was my last approved leave?"</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">Payroll & Benefits</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• "Show me my latest pay stub"</li>
                  <li>• "When is my next payday?"</li>
                  <li>• "How do I update my tax withholdings?"</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">Performance & Reviews</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• "When is my performance review?"</li>
                  <li>• "What's my current goal progress?"</li>
                  <li>• "How do I submit my self-assessment?"</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">Policies & Procedures</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• "What's the remote work policy?"</li>
                  <li>• "How do I submit an expense report?"</li>
                  <li>• "What are the company holidays?"</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Chat Interface */}
      {!isMobile && isChatOpen && (
        <div className={`fixed right-6 bg-card border border-border rounded-lg shadow-xl z-50 transition-all duration-300 ${
          isMinimized ? 'bottom-24 w-80 h-16' : 'bottom-24 w-96 h-[600px]'
        }`}>
          {!isMinimized && (
            <div className="flex h-full">
              {/* Chat History Sidebar */}
              {isHistoryOpen && (
                <div className="w-80 border-r border-border">
                  <ConversationHistory
                    conversations={conversations}
                    onSelectConversation={handleSelectConversation}
                    onDeleteConversation={handleDeleteConversation}
                    currentConversationId={currentConversationId}
                  />
                </div>
              )}
              
              {/* Main Chat Area */}
              <div className="flex-1 flex flex-col">
                <ChatHeader
                  onClose={() => setIsChatOpen(false)}
                  onMinimize={handleMinimize}
                  onSearch={handleSearch}
                  isMinimized={isMinimized}
                  isMobile={isMobile}
                />
                
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <ChatMessage
                      key={message.id}
                      message={message}
                      isUser={message.isUser}
                    />
                  ))}
                  
                  {isTyping && <TypingIndicator />}
                  <div ref={messagesEndRef} />
                </div>
                
                <QuickActionChips
                  onActionClick={handleQuickAction}
                  conversationContext={messages}
                />
                
                <ChatInput
                  onSendMessage={handleSendMessage}
                  onFileUpload={handleFileUpload}
                  onVoiceInput={handleVoiceInput}
                  disabled={isTyping}
                />
              </div>
            </div>
          )}
          
          {isMinimized && (
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Bot" size={16} color="white" />
                </div>
                <span className="font-medium text-foreground">AI Assistant</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleMinimize}
              >
                <Icon name="Maximize2" size={16} />
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Mobile Chat Interface */}
      {isMobile && isChatOpen && (
        <div className="fixed inset-0 bg-background z-50 flex flex-col">
          {/* Mobile Chat History */}
          {isHistoryOpen ? (
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground">Chat History</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleHistory}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
              <ConversationHistory
                conversations={conversations}
                onSelectConversation={handleSelectConversation}
                onDeleteConversation={handleDeleteConversation}
                currentConversationId={currentConversationId}
              />
            </div>
          ) : (
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-primary-foreground">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                    <Icon name="Bot" size={20} color="white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">SmartEmployee360 AI</h3>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-sm opacity-90">Online</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleHistory}
                    className="text-primary-foreground hover:bg-primary-foreground/20"
                  >
                    <Icon name="History" size={18} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsChatOpen(false)}
                    className="text-primary-foreground hover:bg-primary-foreground/20"
                  >
                    <Icon name="X" size={18} />
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    isUser={message.isUser}
                  />
                ))}
                
                {isTyping && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>
              
              <QuickActionChips
                onActionClick={handleQuickAction}
                conversationContext={messages}
              />
              
              <ChatInput
                onSendMessage={handleSendMessage}
                onFileUpload={handleFileUpload}
                onVoiceInput={handleVoiceInput}
                disabled={isTyping}
              />
            </div>
          )}
        </div>
      )}

      {/* Floating Chat Button */}
      <FloatingChatButton
        onClick={toggleChat}
        isOpen={isChatOpen}
        unreadCount={unreadCount}
      />

      {/* Global AI Chatbot (from existing component) */}
      <AIChatbot />
    </div>
  );
};

export default AIChatbotInterface;