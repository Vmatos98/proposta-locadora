import React, { useState } from 'react';
import { 
  CheckCircle2, Clock, AlertCircle, Wrench, Search, 
  Calendar, Zap, Fuel, ArrowRight, ShieldCheck, MapPin, 
  Filter, Sparkles, RefreshCw, Car 
} from 'lucide-react';

export default function AvailabilityView({ fleet, onSelectCarForBooking }) {
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'disponivel' | 'locado' | 'oficina'
  const [categoryFilter, setCategoryFilter] = useState('all'); // 'all' | 'eletrico' | 'combustao'
  const [searchQuery, setSearchQuery] = useState('');
  const [targetDate, setTargetDate] = useState('');

  const filteredFleet = fleet.filter(car => {
    // Status filter
    if (statusFilter === 'disponivel' && car.status !== 'disponivel') return false;
    if (statusFilter === 'locado' && car.status !== 'locado') return false;
    if (statusFilter === 'oficina' && car.status !== 'manutencao' && car.status !== 'revisao_pos_devolucao') return false;

    // Category filter
    if (categoryFilter === 'eletrico' && car.category !== 'eletrico') return false;
    if (categoryFilter === 'combustao' && car.category === 'eletrico') return false;

    // Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = car.name.toLowerCase().includes(q);
      const matchPlate = car.plate.toLowerCase().includes(q);
      const matchCat = car.categoryLabel.toLowerCase().includes(q);
      if (!matchName && !matchPlate && !matchCat) return false;
    }

    return true;
  });

  const availableCount = fleet.filter(c => c.status === 'disponivel').length;
  const rentedCount = fleet.filter(c => c.status === 'locado').length;
  const maintenanceCount = fleet.filter(c => c.status === 'manutencao' || c.status === 'revisao_pos_devolucao').length;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'disponivel':
        return {
          bg: '#ecfdf5',
          border: '#a7f3d0',
          text: '#047857',
          icon: CheckCircle2,
          label: 'Disponível para Retirada Imediata',
          desc: 'Pronto no pátio da JTF CAR em Aracaju'
        };
      case 'locado':
        return {
          bg: '#eff6ff',
          border: '#bfdbfe',
          text: '#1d4ed8',
          icon: Clock,
          label: 'Em Contrato Ativo',
          desc: 'Em uso por motorista de aplicativo'
        };
      case 'revisao_pos_devolucao':
        return {
          bg: '#f5f3ff',
          border: '#ddd6fe',
          text: '#6d28d9',
          icon: Sparkles,
          label: 'Em Revisão Pós-Devolução',
          desc: 'Higienização e checklist (libera em breve)'
        };
      case 'manutencao':
      default:
        return {
          bg: '#fffbeb',
          border: '#fde68a',
          text: '#b45309',
          icon: Wrench,
          label: 'Em Manutenção Preventiva',
          desc: 'Revisão periódica de segurança'
        };
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: '40px 0 80px' }}>
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '36px',
        marginBottom: '36px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#fef2f2', border: '1px solid #fecaca', padding: '6px 14px', borderRadius: 'var(--radius-full)', marginBottom: '14px' }}>
              <MapPin size={15} color="var(--accent-red)" />
              <span style={{ fontSize: '13px', color: 'var(--accent-red)', fontWeight: '700' }}>
                Pátio JTF CAR • Aracaju / Sergipe
              </span>
            </div>
            <h1 style={{ fontSize: '32px', color: 'var(--text-primary)', marginBottom: '8px' }}>
              Consulta de Disponibilidade da Frota em Tempo Real
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px', maxWidth: '720px' }}>
              Verifique quais carros estão liberados para <strong>retirada imediata hoje</strong> no pátio ou consulte a previsão de retorno dos veículos locados para motoristas de app e particulares.
            </p>
          </div>

          {/* Availability Status Counters */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <div style={{
              background: '#ffffff',
              border: '1px solid #a7f3d0',
              borderRadius: 'var(--radius-md)',
              padding: '14px 20px',
              boxShadow: 'var(--shadow-xs)',
              textAlign: 'center',
              minWidth: '120px'
            }}>
              <span style={{ fontSize: '11px', color: '#047857', fontWeight: '800', textTransform: 'uppercase', display: 'block' }}>
                Disponíveis Hoje
              </span>
              <strong style={{ fontSize: '28px', color: '#059669', lineHeight: '1.2' }}>{availableCount}</strong>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>No pátio</span>
            </div>

            <div style={{
              background: '#ffffff',
              border: '1px solid #bfdbfe',
              borderRadius: 'var(--radius-md)',
              padding: '14px 20px',
              boxShadow: 'var(--shadow-xs)',
              textAlign: 'center',
              minWidth: '120px'
            }}>
              <span style={{ fontSize: '11px', color: '#1d4ed8', fontWeight: '800', textTransform: 'uppercase', display: 'block' }}>
                Locados na Rua
              </span>
              <strong style={{ fontSize: '28px', color: '#2563eb', lineHeight: '1.2' }}>{rentedCount}</strong>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Em contrato</span>
            </div>

            <div style={{
              background: '#ffffff',
              border: '1px solid #fde68a',
              borderRadius: 'var(--radius-md)',
              padding: '14px 20px',
              boxShadow: 'var(--shadow-xs)',
              textAlign: 'center',
              minWidth: '120px'
            }}>
              <span style={{ fontSize: '11px', color: '#b45309', fontWeight: '800', textTransform: 'uppercase', display: 'block' }}>
                Oficina / Revisão
              </span>
              <strong style={{ fontSize: '28px', color: '#d97706', lineHeight: '1.2' }}>{maintenanceCount}</strong>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Preparação</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div style={{
        background: '#ffffff',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: '24px',
        marginBottom: '32px',
        boxShadow: 'var(--shadow-xs)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          alignItems: 'center'
        }}>
          {/* Text Search */}
          <div style={{ position: 'relative' }}>
            <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
              Buscar por Modelo ou Placa
            </label>
            <div style={{ display: 'flex', alignItems: 'center', background: '#f8fafc', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '0 12px' }}>
              <Search size={16} color="var(--text-muted)" />
              <input 
                type="text"
                placeholder="Ex: BYD, HB20, Yaris, SE-EV..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 10px',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: '14px',
                  color: 'var(--text-primary)'
                }}
              />
            </div>
          </div>

          {/* Status Select */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
              Situação do Veículo
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '11px 12px',
                background: '#f8fafc',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '14px',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            >
              <option value="all">Todos os Status ({fleet.length})</option>
              <option value="disponivel">🟢 Disponível Imediato no Pátio ({availableCount})</option>
              <option value="locado">🔵 Em Locação Ativa ({rentedCount})</option>
              <option value="oficina">🟠 Em Manutenção / Revisão ({maintenanceCount})</option>
            </select>
          </div>

          {/* Category Select */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
              Tipo de Motorização
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '11px 12px',
                background: '#f8fafc',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '14px',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            >
              <option value="all">Todas as Motorizações</option>
              <option value="eletrico">⚡ 100% Elétricos (BYD)</option>
              <option value="combustao">⛽ Combustão Flex (HB20, Yaris, Onix)</option>
            </select>
          </div>

          {/* Target Pickup Date */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
              Pretende retirar em qual data?
            </label>
            <div style={{ display: 'flex', alignItems: 'center', background: '#f8fafc', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '0 12px' }}>
              <Calendar size={16} color="var(--text-muted)" />
              <input 
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 10px',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: '13px',
                  color: 'var(--text-primary)'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results Grid - Spacious & Clean */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
        gap: '32px'
      }}>
        {filteredFleet.map(car => {
          const badge = getStatusBadge(car.status);
          const BadgeIcon = badge.icon;
          const isAvailable = car.status === 'disponivel';

          return (
            <div 
              key={car.id}
              className="surface-card"
              style={{
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                border: isAvailable ? '2px solid #a7f3d0' : '1px solid var(--border-color)',
                boxShadow: isAvailable ? '0 8px 30px -4px rgba(5, 150, 105, 0.12)' : 'var(--shadow-sm)'
              }}
            >
              {/* Vehicle Image with Tag */}
              <div style={{ position: 'relative', height: '220px', background: '#f1f5f9' }}>
                <img 
                  src={car.image} 
                  alt={car.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                
                {/* Placa & Categoria Badge */}
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  display: 'flex',
                  gap: '8px'
                }}>
                  <span style={{
                    background: 'rgba(15, 23, 42, 0.85)',
                    backdropFilter: 'blur(6px)',
                    color: '#fff',
                    fontSize: '11px',
                    fontWeight: '800',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-xs)',
                    letterSpacing: '0.5px'
                  }}>
                    {car.plate}
                  </span>

                  <span style={{
                    background: car.category === 'eletrico' ? '#059669' : '#dc2626',
                    color: '#fff',
                    fontSize: '11px',
                    fontWeight: '800',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)'
                  }}>
                    {car.categoryLabel}
                  </span>
                </div>
              </div>

              {/* Status Header Box */}
              <div style={{
                background: badge.bg,
                borderBottom: `1px solid ${badge.border}`,
                padding: '14px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
                }}>
                  <BadgeIcon size={18} color={badge.text} />
                </div>
                <div>
                  <strong style={{ fontSize: '14px', color: badge.text, display: 'block' }}>
                    {badge.label}
                  </strong>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {car.expectedReturnDate}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '21px', color: 'var(--text-primary)', marginBottom: '6px' }}>
                  {car.name}
                </h3>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px', display: 'block' }}>
                  Ano/Modelo: <strong>{car.year}</strong> • {car.batteryOrFuel}
                </span>

                {/* Specs Pill Box */}
                <div style={{
                  background: '#f8fafc',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '14px',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '10px',
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  marginBottom: '24px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {car.category === 'eletrico' ? <Zap size={15} color="#059669" /> : <Fuel size={15} color="#dc2626" />}
                    <span>{car.specs.motor}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>⚡ {car.specs.autonomy || car.specs.consumption}</span>
                  </div>
                  <div>
                    <span>🚪 {car.specs.doors} Portas</span>
                  </div>
                  <div>
                    <span>🎒 {car.specs.luggage}</span>
                  </div>
                </div>

                {/* Pricing Box */}
                <div style={{
                  borderTop: '1px solid var(--border-color)',
                  paddingTop: '18px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  marginBottom: '24px'
                }}>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>Plano Semanal</span>
                    <div style={{ fontSize: '26px', fontWeight: '900', color: 'var(--text-primary)', lineHeight: '1.1' }}>
                      R$ {car.weeklyPrice}
                      <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-muted)' }}>/semana</span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Caução Pix</span>
                    <strong style={{ fontSize: '16px', color: '#059669' }}>
                      R$ {car.deposit.toLocaleString('pt-BR')}
                    </strong>
                  </div>
                </div>

                {/* Action CTA */}
                {isAvailable ? (
                  <button
                    onClick={() => onSelectCarForBooking(car)}
                    style={{
                      width: '100%',
                      padding: '15px',
                      borderRadius: 'var(--radius-md)',
                      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                      color: '#ffffff',
                      fontWeight: '800',
                      fontSize: '15px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: 'var(--shadow-green)',
                      transition: 'transform 0.2s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    Garantir Retirada Imediata Hoje
                    <ArrowRight size={17} />
                  </button>
                ) : (
                  <button
                    onClick={() => onSelectCarForBooking(car)}
                    style={{
                      width: '100%',
                      padding: '15px',
                      borderRadius: 'var(--radius-md)',
                      background: '#ffffff',
                      border: '2px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      fontWeight: '700',
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = 'var(--text-primary)';
                      e.currentTarget.style.background = '#f8fafc';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                      e.currentTarget.style.background = '#ffffff';
                    }}
                  >
                    Reservar Próxima Liberação
                    <ArrowRight size={15} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredFleet.length === 0 && (
        <div style={{
          background: '#ffffff',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '48px',
          textAlign: 'center',
          color: 'var(--text-secondary)'
        }}>
          <Car size={40} color="var(--text-muted)" style={{ margin: '0 auto 12px' }} />
          <h4 style={{ fontSize: '18px', color: 'var(--text-primary)', marginBottom: '6px' }}>Nenhum veículo encontrado com esses filtros</h4>
          <p style={{ fontSize: '14px' }}>Tente selecionar "Todos os Status" ou limpar os termos da busca.</p>
        </div>
      )}
    </div>
  );
}
