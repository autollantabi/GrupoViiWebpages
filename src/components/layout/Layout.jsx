import styled from 'styled-components';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';
import { NotificationProvider } from '../../context/NotificationContext';
import NotificationDisplay from '../ui/NotificationProvider';

const Main = styled.main`
  min-height: calc(100vh - 160px);
  width: 100%;
`;

const Layout = ({ children }) => {
  return (
    <NotificationProvider>
      <NotificationDisplay>
        <Header />
        <Main>{children}</Main>
        <Footer />
      </NotificationDisplay>
    </NotificationProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;