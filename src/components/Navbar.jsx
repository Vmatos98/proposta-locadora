import React from 'react';
import Logo from './Logo';
import { Phone, Shield, Smartphone, Sliders, Presentation, MessageCircle, CalendarCheck, Car } from 'lucide-react';

const InstagramIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function Navbar({ activeView, setActiveView, criticalCount = 2, availableCount = 2 }) {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-color)',
      padding: '14px 0',
      boxShadow: 'var(--shadow-xs)'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Brand / Logo */}
        <div 
          onClick={() => setActiveView('vitrine')}
          style={{ display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }}
        >
          <Logo size="small" dark={false} />
          <span style={{
            fontSize: '12px',
            color: 'var(--text-muted)',
            borderLeft: '1px solid var(--border-color)',
            paddingLeft: '12px',
            fontWeight: '600'
          }}>
            Aracaju • SE
          </span>
        </div>

        {/* View Switcher Pills - Spacious & High Contrast */}
        <div style={{
          background: '#f1f5f9',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-full)',
          padding: '4px',
          display: 'flex',
          gap: '4px'
        }}>
          {/* Vitrine Home */}
          <button
            onClick={() => setActiveView('vitrine')}
            style={{
              padding: '8px 18px',
              borderRadius: 'var(--radius-full)',
              fontSize: '13px',
              fontWeight: '700',
              background: activeView === 'vitrine' ? '#dc2626' : 'transparent',
              color: activeView === 'vitrine' ? '#ffffff' : 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease',
              boxShadow: activeView === 'vitrine' ? 'var(--shadow-red)' : 'none'
            }}
          >
            <Smartphone size={15} />
            Início
          </button>

          {/* Consulta de Disponibilidade */}
          <button
            onClick={() => setActiveView('disponibilidade')}
            style={{
              padding: '8px 18px',
              borderRadius: 'var(--radius-full)',
              fontSize: '13px',
              fontWeight: '700',
              background: activeView === 'disponibilidade' ? '#059669' : 'transparent',
              color: activeView === 'disponibilidade' ? '#ffffff' : 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease',
              boxShadow: activeView === 'disponibilidade' ? 'var(--shadow-green)' : 'none'
            }}
          >
            <CalendarCheck size={15} />
            Consultar Disponibilidade
            <span style={{
              background: activeView === 'disponibilidade' ? 'rgba(255, 255, 255, 0.25)' : '#ecfdf5',
              color: activeView === 'disponibilidade' ? '#ffffff' : '#047857',
              fontSize: '10px',
              fontWeight: '800',
              padding: '1px 6px',
              borderRadius: 'var(--radius-full)'
            }}>
              {availableCount} Livres
            </span>
          </button>

          {/* Painel Operacional JTF CAR */}
          <button
            onClick={() => setActiveView('gestao')}
            style={{
              padding: '8px 18px',
              borderRadius: 'var(--radius-full)',
              fontSize: '13px',
              fontWeight: '700',
              background: activeView === 'gestao' ? '#0f172a' : 'transparent',
              color: activeView === 'gestao' ? '#ffffff' : 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease',
              position: 'relative'
            }}
          >
            <Sliders size={15} />
            Painel de Gestão
            {criticalCount > 0 && (
              <span style={{
                background: '#dc2626',
                color: '#ffffff',
                fontSize: '10px',
                fontWeight: '900',
                padding: '1px 6px',
                borderRadius: 'var(--radius-full)'
              }}>
                {criticalCount} Alertas
              </span>
            )}
          </button>

          {/* Proposta & ROI */}
          <button
            onClick={() => setActiveView('proposta')}
            style={{
              padding: '8px 18px',
              borderRadius: 'var(--radius-full)',
              fontSize: '13px',
              fontWeight: '700',
              background: activeView === 'proposta' ? '#059669' : 'transparent',
              color: activeView === 'proposta' ? '#ffffff' : 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <Presentation size={15} />
            Proposta & ROI
          </button>
        </div>

        {/* Contact Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <a
            href="https://instagram.com/jtfcar"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--text-secondary)',
              fontSize: '13px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <InstagramIcon size={16} color="#E1306C" />
            <span style={{ display: 'none', '@media (minWidth: 640px)': { display: 'inline' } }}>@jtfcar</span>
          </a>

          <a
            href="https://wa.me/5579999727165"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#ecfdf5',
              border: '1px solid #a7f3d0',
              color: '#047857',
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              fontSize: '13px',
              fontWeight: '800',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <MessageCircle size={15} />
            (79) 99972-7165
          </a>
        </div>
      </div>
    </header>
  );
}
