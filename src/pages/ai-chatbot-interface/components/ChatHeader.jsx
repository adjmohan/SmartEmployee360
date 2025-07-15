import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ChatHeader = ({ onClose, onMinimize, onSearch, isMinimized, isMobile }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-primary-foreground">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center">
          <Icon name="Bot" size={20} color="white" />
        </div>
        <div>
          <h3 className="font-semibold text-base">SmartEmployee360 AI</h3>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-sm opacity-90">Online</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-1">
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onSearch}
            className="text-primary-foreground hover:bg-primary-foreground/20"
          >
            <Icon name="Search" size={18} />
          </Button>
        )}
        
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onMinimize}
            className="text-primary-foreground hover:bg-primary-foreground/20"
          >
            <Icon name={isMinimized ? "Maximize2" : "Minimize2"} size={18} />
          </Button>
        )}
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-primary-foreground hover:bg-primary-foreground/20"
        >
          <Icon name="X" size={18} />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;