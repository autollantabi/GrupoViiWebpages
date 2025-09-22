import styled from 'styled-components';
import PropTypes from 'prop-types';
import { 
  FaArrowRight, FaArrowLeft, FaPhone, FaEnvelope, FaMapMarkerAlt, 
  FaClock, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube,
  FaSearch, FaShoppingCart, FaUser, FaCheck, FaTimes, FaExclamationCircle,
  FaChevronDown, FaChevronUp, FaChevronRight, FaChevronLeft, FaBars, 
  FaCar, FaOilCan, FaInfoCircle, FaHeart, FaStar, FaFilter, FaExternalLinkAlt, FaImage,
  FaStore,
  FaQuoteLeft,
  FaSpinner,
  FaCheckCircle,
} from 'react-icons/fa';

// Mapa de iconos disponibles
const iconMap = {
  arrowRight: FaArrowRight,
  arrowLeft: FaArrowLeft,
  phone: FaPhone,
  email: FaEnvelope,
  location: FaMapMarkerAlt,
  clock: FaClock,
  facebook: FaFacebook,
  twitter: FaTwitter,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
  search: FaSearch,
  cart: FaShoppingCart,
  user: FaUser,
  check: FaCheck,
  times: FaTimes,
  exclamation: FaExclamationCircle,
  chevronDown: FaChevronDown,
  chevronUp: FaChevronUp,
  chevronRight: FaChevronRight,
  chevronLeft: FaChevronLeft,
  bars: FaBars,
  car: FaCar,
  oil: FaOilCan,
  info: FaInfoCircle,
  heart: FaHeart,
  star: FaStar,
  close: FaTimes, 
  filter: FaFilter,
  externalLink: FaExternalLinkAlt,
  image: FaImage,
  store: FaStore,
  spinner: FaSpinner,
  'check-circle': FaCheckCircle,
};

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme, color }) => 
    color === 'primary' ? theme.colors.primary :
    color === 'secondary' ? theme.colors.secondary :
    color === 'light' ? theme.colors.light :
    color === 'dark' ? theme.colors.dark :
    color === 'gray' ? theme.colors.text.secondary :
    color || 'inherit'
  };
  font-size: ${({ theme, size }) => 
    typeof size === 'string' && theme.fontSizes[size] ? theme.fontSizes[size] :
    typeof size === 'number' ? `${size}px` :
    theme.fontSizes.md
  };
  transition: color 0.2s ease, transform 0.2s ease;

  &:hover {
    color: ${({ theme, hoverColor }) => 
      hoverColor === 'primary' ? theme.colors.primary :
      hoverColor === 'secondary' ? theme.colors.secondary :
      hoverColor === 'light' ? theme.colors.light :
      hoverColor === 'dark' ? theme.colors.dark :
      hoverColor || 'inherit'
    };
    transform: ${({ $spin, $pulse, hoverScale }) => 
      $spin ? 'rotate(360deg)' : 
      $pulse ? 'scale(1.1)' :
      hoverScale ? `scale(${hoverScale})` :
      'none'
    };
  }

  animation: ${({ $spin, $pulse }) => 
    $spin ? 'spin 2s linear infinite' : 
    $pulse ? 'pulse 1.5s ease-in-out infinite' : 
    'none'};
  
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }
`;

const Icon = ({ 
  name, 
  size = 'md', 
  color, 
  hoverColor, 
  spin = false, 
  pulse = false, 
  hoverScale,
  className,
  onClick,
  ...rest 
}) => {
  if (!iconMap[name]) {
    console.warn(`Icon "${name}" not found. Using default icon.`);
    return null;
  }

  const IconComponent = iconMap[name];
  
  return (
    <IconWrapper 
      size={size} 
      color={color} 
      hoverColor={hoverColor}
      $spin={spin}
      $pulse={pulse}
      hoverScale={hoverScale}
      className={className}
      onClick={onClick}
      {...rest}
    >
      <IconComponent />
    </IconWrapper>
  );
};

Icon.propTypes = {
  name: PropTypes.oneOf(Object.keys(iconMap)).isRequired,
  size: PropTypes.oneOfType([
    PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', 'xxl']),
    PropTypes.number
  ]),
  color: PropTypes.oneOf(['primary', 'secondary', 'light', 'dark', 'gray']),
  hoverColor: PropTypes.oneOf(['primary', 'secondary', 'light', 'dark']),
  spin: PropTypes.bool,
  pulse: PropTypes.bool,
  hoverScale: PropTypes.number,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default Icon;