import { Footer, Navbar, Services, Transactions, Welcome } from './components';
import Market from './containers/Market';

const links = [
  { text: 'Current Price', href: 'graph' },
  { text: 'Services', href: 'services' },
  { text: 'Last Transactions', href: 'transactions' }
];
const App = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar links={links} />
        <Welcome />
      </div>
      <Market />
      <Services />
      <Transactions />
      <Footer links={links} />
    </div>
  );
};

export default App;
