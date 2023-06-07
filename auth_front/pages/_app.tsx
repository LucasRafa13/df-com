// pages/_app.tsx
import "../src/app/main.css";

// Este componente é carregado antes de todas as páginas
function MyApp({ Component, pageProps }: any) {
  return <Component {...pageProps} />;
}

export default MyApp;
