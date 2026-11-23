window.getRandomId = () => Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);

window.isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

window.toastify = (msg, type) => console.log(msg, type); // Overridden in App component to use context-aware messages

// Automatically select correct API: localhost in local dev, live production URL in production
const defaultApi = import.meta.env.DEV ? "http://localhost:8000" : "https://waqas-royal-ser.vercel.app";
const rawApi = import.meta.env.VITE_API_URL || defaultApi;
window.api = String(rawApi).trim().replace(/\/+$/, "");
