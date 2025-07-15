import React from 'react';
import Icon from '../../../components/AppIcon';

const ChatMessage = ({ message, isUser }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[85%] sm:max-w-[70%] ${isUser ? 'order-2' : 'order-1'}`}>
        <div
          className={`p-3 rounded-2xl ${
            isUser
              ? 'bg-primary text-primary-foreground rounded-br-md'
              : 'bg-muted text-muted-foreground rounded-bl-md'
          }`}
        >
          {message.type === 'file' && (
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Paperclip" size={16} />
              <span className="text-sm font-medium">{message.fileName}</span>
            </div>
          )}
          
          {message.type === 'quick_action' && (
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Zap" size={16} />
              <span className="text-sm font-medium">Quick Action</span>
            </div>
          )}

          <p className="text-sm leading-relaxed">{message.content}</p>
          
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-2 space-y-1">
              {message.attachments.map((attachment, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-background/10 rounded-md">
                  <Icon name="FileText" size={14} />
                  <span className="text-xs">{attachment.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className={`flex items-center mt-1 space-x-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
          <span className="text-xs text-muted-foreground">
            {formatTime(message.timestamp)}
          </span>
          {message.status && (
            <Icon 
              name={message.status === 'sent' ? 'Check' : message.status === 'delivered' ? 'CheckCheck' : 'Clock'} 
              size={12} 
              className="text-muted-foreground"
            />
          )}
        </div>
      </div>
      
      {!isUser && (
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3 order-1 flex-shrink-0">
          <Icon name="Bot" size={16} color="white" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;