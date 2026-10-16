import React from 'react';
import { Zap, Fuel, ArrowRight, ShieldCheck, CheckCircle2, MapPin, CalendarCheck } from 'lucide-react';

export default function HeroSection({ onExploreFleet, onOpenPreApproval, onCheckAvailability }) {
  return (
    <div style={{
      position: 'relative',
      padding: '70px 0 50px',
      background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
      borderBottom: '1px solid var(--border-color)'
    }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '920px', margin: '0 auto 48px' }}>
          {/* Location Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#f1f5f9',
            border: '1px solid var(--border-color)',
            padding: '6px 16px',
            borderRadius: 'var(--radius-full)',
            marginBottom: '20px'
          }}>
            <MapPin size={15} color="var(--accent-red)" />
            <span style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: '700' }}>
              Locadora 100% Sergipana • Pátio em Aracaju / SE
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(34px, 5.5vw, 56px)',
            fontWeight: '900',
            lineHeight: '1.15',
            color: 'var(--text-primary)',
            marginBottom: '20px',
            letterSpacing: '-0.03em'
          }}>
            A JTF CAR TEM O VEÍCULO <br />
            <span style={{
              background: 'linear-gradient(90deg, #dc2626 0%, #ea580c 50%, #059669 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              QUE VOCÊ PRECISA!
            </span>
          </h1>

          <p style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: 'var(--text-secondary)',
            lineHeight: '1.6',
            marginBottom: '36px'
          }}>
            Locação de veículos <strong>a combustão e 100% elétricos</strong> em Aracaju. Planos semanais para motoristas de aplicativo (Uber/99) e diárias particulares. <strong>Sem burocracia de cartão de crédito</strong> e caução facilitada no Pix.
          </p>

          {/* Action buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap',
            marginBottom: '48px'
          }}>
            <button
              onClick={onOpenPreApproval}
              style={{
                background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                color: '#ffffff',
                fontSize: '16px',
                fontWeight: '800',
                padding: '16px 36px',
                borderRadius: 'var(--radius-md)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: 'var(--shadow-red)',
                transition: 'transform 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Solicitar Locação sem Cartão
              <ArrowRight size={18} />
            </button>

            <button
              onClick={onCheckAvailability}
              style={{
                background: '#ffffff',
                border: '2px solid var(--border-strong)',
                color: 'var(--text-primary)',
                fontSize: '16px',
                fontWeight: '700',
                padding: '16px 30px',
                borderRadius: 'var(--radius-md)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: 'var(--shadow-xs)',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = 'var(--text-primary)';
                e.currentTarget.style.background = '#f8fafc';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-strong)';
                e.currentTarget.style.background = '#ffffff';
              }}
            >
              <CalendarCheck size={18} color="#059669" />
              Verificar Carros Disponíveis Hoje
            </button>
          </div>

          {/* Dual Pillars: Combustão & Elétricos (Spacious & Clean) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            textAlign: 'left'
          }}>
            {/* Combustão Pillar */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #fecaca',
              borderRadius: 'var(--radius-md)',
              padding: '24px',
              display: 'flex',
              gap: '18px',
              alignItems: 'flex-start',
              boxShadow: 'var(--shadow-xs)'
            }}>
              <div style={{
                background: '#fef2f2',
                borderRadius: '12px',
                padding: '12px',
                color: 'var(--accent-red)',
                flexShrink: 0
              }}>
                <Fuel size={28} />
              </div>
              <div>
                <strong style={{ fontSize: '16px', color: 'var(--text-primary)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Frota a Combustão
                </strong>
                <span style={{ fontSize: '14px', color: 'var(--text-secondary)', display: 'block', margin: '6px 0 10px', lineHeight: '1.5' }}>
                  Força, confiabilidade e porta-malas amplo para rodar em todo Sergipe. Modelos HB20, Onix e Yaris Sedã.
                </span>
                <span style={{ fontSize: '13px', color: 'var(--accent-red)', fontWeight: '700' }}>
                  A partir de R$ 125/diária • Planos Semanais App
                </span>
              </div>
            </div>

            {/* Elétrico Pillar */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #a7f3d0',
              borderRadius: 'var(--radius-md)',
              padding: '24px',
              display: 'flex',
              gap: '18px',
              alignItems: 'flex-start',
              boxShadow: 'var(--shadow-xs)'
            }}>
              <div style={{
                background: '#ecfdf5',
                borderRadius: '12px',
                padding: '12px',
                color: '#059669',
                flexShrink: 0
              }}>
                <Zap size={28} />
              </div>
              <div>
                <strong style={{ fontSize: '16px', color: '#059669', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Frota 100% Elétrica
                </strong>
                <span style={{ fontSize: '14px', color: 'var(--text-secondary)', display: 'block', margin: '6px 0 10px', lineHeight: '1.5' }}>
                  Tecnologia e economia brutal com o BYD Dolphin Mini. Reduza drasticamente seu custo de combustível.
                </span>
                <span style={{ fontSize: '13px', color: '#059669', fontWeight: '700' }}>
                  Economize até R$ 1.900/mês em Aracaju
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
