import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Compass, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-cream-100">
      {/* Left panel — decorative */}
      <div className="hidden lg:flex lg:w-1/2 hero-gradient relative overflow-hidden flex-col items-center justify-center p-16">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/svg%3E\")"
        }} />
        <div className="relative text-center text-white">
          <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/30">
            <Compass className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold font-display mb-4">Plan your<br />perfect journey</h2>
          <p className="text-teal-100 text-lg max-w-xs mx-auto">
            Build itineraries, track budgets, discover cities — all in one place.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4 text-center">
            {[['10+','Destinations'],['50+','Activities'],['Free','Forever']].map(([v,l]) => (
              <div key={l} className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/20">
                <p className="text-2xl font-bold font-display">{v}</p>
                <p className="text-teal-100 text-sm">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md animate-slide-up">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3"
              style={{ background: 'linear-gradient(135deg, #2E7D6B, #3D9B85)' }}>
              <Compass className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold font-display text-[#2E7D6B]">Traveloop</h1>
          </div>

          <h1 className="text-3xl font-bold font-display text-ink-900 mb-1">Welcome back 👋</h1>
          <p className="text-ink-300 mb-8">Sign in to continue your journey</p>

          <div className="card p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3 text-red-600 text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="input-label">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-300" />
                  <input
                    id="login-email" type="email" placeholder="you@example.com"
                    className="input pl-11" value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })} required
                  />
                </div>
              </div>

              <div>
                <label className="input-label">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-300" />
                  <input
                    id="login-password" type={showPass ? 'text' : 'password'}
                    placeholder="••••••••" className="input pl-11 pr-11"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })} required
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-300 hover:text-[#2E7D6B] transition-colors">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button id="login-submit" type="submit" className="btn-primary w-full justify-center" disabled={loading}>
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>

            <div className="divider" />
            <p className="text-center text-ink-300 text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-[#2E7D6B] hover:text-[#2E7D6B] font-semibold transition-colors">
                Create one free →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
