import { useState } from 'react';
import './Login.css';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [cedula, setCedula] = useState('');
  const [password, setPassword] = useState('');
  const [captchaChecked, setCaptchaChecked] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login:', { cedula, password, captchaChecked });
  };

  const handleOAuthLogin = (provider) => {
    console.log('OAuth login with:', provider);
  };

  return (
    <main className="card">
      <div className="brand">
        <div className="logo">🛡️</div>
        <div className="name">
          Cavaltec
          <span>Ciberseguridad y TI</span>
        </div>
      </div>

      <h1>Bienvenido de nuevo</h1>
      <p className="subtitle">Ingresa tus credenciales para acceder a tu cuenta.</p>

      <form onSubmit={handleLogin}>
        <div className="field">
          <label className="fl" htmlFor="cedula">Ingresa tu cédula</label>
          <div className="input-wrap">
            <span className="lead">📋</span>
            <input
              type="text"
              id="cedula"
              inputMode="numeric"
              placeholder="0000000000"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label className="fl" htmlFor="password">Contraseña</label>
          <div className="input-wrap">
            <span className="lead">🔒</span>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '👁️' : '👁️'}
            </button>
          </div>
        </div>

        <div className="links">
          <a href="#" className="link">Recuperar contraseña</a>
          <a href="#" className="link">Registrate</a>
        </div>

        <div className="captcha-label">Verificar que no eres un bot:</div>
        <div className="captcha">
          <div 
            className="box"
            onClick={() => setCaptchaChecked(!captchaChecked)}
          >
            {captchaChecked && '✓'}
          </div>
          <span>reCaptcha</span>
        </div>

        <button type="submit" className="btn">
          Iniciar sesión
        </button>
      </form>

      <div className="sep">
        <div className="line"></div>
        <span>O ingresa con</span>
        <div className="line"></div>
      </div>

      <div className="providers">
        <button
          type="button"
          className="provider"
          onClick={() => handleOAuthLogin('google')}
          title="Google"
        >
          G
        </button>
        <button
          type="button"
          className="provider"
          onClick={() => handleOAuthLogin('github')}
          title="GitHub"
        >
          GH
        </button>
        <button
          type="button"
          className="provider"
          onClick={() => handleOAuthLogin('linkedin')}
          title="LinkedIn"
        >
          in
        </button>
        <button
          type="button"
          className="provider"
          onClick={() => handleOAuthLogin('apple')}
          title="Apple"
        >
          🍎
        </button>
        <button
          type="button"
          className="provider"
          onClick={() => handleOAuthLogin('other')}
          title="Otros"
        >
          🔑
        </button>
        <button
          type="button"
          className="provider"
          onClick={() => handleOAuthLogin('biometric')}
          title="Biométrico"
        >
          👆
        </button>
      </div>
    </main>
  );
}