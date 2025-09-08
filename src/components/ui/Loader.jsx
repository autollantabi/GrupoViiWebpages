import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: ${({ theme, size }) => 
    size === 'sm' ? theme.spacing.sm :
    size === 'lg' ? theme.spacing.xl :
    theme.spacing.md
  };
`;

const SpinnerLoader = styled.div`
  width: ${({ size }) => 
    size === 'sm' ? '20px' :
    size === 'lg' ? '50px' :
    '30px'
  };
  height: ${({ size }) => 
    size === 'sm' ? '20px' :
    size === 'lg' ? '50px' :
    '30px'
  };
  border: ${({ size }) => 
    size === 'sm' ? '2px' :
    size === 'lg' ? '4px' :
    '3px'
  } solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: ${({ theme, color }) => 
    color === 'secondary' ? theme.colors.secondary :
    color === 'light' ? theme.colors.light :
    color === 'dark' ? theme.colors.dark :
    theme.colors.primary
  };
  animation: ${spin} 0.8s linear infinite;
`;

const DotsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ size }) => 
    size === 'sm' ? '4px' :
    size === 'lg' ? '10px' :
    '6px'
  };
`;

const DotLoader = styled.div`
  width: ${({ size }) => 
    size === 'sm' ? '6px' :
    size === 'lg' ? '16px' :
    '10px'
  };
  height: ${({ size }) => 
    size === 'sm' ? '6px' :
    size === 'lg' ? '16px' :
    '10px'
  };
  border-radius: 50%;
  background-color: ${({ theme, color }) => 
    color === 'secondary' ? theme.colors.secondary :
    color === 'light' ? theme.colors.light :
    color === 'dark' ? theme.colors.dark :
    theme.colors.primary
  };
  animation: ${pulse} 1.2s ease-in-out infinite;

  &:nth-child(2) {
    animation-delay: 0.2s;
  }

  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: ${({ size }) => 
    size === 'sm' ? '4px' :
    size === 'lg' ? '10px' :
    '6px'
  };
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  overflow: hidden;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: ${({ theme, color }) => 
      color === 'secondary' ? theme.colors.secondary :
      color === 'light' ? theme.colors.light :
      color === 'dark' ? theme.colors.dark :
      theme.colors.primary
    };
    animation: progressAnimation 1.5s ease-in-out infinite;
    border-radius: ${({ theme }) => theme.borderRadius.full};
    width: 50%;
  }

  @keyframes progressAnimation {
    0% {
      left: -50%;
    }
    100% {
      left: 100%;
    }
  }
`;

const LoaderText = styled.p`
  margin-top: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme, color }) => 
    color === 'secondary' ? theme.colors.secondary :
    color === 'light' ? theme.colors.light :
    color === 'dark' ? theme.colors.dark :
    theme.colors.primary
  };
  font-size: ${({ theme, size }) => 
    size === 'sm' ? theme.fontSizes.sm :
    size === 'lg' ? theme.fontSizes.lg :
    theme.fontSizes.md
  };
  text-align: center;
`;

const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Loader = ({ 
  type = 'spinner',
  size = 'md',
  color = 'primary',
  text,
  fullPage = false
}) => {
  const renderLoader = () => {
    switch(type) {
      case 'dots':
        return (
          <DotsContainer size={size}>
            <DotLoader size={size} color={color} />
            <DotLoader size={size} color={color} />
            <DotLoader size={size} color={color} />
          </DotsContainer>
        );
      case 'progress':
        return <ProgressBar size={size} color={color} />;
      case 'spinner':
      default:
        return <SpinnerLoader size={size} color={color} />;
    }
  };

  const loaderContent = (
    <LoaderWrapper>
      {renderLoader()}
      {text && <LoaderText size={size} color={color}>{text}</LoaderText>}
    </LoaderWrapper>
  );

  if (fullPage) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999
      }}>
        {loaderContent}
      </div>
    );
  }

  return (
    <LoaderContainer size={size}>
      {loaderContent}
    </LoaderContainer>
  );
};

Loader.propTypes = {
  type: PropTypes.oneOf(['spinner', 'dots', 'progress']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  color: PropTypes.oneOf(['primary', 'secondary', 'light', 'dark']),
  text: PropTypes.string,
  fullPage: PropTypes.bool
};

export default Loader;