import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m your AI assistant for SmartEmployee360. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const quickActions = [
    { label: 'Check leave balance', action: 'leave_balance' },
    { label: 'Submit timesheet', action: 'timesheet' },
    { label: 'View pay stub', action: 'pay_stub' },
    { label: 'Performance review status', action: 'performance' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (content = inputValue) => {
    if (!content.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: generateBotResponse(content),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('leave') || input.includes('vacation')) {
      return 'You have 15 vacation days remaining this year. Your last leave request was approved for December 23-27. Would you like to submit a new leave request?';
    } else if (input.includes('timesheet') || input.includes('time')) {
      return 'Your timesheet for this week shows 32 hours logged so far. Don\'t forget to submit it by Friday at 5 PM. Need help with time entry?';
    } else if (input.includes('pay') || input.includes('salary')) {
      return 'Your latest pay stub is available in the Payroll section. Your next payday is January 31st. Would you like me to show you your pay history?';
    } else if (input.includes('performance') || input.includes('review')) {
      return 'Your Q4 performance review is scheduled for next week with your manager. You have 2 goals marked as "In Progress". Would you like to update your self-assessment?';
    } else if (input.includes('help') || input.includes('support')) {
      return 'I can help you with leave requests, timesheet management, payroll inquiries, performance reviews, and general HR questions. What specific area would you like assistance with?';
    } else {
      return 'I understand you\'re asking about HR-related topics. I can help with leave management, timesheets, payroll, performance reviews, and more. Could you please be more specific about what you need help with?';
    }
  };

  const handleQuickAction = (action) => {
    const actionMessages = {
      leave_balance: 'What\'s my current leave balance?',
      timesheet: 'Help me submit my timesheet',
      pay_stub: 'Show me my latest pay stub',
      performance: 'What\'s my performance review status?'
    };
    
    handleSendMessage(actionMessages[action]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={handleToggleChat}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg z-1000 transition-all duration-300 ${
          isOpen ? 'bg-error hover:bg-error/90' : 'bg-primary hover:bg-primary/90'
        }`}
        size="icon"
      >
        <Icon 
          name={isOpen ? 'X' : 'MessageCircle'} 
          size={24} 
          color="white"
        />
      </Button>

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-card border border-border rounded-lg shadow-xl z-1000 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                <Icon name="Bot" size={16} color="white" />
              </div>
              <div>
                <h3 className="font-medium text-sm">AI Assistant</h3>
                <p className="text-xs opacity-90">Online</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleChat}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <Icon name="Minimize2" size={16} />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 opacity-70 ${
                    message.type === 'user' ? 'text-primary-foreground' : 'text-muted-foreground'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted text-muted-foreground p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse-gentle"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse-gentle" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse-gentle" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            {messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Quick actions:</p>
                <div className="grid grid-cols-1 gap-2">
                  {quickActions.map((action) => (
                    <Button
                      key={action.action}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction(action.action)}
                      className="justify-start text-xs"
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <Input
                ref={inputRef}
                type="text"
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isTyping}
                size="icon"
              >
                <Icon name="Send" size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;