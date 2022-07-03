import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AppLayout } from './layout';
import { NotFound } from './screens/NotFound';

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
