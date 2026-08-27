import React, { useState, useEffect } from 'react';

// Types pour les données météo
interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  pressure: number;
  uvIndex: number;
}

const App = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Remplacez par vos coordonnées réelles ou géolocalisation
        const lat = 50.85; // Bruxelles
        const lon = 4.35;

        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,pressure_msl,uv_index&timezone=auto`
        );

        if (!response.ok) throw new Error('Erreur réseau');

        const data = await response.json();
        const current = data.current;

        setWeather({
          temperature: current.temperature_2m,
          humidity: current.relative_humidity_2m,
          windSpeed: current.wind_speed_10m,
          pressure: current.pressure_msl,
          uvIndex: current.uv_index,
          condition: "Données en temps réel"
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a, #1e293b)',
        color: '#fff'
      }}>
        Chargement des données météo...
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a, #1e293b)',
        color: '#ff6b6b'
      }}>
        Erreur : {error || 'Données indisponibles'}
      </div>
    );
  }

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 1rem',
      background: 'linear-gradient(135deg, #0f172a, #1e293b)',
      color: '#fff'
    }}>
      <header style={{
        textAlign: 'center',
        marginBottom: '2rem',
        fontSize: '1.5rem',
        fontWeight: 600,
        letterSpacing: '0.5px'
      }}>
        🌤️ WeatherPro
      </header>

      <div style={{
        background: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '20px',
        padding: '2rem',
        width: '100%',
        maxWidth: '400px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>🌡️</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700 }}>{weather.temperature}°C</div>
          <div style={{ color: '#94a3b8', marginTop: '0.25rem' }}>{weather.condition}</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Metric label="Humidité" value={`${weather.humidity}%`} icon="💧" />
          <Metric label="Vent" value={`${weather.windSpeed} km/h`} icon="💨" />
          <Metric label="Pression" value={`${weather.pressure} hPa`} icon="⚖️" />
          <Metric label="UV" value={weather.uvIndex.toString()} icon="☀️" />
        </div>
      </div>

      <footer style={{
        marginTop: '2rem',
        fontSize: '0.875rem',
        color: '#94a3b8',
        textAlign: 'center'
      }}>
        Version 1.0 — Données en temps réel
      </footer>
    </div>
  );
};

const Metric = ({ label, value, icon }: { label: string; value: string; icon: string }) => (
  <div style={{
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '12px',
    padding: '1rem',
    textAlign: 'center'
  }}>
    <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{icon}</div>
    <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{value}</div>
    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>{label}</div>
  </div>
);

export default App;