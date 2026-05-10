import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Compass, Mail, Lock, User, Eye, EyeOff, Loader2, MapPin, Luggage, Calendar } from 'lucide-react';

const features = [
  { icon: MapPin,    text: 'Build city-by-city itineraries' },
  { icon: Luggage,   text: 'Smart packing checklists' },
  { icon: Calendar,  text: 'Budget tracking & planning' },
];

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) { setError('Passwords do not match'); return; }
    if (form.password.length < 8) { setError('Password must be at least 8 characters'); return; }
    setLoading(true);
    try {
      await signup(form.name, form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed. Please try again.');
    } finally { setLoading(false); }
  };

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  return (
    <div className="min-h-screen flex bg-cream-100">
      {/* Left panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md animate-slide-up">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3"
              style={{ background: 'linear-gradient(135deg, #0F766E, #14B8A6)' }}>
              <Compass className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold font-display text-teal-700">Traveloop</h1>
          </div>

          <h1 className="text-3xl font-bold font-display text-ink-900 mb-1">Start exploring 🌍</h1>
          <p className="text-ink-300 mb-8">Create your free account — no credit card needed</p>

          <div className="card p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3 text-red-600 text-sm">{error}</div>
              )}

              <div>
                <label className="input-label">Full name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-300" />
                  <input id="signup-name" type="text" placeholder="Your name"
                    className="input pl-11" value={form.name} onChange={update('name')} required />
                </div>
              </div>

              <div>
                <label className="input-label">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-300" />
                  <input id="signup-email" type="email" placeholder="you@example.com"
                    className="input pl-11" value={form.email} onChange={update('email')} required />
                </div>
              </div>

              <div>
                <label className="input-label">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-300" />
                  <input id="signup-password" type={showPass ? 'text' : 'password'}
                    placeholder="Min. 8 characters" className="input pl-11 pr-11"
                    value={form.password} onChange={update('password')} required />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-300 hover:text-teal-600 transition-colors">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="input-label">Confirm password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-300" />
                  <input id="signup-confirm" type="password" placeholder="Repeat password"
                    className="input pl-11" value={form.confirmPassword} onChange={update('confirmPassword')} required />
                </div>
              </div>

              <button id="signup-submit" type="submit" className="btn-primary w-full justify-center mt-2" disabled={loading}>
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? 'Creating account…' : 'Create Free Account'}
              </button>
            </form>

            <div className="divider" />
            <p className="text-center text-ink-300 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-teal-600 hover:text-teal-700 font-semibold transition-colors">Sign in →</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right panel — decorative */}
      <div className="hidden lg:flex lg:w-5/12 hero-gradient relative overflow-hidden flex-col items-center justify-center p-16">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/svg%3E\")"
        }} />
        <div className="relative text-center text-white">
          <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/30">
            <Compass className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold font-display mb-4">Everything you need<br />to travel smarter</h2>
          <div className="space-y-3 text-left mt-8">
            {features.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 bg-white/10 rounded-2xl px-4 py-3 backdrop-blur-sm border border-white/20">
                <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-medium text-sm">{text}</span>
              </div>
            ))}
          </div>
          <p className="text-teal-100 text-sm mt-8">100% free. No credit card required.</p>
        </div>
      </div>
    </div>
  );
}
