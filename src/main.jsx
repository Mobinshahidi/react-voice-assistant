import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import OpenAi from './component/OpenAi';
ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<OpenAi />
	</React.StrictMode>,
);
