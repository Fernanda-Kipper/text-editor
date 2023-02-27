import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { EditorContextProvider } from './context/editor-context';

import 'react-toastify/dist/ReactToastify.css';

import { Router } from './router';

function App() {
	const queryClient = new QueryClient({
		defaultOptions: {
            queries: {
                retry: 2
            }
        }
	})

    return (
		<QueryClientProvider client={queryClient}>
			<EditorContextProvider>
				<Router />
				<ToastContainer
					position="top-right"
					autoClose={false}
					closeOnClick
				/>
			</EditorContextProvider>
		</QueryClientProvider>
    );
}

export default App;
