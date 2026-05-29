import React, { useState, useEffect } from 'react';
import Twemoji from 'react-twemoji';
import { jobsCatalog, avitoJobsPool } from '../../data/catalog';
import { formatMoney } from '../../data/currencies';

const InternetJobsList = ({ jobs, totalStatus, currentLicenses, currentCity, handleWorkClick }) => (
  <>
    {jobs.map((job, idx) => {
      const hasStatus = totalStatus >= (job.reqStatus || 0);
      const hasLicense = !job.reqLicense || currentLicenses.includes(job.reqLicense);
      const isAvailable = hasStatus && hasLicense;

      return (
        <div key={idx} style={{ display: 'flex', flexDirection: 'column', padding: '10px 14px', background: '#1e2b38', borderRadius: '8px', textAlign: 'left', opacity: isAvailable ? 1 : 0.5 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff' }}>{job.name}</span>
            <button className="btn buy-btn" style={{ margin: 0, padding: '6px 12px', fontSize: '12px', background: isAvailable ? '#4cb64c' : '#2b3946' }} disabled={!isAvailable} onClick={() => handleWorkClick(job)}> Работать </button>
          </div>
          <p style={{ fontSize: '12px', color: '#ef4444', margin: '4px 0 2px 0' }}>⚡ Расход энергии: -{job.energyCost}</p>
          <span style={{ fontSize: '12px', color: '#4cb64c', fontWeight: 'bold' }}>💰 Зарплата: +{formatMoney(job.salary * currentCity.salaryMultiplier, currentCity.currency)}</span>
          {!hasLicense && <span style={{ fontSize: '11px', color: '#ef4444' }}>🔒 Требуется: {job.reqLicense}</span>}
          {!hasStatus && <span style={{ fontSize: '11px', color: '#ef4444' }}>🔒 Требуется статус: {job.reqStatus}⭐</span>}
        </div>
      );
    })}
  </>
);

const AvitoJobsList = ({ jobs, totalStatus, generateAvitoJobs, handleWorkClick, currentCity }) => (
  <>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: '11px', color: '#708499' }}>Разовые заказы (Обновляются сами)</span>
      <button style={{ background: '#243447', border: 'none', color: '#38bdf8', fontSize: '11px', padding: '4px 8px', borderRadius: '4px' }} onClick={generateAvitoJobs}>🔄 Обновить</button>
    </div>
    {jobs.length === 0 ? (
      <p style={{ fontSize: '12px', color: '#708499', padding: '15px' }}>Объявления закончились. Обнови список!</p>
    ) : (
      jobs.map((job, idx) => {
        const isReady = totalStatus >= job.reqStatus;
        return (
          <div key={idx} style={{ display: 'flex', flexDirection: 'column', padding: '10px 14px', background: '#1e2b38', borderRadius: '8px', textAlign: 'left', opacity: isReady ? 1 : 0.6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff' }}>{job.name}</span>
              <button className="btn buy-btn" style={{ margin: 0, padding: '6px 12px', fontSize: '12px', background: isReady ? '#eab308' : '#2b3946' }} disabled={!isReady} onClick={() => handleWorkClick(job, true, idx)}>Выполнить</button>
            </div>
            <p style={{ fontSize: '11px', color: '#708499', margin: '4px 0' }}>{job.desc}</p>
            <p style={{ fontSize: '12px', color: '#ef4444', margin: '0 0 2px 0' }}>⚡ Расход энергии: -{job.energyCost}</p>
            <span style={{ fontSize: '12px', color: '#4cb64c', fontWeight: 'bold' }}>💰 +{formatMoney(job.salary * currentCity.salaryMultiplier, currentCity.currency)} | {job.tax > 0 ? '📊 Налог: 4%' : '🤫 Наличные'}</span>
          </div>
        );
      })
    )}
  </>
);

const OfficialAppsJobsList = ({ jobs, totalStatus, currentLicenses, handleWorkClick, currentCity }) => (
  <>
    {jobs.map((job, idx) => {
      const hasStatus = totalStatus >= (job.reqStatus || 0);
      const hasLicense = !job.reqLicense || currentLicenses.includes(job.reqLicense);
      const isAvailable = hasStatus && hasLicense;
      return (
        <div key={idx} style={{ display: 'flex', flexDirection: 'column', padding: '10px 14px', background: '#1e2b38', borderRadius: '8px', textAlign: 'left', opacity: isAvailable ? 1 : 0.5 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff' }}>{job.name}</span>
            <button className="btn buy-btn" style={{ margin: 0, padding: '6px 12px', fontSize: '12px', background: isAvailable ? '#0284c7' : '#2b3946' }} disabled={!isAvailable} onClick={() => handleWorkClick(job)}>Смена</button>
          </div>
          <p style={{ fontSize: '12px', color: '#ef4444', margin: '4px 0 2px 0' }}>⚡ Расход энергии: -{job.energyCost}</p>
          <span style={{ fontSize: '12px', color: '#4cb64c', fontWeight: 'bold' }}>💰 +{formatMoney(job.salary * currentCity.salaryMultiplier, currentCity.currency)} {job.tax > 0 && <span style={{ color: '#ef4444', fontSize: '11px' }}>(Налог 4% 📊)</span>}</span>
          {!hasLicense && <span style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px', display: 'block' }}>🔒 Требуется образование: <b>{job.reqLicense}</b></span>}
          {!hasStatus && <span style={{ fontSize: '11px', color: '#ef4444', marginTop: '2px', display: 'block' }}>🔒 Требуется статус: {job.reqStatus}⭐</span>}
        </div>
      );
    })}
  </>
);

export function WorkScreen({ player, totalStatus, onWork, onBack, currentCity }) {
  const [activeTab, setActiveTab] = useState('internet');
  const [avitoJobs, setAvitoJobs] = useState([]);
  const currentLicenses = player.inventory?.licenses || [];

  const internetJobs = jobsCatalog.filter(j => j.id === 'promoter' || j.id === 'designer');
  const officialAppsJobs = jobsCatalog.filter(j => j.id === 'courier' || j.id === 'welder' || j.id === 'mechanic' || j.id === 'banker' || j.id === 'director');

  const generateAvitoJobs = () => {
    const shuffled = [...avitoJobsPool].sort(() => 0.5 - Math.random());
    setAvitoJobs(shuffled.slice(0, 3));
  };

  useEffect(() => { generateAvitoJobs(); }, []);

  const handleWorkClick = (job, isAvito = false, avitoIndex = null) => {
    let finalSalary = job.salary;
    if (job.tax > 0) {
      finalSalary = finalSalary - Math.round(finalSalary * job.tax);
    }

    onWork({
      ...job,
      salary: finalSalary // Прокидываем чистую прибыль для записи в стейт и earnedWork
    });

    if (isAvito && avitoIndex !== null) {
      const updatedAvito = [...avitoJobs];
      updatedAvito.splice(avitoIndex, 1);
      setAvitoJobs(updatedAvito);
    }
  };

  return (
    <Twemoji options={{ className: 'twemoji' }}>
      <div className="menu-screen" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h3>Поиск подработки 💼</h3>
        <p style={{ fontSize: '13px', color: '#eab308' }}>Энергия: {player.energy}⚡ | Статус: {totalStatus}⭐</p>

        <div style={{ display: 'flex', gap: '5px', marginBottom: '15px', background: '#111823', padding: '4px', borderRadius: '8px' }}>
          <button style={{ flex: 1, padding: '8px 4px', fontSize: '11px', background: activeTab === 'internet' ? '#1e2b38' : 'transparent', border: 'none', color: '#fff', borderRadius: '6px' }} onClick={() => setActiveTab('internet')}>🌐 В интернете</button>
          <button style={{ flex: 1, padding: '8px 4px', fontSize: '11px', background: activeTab === 'avito' ? '#1e2b38' : 'transparent', border: 'none', color: '#fff', borderRadius: '6px' }} onClick={() => setActiveTab('avito')}>📦 На Авито ({avitoJobs.length})</button>
          <button style={{ flex: 1, padding: '8px 4px', fontSize: '11px', background: activeTab === 'apps' ? '#1e2b38' : 'transparent', border: 'none', color: '#fff', borderRadius: '6px' }} onClick={() => setActiveTab('apps')}>🛠 Проф. Работы</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {activeTab === 'internet' && (
            <InternetJobsList 
              jobs={internetJobs} 
              totalStatus={totalStatus} 
              currentLicenses={currentLicenses} 
              currentCity={currentCity} 
              handleWorkClick={handleWorkClick} 
            />
          )}

          {activeTab === 'avito' && (
            <AvitoJobsList 
              jobs={avitoJobs} 
              totalStatus={totalStatus} 
              generateAvitoJobs={generateAvitoJobs} 
              handleWorkClick={handleWorkClick} 
              currentCity={currentCity}
            />
          )}

          {activeTab === 'apps' && (
            <OfficialAppsJobsList 
              jobs={officialAppsJobs} 
              totalStatus={totalStatus} 
              currentLicenses={currentLicenses} 
              handleWorkClick={handleWorkClick} 
              currentCity={currentCity}
            />
          )}
        </div>

        <button className="btn" style={{ marginTop: '15px' }} onClick={onBack}>↩️ Назад</button>
      </div>
    </Twemoji>
  );
}