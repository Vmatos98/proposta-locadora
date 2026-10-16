import React, { useState } from 'react';
import { 
  Zap, Fuel, Shield, Check, ArrowRight, Gauge, 
  DoorClosed, Snowflake, Briefcase, CalendarCheck, Sparkles 
} from 'lucide-react';

export default function FleetCatalog({ fleet, onSelectCar, onNavigateToAvailability }) {
  // Na home, mostramos os modelos mais requisitados
  const topDemandCars = fleet.filter(c => c.isTopDemand);

  return (
    <section id="frota" style={{ padding: '70px 0 30px' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{
          background: '#fef2f2',
          border: '1px solid #fecaca',
          color: 'var(--accent-red)',
          padding: '6px 18px',
          borderRadius: 'var(--radius-full)',
          fontSize: '13px',
          fontWeight: '800',
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
          display: 'inline-block',
          marginBottom: '14px'
        }}>
          Modelos Mais Requisitados em Aracaju
        </div>
        <h2 style={{ fontSize: '36px', color: 'var(--text-primary)', marginBottom: '14px' }}>
          Os Favoritos para Motoristas de App e Particulares
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '17px', maxWidth: '720px', margin: '0 auto 24px', lineHeight: '1.6' }}>
          Veículos revisados e liberados <strong>sem exigência de cartão de crédito</strong>. Caução facilitada via Pix e manutenção preventiva inclusa pela JTF CAR.
        </p>

        {/* CTA to real-time availability */}
        <button
          onClick={onNavigateToAvailability}
          style={{
            background: '#ffffff',
            border: '2px solid #0f172a',
            color: '#0f172a',
            padding: '12px 24px',
            borderRadius: 'var(--radius-full)',
            fontSize: '14px',
            fontWeight: '800',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: 'var(--shadow-xs)',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#0f172a';
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = '#ffffff';
            e.currentTarget.style.color = '#0f172a';
          }}
        >
          <CalendarCheck size={18} color="var(--accent-red)" />
          Consultar Disponibilidade de Toda a Frota em Tempo Real
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Spacious Grid of Top Vehicles */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '36px'
      }}>
        {topDemandCars.map(car => {
          const isElectric = car.category === 'eletrico';
          const isAvailableNow = car.status === 'disponivel';

          return (
            <div 
              key={car.id}
              className="surface-card"
              style={{
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                border: isElectric ? '2px solid #a7f3d0' : '1px solid var(--border-color)',
                boxShadow: isElectric ? '0 10px 30px -4px rgba(5, 150, 105, 0.15)' : 'var(--shadow-sm)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = isElectric ? '0 10px 30px -4px rgba(5, 150, 105, 0.15)' : 'var(--shadow-sm)';
              }}
            >
              {/* Image & Badges */}
              <div style={{
                position: 'relative',
                height: '240px',
                background: '#f1f5f9',
                overflow: 'hidden'
              }}>
                <img 
                  src={car.image} 
                  alt={car.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                <div style={{
                  position: 'absolute',
                  top: '18px',
                  left: '18px',
                  display: 'flex',
                  gap: '8px'
                }}>
                  <span style={{
                    background: isElectric ? '#059669' : '#dc2626',
                    color: '#ffffff',
                    fontWeight: '800',
                    fontSize: '11px',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-full)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {car.categoryLabel}
                  </span>

                  {isAvailableNow && (
                    <span style={{
                      background: '#ecfdf5',
                      border: '1px solid #a7f3d0',
                      color: '#047857',
                      fontWeight: '800',
                      fontSize: '11px',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)'
                    }}>
                      🟢 Disponível Hoje
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body - Spacious */}
              <div style={{ padding: '32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '22px', color: 'var(--text-primary)', marginBottom: '6px' }}>
                  {car.name}
                </h3>
                <span style={{
                  fontSize: '13px',
                  fontWeight: '700',
                  color: isElectric ? '#059669' : 'var(--accent-red)',
                  marginBottom: '20px',
                  display: 'block'
                }}>
                  {car.tag}
                </span>

                {/* Specs Box */}
                <div style={{
                  background: '#f8fafc',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '16px',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  marginBottom: '24px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {isElectric ? <Zap size={16} color="#059669" /> : <Fuel size={16} color="#dc2626" />}
                    <span>{car.specs.motor}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Gauge size={16} color="#64748B" />
                    <span>{car.specs.autonomy || car.specs.consumption}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Snowflake size={16} color="#0284C7" />
                    <span>{car.specs.ac}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Briefcase size={16} color="#64748B" />
                    <span>Mala: {car.specs.luggage}</span>
                  </div>
                </div>

                {/* Advantages */}
                <div style={{ marginBottom: '28px', flex: 1 }}>
                  {car.advantages.slice(0, 3).map((adv, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                      <Check size={16} color={isElectric ? '#059669' : '#dc2626'} style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span>{adv}</span>
                    </div>
                  ))}
                </div>

                {/* Pricing Block */}
                <div style={{
                  borderTop: '1px solid var(--border-color)',
                  paddingTop: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  marginBottom: '24px'
                }}>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>Plano Semanal</span>
                    <div style={{ fontSize: '28px', fontWeight: '900', color: 'var(--text-primary)', lineHeight: '1.1' }}>
                      R$ {car.weeklyPrice}
                      <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-muted)' }}>/semana</span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>Caução Pix</span>
                    <strong style={{ fontSize: '17px', color: '#059669' }}>
                      R$ {car.deposit.toLocaleString('pt-BR')}
                    </strong>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => onSelectCar(car)}
                  style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    background: isElectric 
                      ? 'linear-gradient(135deg, #059669 0%, #047857 100%)' 
                      : 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                    color: '#ffffff',
                    fontWeight: '800',
                    fontSize: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: isElectric ? 'var(--shadow-green)' : 'var(--shadow-red)',
                    transition: 'transform 0.2s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  Solicitar Locação sem Cartão
                  <ArrowRight size={17} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
