import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FleetCatalog from './components/FleetCatalog';
import AvailabilityView from './components/AvailabilityView';
import ElectricSavingsCalc from './components/ElectricSavingsCalc';
import PreApprovalModal from './components/PreApprovalModal';
import OperationsDashboard from './components/OperationsDashboard';
import CommercialPitchDeck from './components/CommercialPitchDeck';
import { initialFleetData, mockLeadQueue } from './data/fleetData';
import { 
  ShieldCheck, Clock, Award, Phone, MapPin, 
  HelpCircle, CheckCircle, ChevronDown, Sparkles 
} from 'lucide-react';

const InstagramIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function App() {
  const [activeView, setActiveView] = useState('vitrine'); // 'vitrine' | 'disponibilidade' | 'gestao' | 'proposta'
  const [fleet, setFleet] = useState(initialFleetData);
  const [selectedCarForModal, setSelectedCarForModal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedLeads, setSubmittedLeads] = useState(mockLeadQueue);

  const handleOpenModal = (car = null) => {
    setSelectedCarForModal(car || fleet[0]);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLeadSubmitted = (newLead) => {
    setSubmittedLeads(prev => [newLead, ...prev]);
  };

  const availableCount = fleet.filter(c => c.status === 'disponivel').length;
  const criticalOdometerCount = fleet.filter(c => c.kmRemaining <= 500).length;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)' }}>
      {/* Top Sticky Navbar */}
      <Navbar 
        activeView={activeView} 
        setActiveView={setActiveView}
        criticalCount={criticalOdometerCount}
        availableCount={availableCount}
      />

      {/* Main Container Views */}
      <main style={{ flex: 1 }}>
        {/* VIEW 1: VITRINE PRINCIPAL (MODELOS MAIS REQUISITADOS) */}
        {activeView === 'vitrine' && (
          <div>
            {/* Hero Section */}
            <HeroSection 
              onExploreFleet={() => {
                const el = document.getElementById('frota');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenPreApproval={() => handleOpenModal(fleet[0])}
              onCheckAvailability={() => setActiveView('disponibilidade')}
            />

            {/* Authentic Banners Showcase */}
            <section style={{ padding: '40px 0', background: '#ffffff', borderBottom: '1px solid var(--border-color)' }}>
              <div className="container">
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                  gap: '28px',
                  alignItems: 'center'
                }}>
                  <div style={{
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    border: '1px solid var(--border-color)',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    <img 
                      src="/assets/banner_frota.jpg" 
                      alt="A JTF CAR tem o veículo que você precisa"
                      style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                    />
                  </div>

                  <div style={{
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    border: '1px solid var(--border-color)',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    <img 
                      src="/assets/banner_eletricos.jpg" 
                      alt="Locação a combustão e elétricos JTF CAR"
                      style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Fleet Catalog: Most Requested Vehicles */}
            <div className="container">
              <FleetCatalog 
                fleet={fleet}
                onSelectCar={(car) => handleOpenModal(car)}
                onNavigateToAvailability={() => setActiveView('disponibilidade')}
              />

              {/* Electric Savings Calculator */}
              <ElectricSavingsCalc 
                onSelectElectric={() => handleOpenModal(fleet.find(c => c.category === 'eletrico') || fleet[0])}
              />

              {/* How it Works / 3 Steps */}
              <section style={{ padding: '80px 0 50px' }}>
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                  <span style={{
                    color: '#059669',
                    fontSize: '13px',
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    letterSpacing: '0.8px'
                  }}>
                    Simples, Ágil e 100% Digital
                  </span>
                  <h2 style={{ fontSize: '34px', color: 'var(--text-primary)', marginTop: '8px' }}>
                    Como Funciona a Locação na JTF CAR
                  </h2>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '28px'
                }}>
                  {[
                    {
                      step: '01',
                      title: 'Escolha seu Carro',
                      desc: 'Consulte nossa frota mista de veículos elétricos e a combustão e verifique a disponibilidade no pátio.'
                    },
                    {
                      step: '02',
                      title: 'Pré-Aprovação em 2 Minutos',
                      desc: 'Envie a foto da CNH com EAR e confirme a caução Pix pelo celular, sem burocracia de cartão de crédito.'
                    },
                    {
                      step: '03',
                      title: 'Retirada com Vistoria Digital',
                      desc: 'Assine o contrato no celular, confira as 6 fotos do laudo no pátio e retire a chave imediatamente!'
                    }
                  ].map((item, idx) => (
                    <div 
                      key={idx}
                      className="surface-card"
                      style={{
                        padding: '32px',
                        position: 'relative',
                        borderRadius: 'var(--radius-lg)'
                      }}
                    >
                      <span style={{
                        fontSize: '44px',
                        fontWeight: '900',
                        color: 'rgba(220, 38, 38, 0.12)',
                        position: 'absolute',
                        top: '20px',
                        right: '24px',
                        fontFamily: 'var(--font-heading)'
                      }}>
                        {item.step}
                      </span>
                      <h4 style={{ fontSize: '20px', color: 'var(--text-primary)', marginBottom: '10px' }}>{item.title}</h4>
                      <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQ Section */}
              <section style={{ padding: '40px 0 80px' }}>
                <div style={{ textAlign: 'center', marginBottom: '44px' }}>
                  <h3 style={{ fontSize: '30px', color: 'var(--text-primary)' }}>Dúvidas Frequentes dos Motoristas</h3>
                </div>

                <div style={{ maxWidth: '880px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    {
                      q: 'Preciso ter cartão de crédito para alugar?',
                      a: 'Não! Na JTF CAR nós aceitamos a Caução de Garantia diretamente via Pix. O valor é integralmente reembolsado na devolução do carro conforme o laudo de vistoria digital.'
                    },
                    {
                      q: 'Posso alugar para rodar na Uber e 99 em Aracaju?',
                      a: 'Sim! Toda a nossa frota é liberada e cadastrável nas plataformas. É necessário possuir CNH definitiva com anotação de EAR (Exerce Atividade Remunerada).'
                    },
                    {
                      q: 'Quem paga a manutenção preventiva e troca de óleo?',
                      a: 'A manutenção preventiva e o desgaste natural de óleo e peças são 100% cobertos pela JTF CAR em nossas oficinas credenciadas em Aracaju.'
                    },
                    {
                      q: 'Como funciona a recarga do BYD Dolphin Mini em Aracaju?',
                      a: 'O BYD pode ser recarregado na tomada comum da sua residência durante a noite ou nos eletropostos rápidos de Aracaju. O custo médio é de apenas R$ 0,11 por km rodado, gerando economia de até R$ 1.900/mês comparado à gasolina.'
                    }
                  ].map((faq, i) => (
                    <div 
                      key={i}
                      className="surface-card"
                      style={{
                        padding: '24px 28px',
                        borderRadius: 'var(--radius-md)'
                      }}
                    >
                      <strong style={{ fontSize: '16px', color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
                        {faq.q}
                      </strong>
                      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        )}

        {/* VIEW 2: TELA A PARTE DE CONSULTA DE DISPONIBILIDADE DA FROTA */}
        {activeView === 'disponibilidade' && (
          <div className="container">
            <AvailabilityView 
              fleet={fleet} 
              onSelectCarForBooking={(car) => handleOpenModal(car)}
            />
          </div>
        )}

        {/* VIEW 3: PAINEL DE GESTÃO JTF CAR (CONTROLE DE STATUS & CADASTRO DE CARRO) */}
        {activeView === 'gestao' && (
          <div className="container">
            <OperationsDashboard 
              fleet={fleet} 
              setFleet={setFleet}
              submittedLeads={submittedLeads} 
            />
          </div>
        )}

        {/* VIEW 4: PROPOSTA & ROI PITCH DECK */}
        {activeView === 'proposta' && (
          <div className="container">
            <CommercialPitchDeck />
          </div>
        )}
      </main>

      {/* Pre-Approval Modal Funnel */}
      {isModalOpen && (
        <PreApprovalModal 
          car={selectedCarForModal} 
          onClose={handleCloseModal}
          onLeadSubmitted={handleLeadSubmitted}
        />
      )}

      {/* Footer */}
      <footer style={{
        background: '#ffffff',
        borderTop: '1px solid var(--border-color)',
        padding: '40px 0 30px',
        color: 'var(--text-secondary)',
        fontSize: '14px'
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <strong style={{ color: 'var(--text-primary)', fontSize: '16px', display: 'block', marginBottom: '4px' }}>
              JTF CAR LOCADORA DE VEÍCULOS
            </strong>
            <span>Aracaju e Grande Aracaju • Sergipe</span>
          </div>

          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <a 
              href="https://instagram.com/jtfcar" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontWeight: '600' }}
            >
              <InstagramIcon size={18} color="#E1306C" /> @jtfcar
            </a>

            <a 
              href="https://wa.me/5579999727165" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#059669', fontWeight: '700' }}
            >
              <Phone size={18} /> (79) 99972-7165
            </a>
          </div>

          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} JTF CAR. Sistema de Gestão Operacional & Vitrine.
          </div>
        </div>
      </footer>
    </div>
  );
}
