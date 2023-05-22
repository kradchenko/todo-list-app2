import { Navigate, Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Home } from './pages/Home';

const queryClient = new QueryClient();

function App() {
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <Routes>
                    <Route path="/*" element={<Home />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </QueryClientProvider>
        </BrowserRouter>
    );
}

export default App;
