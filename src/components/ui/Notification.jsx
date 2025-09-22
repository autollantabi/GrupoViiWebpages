import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Icon from "./Icon";



const NotificationCard = styled.div`
  background: ${({ theme, $type }) => 
    $type === "success" 
      ? "#10B981" 
      : $type === "error" 
      ? "#EF4444" 
      : theme.colors.primary
  };
  color: white;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  transform: translateX(100%);
  opacity: 0;
  max-width: 350px;
  
  animation: slideIn 0.3s ease-out forwards;
  
  @keyframes slideIn {
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  &.closing {
    animation: slideOut 0.3s ease-in forwards;
  }
  
  @keyframes slideOut {
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;

const IconContainer = styled.div`
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1px;
`;

const ContentContainer = styled.div`
  flex: 1;
`;

const Title = styled.h4`
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.3;
`;

const Message = styled.p`
  margin: 0;
  font-size: 12px;
  line-height: 1.3;
  opacity: 0.9;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  flex-shrink: 0;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Notification = ({ type, title, message, duration = 5000, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, handleClose]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return "check-circle";
      case "error":
        return "exclamation-triangle";
      default:
        return "info-circle";
    }
  };

  return (
    <NotificationCard $type={type} className={isClosing ? "closing" : ""}>
      <IconContainer>
        <Icon name={getIcon()} size="md" />
      </IconContainer>
      <ContentContainer>
        <Title>{title}</Title>
        <Message>{message}</Message>
      </ContentContainer>
      <CloseButton onClick={handleClose}>
        <Icon name="times" size="sm" />
      </CloseButton>
    </NotificationCard>
  );
};

export default Notification;
