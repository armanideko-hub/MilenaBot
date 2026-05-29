import React from 'react';
import Twemoji from 'react-twemoji';
import { backstories } from '../../data/backstory';

export function StorySelectionScreen({ onSelect }) {
  return (
    <Twemoji options={{ className: 'twemoji' }}>
      <div className="menu-screen" style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ color: '#facc15', marginBottom: '10px' }}>Выбери свою предысторию 🎭</h2>
        <p style={{ color: '#708499', fontSize: '14px', marginBottom: '25px' }}>
          От этого выбора зависят твои стартовые деньги, одежда и сложность выживания в РФ.
        </p>

        {backstories.map(story => (
          <div key={story.id} className="catalog-item" style={{ marginBottom: '20px', padding: '16px', background: '#1e2b38', borderRadius: '12px', border: '1px solid #2b3946', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <h4 style={{ margin: 0, color: '#fff', fontSize: '18px' }}>{story.title}</h4>
              <span style={{ fontSize: '12px', padding: '4px 8px', borderRadius: '6px', background: '#243447', fontWeight: 'bold' }}>{story.difficulty}</span>
            </div>
            <p style={{ fontSize: '13px', color: '#aa99aa', lineHeight: '1.4', marginBottom: '12px' }}>{story.description}</p>
            <div style={{ fontSize: '13px', color: '#708499', marginBottom: '15px', background: '#18222f', padding: '8px', borderRadius: '6px' }}>
              <ul style={{ margin: 0, paddingLeft: '15px' }}>
                <li>Стартовый капитал: <span style={{ color: '#4cb64c', fontWeight: 'bold' }}>{story.startBalances?.RUB?.toLocaleString()}₽ 💰</span></li>
                <li>Одежда: <span style={{ color: '#38bdf8' }}>{story.startClothes}</span></li>
                <li>Образование: <span style={{ color: '#a78bfa' }}>{story.educationText}</span></li>
                <li>Начальный статус: <span style={{ color: '#facc15' }}>{story.startStatus}⭐</span></li>
              </ul>
            </div>
            <button className="btn buy-btn" style={{ width: '100%', margin: 0, padding: '10px', background: '#4cb64c' }} onClick={() => onSelect(story)}>Начать сценарий 🚀</button>
          </div>
        ))}
      </div>
    </Twemoji>
  );
}
