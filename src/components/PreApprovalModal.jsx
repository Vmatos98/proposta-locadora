import React, { useState } from 'react';
import { 
  X, CheckCircle, AlertTriangle, UploadCloud, FileText, 
  Car, ShieldCheck, ArrowRight, ArrowLeft, Send, Check 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PreApprovalModal({ car, onClose, onLeadSubmitted }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Aracaju / Grande Aracaju',
    useType: 'app',
    hasEar: true,
    cnhFile: null,
    proofFile: null,
    appProofFile: null,
    appRating: '4.95',
    depositAvailable: 'sim'
  });

  const [cnhPreview, setCnhPreview] = useState(null);
  const [proofPreview, setProofPreview] = useState(null);
  const [appPreview, setAppPreview] = useState(null);

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (type === 'cnh') {
        setFormData(prev => ({ ...prev, cnhFile: file }));
        setCnhPreview(url);
      } else if (type === 'proof') {
        setFormData(prev => ({ ...prev, proofFile: file }));
        setProofPreview(url);
      } else if (type === 'app') {
        setFormData(prev => ({ ...prev, appProofFile: file }));
        setAppPreview(url);
      }
    }
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      setStep(5);
      if (formData.depositAvailable === 'sim') {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
      if (onLeadSubmitted) {
        onLeadSubmitted({
          id: `lead-${Date.now()}`,
          name: formData.name || 'Novo Solicitante',
          phone: formData.phone || '(79) 99999-0000',
          city: formData.city,
          carPreference: car ? car.name : 'BYD Dolphin Mini 2024/2025',
          intendedUse: formData.useType === 'app' ? 'Motorista de Aplicativo (Uber/99)' : 'Uso Particular / Empresa',
          hasEar: formData.hasEar,
          cnhCategory: formData.hasEar ? 'B (com EAR)' : 'B (sem EAR)',
          proofOfResidence: formData.proofFile ? 'Comprovante anexado' : 'Não anexado',
          appScore: formData.useType === 'app' ? `${formData.appRating} ⭐ (Perfil App)` : 'N/A (Particular)',
          depositPixAvailable: formData.depositAvailable === 'sim',
          status: 'Novo',
          submittedAt: 'Agora'
        });
      }
    }
  };

  const generateWhatsAppMessage = () => {
    const depositText = formData.depositAvailable === 'sim' ? 'SIM, tenho o Pix pronto' : 'Não possuo no momento';
    const earText = formData.hasEar ? 'SIM, possui EAR' : 'NÃO possui EAR';
    const text = `🚨 *NOVA SOLICITAÇÃO DE LOCAÇÃO - JTF CAR* 🚨%0A%0A` +
      `🚗 *Veículo Desejado:* ${car ? car.name : 'Veículo da Frota'}%0A` +
      `👤 *Nome:* ${formData.name}%0A` +
      `📱 *WhatsApp:* ${formData.phone}%0A` +
      `📍 *Região:* ${formData.city}%0A` +
      `🎯 *Finalidade:* ${formData.useType === 'app' ? 'Motorista Uber/99' : 'Particular'}%0A` +
      `🪪 *CNH com EAR:* ${earText}%0A` +
      `⭐ *Nota Uber/99:* ${formData.useType === 'app' ? formData.appRating : 'Particular'}%0A` +
      `💰 *Caução no Pix no ato:* ${depositText}%0A%0A` +
      `✅ *Ficha pré-analisada pelo sistema digital JTF CAR. Aguardando aprovação.*`;
    return `https://wa.me/5579999727165?text=${text}`;
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        background: '#ffffff',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        width: '100%',
        maxWidth: '580px',
        maxHeight: '92vh',
        overflowY: 'auto',
        boxShadow: 'var(--shadow-lg)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          padding: '24px 28px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          background: '#ffffff',
          zIndex: 10
        }}>
          <div>
            <span style={{
              fontSize: '11px',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
              color: 'var(--accent-red)',
              display: 'block'
            }}>
              Filtro Anti-Curioso JTF CAR
            </span>
            <h3 style={{ fontSize: '20px', color: 'var(--text-primary)' }}>
              Pré-Aprovação Sem Cartão de Crédito
            </h3>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: '#f1f5f9',
              color: 'var(--text-secondary)',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Progress Bar */}
        {step <= 4 && (
          <div style={{ padding: '0 28px', marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
              <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>Passo {step} de 4</span>
              <span>
                {step === 1 && 'Identificação & Finalidade'}
                {step === 2 && 'Validação da CNH com EAR'}
                {step === 3 && 'Comprovante & Perfil do App'}
                {step === 4 && 'Caução no Pix'}
              </span>
            </div>
            <div style={{ height: '7px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${(step / 4) * 100}%`,
                background: 'linear-gradient(90deg, #dc2626 0%, #059669 100%)',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>
        )}

        {/* Selected Car Preview */}
        {car && step <= 4 && (
          <div style={{
            margin: '20px 28px 0',
            padding: '14px 18px',
            background: '#f8fafc',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Car size={20} color="var(--accent-red)" />
              <div>
                <strong style={{ fontSize: '14px', color: 'var(--text-primary)', display: 'block' }}>{car.name}</strong>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Plano Semanal: R$ {car.weeklyPrice}/sem</span>
              </div>
            </div>
            <span style={{ fontSize: '13px', color: '#059669', fontWeight: '800' }}>Caução: R$ {car.deposit}</span>
          </div>
        )}

        {/* Form Body - Spacious */}
        <div style={{ padding: '28px', flex: 1 }}>
          {step === 1 && (
            <div className="animate-fade-in">
              <h4 style={{ color: 'var(--text-primary)', fontSize: '17px', marginBottom: '6px' }}>Qual será a finalidade do veículo?</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
                Atendemos motoristas cadastrados nas plataformas e locações particulares em Sergipe.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '24px' }}>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, useType: 'app' })}
                  style={{
                    padding: '18px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: formData.useType === 'app' ? '2px solid var(--accent-red)' : '1px solid var(--border-color)',
                    background: formData.useType === 'app' ? '#fef2f2' : '#ffffff',
                    textAlign: 'left',
                    boxShadow: 'var(--shadow-xs)'
                  }}
                >
                  <strong style={{ display: 'block', fontSize: '15px', color: 'var(--text-primary)', marginBottom: '4px' }}>Motorista de App</strong>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Uber, 99 e Corridas Particulares</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, useType: 'particular' })}
                  style={{
                    padding: '18px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: formData.useType === 'particular' ? '2px solid var(--accent-red)' : '1px solid var(--border-color)',
                    background: formData.useType === 'particular' ? '#fef2f2' : '#ffffff',
                    textAlign: 'left',
                    boxShadow: 'var(--shadow-xs)'
                  }}
                >
                  <strong style={{ display: 'block', fontSize: '15px', color: 'var(--text-primary)', marginBottom: '4px' }}>Particular / PJ</strong>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Uso pessoal, viagens ou empresa</span>
                </button>
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Nome Completo
                </label>
                <input 
                  type="text"
                  placeholder="Ex: Carlos Eduardo de Oliveira"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '13px 16px',
                    background: '#f8fafc',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-primary)',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  WhatsApp com DDD
                </label>
                <input 
                  type="text"
                  placeholder="(79) 99999-9999"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '13px 16px',
                    background: '#f8fafc',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-primary)',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Cidade / Bairro onde reside
                </label>
                <input 
                  type="text"
                  placeholder="Ex: Aracaju - Jabotiana"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '13px 16px',
                    background: '#f8fafc',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-primary)',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <h4 style={{ color: 'var(--text-primary)', fontSize: '17px', marginBottom: '6px' }}>Validação da CNH</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
                Para segurança mútua, é obrigatório possuir CNH definitiva válida.
              </p>

              {/* EAR Checkbox */}
              <div style={{
                background: '#f8fafc',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '20px',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px'
              }}>
                <input 
                  type="checkbox"
                  id="earCheckModal"
                  checked={formData.hasEar}
                  onChange={(e) => setFormData({ ...formData, hasEar: e.target.checked })}
                  style={{
                    width: '22px',
                    height: '22px',
                    marginTop: '2px',
                    accentColor: 'var(--accent-red)',
                    cursor: 'pointer'
                  }}
                />
                <label htmlFor="earCheckModal" style={{ fontSize: '14px', color: 'var(--text-primary)', cursor: 'pointer' }}>
                  <strong>Possui a anotação "EAR" (Exerce Atividade Remunerada) na CNH?</strong>
                  <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '13px', marginTop: '4px' }}>
                    Exigência legal para rodar em aplicativos de transporte de passageiros.
                  </span>
                </label>
              </div>

              {/* CNH Upload */}
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                Foto da CNH ou PDF da Carteira Digital de Trânsito
              </label>
              <div 
                style={{
                  border: '2px dashed var(--border-strong)',
                  borderRadius: 'var(--radius-md)',
                  padding: '32px',
                  textAlign: 'center',
                  background: '#f8fafc',
                  cursor: 'pointer'
                }}
                onClick={() => document.getElementById('cnhUploadModal').click()}
              >
                <input 
                  type="file" 
                  id="cnhUploadModal" 
                  accept="image/*,.pdf" 
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileChange(e, 'cnh')}
                />
                <UploadCloud size={36} color="var(--accent-red)" style={{ margin: '0 auto 12px' }} />
                <strong style={{ display: 'block', fontSize: '15px', color: 'var(--text-primary)', marginBottom: '4px' }}>
                  {formData.cnhFile ? formData.cnhFile.name : 'Clique para anexar foto da CNH'}
                </strong>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  PNG, JPG ou PDF (Arquivo protegido e criptografado)
                </span>
                {cnhPreview && (
                  <div style={{ marginTop: '14px', color: '#059669', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <Check size={16} /> Documento anexado com sucesso
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in">
              <h4 style={{ color: 'var(--text-primary)', fontSize: '17px', marginBottom: '6px' }}>Comprovante de Residência & Histórico</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
                Locação exclusiva para moradores de Aracaju ou Grande Aracaju (Socorro, São Cristóvão, Barra).
              </p>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  Comprovante de Residência recente (Energisa ou Deso)
                </label>
                <div 
                  style={{
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: '#f8fafc',
                    cursor: 'pointer'
                  }}
                  onClick={() => document.getElementById('proofUploadModal').click()}
                >
                  <input 
                    type="file" 
                    id="proofUploadModal" 
                    accept="image/*,.pdf" 
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileChange(e, 'proof')}
                  />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <FileText size={22} color="var(--accent-red)" />
                    <span style={{ fontSize: '14px', color: 'var(--text-primary)' }}>
                      {formData.proofFile ? formData.proofFile.name : 'Anexar comprovante de endereço em SE'}
                    </span>
                  </div>
                  <span style={{ fontSize: '13px', color: 'var(--accent-red)', fontWeight: '700' }}>
                    {formData.proofFile ? 'Alterar' : 'Procurar'}
                  </span>
                </div>
              </div>

              {formData.useType === 'app' && (
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    Print da Tela do App Uber / 99 (Mostrando avaliação e viagens)
                  </label>
                  <div 
                    style={{
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      padding: '18px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: '#f8fafc',
                      cursor: 'pointer',
                      marginBottom: '20px'
                    }}
                    onClick={() => document.getElementById('appProofUploadModal').click()}
                  >
                    <input 
                      type="file" 
                      id="appProofUploadModal" 
                      accept="image/*" 
                      style={{ display: 'none' }}
                      onChange={(e) => handleFileChange(e, 'app')}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <ShieldCheck size={22} color="#059669" />
                      <span style={{ fontSize: '14px', color: 'var(--text-primary)' }}>
                        {formData.appProofFile ? formData.appProofFile.name : 'Anexar print do perfil de motorista'}
                      </span>
                    </div>
                    <span style={{ fontSize: '13px', color: '#059669', fontWeight: '700' }}>
                      {formData.appProofFile ? 'Alterar' : 'Anexar'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <label style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)' }}>
                      Sua avaliação atual no App:
                    </label>
                    <select
                      value={formData.appRating}
                      onChange={(e) => setFormData({ ...formData, appRating: e.target.value })}
                      style={{
                        padding: '10px 14px',
                        background: '#f8fafc',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    >
                      <option value="5.00">5.00 ⭐ (Excelente)</option>
                      <option value="4.95">4.95 a 4.99 ⭐ (Muito Boa)</option>
                      <option value="4.90">4.90 a 4.94 ⭐ (Boa)</option>
                      <option value="4.85">4.85 a 4.89 ⭐ (Regular)</option>
                      <option value="iniciante">Iniciante / Conta Recente</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="animate-fade-in">
              <div style={{
                background: '#fffbeb',
                border: '1px solid #fde68a',
                borderRadius: 'var(--radius-md)',
                padding: '20px',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px'
              }}>
                <AlertTriangle size={24} color="#d97706" style={{ flexShrink: 0 }} />
                <div>
                  <strong style={{ fontSize: '15px', color: '#b45309', display: 'block', marginBottom: '4px' }}>
                    O Filtro Decisivo da Locação
                  </strong>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    Na JTF CAR você <strong>NÃO precisa ter cartão de crédito</strong> com limite preso. Nós aceitamos a <strong>Caução de Garantia via Pix</strong>.
                  </span>
                </div>
              </div>

              <h4 style={{ color: 'var(--text-primary)', fontSize: '17px', marginBottom: '8px' }}>
                Você possui o valor da Caução disponível para Pix no momento da retirada?
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
                Valor da Caução para este veículo: <strong style={{ color: '#059669' }}>R$ {car ? car.deposit : '1.000'}</strong> (reembolsável 100% na devolução do carro conforme contrato).
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '14px' }}>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, depositAvailable: 'sim' })}
                  style={{
                    padding: '20px 22px',
                    borderRadius: 'var(--radius-md)',
                    border: formData.depositAvailable === 'sim' ? '2px solid #059669' : '1px solid var(--border-color)',
                    background: formData.depositAvailable === 'sim' ? '#ecfdf5' : '#ffffff',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: 'var(--shadow-xs)'
                  }}
                >
                  <div>
                    <strong style={{ display: 'block', fontSize: '16px', color: '#047857' }}>
                      SIM, tenho o valor da Caução em Pix pronto
                    </strong>
                    <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                      Tenho a caução e a primeira semana para retirar o veículo imediatamente.
                    </span>
                  </div>
                  {formData.depositAvailable === 'sim' && <CheckCircle size={24} color="#059669" />}
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, depositAvailable: 'nao' })}
                  style={{
                    padding: '20px 22px',
                    borderRadius: 'var(--radius-md)',
                    border: formData.depositAvailable === 'nao' ? '2px solid #dc2626' : '1px solid var(--border-color)',
                    background: formData.depositAvailable === 'nao' ? '#fef2f2' : '#ffffff',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: 'var(--shadow-xs)'
                  }}
                >
                  <div>
                    <strong style={{ display: 'block', fontSize: '15px', color: '#dc2626' }}>
                      NÃO possuo a Caução no momento
                    </strong>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                      Estou apenas pesquisando valores e condições futuras.
                    </span>
                  </div>
                </button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="animate-fade-in" style={{ textAlign: 'center', padding: '16px 0' }}>
              {formData.depositAvailable === 'sim' ? (
                <>
                  <div style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    background: '#ecfdf5',
                    border: '2px solid #059669',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px'
                  }}>
                    <CheckCircle size={40} color="#059669" />
                  </div>
                  <h3 style={{ fontSize: '24px', color: 'var(--text-primary)', marginBottom: '8px' }}>
                    Cadastro Pré-Aprovado com Sucesso!
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '15px', maxWidth: '440px', margin: '0 auto 28px' }}>
                    Seu perfil atende aos critérios da <strong>JTF CAR</strong>. A ficha já foi registrada no sistema interno da empresa.
                  </p>

                  <div style={{
                    background: '#f8fafc',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '20px',
                    textAlign: 'left',
                    fontSize: '14px',
                    color: 'var(--text-secondary)',
                    marginBottom: '28px',
                    lineHeight: '1.7'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Motorista:</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{formData.name || 'Solicitante'}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Veículo:</span>
                      <strong style={{ color: 'var(--accent-red)' }}>{car ? car.name : 'BYD Dolphin Mini'}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Caução Pix:</span>
                      <strong style={{ color: '#059669' }}>Disponível</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>CNH com EAR:</span>
                      <strong style={{ color: formData.hasEar ? '#059669' : '#d97706' }}>
                        {formData.hasEar ? 'Confirmado' : 'Não'}
                      </strong>
                    </div>
                  </div>

                  <a 
                    href={generateWhatsAppMessage()} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                      color: '#fff',
                      fontWeight: '800',
                      fontSize: '16px',
                      padding: '16px 28px',
                      borderRadius: 'var(--radius-md)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      boxShadow: '0 8px 24px rgba(37, 211, 102, 0.35)',
                      textDecoration: 'none',
                      width: '100%',
                      justifyContent: 'center'
                    }}
                  >
                    <Send size={18} />
                    Enviar Ficha Pronta no WhatsApp da JTF CAR
                  </a>
                </>
              ) : (
                <>
                  <div style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    background: '#fef2f2',
                    border: '2px solid #dc2626',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px'
                  }}>
                    <AlertTriangle size={40} color="#dc2626" />
                  </div>
                  <h3 style={{ fontSize: '22px', color: 'var(--text-primary)', marginBottom: '8px' }}>
                    Requisito de Caução Obrigatório
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '15px', maxWidth: '440px', margin: '0 auto 24px' }}>
                    Para locar sem cartão de crédito, a caução via Pix é indispensável para liberação do veículo na JTF CAR.
                  </p>
                  <button
                    onClick={onClose}
                    style={{
                      background: '#f1f5f9',
                      color: 'var(--text-primary)',
                      padding: '14px 28px',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '14px',
                      fontWeight: '700'
                    }}
                  >
                    Entendido, voltarei quando tiver a caução
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Footer controls */}
        {step <= 4 && (
          <div style={{
            padding: '20px 28px',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#ffffff'
          }}>
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                style={{
                  background: 'transparent',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                <ArrowLeft size={16} /> Voltar
              </button>
            ) : <div />}

            <button
              type="button"
              onClick={handleNext}
              style={{
                background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                color: '#fff',
                padding: '14px 28px',
                borderRadius: 'var(--radius-md)',
                fontSize: '15px',
                fontWeight: '800',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: 'var(--shadow-red)'
              }}
            >
              {step === 4 ? 'Finalizar Análise' : 'Próximo Passo'}
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
