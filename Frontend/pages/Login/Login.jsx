import { useState } from 'react';
import './Login.css';

export default function Login({ onLoginSuccess }) {
  // Navigation State
  const [isLogin, setIsLogin] = useState(true);

  // --- LOGIN STATES ---
  const [loginShowPassword, setLoginShowPassword] = useState(false);
  const [cedula, setCedula] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginCaptchaChecked, setLoginCaptchaChecked] = useState(false);

  // --- REGISTER STATES ---
  const [step, setStep] = useState(0);
  const [role, setRole] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerShowPassword, setRegisterShowPassword] = useState(false);
  const [passwordRules, setPasswordRules] = useState({
    length: false,
    uppercase: false,
    number: false,
    special: false,
  });
  const [registerCaptchaChecked, setRegisterCaptchaChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    tipoDocumento: '',
    numeroDocumento: '',
    fechaNacimiento: '',
    telefono: '',
    email: '',
    nombreEmpresa: '',
    nit: '',
    direccion: '',
    telefonoEmpresa: '',
    sector: '',
    tamanio: '',
  });

  const TOTAL_STEPS = 3;

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setRegisterPassword(value);

    setPasswordRules({
      length: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      number: /[0-9]/.test(value),
      special: /[^A-Za-z0-9]/.test(value),
    });
  };

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginCaptchaChecked) {
      alert('Por favor verifica el captcha.');
      return;
    }
    console.log('Login:', { cedula, password: loginPassword, captchaChecked: loginCaptchaChecked });
    alert('Sesión iniciada correctamente (demo).');
    if (onLoginSuccess) {
      onLoginSuccess();
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (step < TOTAL_STEPS - 1) {
      // Validate Password rules on step 0
      if (step === 0) {
        const { length, uppercase, number, special } = passwordRules;
        if (!length || !uppercase || !number || !special) {
          alert('La contraseña debe cumplir con todos los requisitos de seguridad.');
          return;
        }
      }
      // Validate role choice on step 1
      if (step === 1 && !role) {
        alert('Por favor selecciona un rol para continuar.');
        return;
      }
      setStep(step + 1);
    } else {
      // Final submission (step 2)
      if (!registerCaptchaChecked) {
        alert('Por favor verifica el captcha.');
        return;
      }
      if (!termsChecked) {
        alert('Debes aceptar los términos y condiciones.');
        return;
      }
      console.log('Registro completado:', {
        ...formData,
        role,
        password: registerPassword,
        captchaChecked: registerCaptchaChecked,
        termsChecked,
      });
      alert('Cuenta creada con éxito (demo).');
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    }
  };

  const handlePrevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleOAuthLogin = (provider) => {
    console.log('OAuth login with:', provider);
    alert(`Iniciando sesión con ${provider}...`);
  };

  const isAdmin = role === 'Administrador';

  return (
    <main className={`card ${!isLogin ? 'register-mode' : ''}`}>
      {/* Brand Header */}
      <div className="brand">
        <div className="logo">🛡️</div>
        <div className="name">
          Cavaltec
          <span>Ciberseguridad y TI</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="auth-tabs">
        <button
          type="button"
          className={`auth-tab ${isLogin ? 'active' : ''}`}
          onClick={() => setIsLogin(true)}
        >
          Iniciar sesión
        </button>
        <button
          type="button"
          className={`auth-tab ${!isLogin ? 'active' : ''}`}
          onClick={() => setIsLogin(false)}
        >
          Crear cuenta
        </button>
      </div>

      {isLogin ? (
        /* LOGIN FORM */
        <div className="pane">
          <h1>Bienvenido de nuevo</h1>
          <p className="subtitle">Ingresa tus credenciales para acceder a tu cuenta.</p>

          <form onSubmit={handleLoginSubmit}>
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
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="fl" htmlFor="loginPassword">Contraseña</label>
              <div className="input-wrap">
                <span className="lead">🔒</span>
                <input
                  type={loginShowPassword ? 'text' : 'password'}
                  id="loginPassword"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="toggle"
                  onClick={() => setLoginShowPassword(!loginShowPassword)}
                  title={loginShowPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  👁️
                </button>
              </div>
            </div>

            <div className="links">
              <a href="#" className="link" onClick={(e) => { e.preventDefault(); alert('Recuperar contraseña (demo)'); }}>
                ¿Olvidaste tu contraseña?
              </a>
              <a href="#" className="link" onClick={(e) => { e.preventDefault(); setIsLogin(false); }}>
                ¿No tienes cuenta? Registrate aquí
              </a>
            </div>

            <div className="captcha-label">Verificar que no eres un bot:</div>
            <div className="captcha">
              <div
                className="box"
                onClick={() => setLoginCaptchaChecked(!loginCaptchaChecked)}
                style={{ userSelect: 'none' }}
              >
                {loginCaptchaChecked && '✓'}
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
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <svg viewBox="0 0 170 170" width="20" height="20" fill="currentColor">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.37.13-9.13-1.9-14.28-6.07-3.47-2.9-7.39-7.63-11.77-14.2-10.3-15.66-15.47-32.52-15.47-50.56 0-14.87 4.12-26.83 12.35-35.88 8.23-9.05 17.84-13.6 28.82-13.6 5.8 0 11.77 1.45 17.88 4.34 6.13 2.9 10.15 4.34 12.07 4.34 1.8 0 5.65-1.4 11.55-4.2 5.9-2.79 11.53-4.18 16.9-4.18 11.87 0 21.84 4.25 29.89 12.75 6.04 6.47 10.33 14.18 12.87 23.14-12.73 5.23-19.1 14.38-19.1 27.46 0 10.27 3.85 18.69 11.54 25.26 7.69 6.57 17.13 10.15 28.32 10.74-2.12 6.48-4.58 12.22-7.38 17.22zm-30.82-111.4c0-7.34 2.6-14.14 7.82-20.4 6.26-7.53 14-11.53 23.23-12 0.55 10.17-3.08 19.38-10.87 27.63-7.79 8.25-16.71 12.63-26.74 13.13-0.89-2.65-1.34-5.46-1.34-8.36z" />
              </svg>
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
        </div>
      ) : (
        /* REGISTER FORM (STEPPER) */
        <div className="pane">
          <h1>Crear cuenta</h1>
          <p className="subtitle">Completa los pasos para registrar tu empresa.</p>

          <div className="stepper">
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                <div className={`step ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
                  <div className="dot">
                    {i < step ? '✓' : i + 1}
                  </div>
                  <span>
                    {i === 0 && 'Datos personales'}
                    {i === 1 && 'Rol y empresa'}
                    {i === 2 && 'Verificación'}
                  </span>
                </div>
                {i < 2 && <div className={`bar ${i < step ? 'done' : ''}`}></div>}
              </div>
            ))}
          </div>

          <form onSubmit={handleRegisterSubmit}>
            {/* PASO 1: Datos Personales */}
            {step === 0 && (
              <section className="pane">
                <p className="section-title">Persona o representante</p>
                <div className="grid">
                  <div className="field">
                    <label htmlFor="nombre">Nombre completo</label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      placeholder="Nombre y apellido"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="tipoDocumento">Tipo de documento</label>
                    <select
                      id="tipoDocumento"
                      name="tipoDocumento"
                      value={formData.tipoDocumento}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">- Selecciona -</option>
                      <option>Cédula de ciudadanía</option>
                      <option>Cédula de extranjería</option>
                      <option>Pasaporte</option>
                      <option>NIT</option>
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="numeroDocumento">Número de documento</label>
                    <input
                      type="text"
                      id="numeroDocumento"
                      name="numeroDocumento"
                      inputMode="numeric"
                      placeholder="0000000000"
                      value={formData.numeroDocumento}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
                    <input
                      type="date"
                      id="fechaNacimiento"
                      name="fechaNacimiento"
                      value={formData.fechaNacimiento}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="telefono">Número de teléfono</label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      placeholder="+57 300 000 0000"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="tucorreo@empresa.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="field full">
                    <label htmlFor="registerPassword">Contraseña de registro</label>
                    <div className="input-wrap">
                      <input
                        type={registerShowPassword ? 'text' : 'password'}
                        id="registerPassword"
                        placeholder="••••••••"
                        value={registerPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                      <button
                        type="button"
                        className="toggle"
                        onClick={() => setRegisterShowPassword(!registerShowPassword)}
                        title={registerShowPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                      >
                        👁️
                      </button>
                    </div>
                    <ul className="rules">
                      <li className={passwordRules.length ? 'ok' : ''}>Mínimo 8 caracteres</li>
                      <li className={passwordRules.uppercase ? 'ok' : ''}>Una letra mayúscula</li>
                      <li className={passwordRules.number ? 'ok' : ''}>Un número</li>
                      <li className={passwordRules.special ? 'ok' : ''}>Un carácter especial</li>
                    </ul>
                  </div>
                </div>
              </section>
            )}

            {/* PASO 2: Rol y Empresa */}
            {step === 1 && (
              <section className="pane">
                <p className="section-title">Selecciona tu Rol</p>
                <div className="roles">
                  {['Administrador', 'Evaluador', 'Auditor'].map((r) => (
                    <button
                      key={r}
                      type="button"
                      className={`role ${role === r ? 'sel' : ''}`}
                      onClick={() => handleRoleSelect(r)}
                    >
                      <b>{r}</b>
                      <small>
                        {r === 'Administrador' && 'Representa a una empresa u organización'}
                        {r === 'Evaluador' && 'Realiza evaluaciones de seguridad'}
                        {r === 'Auditor' && 'Audita procesos y cumplimiento'}
                      </small>
                    </button>
                  ))}
                </div>

                {isAdmin && (
                  <>
                    <p className="section-title">Datos de la Empresa</p>
                    <div className="grid">
                      <div className="field">
                        <label htmlFor="nombreEmpresa">Nombre de la empresa</label>
                        <input
                          type="text"
                          id="nombreEmpresa"
                          name="nombreEmpresa"
                          placeholder="Nombre legal"
                          value={formData.nombreEmpresa}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="nit">NIT o RUT</label>
                        <input
                          type="text"
                          id="nit"
                          name="nit"
                          placeholder="000000000-0"
                          value={formData.nit}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="direccion">Dirección</label>
                        <input
                          type="text"
                          id="direccion"
                          name="direccion"
                          placeholder="Calle 0 # 0-0"
                          value={formData.direccion}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="telefonoEmpresa">Teléfono de la empresa</label>
                        <input
                          type="tel"
                          id="telefonoEmpresa"
                          name="telefonoEmpresa"
                          placeholder="+57 1 000 0000"
                          value={formData.telefonoEmpresa}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="sector">Sector</label>
                        <select
                          id="sector"
                          name="sector"
                          value={formData.sector}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">- Selecciona -</option>
                          <option>Tecnología</option>
                          <option>Financiero</option>
                          <option>Salud</option>
                          <option>Gobierno</option>
                          <option>Educación</option>
                          <option>Industrial</option>
                          <option>Comercio</option>
                          <option>Otro</option>
                        </select>
                      </div>
                      <div className="field">
                        <label htmlFor="tamanio">Tamaño</label>
                        <select
                          id="tamanio"
                          name="tamanio"
                          value={formData.tamanio}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">- Selecciona -</option>
                          <option>1 - 10 empleados</option>
                          <option>11 - 50 empleados</option>
                          <option>51 - 200 empleados</option>
                          <option>201 - 500 empleados</option>
                          <option>+500 empleados</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {!isAdmin && role && (
                  <p className="note">
                    El rol {role} no requiere datos de empresa. Continúa con la verificación.
                  </p>
                )}

                {!role && (
                  <p className="note">
                    Selecciona un rol para continuar. Los campos a completar cambian según el rol elegido.
                  </p>
                )}
              </section>
            )}

            {/* PASO 3: Verificación */}
            {step === 2 && (
              <section className="pane">
                <p className="section-title">Verificación</p>
                <div className="note" style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => setRegisterCaptchaChecked(!registerCaptchaChecked)}>
                  <input
                    type="checkbox"
                    checked={registerCaptchaChecked}
                    onChange={(e) => setRegisterCaptchaChecked(e.target.checked)}
                  />
                  <span>reCaptcha — Verificar que no eres un bot</span>
                </div>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    required
                    checked={termsChecked}
                    onChange={(e) => setTermsChecked(e.target.checked)}
                  />
                  <span>Acepto los términos y condiciones y la política de tratamiento de datos.</span>
                </label>
              </section>
            )}

            {/* Form Nav Buttons */}
            <div className="nav">
              <button
                type="button"
                className="ghost"
                onClick={handlePrevStep}
                style={{ visibility: step === 0 ? 'hidden' : 'visible' }}
              >
                ◄ Atrás
              </button>
              <button type="submit" className="btn">
                {step === TOTAL_STEPS - 1 ? 'Crear cuenta' : 'Continuar ►'}
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}