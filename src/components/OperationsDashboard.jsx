import React, { useState } from 'react';
import { 
  Car, Plus, Users, FileCheck, MessageSquare, AlertOctagon, 
  CheckCircle2, XCircle, Wrench, Sparkles, Clock, RefreshCw, 
  Search, Filter, ChevronRight, Edit3, Trash2, Camera, Send, 
  DollarSign, Shield, AlertTriangle, Eye, Check, X 
} from 'lucide-react';

export default function OperationsDashboard({ fleet, setFleet, submittedLeads = [] }) {
  const [activeTab, setActiveTab] = useState('fleet_control'); // 'fleet_control' | 'odometer' | 'leads' | 'contracts' | 'whatsapp'
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchCarQuery, setSearchCarQuery] = useState('');

  // Leads
  const [leads, setLeads] = useState(submittedLeads);

  // New Car Modal
  const [isAddCarModalOpen, setIsAddCarModalOpen] = useState(false);
  const [newCarForm, setNewCarForm] = useState({
    name: '',
    plate: '',
    renavam: '',
    chassi: '',
    year: '2024/2025',
    category: 'combustao',
    weeklyPrice: '680',
    deposit: '1100',
    currentKm: '15000',
    nextRevisionKm: '20000',
    status: 'disponivel',
    batteryOrFuel: 'Tanque Cheio'
  });

  // Odometer Simulator
  const [selectedCarForCheckin, setSelectedCarForCheckin] = useState(fleet[0] || null);
  const [simulatedKmInput, setSimulatedKmInput] = useState('');

  // Contract & Inspection State
  const [contractGenerated, setContractGenerated] = useState(false);
  const [clientSignature, setClientSignature] = useState(false);
  const [dispatchedMessages, setDispatchedMessages] = useState([]);

  // Stats calculation
  const totalFleet = fleet.length;
  const availableCars = fleet.filter(c => c.status === 'disponivel');
  const rentedCars = fleet.filter(c => c.status === 'locado');
  const maintenanceCars = fleet.filter(c => c.status === 'manutencao');
  const postReturnCars = fleet.filter(c => c.status === 'revisao_pos_devolucao');
  const criticalOdometerCars = fleet.filter(c => c.kmRemaining <= 500);

  // Filtered cars for table
  const displayedFleet = fleet.filter(car => {
    if (statusFilter !== 'all' && car.status !== statusFilter) return false;
    if (searchCarQuery.trim() !== '') {
      const q = searchCarQuery.toLowerCase();
      return (
        car.name.toLowerCase().includes(q) ||
        car.plate.toLowerCase().includes(q) ||
        (car.currentDriver && car.currentDriver.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleUpdateCarStatus = (carId, newStatus) => {
    const statusLabels = {
      disponivel: 'Disponível no Pátio',
      locado: 'Locado',
      manutencao: 'Em Manutenção',
      revisao_pos_devolucao: 'Revisão Pós-Devolução'
    };
    setFleet(prev => prev.map(c => {
      if (c.id === carId) {
        return {
          ...c,
          status: newStatus,
          statusLabel: statusLabels[newStatus],
          expectedReturnDate: newStatus === 'disponivel' 
            ? 'Disponível para Retirada Hoje' 
            : newStatus === 'locado' 
            ? 'Locação Ativa' 
            : newStatus === 'manutencao' 
            ? 'Em Oficina Credenciada' 
            : 'Higienização e Checklist Técnico'
        };
      }
      return c;
    }));
  };

  const handleCreateCarSubmit = (e) => {
    e.preventDefault();
    if (!newCarForm.name || !newCarForm.plate) return;

    const newVehicle = {
      id: `car-${Date.now()}`,
      name: newCarForm.name,
      plate: newCarForm.plate.toUpperCase(),
      renavam: newCarForm.renavam || '01239847192',
      chassi: newCarForm.chassi || '9BGDK192083MA001',
      year: newCarForm.year,
      category: newCarForm.category,
      categoryLabel: newCarForm.category === 'eletrico' ? '100% Elétrico' : 'Combustão Flex',
      badgeColor: newCarForm.category === 'eletrico' ? '#059669' : '#dc2626',
      image: newCarForm.category === 'eletrico' ? '/assets/byd_dolphin_mini.jpg' : '/assets/hyundai_hb20.jpg',
      tag: 'NOVA AQUISIÇÃO JTF CAR',
      isTopDemand: false,
      status: newCarForm.status,
      statusLabel: newCarForm.status === 'disponivel' ? 'Disponível no Pátio' : 'Locado',
      currentDriver: newCarForm.status === 'locado' ? 'Aguardando Motorista' : null,
      driverPhone: null,
      rentedSince: null,
      expectedReturnDate: newCarForm.status === 'disponivel' ? 'Disponível para Retirada Hoje' : 'Em Preparação',
      weeklyPrice: Number(newCarForm.weeklyPrice) || 680,
      dailyPrice: Math.round((Number(newCarForm.weeklyPrice) || 680) / 5),
      deposit: Number(newCarForm.deposit) || 1000,
      currentKm: Number(newCarForm.currentKm) || 10000,
      nextRevisionKm: Number(newCarForm.nextRevisionKm) || 20000,
      kmRemaining: (Number(newCarForm.nextRevisionKm) || 20000) - (Number(newCarForm.currentKm) || 10000),
      dueDay: 'Segunda-feira',
      paymentStatus: 'Livre',
      batteryOrFuel: newCarForm.batteryOrFuel,
      specs: {
        motor: newCarForm.category === 'eletrico' ? 'Elétrico 75cv' : '1.0 Flex',
        consumption: newCarForm.category === 'eletrico' ? '280 km autonomia' : '14.0 km/l',
        transmission: 'Manual',
        ac: 'Ar Condicionado',
        doors: 4,
        luggage: '350 Litros',
        multimedia: 'Central Multimídia',
        safety: 'Airbags + Freios ABS'
      },
      advantages: [
        'Cadastrado no sistema JTF CAR',
        'Revisão preventiva em dia',
        'Liberado para Uber e 99'
      ]
    };

    setFleet([newVehicle, ...fleet]);
    setIsAddCarModalOpen(false);
    setNewCarForm({
      name: '',
      plate: '',
      renavam: '',
      chassi: '',
      year: '2024/2025',
      category: 'combustao',
      weeklyPrice: '680',
      deposit: '1100',
      currentKm: '15000',
      nextRevisionKm: '20000',
      status: 'disponivel',
      batteryOrFuel: 'Tanque Cheio'
    });
  };

  const handleSimulateOdometerSubmit = (carId, newKm) => {
    if (!newKm) return;
    const kmNum = Number(newKm);
    setFleet(prev => prev.map(c => {
      if (c.id === carId) {
        const remaining = c.nextRevisionKm - kmNum;
        return {
          ...c,
          currentKm: kmNum,
          kmRemaining: remaining
        };
      }
      return c;
    }));
    setSimulatedKmInput('');
  };

  const handleDispatchPix = (car) => {
    const msg = `WhatsApp enviado para ${car.currentDriver} com Pix Copia e Cola da semana (R$ ${car.weeklyPrice},00) para ${car.plate}.`;
    setDispatchedMessages(prev => [msg, ...prev]);
  };

  return (
    <div className="animate-fade-in" style={{ padding: '20px 0 60px' }}>
      {/* Top Header Card */}
      <div style={{
        background: '#ffffff',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '36px',
        marginBottom: '32px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '4px 12px', borderRadius: 'var(--radius-full)', marginBottom: '10px' }}>
              <Shield size={14} color="#059669" />
              <span style={{ fontSize: '12px', color: '#047857', fontWeight: '800', textTransform: 'uppercase' }}>
                Sistema Operacional Interno • JTF CAR
              </span>
            </div>
            <h1 style={{ fontSize: '32px', color: 'var(--text-primary)', marginBottom: '6px' }}>
              Painel de Gestão e Controle da Frota
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
              Gerencie a disponibilidade, contratos, vistorias fotográficas e a manutenção preventiva de todos os veículos.
            </p>
          </div>

          <button
            onClick={() => setIsAddCarModalOpen(true)}
            style={{
              background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
              color: '#ffffff',
              fontWeight: '800',
              fontSize: '15px',
              padding: '16px 28px',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: 'var(--shadow-red)',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <Plus size={20} />
            Cadastrar Novo Carro na Frota
          </button>
        </div>

        {/* Global Fleet Metrics Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          marginTop: '32px'
        }}>
          {/* Total Frota */}
          <div style={{ background: '#f8fafc', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '20px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', display: 'block' }}>
              Total de Carros
            </span>
            <strong style={{ fontSize: '32px', color: 'var(--text-primary)', display: 'block', margin: '4px 0' }}>
              {totalFleet}
            </strong>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Veículos na base</span>
          </div>

          {/* Disponíveis */}
          <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 'var(--radius-md)', padding: '20px' }}>
            <span style={{ fontSize: '12px', color: '#047857', fontWeight: '800', textTransform: 'uppercase', display: 'block' }}>
              Disponíveis no Pátio
            </span>
            <strong style={{ fontSize: '32px', color: '#059669', display: 'block', margin: '4px 0' }}>
              {availableCars.length}
            </strong>
            <span style={{ fontSize: '12px', color: '#047857' }}>Prontos para locação</span>
          </div>

          {/* Locados */}
          <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 'var(--radius-md)', padding: '20px' }}>
            <span style={{ fontSize: '12px', color: '#1d4ed8', fontWeight: '800', textTransform: 'uppercase', display: 'block' }}>
              Locados na Rua
            </span>
            <strong style={{ fontSize: '32px', color: '#2563eb', display: 'block', margin: '4px 0' }}>
              {rentedCars.length}
            </strong>
            <span style={{ fontSize: '12px', color: '#1d4ed8' }}>Gerando receita semanal</span>
          </div>

          {/* Manutenção */}
          <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 'var(--radius-md)', padding: '20px' }}>
            <span style={{ fontSize: '12px', color: '#b45309', fontWeight: '800', textTransform: 'uppercase', display: 'block' }}>
              Em Manutenção
            </span>
            <strong style={{ fontSize: '32px', color: '#d97706', display: 'block', margin: '4px 0' }}>
              {maintenanceCars.length}
            </strong>
            <span style={{ fontSize: '12px', color: '#b45309' }}>Oficina credenciada</span>
          </div>

          {/* Revisão Pós Devolução */}
          <div style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', borderRadius: 'var(--radius-md)', padding: '20px' }}>
            <span style={{ fontSize: '12px', color: '#6d28d9', fontWeight: '800', textTransform: 'uppercase', display: 'block' }}>
              Pós-Devolução
            </span>
            <strong style={{ fontSize: '32px', color: '#7c3aed', display: 'block', margin: '4px 0' }}>
              {postReturnCars.length}
            </strong>
            <span style={{ fontSize: '12px', color: '#6d28d9' }}>Higienização & Checklist</span>
          </div>

          {/* Alertas Críticos */}
          <div style={{ background: '#fef2f2', border: '2px solid #fecaca', borderRadius: 'var(--radius-md)', padding: '20px' }}>
            <span style={{ fontSize: '12px', color: '#dc2626', fontWeight: '800', textTransform: 'uppercase', display: 'block' }}>
              Revisão Crítica (&lt;500km)
            </span>
            <strong style={{ fontSize: '32px', color: '#dc2626', display: 'block', margin: '4px 0' }}>
              {criticalOdometerCars.length}
            </strong>
            <span style={{ fontSize: '12px', color: '#dc2626', fontWeight: '700' }}>Alerta Vermelho Troca de Óleo</span>
          </div>
        </div>
      </div>

      {/* Main Operations Navigation Tabs - Spacious */}
      <div style={{
        display: 'flex',
        gap: '12px',
        overflowX: 'auto',
        paddingBottom: '8px',
        marginBottom: '28px'
      }}>
        {[
          { id: 'fleet_control', label: '1. Controle da Frota & Status', icon: Car, count: fleet.length },
          { id: 'odometer', label: '2. Guardião do Motor (Odômetro)', icon: AlertOctagon, count: criticalOdometerCars.length, highlight: criticalOdometerCars.length > 0 },
          { id: 'leads', label: '3. Fila Anti-Curioso', icon: Users, count: leads.length },
          { id: 'contracts', label: '4. Contrato & Vistoria 6 Fotos', icon: FileCheck },
          { id: 'whatsapp', label: '5. Régua WhatsApp Semanal', icon: MessageSquare }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '14px 22px',
                borderRadius: 'var(--radius-md)',
                background: isActive ? '#0f172a' : '#ffffff',
                color: isActive ? '#ffffff' : 'var(--text-secondary)',
                border: isActive ? '1px solid #0f172a' : '1px solid var(--border-color)',
                fontWeight: '700',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s'
              }}
            >
              <Icon size={18} color={isActive ? (tab.highlight ? '#f87171' : '#38bdf8') : (tab.highlight ? '#dc2626' : 'var(--text-muted)')} />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span style={{
                  fontSize: '11px',
                  fontWeight: '800',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-full)',
                  background: isActive ? 'rgba(255, 255, 255, 0.2)' : tab.highlight ? '#fef2f2' : '#f1f5f9',
                  color: isActive ? '#fff' : tab.highlight ? '#dc2626' : 'var(--text-primary)'
                }}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: CONTROLE DA FROTA & STATUS */}
      {activeTab === 'fleet_control' && (
        <div className="animate-fade-in">
          {/* Controls & Filter Bar */}
          <div style={{
            background: '#ffffff',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '20px 24px',
            marginBottom: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            {/* Status Filter Buttons */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[
                { id: 'all', label: 'Todos os Status' },
                { id: 'disponivel', label: '🟢 Disponível' },
                { id: 'locado', label: '🔵 Locado' },
                { id: 'manutencao', label: '🟠 Em Manutenção' },
                { id: 'revisao_pos_devolucao', label: '🟣 Pós-Devolução' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setStatusFilter(item.id)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '13px',
                    fontWeight: '700',
                    background: statusFilter === item.id ? '#0f172a' : '#f8fafc',
                    color: statusFilter === item.id ? '#ffffff' : 'var(--text-secondary)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Quick search input */}
            <div style={{ display: 'flex', alignItems: 'center', background: '#f8fafc', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '0 12px', minWidth: '280px' }}>
              <Search size={16} color="var(--text-muted)" />
              <input 
                type="text"
                placeholder="Buscar por placa, modelo ou motorista..."
                value={searchCarQuery}
                onChange={(e) => setSearchCarQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 10px',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: '13px'
                }}
              />
            </div>
          </div>

          {/* Spacious Fleet Cards Table */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {displayedFleet.map(car => {
              const isDangerKm = car.kmRemaining <= 500;

              return (
                <div 
                  key={car.id}
                  style={{
                    background: '#ffffff',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '24px',
                    boxShadow: 'var(--shadow-xs)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '20px'
                  }}
                >
                  {/* Vehicle Identity */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', minWidth: '320px' }}>
                    <img 
                      src={car.image} 
                      alt={car.name}
                      style={{
                        width: '90px',
                        height: '60px',
                        objectFit: 'cover',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-color)'
                      }}
                    />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                        <strong style={{ fontSize: '18px', color: 'var(--text-primary)' }}>{car.name}</strong>
                        <span style={{
                          background: '#0f172a',
                          color: '#fff',
                          fontSize: '11px',
                          fontWeight: '800',
                          padding: '2px 8px',
                          borderRadius: '4px'
                        }}>
                          {car.plate}
                        </span>
                      </div>
                      <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                        {car.categoryLabel} • Ano {car.year} • {car.batteryOrFuel}
                      </span>
                    </div>
                  </div>

                  {/* Motorista & Contrato Info */}
                  <div style={{ minWidth: '220px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', display: 'block' }}>
                      Condutor Atual
                    </span>
                    <strong style={{ fontSize: '14px', color: car.currentDriver ? 'var(--text-primary)' : '#059669', display: 'block' }}>
                      {car.currentDriver || 'Veículo no Pátio (Livre)'}
                    </strong>
                    {car.driverPhone && (
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        Tel: {car.driverPhone}
                      </span>
                    )}
                  </div>

                  {/* Km & Revisão Info */}
                  <div style={{ minWidth: '180px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', display: 'block' }}>
                      Odômetro & Revisão
                    </span>
                    <strong style={{ fontSize: '14px', color: isDangerKm ? '#dc2626' : 'var(--text-primary)' }}>
                      {car.currentKm.toLocaleString()} km
                    </strong>
                    <div style={{ fontSize: '12px', color: isDangerKm ? '#dc2626' : '#059669', fontWeight: '700' }}>
                      {isDangerKm ? `🚨 Faltam ${car.kmRemaining} km!` : `Faltam ${car.kmRemaining.toLocaleString()} km`}
                    </div>
                  </div>

                  {/* Pricing Info */}
                  <div style={{ minWidth: '140px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', display: 'block' }}>
                      Valor Semanal
                    </span>
                    <strong style={{ fontSize: '16px', color: 'var(--text-primary)' }}>
                      R$ {car.weeklyPrice}
                    </strong>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>
                      Caução: R$ {car.deposit}
                    </span>
                  </div>

                  {/* Status Change Dropdown */}
                  <div style={{ minWidth: '200px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                      Alterar Status
                    </span>
                    <select
                      value={car.status}
                      onChange={(e) => handleUpdateCarStatus(car.id, e.target.value)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '13px',
                        fontWeight: '700',
                        outline: 'none',
                        cursor: 'pointer',
                        border: '1px solid var(--border-color)',
                        background: 
                          car.status === 'disponivel' ? '#ecfdf5' :
                          car.status === 'locado' ? '#eff6ff' :
                          car.status === 'manutencao' ? '#fffbeb' : '#f5f3ff',
                        color:
                          car.status === 'disponivel' ? '#047857' :
                          car.status === 'locado' ? '#1d4ed8' :
                          car.status === 'manutencao' ? '#b45309' : '#6d28d9'
                      }}
                    >
                      <option value="disponivel">🟢 Disponível no Pátio</option>
                      <option value="locado">🔵 Locado</option>
                      <option value="manutencao">🟠 Em Manutenção</option>
                      <option value="revisao_pos_devolucao">🟣 Revisão Pós-Devolução</option>
                    </select>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: GUARDIAO DO MOTOR (ODOMETRO) */}
      {activeTab === 'odometer' && (
        <div className="animate-fade-in">
          <div style={{
            background: '#fef2f2',
            border: '2px solid #fecaca',
            borderRadius: 'var(--radius-md)',
            padding: '24px',
            marginBottom: '28px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <AlertOctagon size={24} color="#dc2626" />
              <h3 style={{ fontSize: '20px', color: '#991b1b' }}>
                Módulo Guardião do Motor: Prevenção de R$ 15.000 em Quebras
              </h3>
            </div>
            <p style={{ color: '#7f1d1d', fontSize: '14px', maxWidth: '820px', lineHeight: '1.5' }}>
              Motoristas de aplicativo em Aracaju rodam de 5.000 a 7.000 km por mês. Quando faltam <strong>menos de 500 km para o limite da revisão (a cada 10.000 km)</strong>, o sistema emite um alerta vermelho imediato para você convocar o motorista e não perder a garantia de fábrica do motor.
            </p>
          </div>

          {/* Odometer Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            {fleet.map(car => {
              const isDanger = car.kmRemaining <= 500;
              const progressPct = Math.min(100, Math.round(((car.currentKm % 10000) / 10000) * 100));

              return (
                <div 
                  key={car.id}
                  style={{
                    background: '#ffffff',
                    border: isDanger ? '2px solid #dc2626' : '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '24px',
                    boxShadow: isDanger ? 'var(--shadow-red)' : 'var(--shadow-xs)',
                    position: 'relative'
                  }}
                >
                  {isDanger && (
                    <span style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      background: '#dc2626',
                      color: '#fff',
                      fontSize: '11px',
                      fontWeight: '800',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)'
                    }}>
                      🚨 TROCA DE ÓLEO URGENTE ({car.kmRemaining} km)
                    </span>
                  )}

                  <h4 style={{ fontSize: '18px', color: 'var(--text-primary)', marginBottom: '4px' }}>
                    {car.name}
                  </h4>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                    Placa: <strong>{car.plate}</strong> • Condutor: {car.currentDriver || 'Disponível no pátio'}
                  </div>

                  <div style={{
                    background: '#f8fafc',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '16px'
                  }}>
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>KM Atual</span>
                      <strong style={{ fontSize: '17px', color: isDanger ? '#dc2626' : 'var(--text-primary)' }}>
                        {car.currentKm.toLocaleString()} km
                      </strong>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Limite da Revisão</span>
                      <strong style={{ fontSize: '17px', color: '#059669' }}>
                        {car.nextRevisionKm.toLocaleString()} km
                      </strong>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Desgaste do ciclo de óleo</span>
                      <strong style={{ color: isDanger ? '#dc2626' : '#059669' }}>
                        {car.kmRemaining} km restantes
                      </strong>
                    </div>
                    <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        width: `${progressPct}%`,
                        background: isDanger ? '#dc2626' : '#059669'
                      }} />
                    </div>
                  </div>

                  {isDanger && car.driverPhone ? (
                    <a
                      href={`https://wa.me/55${car.driverPhone.replace(/\D/g, '')}?text=Olá ${car.currentDriver}! O sistema da JTF CAR detectou que seu veículo ${car.name} (${car.plate}) atingiu ${car.currentKm} km. Faltam apenas ${car.kmRemaining} km para a revisão e troca de óleo preventiva. Favor comparecer à oficina parceira em Aracaju para manter a garantia do carro!`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: '#dc2626',
                        color: '#fff',
                        fontSize: '13px',
                        fontWeight: '700',
                        padding: '12px',
                        borderRadius: 'var(--radius-sm)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        textDecoration: 'none'
                      }}
                    >
                      <Send size={15} /> Chamar Motorista no WhatsApp para Revisão
                    </a>
                  ) : (
                    <div style={{ fontSize: '12px', color: '#059669', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle2 size={16} /> Motor protegido. Próxima leitura em 7 dias.
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Simulator for check-in */}
          <div style={{
            background: '#ffffff',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '24px'
          }}>
            <h4 style={{ fontSize: '16px', color: 'var(--text-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Camera size={18} color="var(--accent-red)" />
              Simular Motorista Enviando Foto do Painel e Novo Odômetro:
            </h4>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
              <select
                value={selectedCarForCheckin ? selectedCarForCheckin.id : ''}
                onChange={(e) => setSelectedCarForCheckin(fleet.find(c => c.id === e.target.value))}
                style={{
                  padding: '12px 14px',
                  background: '#f8fafc',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '14px',
                  minWidth: '280px'
                }}
              >
                {fleet.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} - {c.plate} ({c.currentDriver || 'Pátio'})
                  </option>
                ))}
              </select>

              <input 
                type="number"
                placeholder="Novo KM (Ex: 49700)"
                value={simulatedKmInput}
                onChange={(e) => setSimulatedKmInput(e.target.value)}
                style={{
                  padding: '12px 14px',
                  background: '#f8fafc',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '14px',
                  width: '180px'
                }}
              />

              <button
                onClick={() => selectedCarForCheckin && handleSimulateOdometerSubmit(selectedCarForCheckin.id, simulatedKmInput)}
                style={{
                  background: '#059669',
                  color: '#fff',
                  fontWeight: '700',
                  padding: '12px 20px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <RefreshCw size={16} /> Salvar Foto e Atualizar Odômetro
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: FILA ANTI-CURIOSO */}
      {activeTab === 'leads' && (
        <div className="animate-fade-in">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '20px', color: 'var(--text-primary)' }}>
                Fichas Pré-Aprovadas pelo Funil da Bio ({leads.length})
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                Chegam mastigadas com fotos de CNH, EAR marcado e Caução Pix confirmada.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
            {leads.map(lead => (
              <div 
                key={lead.id}
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '24px',
                  boxShadow: 'var(--shadow-xs)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <div>
                    <h4 style={{ fontSize: '18px', color: 'var(--text-primary)' }}>{lead.name}</h4>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      {lead.city} • {lead.submittedAt}
                    </span>
                  </div>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: '800',
                    padding: '3px 10px',
                    borderRadius: 'var(--radius-full)',
                    background: lead.status === 'Aprovado' ? '#ecfdf5' : lead.status === 'Recusado' ? '#fef2f2' : '#fffbeb',
                    color: lead.status === 'Aprovado' ? '#047857' : lead.status === 'Recusado' ? '#b91c1c' : '#b45309'
                  }}>
                    {lead.status}
                  </span>
                </div>

                <div style={{
                  background: '#f8fafc',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '14px',
                  fontSize: '13px',
                  marginBottom: '16px',
                  lineHeight: '1.7'
                }}>
                  <div>🚗 <strong>Veículo Solicitado:</strong> {lead.carPreference}</div>
                  <div>🎯 <strong>Finalidade:</strong> {lead.intendedUse}</div>
                  <div>🪪 <strong>CNH:</strong> {lead.cnhCategory}</div>
                  <div>⭐ <strong>Avaliação:</strong> {lead.appScore}</div>
                  <div>💰 <strong>Caução Pix:</strong> <strong style={{ color: '#059669' }}>Disponível</strong></div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => setLeads(leads.map(l => l.id === lead.id ? { ...l, status: 'Aprovado' } : l))}
                    style={{
                      flex: 1,
                      background: '#ecfdf5',
                      border: '1px solid #a7f3d0',
                      color: '#047857',
                      padding: '10px',
                      borderRadius: 'var(--radius-sm)',
                      fontWeight: '700',
                      fontSize: '13px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <CheckCircle2 size={16} /> Aprovar Ficha
                  </button>

                  <button
                    onClick={() => setLeads(leads.map(l => l.id === lead.id ? { ...l, status: 'Recusado' } : l))}
                    style={{
                      background: '#fef2f2',
                      border: '1px solid #fecaca',
                      color: '#dc2626',
                      padding: '10px 16px',
                      borderRadius: 'var(--radius-sm)',
                      fontWeight: '600',
                      fontSize: '13px'
                    }}
                  >
                    Recusar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: CONTRATO & VISTORIA 6 FOTOS */}
      {activeTab === 'contracts' && (
        <div className="animate-fade-in">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '28px' }}>
            {/* Gerador de Contrato */}
            <div style={{
              background: '#ffffff',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '28px',
              boxShadow: 'var(--shadow-xs)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <FileCheck size={22} color="var(--accent-red)" />
                <h3 style={{ fontSize: '18px', color: 'var(--text-primary)' }}>Gerador de Contrato em 1 Clique</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '20px' }}>
                Geração automática puxando cliente, veículo, caução e cláusula de responsabilidade de multas.
              </p>

              <div style={{
                background: '#f8fafc',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: '16px',
                fontSize: '13px',
                color: 'var(--text-secondary)',
                marginBottom: '20px',
                lineHeight: '1.6'
              }}>
                <div style={{ fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px' }}>CONTRATO DIGITAL #JTF-2026-102</div>
                <div><strong>LOCADORA:</strong> JTF CAR LOCAÇÕES LTDA (Aracaju/SE)</div>
                <div><strong>LOCATÁRIO:</strong> Carlos Eduardo Ferreira</div>
                <div><strong>VEÍCULO:</strong> BYD Dolphin Mini (Placa SE-EV-2024)</div>
                <div><strong>VALOR SEMANAL:</strong> R$ 850,00 | <strong>CAUÇÃO PIX:</strong> R$ 1.500,00</div>
                <div style={{ color: '#059669', fontWeight: '700', marginTop: '6px' }}>✓ Cláusula 8: Termo de Responsabilidade por Multas Anexo</div>
              </div>

              <button
                onClick={() => setContractGenerated(true)}
                style={{
                  width: '100%',
                  background: 'var(--accent-red)',
                  color: '#fff',
                  padding: '14px',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: '700',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Check size={18} /> {contractGenerated ? 'Contrato Gerado com Sucesso' : 'Gerar Contrato Pronto para Assinatura'}
              </button>
            </div>

            {/* Vistoria Digital 6 fotos */}
            <div style={{
              background: '#ffffff',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '28px',
              boxShadow: 'var(--shadow-xs)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <Camera size={22} color="#059669" />
                <h3 style={{ fontSize: '18px', color: 'var(--text-primary)' }}>Vistoria Digital no Pátio (Celular)</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '20px' }}>
                6 fotos obrigatórias no momento da entrega da chave. Fica tudo salvo no contrato.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
                {[
                  '1. Frente / Para-choque',
                  '2. Traseira / Lanternas',
                  '3. Lateral Direita',
                  '4. Lateral Esquerda',
                  '5. Estepe e Ferramentas',
                  '6. Painel (KM e Combustível)'
                ].map((item, idx) => (
                  <div key={idx} style={{
                    background: '#ecfdf5',
                    border: '1px solid #a7f3d0',
                    borderRadius: 'var(--radius-sm)',
                    padding: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '12px',
                    color: '#047857',
                    fontWeight: '700'
                  }}>
                    <CheckCircle2 size={16} color="#059669" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Touch Signature */}
              <div style={{
                border: '2px dashed var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: '16px',
                textAlign: 'center',
                marginBottom: '16px',
                background: clientSignature ? '#ecfdf5' : '#f8fafc',
                cursor: 'pointer'
              }}
              onClick={() => setClientSignature(true)}
              >
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                  Assinatura Digital do Motorista na Tela
                </span>
                {clientSignature ? (
                  <strong style={{ fontFamily: 'cursive', fontSize: '24px', color: '#059669' }}>Carlos E. Ferreira</strong>
                ) : (
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Clique aqui para assinar digitalmente</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: REGUA WHATSAPP */}
      {activeTab === 'whatsapp' && (
        <div className="animate-fade-in">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '20px', color: 'var(--text-primary)' }}>Régua Semanal de Cobrança Automática</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                Envio programado aos domingos com Chave Pix Copia e Cola para pontualidade de caixa.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px', marginBottom: '24px' }}>
            {rentedCars.map(car => (
              <div 
                key={car.id}
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '24px',
                  boxShadow: 'var(--shadow-xs)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div>
                    <strong style={{ fontSize: '16px', color: 'var(--text-primary)', display: 'block' }}>
                      {car.currentDriver}
                    </strong>
                    <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                      {car.name} ({car.plate})
                    </span>
                  </div>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: '800',
                    padding: '3px 10px',
                    borderRadius: 'var(--radius-full)',
                    background: car.paymentStatus === 'Pago' ? '#ecfdf5' : '#fef2f2',
                    color: car.paymentStatus === 'Pago' ? '#047857' : '#dc2626'
                  }}>
                    {car.paymentStatus}
                  </span>
                </div>

                <div style={{ fontSize: '14px', color: 'var(--text-primary)', marginBottom: '16px' }}>
                  Vence: <strong>{car.dueDay}</strong> • Valor da Semana: <strong style={{ color: '#059669' }}>R$ {car.weeklyPrice},00</strong>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => handleDispatchPix(car)}
                    style={{
                      flex: 1,
                      background: '#ecfdf5',
                      border: '1px solid #a7f3d0',
                      color: '#047857',
                      padding: '10px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '13px',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <Send size={15} /> Disparar Pix Domingo 09h
                  </button>

                  <a
                    href={`https://wa.me/55${car.driverPhone.replace(/\D/g, '')}?text=Olá ${car.currentDriver}! Lembramos que a locação do veículo ${car.plate} vence nesta ${car.dueDay}. Segue o Pix Copia e Cola no valor de R$ ${car.weeklyPrice},00 para manter sua autorização de rodagem ativa.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: '#25D366',
                      color: '#fff',
                      padding: '10px 16px',
                      borderRadius: 'var(--radius-sm)',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <MessageSquare size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Activity Logs */}
          {dispatchedMessages.length > 0 && (
            <div style={{
              background: '#f8fafc',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '18px',
              fontSize: '13px'
            }}>
              <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
                Histórico de Disparos de Cobrança:
              </strong>
              {dispatchedMessages.map((msg, idx) => (
                <div key={idx} style={{ color: '#059669', marginTop: '4px' }}>
                  ✓ {msg}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MODAL: CADASTRO DE NOVO VEÍCULO NA FROTA */}
      {isAddCarModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            width: '100%',
            maxWidth: '640px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: 'var(--shadow-lg)',
            padding: '32px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h3 style={{ fontSize: '22px', color: 'var(--text-primary)' }}>Cadastrar Novo Veículo na Frota</h3>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  O veículo ficará imediatamente visível na vitrine e na tela de disponibilidade.
                </span>
              </div>
              <button 
                onClick={() => setIsAddCarModalOpen(false)}
                style={{ background: '#f1f5f9', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateCarSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Modelo */}
              <div>
                <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  Modelo e Versão do Carro *
                </label>
                <input 
                  type="text" 
                  placeholder="Ex: Fiat Mobi Like 1.0 ou BYD Dolphin Plus"
                  required
                  value={newCarForm.name}
                  onChange={(e) => setNewCarForm({ ...newCarForm, name: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', fontSize: '14px' }}
                />
              </div>

              {/* Placa & Ano */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                    Placa (Mercosul) *
                  </label>
                  <input 
                    type="text" 
                    placeholder="Ex: QKN-8A12"
                    required
                    value={newCarForm.plate}
                    onChange={(e) => setNewCarForm({ ...newCarForm, plate: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', fontSize: '14px' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                    Ano / Modelo
                  </label>
                  <input 
                    type="text" 
                    placeholder="Ex: 2024/2025"
                    value={newCarForm.year}
                    onChange={(e) => setNewCarForm({ ...newCarForm, year: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', fontSize: '14px' }}
                  />
                </div>
              </div>

              {/* Categoria & Status Inicial */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                    Motorização
                  </label>
                  <select
                    value={newCarForm.category}
                    onChange={(e) => setNewCarForm({ ...newCarForm, category: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', fontSize: '14px' }}
                  >
                    <option value="combustao">⛽ Combustão Flex</option>
                    <option value="eletrico">⚡ 100% Elétrico</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                    Status Inicial
                  </label>
                  <select
                    value={newCarForm.status}
                    onChange={(e) => setNewCarForm({ ...newCarForm, status: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', fontSize: '14px' }}
                  >
                    <option value="disponivel">🟢 Disponível no Pátio</option>
                    <option value="locado">🔵 Locado</option>
                    <option value="manutencao">🟠 Em Manutenção</option>
                    <option value="revisao_pos_devolucao">🟣 Revisão Pós-Devolução</option>
                  </select>
                </div>
              </div>

              {/* Valores Semanal & Caução */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                    Valor Semanal (R$)
                  </label>
                  <input 
                    type="number" 
                    placeholder="680"
                    value={newCarForm.weeklyPrice}
                    onChange={(e) => setNewCarForm({ ...newCarForm, weeklyPrice: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', fontSize: '14px' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                    Valor da Caução Pix (R$)
                  </label>
                  <input 
                    type="number" 
                    placeholder="1100"
                    value={newCarForm.deposit}
                    onChange={(e) => setNewCarForm({ ...newCarForm, deposit: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', fontSize: '14px' }}
                  />
                </div>
              </div>

              {/* KM e Revisão */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                    KM Atual
                  </label>
                  <input 
                    type="number" 
                    placeholder="12000"
                    value={newCarForm.currentKm}
                    onChange={(e) => setNewCarForm({ ...newCarForm, currentKm: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', fontSize: '14px' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                    Próxima Revisão Obrigatória (KM)
                  </label>
                  <input 
                    type="number" 
                    placeholder="20000"
                    value={newCarForm.nextRevisionKm}
                    onChange={(e) => setNewCarForm({ ...newCarForm, nextRevisionKm: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', fontSize: '14px' }}
                  />
                </div>
              </div>

              {/* Botões */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                <button
                  type="button"
                  onClick={() => setIsAddCarModalOpen(false)}
                  style={{ padding: '12px 20px', borderRadius: 'var(--radius-sm)', background: '#f1f5f9', color: 'var(--text-secondary)', fontWeight: '600' }}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  style={{ padding: '12px 24px', borderRadius: 'var(--radius-sm)', background: 'var(--accent-red)', color: '#fff', fontWeight: '800' }}
                >
                  Salvar e Adicionar à Frota
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
