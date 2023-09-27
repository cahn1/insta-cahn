import ReactDOM from 'react-dom/client';

import { App } from './App';

const div = document.createElement('div');
document.body.append(div);

ReactDOM.createRoot(div).render(<App />);
