import { useState } from 'react';
import './RegisterCompany.css';

export default function RegisterCompany() {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRules, setPasswordRules] = useState({
    length: false,
    uppercase: false,
    number: false,
    special: false,
  });
  const [captchaChecked, setCaptchaChecked] = useState(false);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    
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

  const handleNext = (e) => {
    e.preventDefault();
    if (step < TOTAL_STEPS - 1) {
      setStep(step + 1);
    } else {
      alert('Cuenta creada (demo)');
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const isAdmin = role === 'Administrador';

  return (
    <main className="card">
      <div className="top">
        <div className="brand">
          <div className="logo">🛡️</div>
          <div className="name">
            Cavaltec
            <span>Ciberseguridad y TI</span>
          </div>
        </div>
        <p className="login-link">¿Ya tienes cuenta? <a href="#">Inicia sesión</a></p>
      </div>

      <h1>Crear cuenta</h1>

      <div className="stepper">
        {[0, 1, 2].map((i) => (
          <div key={i}>
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

      <form onSubmit={handleNext}>
        {/* PASO 1 */}
        {step === 0 && (
          <section className="pane">
            <p className="section-title">Persona o representante</p>
            <div className="grid">
              <div className="field">
                <label>Nombre completo</label>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre y apellido"
                  value={formData.nombre}
                  onChange={handleInputChange}
                />
              </div>
              <div className="field">
                <label>Tipo de documento</label>
                <select
                  name="tipoDocumento"
                  value={formData.tipoDocumento}
                  onChange={handleInputChange}
                >
                  <option value="">- Selecciona -</option>
                  <option>Cédula de ciudadanía</option>
                  <option>Cédula de extranjería</option>
                  <option>Pasaporte</option>
                  <option>NIT</option>
                </select>
              </div>
              <div className="field">
                <label>Número de documento</label>
                <input
                  type="text"
                  name="numeroDocumento"
                  inputMode="numeric"
                  placeholder="0000000000"
                  value={formData.numeroDocumento}
                  onChange={handleInputChange}
                />
              </div>
              <div className="field">
                <label>Fecha de nacimiento</label>
                <input
                  type="date"
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  onChange={handleInputChange}
                />
              </div>
              <div className="field">
                <label>Número de teléfono</label>
                <input
                  type="tel"
                  name="telefono"
                  placeholder="+57 300 000 0000"
                  value={formData.telefono}
                  onChange={handleInputChange}
                />
              </div>
              <div className="field">
                <label>Correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  placeholder="tucorreo@empresa.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="field full">
                <label>Contraseña</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={handlePasswordChange}
                />
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

        {/* PASO 2 */}
        {step === 1 && (
          <section className="pane">
            <p className="section-title">Rol</p>
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
                <p className="section-title">Empresa</p>
                <div className="grid">
                  <div className="field">
                    <label>Nombre de la empresa</label>
                    <input
                      type="text"
                      name="nombreEmpresa"
                      placeholder="Nombre legal"
                      value={formData.nombreEmpresa}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="field">
                    <label>NIT o RUT</label>
                    <input
                      type="text"
                      name="nit"
                      placeholder="000000000-0"
                      value={formData.nit}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="field">
                    <label>Dirección</label>
                    <input
                      type="text"
                      name="direccion"
                      placeholder="Calle 0 # 0-0"
                      value={formData.direccion}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="field">
                    <label>Teléfono</label>
                    <input
                      type="tel"
                      name="telefonoEmpresa"
                      placeholder="+57 1 000 0000"
                      value={formData.telefonoEmpresa}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="field">
                    <label>Sector</label>
                    <select
                      name="sector"
                      value={formData.sector}
                      onChange={handleInputChange}
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
                    <label>Tamaño</label>
                    <select
                      name="tamanio"
                      value={formData.tamanio}
                      onChange={handleInputChange}
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

        {/* PASO 3 */}
        {step === 2 && (
          <section className="pane">
            <p className="section-title">Verificación</p>
            <div className="note">
              <input
                type="checkbox"
                checked={captchaChecked}
                onChange={(e) => setCaptchaChecked(e.target.checked)}
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

        <div className="nav">
          <button
            type="button"
            className="ghost"
            onClick={handlePrev}
            style={{ visibility: step === 0 ? 'hidden' : 'visible' }}
          >
            ◄ Atrás
          </button>
          <button type="submit" className="btn">
            {step === TOTAL_STEPS - 1 ? 'Crear cuenta' : 'Continuar ►'}
          </button>
        </div>
      </form>
    </main>
  );
}
          <div class="field full"><label>Contraseña</label>
            <input type="password" id="pw" oninput="checkPw()" placeholder="••••••••" />
            <ul class="rules">
              <li id="r-len">Mínimo 8 caracteres</li><li id="r-up">Una letra mayúscula</li>
              <li id="r-num">Un número</li><li id="r-spec">Un carácter especial</li>
            </ul>
          </div>
        
     