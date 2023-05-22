import { Navigate, Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Home } from './pages/Home';

import 'react-toastify/dist/ReactToastify.css';

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
            <ToastContainer
                position="bottom-center"
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="dark"
                bodyClassName="text-[0.9rem]"
                transition={Slide}
            />
        </BrowserRouter>
    );
}

export default App;
