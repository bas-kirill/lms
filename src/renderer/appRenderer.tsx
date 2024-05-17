import React from 'react';
import { createRoot } from 'react-dom/client';
import Application from './Application';

// Say something
console.log('[LMS] : Renderer execution started');

// Render application in DOM
createRoot(document.getElementById('app')).render(<Application />);
