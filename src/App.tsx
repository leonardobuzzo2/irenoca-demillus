import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Sobre from './components/Sobre';
import Categorias from './components/Categorias';
import Galeria from './components/Galeria';
import Catalogo from './components/Catalogo';
import Videos from './components/Videos';
import Depoimentos from './components/Depoimentos';
import Localizacao from './components/Localizacao';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import MobileCTA from './components/MobileCTA';

const App = () => {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section[id]')) as HTMLElement[];

    sections.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(32px)';
      el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    });

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = '1';
            el.style.transform = 'none';
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.07, rootMargin: '0px 0px -40px 0px' }
    );

    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div style={{
        background: 'var(--color-primary)',
        color: '#fff',
        textAlign: 'center',
        fontSize: '0.78rem',
        fontWeight: 500,
        padding: '0.5rem 1rem',
        letterSpacing: '0.02em',
        lineHeight: 1.5,
      }}>
        ⚠️ Somos uma <strong>revendedora independente</strong> de produtos DeMillus — não somos a loja oficial da marca.
      </div>
      <Header />
      <main>
        <Hero />
        <Sobre />
        <Categorias />
        <Galeria />
        <Catalogo />
        <Videos />
        <Depoimentos />
        <Localizacao />
      </main>
      <Footer />
      <WhatsAppFloat />
      <MobileCTA />
    </>
  );
};

export default App;
