import React, { useState, useRef } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const ChatInput = ({ onSendMessage, onFileUpload, disabled, onVoiceInput }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef(null);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileUpload(file);
      e.target.value = ''; // Reset file input
    }
  };

  const handleVoiceToggle = () => {
    if (isRecording) {
      setIsRecording(false);
      // Stop recording logic here
      onVoiceInput && onVoiceInput(false);
    } else {
      setIsRecording(true);
      // Start recording logic here
      onVoiceInput && onVoiceInput(true);
    }
  };

  return (
    <div className="p-4 border-t border-border bg-background">
      <div className="flex items-end space-x-2">
        {/* File Upload Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          className="flex-shrink-0"
        >
          <Icon name="Paperclip" size={18} />
        </Button>
        
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
          onChange={handleFileSelect}
        />

        {/* Message Input */}
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={disabled}
            className="resize-none"
          />
        </div>

        {/* Voice Input Button */}
        <Button
          variant={isRecording ? "destructive" : "ghost"}
          size="icon"
          onClick={handleVoiceToggle}
          disabled={disabled}
          className="flex-shrink-0"
        >
          <Icon name={isRecording ? "MicOff" : "Mic"} size={18} />
        </Button>

        {/* Send Button */}
        <Button
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          size="icon"
          className="flex-shrink-0"
        >
          <Icon name="Send" size={18} />
        </Button>
      </div>
      
      {isRecording && (
        <div className="flex items-center justify-center mt-2 p-2 bg-error/10 rounded-md">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-error rounded-full animate-pulse"></div>
            <span className="text-sm text-error font-medium">Recording...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInput;