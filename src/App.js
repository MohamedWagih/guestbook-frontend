import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AppLayout } from './layout';
import { Login, Messages, NotFound, Signup } from './screens';

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
