import PropTypes from 'prop-types';
import { Footer } from '../Footer';
import { Navbar } from '../Navbar';

function AppLayout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node,
};

export default AppLayout;
