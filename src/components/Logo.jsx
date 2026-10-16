import React from 'react';

export default function Logo({ size = 'medium', dark = false }) {
  const isSmall = size === 'small';
  const isLarge = size === 'large';

  const scale = isSmall ? 0.8 : isLarge ? 1.25 : 1;

  // By default for light theme: text is dark slate, car curve is dark slate, F has yellow bolt, CAR is racing red
  return (
    <div style={{
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center',
      userSelect: 'none',
      transform: `scale(${scale})`,
      transformOrigin: 'left center'
    }}>
      <svg width="210" height="50" viewBox="0 0 210 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Car silhouette top outline */}
        <path 
          d="M 18 18 C 35 10, 70 3, 105 3 C 140 3, 175 10, 192 18" 
          stroke={dark ? "#F8FAFC" : "#0F172A"} 
          strokeWidth="2.5" 
          strokeLinecap="round" 
        />
        {/* Aerodynamic spoiler line */}
        <path 
          d="M 160 7 L 195 17" 
          stroke="#DC2626" 
          strokeWidth="3" 
          strokeLinecap="round" 
        />
        {/* Electric plug / spark indicator */}
        <circle cx="22" cy="17" r="3.5" fill="#059669" />
        <path d="M 22 17 L 16 22" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" />

        {/* J T Text */}
        <text x="36" y="37" 
          fontFamily="'Outfit', sans-serif" 
          fontWeight="900" 
          fontSize="29" 
          letterSpacing="1px"
          fill={dark ? "#FFFFFF" : "#0F172A"}>
          J T
        </text>

        {/* F Text */}
        <text x="86" y="37" 
          fontFamily="'Outfit', sans-serif" 
          fontWeight="900" 
          fontSize="29" 
          fill={dark ? "#FFFFFF" : "#0F172A"}>
          F
        </text>

        {/* Yellow Lightning Bolt */}
        <path 
          d="M 103 13 L 97 27 L 103 27 L 99 43 L 110 25 L 104 25 Z" 
          fill="#D97706" 
          filter="drop-shadow(0 2px 4px rgba(217, 119, 6, 0.4))"
        />

        {/* CAR Racing Red */}
        <text x="114" y="37" 
          fontFamily="'Outfit', sans-serif" 
          fontWeight="900" 
          fontStyle="italic"
          fontSize="31" 
          letterSpacing="1.5px"
          fill="#DC2626">
          CAR
        </text>
      </svg>
      <span style={{
        fontSize: '8.5px',
        letterSpacing: '2px',
        fontWeight: '800',
        color: dark ? '#94A3B8' : '#64748B',
        textTransform: 'uppercase',
        marginTop: '-2px'
      }}>
        A Solução em Locação de Veículos
      </span>
    </div>
  );
}
