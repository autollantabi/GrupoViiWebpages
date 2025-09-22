import styled from "styled-components";
import Notification from "./Notification";
import { useNotification } from "../../context/NotificationContext";

const NotificationWrapper = styled.div`
  position: relative;
`;

const NotificationDisplay = ({ children }) => {
  const { notifications, removeNotification } = useNotification();

  return (
    <NotificationWrapper>
      {children}
      {notifications.length > 0 && (
        <div style={{ position: "fixed", top: "80px", right: "20px", zIndex: 9999 }}>
          {notifications.map((notification) => (
            <Notification
              key={notification.id}
              {...notification}
              onClose={() => removeNotification(notification.id)}
            />
          ))}
        </div>
      )}
    </NotificationWrapper>
  );
};

export default NotificationDisplay;
