import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FloatingChatButton = ({ onClick, isOpen, unreadCount }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={onClick}
        className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
          isOpen 
            ? 'bg-error hover:bg-error/90 rotate-45' :'bg-primary hover:bg-primary/90'
        }`}
        size="icon"
      >
        <Icon 
          name={isOpen ? 'X' : 'MessageCircle'} 
          size={24} 
          color="white"
        />
        
        {!isOpen && unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-error text-error-foreground text-xs rounded-full w-6 h-6 flex items-center justify-center font-medium">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </Button>
      
      {/* Pulse animation for new messages */}
      {!isOpen && unreadCount > 0 && (
        <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20"></div>
      )}
    </div>
  );
};

export default FloatingChatButton;