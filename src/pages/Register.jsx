import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, UserPlus, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link, Route, Routes, useNavigate } from 'react-router';
import { registerValidation } from '../validations/auth.validation';
import Login from './Login';
import { supabase } from '../lib/supabase';

const InputField = ({ label, icon: Icon, type = 'text', placeholder, value, onChange, onToggle, showValue, disabled }) => (
  <div>
    <label className="block text-sm font-medium text-text-primary mb-2">{label}</label>
    <div className="relative group">
      <Icon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-success opacity-60 group-focus-within:opacity-100" />
      <input
        type={showValue ? 'text' : type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="border-field w-full pr-12 pl-12 py-3 rounded-lg border-2 border-border bg-surface focus:border-success outline-none transition-all text-text-primary placeholder-text-secondary"
      />
      {onToggle && (
        <button
          type="button"
          onClick={onToggle}
          disabled={disabled}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-success"
        >
          {showValue ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      )}
    </div>
  </div>
);

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const validate = () => {
    const validation = registerValidation.safeParse({ fullName, email, password, confirmPassword });

    if (!validation.success) {
      toast.error(validation.error.issues[0].message);
      return;
    }
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: fullName,
        },
      },
    });

    if (error) {
      console.error(error.message);
      setLoading(false);
      return toast.error('ثبت نام نا موفق!');
    }

    console.log(data);

    setLoading(false);
    toast.success('ثبت نام موفق!');
    setFullName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    navigate('/tracker');
  }

  const strength = password.length >= 8 ? 'قوی' : password.length >= 6 ? 'متوسط' : password.length < 6 && password.length > 0 ? 'حداقل 6 کارکتر لازم است' : '';

  return (
    <>
      <div className="min-h-screen bg-surface flex items-center justify-center px-4 py-8">

        <div className="relative w-full max-w-md">
          <div className="card rounded-2xl p-8 md:p-10">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center shadow-lg mx-auto mb-4">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">ثبت نام</h1>
              <p className="text-text-secondary">یک حساب کاربری جدید ایجاد کنید</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <InputField
                label="نام کامل"
                icon={User}
                placeholder="نام و نام خانوادگی"
                value={fullName}
                onChange={(e) =>
                  setFullName(e.target.value)}
                disabled={loading} />

              <InputField
                label="ایمیل"
                icon={Mail}
                type="email"
                placeholder="you@gmail.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)}
                disabled={loading} />

              <div>
                <label className="block text-sm text-text-primary mb-2">رمز عبور</label>
                <div className="relative group">
                  <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-success opacity-50 group-focus-within:opacity-100" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="border-field w-full pr-12 pl-12 py-3 rounded-lg border-2 border-border bg-surface focus:border-success outline-none transition-all text-text-primary"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)}
                    disabled={loading}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-success">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {strength && <p className={`text-xs mt-1 ${strength === 'قوی' ? 'text-success' : 'text-warning'}`}> {password.length >= 6 && 'سطح رمزعبور:'} {strength}</p>}
              </div>

              <InputField
                label="تأیید رمز عبور"
                icon={Lock}
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)}
                showValue={showConfirmPassword}
                onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={loading} />

              {password && confirmPassword && (
                <div className="flex items-center gap-2 text-xs">
                  {password === confirmPassword ? (
                    <>
                      <Check className="w-4 h-4 text-success" />
                      <span className="text-success">رمز‌های عبور مطابقت دارند</span>
                    </>
                  ) : (
                    <>
                      <div className="w-4 h-4 rounded-full bg-danger flex items-center justify-center text-white text-xs">×</div>
                      <span className="text-danger">مطابقت ندارند</span>
                    </>
                  )}
                </div>
              )}


              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-success to-success/80 hover:from-success/90 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-70 transform hover:-translate-y-0.5 transition-all mt-6">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>در حال ثبت نام...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    <span>ثبت نام</span>
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-sm text-text-secondary mt-6">
              حساب کاربری دارید؟ <Link to='/login' className="text-success hover:text-success/80 font-semibold">ورود کنید</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;