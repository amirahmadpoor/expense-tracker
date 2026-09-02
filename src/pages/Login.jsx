import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link, Route, Routes, useNavigate, useParams } from 'react-router';
import Register from './Register';
import { loginValidation } from '../validations/auth.validation';
import { supabase } from '../lib/supabase';

const InputField = ({ icon: Icon, type = 'text', placeholder, value, onChange, onToggle, showValue, disabled }) => (
  <div className="relative group">
    <Icon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary opacity-60 group-focus-within:opacity-100" />
    <input
      type={showValue ? 'text' : type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className="border-field w-full pr-12 pl-12 py-3 rounded-lg border-2 border-border bg-surface focus:border-primary outline-none transition-all text-text-primary placeholder-text-secondary"
    />
    {onToggle && (
      <button
        type="button"
        onClick={onToggle}
        disabled={disabled}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-primary"
      >
        {showValue ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
      </button>
    )}
  </div>
);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const validation = loginValidation.safeParse({ email, password });

    if (!validation.success) {
      toast.error(validation.error.issues[0].message);
      return;
    }

    return true;
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(error.message);
      setLoading(false);
      return toast.error('ورود نا موفق!');
    }

    console.log(data);


    setLoading(false);
    if (rememberMe) localStorage.setItem('rememberEmail', email);
    toast.success('خوش آمدید!');
    setEmail('');
    setPassword('');
    navigate('/tracker');
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4">
      <div className="relative w-full max-w-md">
        <div className="card rounded-2xl p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg mx-auto mb-4">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">مدیریت هزینه</h1>
            <p className="text-text-secondary">خوش آمدید! لطفا وارد شوید</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">ایمیل</label>
              <InputField
                icon={Mail}
                placeholder="you@gamil.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)}
                disabled={loading} />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">رمز عبور</label>
              <InputField
                icon={Lock}
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)}
                showValue={showPassword}
                onToggle={() => setShowPassword(!showPassword)}
                disabled={loading} />
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="w-4 h-4 rounded border-2 border-border bg-surface checked:bg-primary cursor-pointer bg-accent-primary" disabled={loading} />
                <span className="text-sm text-text-secondary">مرا به خاطر داشته باش</span>
              </label>
              <a href="#" className="text-sm text-primary hover:text-primary/80 font-medium">فراموش کردم</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-70 transform hover:-translate-y-0.5 transition-all">
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>در حال ورود...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>ورود</span>
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-text-secondary mt-6">
            حساب کاربری ندارید؟ <Link to='/register' className="text-primary hover:text-primary/80 font-semibold">ثبت نام کنید</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login