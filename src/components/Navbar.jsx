import React, { useState } from 'react';
import Logo from './Logo';
import { 
  Sliders, Presentation, MessageCircle, CalendarCheck, 
  Car, Info, X, ChevronRight, CheckCircle2, Sparkles, ShieldCheck
} from 'lucide-react';

const InstagramIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function Navbar({ activeView, setActiveView, criticalCount = 2, availableCount = 2 }) {
  const [showDemoDrawer, setShowDemoDrawer] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  const handleSelectView = (viewId) => {
    setActiveView(viewId);
    setShowDemoDrawer(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    {
      id: 'vitrine',
      label: 'Início',
      mobileLabel: 'Vitrine',
      icon: Car,
      activeColor: '#dc2626',
      badge: null,
      desc: 'Catálogo de carros mais requisitados & Funil anti-curioso'
    },
    {
      id: 'disponibilidade',
      label: 'Consultar Disponibilidade',
      mobileLabel: 'Disponíveis',
      icon: CalendarCheck,
      activeColor: '#059669',
      badge: { count: availableCount, text: `${availableCount} Livres`, bg: '#ecfdf5', color: '#047857', border: '#a7f3d0' },
      desc: 'Consulta em tempo real de carros livres e previsão de devolução'
    },
    {
      id: 'gestao',
      label: 'Painel de Gestão',
      mobileLabel: 'Gestão',
      icon: Sliders,
      activeColor: '#0f172a',
      badge: criticalCount > 0 ? { count: criticalCount, text: `${criticalCount} Alertas`, bg: '#fef2f2', color: '#dc2626', border: '#fecaca' } : null,
      desc: 'Controle de frota: locados, manutenção, revisão e odômetro'
    },
    {
      id: 'proposta',
      label: 'Proposta & ROI',
      mobileLabel: 'Proposta',
      icon: Presentation,
      activeColor: '#2563eb',
      badge: { count: 'ROI', text: 'ROI', bg: '#eff6ff', color: '#2563eb', border: '#bfdbfe' },
      desc: 'Apresentação comercial e cálculo de retorno financeiro para a JTF'
    }
  ];

  return (
    <>
      {/* ===================================================================
          TOP NAVBAR & DEMO ANNOUNCEMENT BANNER
          =================================================================== */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-xs)'
      }}>
        {/* Top Demo Notice Banner */}
        {isBannerVisible && (
          <div style={{
            background: 'linear-gradient(90deg, #0f172a 0%, #1e293b 100%)',
            color: '#ffffff',
            padding: '8px 16px',
            fontSize: '12px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            position: 'relative'
          }}>
            <div className="container" style={{ padding: 0 }}>
              {/* DESKTOP BANNER LAYOUT */}
              <div className="desktop-only-flex" style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                  <span style={{
                    background: '#dc2626',
                    color: '#ffffff',
                    fontSize: '10px',
                    fontWeight: '900',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    letterSpacing: '0.6px',
                    textTransform: 'uppercase',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    flexShrink: 0
                  }}>
                    <Sparkles size={11} />
                    Demonstração
                  </span>

                  <span style={{ color: '#cbd5e1', fontSize: '12.5px', lineHeight: 1.4 }}>
                    Esta é uma prévia demonstrativa interativa. O sistema definitivo será&nbsp;
                    <strong style={{ color: '#ffffff', fontWeight: '700' }}>desenvolvido sob medida</strong>
                    &nbsp;após a definição das necessidades e regras operacionais da sua empresa.
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                  <button
                    onClick={() => handleSelectView('proposta')}
                    style={{
                      background: 'rgba(255, 255, 255, 0.14)',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                      color: '#ffffff',
                      padding: '4px 12px',
                      borderRadius: '999px',
                      fontSize: '11.5px',
                      fontWeight: '700',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                      whiteSpace: 'nowrap'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.14)'}
                  >
                    <span>Ver Proposta & ROI</span>
                    <ChevronRight size={13} />
                  </button>

                  <button
                    onClick={() => setIsBannerVisible(false)}
                    title="Ocultar aviso de demonstração"
                    aria-label="Ocultar aviso de demonstração"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#94a3b8',
                      padding: '4px',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>

              {/* MOBILE BANNER LAYOUT */}
              <div className="mobile-only-flex" style={{
                flexDirection: 'column',
                gap: '6px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <span style={{
                    background: '#dc2626',
                    color: '#ffffff',
                    fontSize: '9.5px',
                    fontWeight: '900',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    letterSpacing: '0.6px',
                    textTransform: 'uppercase',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Sparkles size={11} />
                    Demonstração Interativa
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      onClick={() => handleSelectView('proposta')}
                      style={{
                        background: 'rgba(255, 255, 255, 0.15)',
                        border: '1px solid rgba(255, 255, 255, 0.25)',
                        color: '#ffffff',
                        padding: '2px 8px',
                        borderRadius: '999px',
                        fontSize: '10.5px',
                        fontWeight: '700',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '3px',
                        cursor: 'pointer'
                      }}
                    >
                      <span>Proposta</span>
                      <ChevronRight size={12} />
                    </button>

                    <button
                      onClick={() => setIsBannerVisible(false)}
                      title="Ocultar aviso"
                      aria-label="Ocultar aviso"
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#94a3b8',
                        padding: '2px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>

                <p style={{
                  color: '#cbd5e1',
                  fontSize: '11px',
                  lineHeight: 1.35,
                  margin: 0
                }}>
                  Esta é uma prévia conceitual. O sistema definitivo será&nbsp;
                  <strong style={{ color: '#ffffff', fontWeight: '700' }}>desenvolvido sob medida</strong>
                  &nbsp;após o cliente definir suas necessidades operacionais.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          paddingTop: '10px',
          paddingBottom: '10px'
        }}>
          {/* Left: Brand Logo */}
          <div 
            onClick={() => handleSelectView('vitrine')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              cursor: 'pointer',
              flexShrink: 0
            }}
          >
            <Logo size="small" dark={false} />
            <span className="desktop-only-flex" style={{
              fontSize: '12px',
              color: 'var(--text-muted)',
              borderLeft: '1px solid var(--border-color)',
              paddingLeft: '12px',
              fontWeight: '600'
            }}>
              Aracaju • SE
            </span>
          </div>

          {/* Center (DESKTOP ONLY): Floating Pill Navigation Bar */}
          <div 
            className="desktop-nav-bar"
            style={{
              background: '#f1f5f9',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-full)',
              padding: '4px',
              gap: '4px',
              alignItems: 'center'
            }}
          >
            {navItems.map((item) => {
              const isActive = activeView === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectView(item.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '13px',
                    fontWeight: '700',
                    background: isActive ? item.activeColor : 'transparent',
                    color: isActive ? '#ffffff' : 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease',
                    boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <Icon size={15} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span style={{
                      background: isActive ? 'rgba(255, 255, 255, 0.25)' : item.badge.bg,
                      color: isActive ? '#ffffff' : item.badge.color,
                      fontSize: '10px',
                      fontWeight: '800',
                      padding: '1px 6px',
                      borderRadius: 'var(--radius-full)'
                    }}>
                      {item.badge.text}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: Actions (Desktop & Mobile optimized) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            {/* Mobile-Only Info Pill to see modules guide */}
            <button
              className="mobile-only-flex"
              onClick={() => setShowDemoDrawer(true)}
              title="Ver módulos da demonstração"
              style={{
                background: '#f8fafc',
                border: '1px solid var(--border-color)',
                color: 'var(--text-secondary)',
                padding: '6px 10px',
                borderRadius: 'var(--radius-full)',
                fontSize: '11px',
                fontWeight: '700',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Info size={14} color="#0284c7" />
              <span>Módulos</span>
            </button>

            {/* Instagram Link */}
            <a
              href="https://instagram.com/jtfcar"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram JTF CAR"
              style={{
                color: 'var(--text-secondary)',
                fontSize: '13px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                padding: '6px',
                borderRadius: '8px',
                transition: 'background 0.2s'
              }}
            >
              <InstagramIcon size={18} color="#E1306C" />
              <span className="desktop-only-flex" style={{ marginLeft: '5px' }}>@jtfcar</span>
            </a>

            {/* WhatsApp Contact Button */}
            <a
              href="https://wa.me/5579999727165"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: '#ecfdf5',
                border: '1px solid #a7f3d0',
                color: '#047857',
                padding: '7px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '12px',
                fontWeight: '800',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                whiteSpace: 'nowrap'
              }}
            >
              <MessageCircle size={15} />
              <span className="desktop-only-flex">(79) 99972-7165</span>
              <span className="mobile-only-flex">WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      {/* ===================================================================
          MOBILE BOTTOM APP BAR (Fixed at bottom on phones / tablets <= 860px)
          Thumb-friendly native app navigation
          =================================================================== */}
      <nav 
        className="mobile-bottom-bar"
        aria-label="Navegação móvel da demonstração"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 950,
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid var(--border-color)',
          boxShadow: '0 -4px 25px rgba(15, 23, 42, 0.08)',
          padding: '6px 8px calc(6px + env(safe-area-inset-bottom, 0px)) 8px',
          alignItems: 'center',
          justifyContent: 'space-around'
        }}
      >
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              className="mobile-tab-btn"
              onClick={() => handleSelectView(item.id)}
              style={{
                flex: 1,
                maxWidth: '85px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '6px 2px 4px 2px',
                borderRadius: '12px',
                background: isActive ? 'rgba(241, 245, 249, 0.7)' : 'transparent',
                color: isActive ? item.activeColor : '#64748b',
                position: 'relative',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {/* Active Indicator Top Pill */}
              {isActive && (
                <div style={{
                  position: 'absolute',
                  top: '-6px',
                  width: '24px',
                  height: '3px',
                  borderRadius: '99px',
                  background: item.activeColor,
                }} />
              )}

              {/* Icon Container with Badge */}
              <div style={{ position: 'relative', display: 'inline-flex', marginBottom: '3px' }}>
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                
                {item.badge && item.badge.count && (
                  <span style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-10px',
                    minWidth: item.badge.count === 'ROI' ? '24px' : '17px',
                    height: '17px',
                    padding: '0 3px',
                    borderRadius: '999px',
                    fontSize: '9.5px',
                    fontWeight: '900',
                    lineHeight: '17px',
                    textAlign: 'center',
                    background: item.badge.bg,
                    color: item.badge.color,
                    border: `1px solid ${item.badge.border}`,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
                  }}>
                    {item.badge.count}
                  </span>
                )}
              </div>

              {/* Tab Label */}
              <span style={{
                fontSize: '11px',
                fontWeight: isActive ? '800' : '600',
                letterSpacing: '-0.01em',
                lineHeight: 1.1,
                color: isActive ? item.activeColor : 'var(--text-secondary)'
              }}>
                {item.mobileLabel}
              </span>
            </button>
          );
        })}
      </nav>

      {/* ===================================================================
          MOBILE DEMO GUIDE DRAWER / BOTTOM SHEET
          Explains each module to the client on smartphone
          =================================================================== */}
      {showDemoDrawer && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(6px)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          animation: 'fadeIn 0.2s ease'
        }}>
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#ffffff',
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px',
              padding: '24px 20px calc(24px + env(safe-area-inset-bottom, 0px)) 20px',
              boxShadow: 'var(--shadow-lg)',
              maxHeight: '85vh',
              overflowY: 'auto'
            }}
          >
            {/* Drawer Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div>
                <span style={{
                  fontSize: '11px',
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  color: 'var(--accent-red)',
                  letterSpacing: '0.8px'
                }}>
                  Demonstração Interativa
                </span>
                <h3 style={{ fontSize: '18px', color: 'var(--text-primary)', marginTop: '2px' }}>
                  Navegue pelos 4 Módulos
                </h3>
              </div>
              <button 
                onClick={() => setShowDemoDrawer(false)}
                style={{
                  background: '#f1f5f9',
                  border: 'none',
                  borderRadius: '50%',
                  width: '34px',
                  height: '34px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* List of Modules */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {navItems.map((item, index) => {
                const isActive = activeView === item.id;
                const Icon = item.icon;

                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelectView(item.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '14px',
                      borderRadius: '16px',
                      border: `1.5px solid ${isActive ? item.activeColor : 'var(--border-color)'}`,
                      background: isActive ? '#f8fafc' : '#ffffff',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      background: isActive ? item.activeColor : '#f1f5f9',
                      color: isActive ? '#ffffff' : 'var(--text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Icon size={20} />
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-primary)' }}>
                          {index + 1}. {item.label}
                        </span>
                        {item.badge && (
                          <span style={{
                            background: item.badge.bg,
                            color: item.badge.color,
                            fontSize: '10px',
                            fontWeight: '800',
                            padding: '1px 6px',
                            borderRadius: '999px',
                            border: `1px solid ${item.badge.border}`
                          }}>
                            {item.badge.text}
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.3 }}>
                        {item.desc}
                      </p>
                    </div>

                    <ChevronRight size={18} color="var(--text-muted)" />
                  </div>
                );
              })}
            </div>

            {/* Quick Note */}
            <div style={{
              marginTop: '16px',
              padding: '12px',
              borderRadius: '12px',
              background: '#ecfdf5',
              border: '1px solid #a7f3d0',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px'
            }}>
              <CheckCircle2 size={16} color="#059669" style={{ marginTop: '2px', flexShrink: 0 }} />
              <p style={{ fontSize: '11.5px', color: '#047857', lineHeight: 1.4 }}>
                <strong>Dica:</strong> No celular você também pode alternar entre os módulos a qualquer momento tocando na <strong>barra inferior</strong>.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
