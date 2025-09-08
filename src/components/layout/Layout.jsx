import styled from 'styled-components';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';

const Main = styled.main`
  min-height: calc(100vh - 160px);
  width: 100%;
`;

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;