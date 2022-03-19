import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { EditorContextProvider } from './context/editor-context';

import { Router } from './router';

function App() {
	const queryClient = new QueryClient()

    return (
		<QueryClientProvider client={queryClient}>
			<EditorContextProvider>
				<Router />
			</EditorContextProvider>
		</QueryClientProvider>
    );
}

export default App;
