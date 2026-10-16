import React, { useState } from 'react';
import { 
  CheckCircle, TrendingUp, AlertTriangle, ShieldCheck, 
  ArrowRight, DollarSign, Award, Clock, FileSpreadsheet, Sparkles 
} from 'lucide-react';

export default function CommercialPitchDeck() {
  const [slide, setSlide] = useState(1);

  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)',
      padding: '40px',
      marginTop: '20px',
      boxShadow: 'var(--shadow-md)'
    }}>
      {/* Deck Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            color: 'var(--accent-red)',
            fontSize: '12px',
            fontWeight: '800',
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            padding: '4px 14px',
            borderRadius: 'var(--radius-full)'
          }}>
            Apresentação Executiva para JTF CAR
          </span>
          <h2 style={{ fontSize: '28px', color: 'var(--text-primary)', marginTop: '8px' }}>
            Transformando a JTF CAR na Maior Locadora Digital de Sergipe
          </h2>
        </div>

        {/* Slide navigation dots */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {[1, 2, 3, 4].map(s => (
            <button
              key={s}
              onClick={() => setSlide(s)}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: slide === s ? '#dc2626' : '#f1f5f9',
                color: slide === s ? '#ffffff' : 'var(--text-secondary)',
                fontSize: '14px',
                fontWeight: '700',
                border: 'none',
                transition: 'all 0.2s ease'
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* SLIDE 1: O DIAGNÓSTICO */}
      {slide === 1 && (
        <div className="animate-fade-in">
          <h3 style={{ fontSize: '22px', color: 'var(--accent-red)', marginBottom: '8px' }}>
            Slide 1: Os 4 Gargalos Ocultos que Custam Dinheiro à JTF CAR Hoje
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', marginBottom: '28px' }}>
            A JTF CAR tem uma frota moderna e pioneira, mas os processos operacionais manuais criam vazamentos diários de caixa e tempo.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '28px' }}>
            {[
              {
                title: 'Atendente Refém do WhatsApp',
                desc: '3 a 4 horas por dia respondendo curiosos que não têm CNH com EAR ou valor de caução.',
                loss: '60h de trabalho perdidas/mês'
              },
              {
                title: 'Contrato no Word & Fotos Soltas',
                desc: 'Sem termo de multas formal e fotos de vistorias perdidas no celular. Na devolução, a discussão é garantida.',
                loss: 'Prejuízo com funilaria e peças'
              },
              {
                title: 'Cobrança Semanal Manual',
                desc: 'Cobrar dezenas de motoristas todo domingo via WhatsApp gera atrito, atrasos e buracos no fluxo de caixa.',
                loss: 'Inadimplência de até 25%'
              },
              {
                title: 'O Risco do Motor Fundido',
                desc: 'Motorista de app roda até 6.000 km/mês. 3 semanas sem avisar e a troca de óleo já estourou em 3.000 km.',
                loss: 'R$ 8.000 a R$ 15.000 por motor'
              }
            ].map((card, i) => (
              <div 
                key={i}
                style={{
                  background: '#f8fafc',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '24px'
                }}
              >
                <div style={{ color: '#dc2626', fontWeight: '800', fontSize: '16px', marginBottom: '8px' }}>
                  {card.title}
                </div>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: '1.5' }}>
                  {card.desc}
                </p>
                <span style={{ fontSize: '12px', color: '#b45309', fontWeight: '800', background: '#fffbeb', border: '1px solid #fde68a', padding: '4px 10px', borderRadius: '4px' }}>
                  Impacto: {card.loss}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SLIDE 2: OS 4 PILARES DA SOLUÇÃO */}
      {slide === 2 && (
        <div className="animate-fade-in">
          <h3 style={{ fontSize: '22px', color: '#059669', marginBottom: '8px' }}>
            Slide 2: A Solução - Sistema Operacional Integrado JTF CAR
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', marginBottom: '28px' }}>
            Não é apenas um site: é uma plataforma completa que automatiza a captação, o pátio e a blindagem preventiva.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {[
              {
                num: '1',
                title: 'Vitrine + Filtro Anti-Curioso',
                desc: 'O cliente escolhe o carro no link da bio e só envia mensagem com CNH, EAR e Caução Pix confirmada. Atendente recebe a ficha mastigada.'
              },
              {
                num: '2',
                title: 'Contrato + Vistoria 6 Fotos no Celular',
                desc: 'Gera contrato com termo de multas em 1 clique. O funcionário tira 6 fotos no pátio e o cliente assina no touch. Blindagem jurídica total.'
              },
              {
                num: '3',
                title: 'Régua Semanal no WhatsApp',
                desc: 'Lembrete automático no domingo de manhã com Pix Copia e Cola. Cobrança e aviso de pendência automática na segunda-feira.'
              },
              {
                num: '4',
                title: 'Guardião do Odômetro & Revisões',
                desc: 'Check-in semanal com foto em tempo real do painel. Alerta vermelho automático a 500 km da troca de óleo a cada 10.000 km.'
              }
            ].map((pilar, i) => (
              <div 
                key={i}
                style={{
                  background: '#f8fafc',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '24px'
                }}
              >
                <span style={{
                  display: 'inline-flex',
                  width: '32px',
                  height: '32px',
                  background: '#059669',
                  color: '#ffffff',
                  fontWeight: '900',
                  borderRadius: '50%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '12px'
                }}>
                  {pilar.num}
                </span>
                <h4 style={{ fontSize: '17px', color: 'var(--text-primary)', marginBottom: '8px' }}>{pilar.title}</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{pilar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SLIDE 3: O ROI */}
      {slide === 3 && (
        <div className="animate-fade-in">
          <h3 style={{ fontSize: '22px', color: 'var(--text-primary)', marginBottom: '8px' }}>
            Slide 3: Retorno Sobre o Investimento (ROI Comprovado)
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', marginBottom: '28px' }}>
            Como a economia direta com um único motor ou hora de atendente paga todo o sistema:
          </p>

          <div style={{
            background: '#ffffff',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            marginBottom: '28px',
            boxShadow: 'var(--shadow-xs)'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid var(--border-color)', color: 'var(--text-primary)' }}>
                  <th style={{ padding: '16px 20px' }}>Ocorrência / Gargalo</th>
                  <th style={{ padding: '16px 20px' }}>Sem o Sistema</th>
                  <th style={{ padding: '16px 20px' }}>Com o Sistema JTF CAR</th>
                  <th style={{ padding: '16px 20px', color: '#059669' }}>Economia / Mês</th>
                </tr>
              </thead>
              <tbody style={{ color: 'var(--text-secondary)' }}>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px 20px', color: 'var(--text-primary)', fontWeight: '600' }}>Atendimento a curiosos no WhatsApp</td>
                  <td style={{ padding: '16px 20px' }}>~60 horas gastas no balcão</td>
                  <td style={{ padding: '16px 20px' }}>Filtro 100% automático na bio</td>
                  <td style={{ padding: '16px 20px', color: '#059669', fontWeight: '800' }}>+1 funcionário livre</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px 20px', color: 'var(--text-primary)', fontWeight: '600' }}>Troca de óleo estourada (perda de motor)</td>
                  <td style={{ padding: '16px 20px' }}>R$ 8.000 a R$ 15.000 por motor</td>
                  <td style={{ padding: '16px 20px' }}>Alerta Vermelho nos 500 km</td>
                  <td style={{ padding: '16px 20px', color: '#059669', fontWeight: '800' }}>R$ 8k a R$ 15k salvos</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px 20px', color: 'var(--text-primary)', fontWeight: '600' }}>Avarias e riscos na devolução</td>
                  <td style={{ padding: '16px 20px' }}>R$ 1.200 a R$ 2.500 de funilaria</td>
                  <td style={{ padding: '16px 20px' }}>Vistoria 6 fotos assinada</td>
                  <td style={{ padding: '16px 20px', color: '#059669', fontWeight: '800' }}>100% comprovado</td>
                </tr>
                <tr>
                  <td style={{ padding: '16px 20px', color: 'var(--text-primary)', fontWeight: '600' }}>Atrasos na cobrança semanal</td>
                  <td style={{ padding: '16px 20px' }}>20% a 25% de inadimplência</td>
                  <td style={{ padding: '16px 20px' }}>Régua Pix domingo automático</td>
                  <td style={{ padding: '16px 20px', color: '#059669', fontWeight: '800' }}>Redução de 35% nos atrasos</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SLIDE 4: PROPOSTA DE PREÇO */}
      {slide === 4 && (
        <div className="animate-fade-in">
          <h3 style={{ fontSize: '22px', color: 'var(--text-primary)', marginBottom: '8px' }}>
            Slide 4: Modelo de Parceria & Proposta de Investimento
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', marginBottom: '28px' }}>
            Estrutura planejada para ter o menor atrito de entrada e garantir evolução contínua da JTF CAR:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {/* Setup */}
            <div style={{
              background: '#ffffff',
              border: '2px solid var(--accent-red)',
              borderRadius: 'var(--radius-md)',
              padding: '32px',
              position: 'relative',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <span style={{
                position: 'absolute',
                top: '-14px',
                left: '24px',
                background: 'var(--accent-red)',
                color: '#fff',
                fontSize: '11px',
                fontWeight: '800',
                padding: '3px 12px',
                borderRadius: 'var(--radius-full)'
              }}>
                IMPLANTAÇÃO & SETUP
              </span>
              <div style={{ fontSize: '36px', fontWeight: '900', color: 'var(--text-primary)', margin: '14px 0 6px' }}>
                R$ 3.800
                <span style={{ fontSize: '15px', color: 'var(--text-muted)', fontWeight: '400' }}> (ou 3x R$ 1.350)</span>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '1.5' }}>
                Desenvolvimento completo, personalização com a identidade visual da JTF CAR, tela de disponibilidade e os 4 módulos operacionais.
              </p>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                ✓ Vitrine com Linha Elétrica & Combustão<br/>
                ✓ Tela Exclusiva de Consulta de Disponibilidade<br/>
                ✓ Funil Anti-Curioso com upload de CNH/EAR<br/>
                ✓ Gerador de Contrato e Vistoria 6 Fotos<br/>
                ✓ Guardião do Odômetro e Alertas de Revisão
              </div>
            </div>

            {/* Mensalidade SaaS */}
            <div style={{
              background: '#ffffff',
              border: '2px solid #059669',
              borderRadius: 'var(--radius-md)',
              padding: '32px',
              position: 'relative',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <span style={{
                position: 'absolute',
                top: '-14px',
                left: '24px',
                background: '#059669',
                color: '#ffffff',
                fontSize: '11px',
                fontWeight: '900',
                padding: '3px 12px',
                borderRadius: 'var(--radius-full)'
              }}>
                ASSINATURA SAAS & SUPORTE
              </span>
              <div style={{ fontSize: '36px', fontWeight: '900', color: '#059669', margin: '14px 0 6px' }}>
                R$ 390
                <span style={{ fontSize: '15px', color: 'var(--text-muted)', fontWeight: '400' }}> /mês</span>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '1.5' }}>
                Hospedagem em nuvem de alta performance, backup seguro de todas as fotos de vistorias e suporte técnico contínuo.
              </p>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                ✓ Servidores de alta velocidade e disponibilidade<br/>
                ✓ Armazenamento seguro de fotos de vistoria<br/>
                ✓ Manutenção técnica e evolução contínua<br/>
                ✓ Suporte prioritário via WhatsApp
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Slide Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '36px', paddingTop: '24px', borderTop: '1px solid var(--border-color)' }}>
        <button
          disabled={slide === 1}
          onClick={() => setSlide(slide - 1)}
          style={{
            background: 'transparent',
            color: slide === 1 ? 'var(--text-muted)' : 'var(--text-secondary)',
            fontSize: '14px',
            fontWeight: '600',
            cursor: slide === 1 ? 'not-allowed' : 'pointer'
          }}
        >
          Anterior
        </button>

        <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: '600' }}>
          Slide {slide} de 4
        </span>

        {slide < 4 ? (
          <button
            onClick={() => setSlide(slide + 1)}
            style={{
              background: '#dc2626',
              color: '#ffffff',
              padding: '12px 24px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '14px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            Próximo Slide <ArrowRight size={16} />
          </button>
        ) : (
          <div style={{ fontSize: '14px', color: '#059669', fontWeight: '800' }}>
            Pronto para o Fechamento!
          </div>
        )}
      </div>
    </div>
  );
}
