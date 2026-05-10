import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../useAdminAuth';
import { motion } from 'framer-motion';
import {
  Shield, Mail, Lock, User, Eye, EyeOff, Loader2,
  Key, CheckCircle2, BarChart3, Map, Users
} from 'lucide-react';

const GLASS = {
  background: 'rgba(255,255,255,0.7)',
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
  border: '1px solid rgba(124,154,126,0.2)',
  boxShadow: '0 8px 32px rgba(31,41,55,0.08)',
};

const PERKS = [
  { icon: BarChart3, text: 'Full platform analytics & insights' },
  { icon: Map,       text: 'Manage all trips & destinations' },
  { icon: Users,     text: 'User management & moderation' },
];

const STEPS = [
  'Fill in your admin details',
  'Enter the admin invite key',
  'Get instant access to the console',
];

export default function AdminSignup() {
  const { adminSignup } = useAdminAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name:'', email:'', password:'', confirmPassword:'', inviteKey:'' });
  const [showPass, setShowPass]       = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showKey, setShowKey]         = useState(false);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState('');
  const [success, setSuccess]         = useState(false);

  const update = (f) => (e) => setForm({ ...form, [f]: e.target.value });

  /* password strength */
  const strength = (() => {
    const p = form.password;
    let score = 0;
    if (p.length >= 8)  score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score; // 0-4
  })();
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength];
  const strengthColor = ['', '#EF4444', '#F59E0B', '#3B82F6', '#22C55E'][strength];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) { setError('Passwords do not match'); return; }
    if (form.password.length < 8) { setError('Password must be at least 8 characters'); return; }
    if (!form.inviteKey.trim()) { setError('Admin invite key is required'); return; }

    setLoading(true);
    try {
      await adminSignup(form.name, form.email, form.password, form.inviteKey);
      setSuccess(true);
      setTimeout(() => navigate('/admin'), 1500);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#F7F6F2' }}>
      {/* ── Left — decorative panel ──────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-5/12 relative overflow-hidden flex-col items-center justify-center p-14"
        style={{ background: 'linear-gradient(145deg, #1E5E52 0%, #2E7D6B 55%, #3D9B85 100%)' }}>
        {/* subtle dot grid */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='16' cy='16' r='1.5' fill='%23ffffff'/%3E%3C/svg%3E\")" }} />

        {/* floating blobs */}
        {[...Array(5)].map((_, i) => (
          <motion.div key={i}
            className="absolute rounded-full bg-white/10"
            style={{ width: 60 + i * 20, height: 60 + i * 20, top: `${10 + i * 15}%`, right: `${5 + i * 4}%` }}
            animate={{ y: [0, -12, 0], opacity: [0.15, 0.35, 0.15] }}
            transition={{ duration: 4 + i * 0.7, repeat: Infinity, delay: i * 0.6 }}
          />
        ))}

        <motion.div className="relative text-white text-center"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="w-20 h-20 rounded-3xl bg-white/15 flex items-center justify-center mx-auto mb-6
                          border border-white/25 backdrop-blur-sm">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold font-display mb-2">Admin Registration</h2>
          <p className="text-white/60 text-sm max-w-xs mx-auto leading-relaxed mb-8">
            Create your administrator account to manage the Traveloop platform.
          </p>

          {/* Perks */}
          <div className="space-y-3 text-left mb-10">
            {PERKS.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 rounded-2xl px-4 py-3 border border-white/15 backdrop-blur-sm"
                style={{ background: 'rgba(255,255,255,0.1)' }}>
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-white text-sm font-medium">{text}</span>
              </div>
            ))}
          </div>

          {/* Steps */}
          <div className="border-t border-white/15 pt-6">
            <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-4">How it works</p>
            <div className="space-y-2 text-left">
              {STEPS.map((s, i) => (
                <div key={s} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-white/70 text-sm">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Right — form ─────────────────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 overflow-y-auto">
        <motion.div className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>

          {/* Mobile header */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#1E5E52,#2E7D6B)' }}>
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-xl font-bold font-display" style={{ color: '#1E5E52' }}>Traveloop Admin</h1>
          </div>

          <h1 className="text-3xl font-bold font-display mb-1" style={{ color: '#1F2937' }}>
            Create Admin Account
          </h1>
          <p className="text-sm mb-8" style={{ color: '#6B7280' }}>
            Restricted access — requires an invite key from the platform owner.
          </p>

          {/* Success state */}
          {success ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="rounded-3xl p-10 text-center" style={GLASS}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: 'rgba(34,197,94,0.12)' }}>
                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold font-display mb-2" style={{ color: '#1F2937' }}>
                Admin Account Created!
              </h3>
              <p className="text-sm" style={{ color: '#6B7280' }}>Redirecting to Admin Console…</p>
            </motion.div>
          ) : (
            <div className="rounded-3xl p-8" style={GLASS}>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Error */}
                {error && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl px-4 py-3 text-sm"
                    style={{ background: '#FEE2E2', border: '1px solid #FECACA', color: '#991B1B' }}>
                    ⚠️ {error}
                  </motion.div>
                )}

                {/* Name */}
                <div>
                  <label className="input-label">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#9CA3AF' }} />
                    <input id="admin-signup-name" type="text" placeholder="Your full name"
                      className="input pl-11" value={form.name} onChange={update('name')} required />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="input-label">Admin Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#9CA3AF' }} />
                    <input id="admin-signup-email" type="email" placeholder="admin@traveloop.dev"
                      className="input pl-11" value={form.email} onChange={update('email')} required />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="input-label">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#9CA3AF' }} />
                    <input id="admin-signup-password"
                      type={showPass ? 'text' : 'password'}
                      placeholder="Min. 8 characters"
                      className="input pl-11 pr-11"
                      value={form.password} onChange={update('password')} required />
                    <button type="button" onClick={() => setShowPass(!showPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: '#9CA3AF' }}>
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {/* Strength bar */}
                  {form.password && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-1">
                        {[1,2,3,4].map(n => (
                          <div key={n} className="h-1 flex-1 rounded-full transition-all duration-300"
                            style={{ background: n <= strength ? strengthColor : '#EFEDE7' }} />
                        ))}
                      </div>
                      <p className="text-xs font-semibold" style={{ color: strengthColor }}>{strengthLabel}</p>
                    </div>
                  )}
                </div>

                {/* Confirm password */}
                <div>
                  <label className="input-label">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#9CA3AF' }} />
                    <input id="admin-signup-confirm"
                      type={showConfirm ? 'text' : 'password'}
                      placeholder="Repeat password"
                      className="input pl-11 pr-11"
                      value={form.confirmPassword} onChange={update('confirmPassword')} required />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: '#9CA3AF' }}>
                      {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {/* Match indicator */}
                  {form.confirmPassword && (
                    <p className="text-xs mt-1 font-semibold"
                      style={{ color: form.password === form.confirmPassword ? '#22C55E' : '#EF4444' }}>
                      {form.password === form.confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                    </p>
                  )}
                </div>

                {/* Invite Key */}
                <div>
                  <label className="input-label">Admin Invite Key</label>
                  <div className="relative">
                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#9CA3AF' }} />
                    <input id="admin-signup-key"
                      type={showKey ? 'text' : 'password'}
                      placeholder="Enter your invite key"
                      className="input pl-11 pr-11"
                      value={form.inviteKey} onChange={update('inviteKey')} required />
                    <button type="button" onClick={() => setShowKey(!showKey)}
                      className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: '#9CA3AF' }}>
                      {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-xs mt-1.5" style={{ color: '#9CA3AF' }}>
                    🔐 Contact the platform owner for your invite key.
                  </p>
                </div>

                {/* Submit */}
                <motion.button id="admin-signup-btn" type="submit"
                  whileHover={{ scale: 1.01, y: -1 }} whileTap={{ scale: 0.99 }}
                  className="btn-primary w-full justify-center mt-2" disabled={loading}>
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {loading ? 'Creating Admin Account…' : 'Create Admin Account'}
                </motion.button>
              </form>

              {/* Divider + login link */}
              <div className="mt-6 pt-6" style={{ borderTop: '1px solid rgba(124,154,126,0.15)' }}>
                <p className="text-center text-sm" style={{ color: '#6B7280' }}>
                  Already have an admin account?{' '}
                  <Link to="/admin/login" className="font-semibold hover:underline" style={{ color: '#2E7D6B' }}>
                    Sign in →
                  </Link>
                </p>
              </div>
            </div>
          )}

          <p className="text-center text-xs mt-5" style={{ color: '#9CA3AF' }}>
            Not an admin?{' '}
            <Link to="/login" className="font-semibold hover:underline" style={{ color: '#2E7D6B' }}>
              Go to user login →
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
