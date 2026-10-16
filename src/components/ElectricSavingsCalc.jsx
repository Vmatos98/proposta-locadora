import React, { useState } from 'react';
import { Zap, Fuel, ArrowRight, TrendingUp, Sparkles } from 'lucide-react';

export default function ElectricSavingsCalc({ onSelectElectric }) {
  const [kmPerDay, setKmPerDay] = useState(180);
  const daysPerMonth = 26;

  const totalKmMonth = kmPerDay * daysPerMonth;

  // Gasolina Aracaju: R$ 6.19 @ 12 km/l
  const gasLiters = totalKmMonth / 12;
  const gasCost = gasLiters * 6.19;

  // BYD Dolphin Mini: ~12.5 kWh/100km @ R$ 0.88/kWh (Energisa SE)
  const electricKwh = totalKmMonth * 0.125;
  const electricCost = electricKwh * 0.88;

  const monthlySavings = Math.max(0, gasCost - electricCost);
  const yearlySavings = monthlySavings * 12;

  return (
    <div style={{
      background: 'linear-gradient(135deg, #ffffff 0%, #ecfdf5 100%)',
      border: '2px solid #a7f3d0',
      borderRadius: 'var(--radius-lg)',
      padding: '40px',
      position: 'relative',
      overflow: 'hidden',
      marginTop: '60px',
      boxShadow: 'var(--shadow-md)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: '#059669',
          color: '#ffffff',
          padding: '4px 14px',
          borderRadius: 'var(--radius-full)',
          fontSize: '12px',
          fontWeight: '800',
          letterSpacing: '0.5px',
          textTransform: 'uppercase'
        }}>
          <Zap size={14} /> Diferencial Exclusivo JTF CAR
        </span>
      </div>

      <h3 style={{ fontSize: '28px', color: 'var(--text-primary)', marginBottom: '10px' }}>
        Calculadora de Economia: <span style={{ color: '#059669' }}>BYD Dolphin Mini Elétrico</span> vs. Combustão
      </h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '16px', maxWidth: '780px', marginBottom: '32px', lineHeight: '1.6' }}>
        Veja quanto sobra líquido no seu bolso todos os meses rodando na Uber/99 em Aracaju com o <strong>BYD Dolphin Mini 100% Elétrico</strong>.
      </p>

      {/* Slider Control - Spacious */}
      <div style={{
        background: '#ffffff',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: '28px',
        marginBottom: '36px',
        boxShadow: 'var(--shadow-xs)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <label style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)' }}>
            Quantos quilômetros você roda por dia como motorista?
          </label>
          <span style={{
            fontSize: '22px',
            fontWeight: '900',
            color: '#059669',
            background: '#ecfdf5',
            padding: '6px 18px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid #a7f3d0'
          }}>
            {kmPerDay} km / dia
          </span>
        </div>

        <input 
          type="range" 
          min="80" 
          max="350" 
          step="10" 
          value={kmPerDay} 
          onChange={(e) => setKmPerDay(Number(e.target.value))}
          style={{
            width: '100%',
            height: '10px',
            borderRadius: '6px',
            background: 'linear-gradient(to right, #059669 0%, #cbd5e1 100%)',
            outline: 'none',
            cursor: 'pointer',
            accentColor: '#059669'
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '13px', marginTop: '10px' }}>
          <span>80 km (Part-time)</span>
          <span>180 km (Média Uber Aracaju)</span>
          <span>350 km (Hard Driver Integral)</span>
        </div>
      </div>

      {/* Comparison Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '24px',
        marginBottom: '36px'
      }}>
        {/* Combustão */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #fecaca',
          borderRadius: 'var(--radius-md)',
          padding: '24px',
          boxShadow: 'var(--shadow-xs)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#dc2626', marginBottom: '8px' }}>
            <Fuel size={20} />
            <strong style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Carro a Combustão</strong>
          </div>
          <div style={{ fontSize: '30px', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '6px' }}>
            R$ {gasCost.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: '500' }}> /mês</span>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Gasto médio com gasolina ({totalKmMonth.toLocaleString()} km/mês)
          </p>
        </div>

        {/* Elétrico */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #a7f3d0',
          borderRadius: 'var(--radius-md)',
          padding: '24px',
          boxShadow: 'var(--shadow-xs)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#059669', marginBottom: '8px' }}>
            <Zap size={20} />
            <strong style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>BYD Dolphin Mini</strong>
          </div>
          <div style={{ fontSize: '30px', fontWeight: '900', color: '#059669', marginBottom: '6px' }}>
            R$ {electricCost.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: '500' }}> /mês</span>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Custo estimado de recarga elétrica residencial
          </p>
        </div>

        {/* Economia Líquida */}
        <div style={{
          background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
          color: '#ffffff',
          borderRadius: 'var(--radius-md)',
          padding: '24px',
          boxShadow: 'var(--shadow-green)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#a7f3d0', marginBottom: '8px' }}>
            <TrendingUp size={20} />
            <strong style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Economia Líquida no Bolso
            </strong>
          </div>
          <div style={{ fontSize: '34px', fontWeight: '900', color: '#ffffff', marginBottom: '6px' }}>
            + R$ {monthlySavings.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            <span style={{ fontSize: '16px', color: '#a7f3d0', fontWeight: '600' }}> /mês</span>
          </div>
          <p style={{ fontSize: '14px', color: '#ecfdf5' }}>
            São <strong>R$ {yearlySavings.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} a mais</strong> no seu bolso ao final do ano!
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={() => onSelectElectric && onSelectElectric()}
          style={{
            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
            color: '#ffffff',
            fontWeight: '800',
            fontSize: '16px',
            padding: '16px 32px',
            borderRadius: 'var(--radius-md)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: 'var(--shadow-green)',
            transition: 'transform 0.2s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <Sparkles size={18} />
          Garantir Meu BYD Dolphin Mini na JTF CAR
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
