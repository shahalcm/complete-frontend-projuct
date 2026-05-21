import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Shield, LogOut, Settings, PackageOpen } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { addToast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem('user_token');
    if (token) {
      try {
        setUser(JSON.parse(token));
      } catch (e) {
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user_token');
    window.dispatchEvent(new Event('authChange'));
    addToast('Logged out successfully', 'success');
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background text-foreground py-12 lg:py-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8">My Account</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="col-span-1 border border-border bg-card/50 glass rounded-3xl p-6 shadow-sm h-fit">
            <div className="flex flex-col items-center pb-6 border-b border-border">
              <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-4xl font-bold shadow-inner mb-4">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-muted-foreground">{user.email || 'user@example.com'}</p>
            </div>
            
            <div className="py-6 flex flex-col gap-2">
              <button className="flex items-center gap-3 px-4 py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold rounded-xl transition-colors">
                <User size={20} /> Personal Info
              </button>
              <button className="flex items-center gap-3 px-4 py-3 hover:bg-muted text-foreground font-semibold rounded-xl transition-colors">
                <PackageOpen size={20} /> My Orders
              </button>
              <button className="flex items-center gap-3 px-4 py-3 hover:bg-muted text-foreground font-semibold rounded-xl transition-colors">
                <Settings size={20} /> Settings
              </button>
            </div>
            
            <div className="pt-6 border-t border-border">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 dark:bg-red-950/20 dark:text-red-400 font-bold rounded-xl hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors shadow-sm"
              >
                <LogOut size={20} /> Logout
              </button>
            </div>
          </div>
          
          {/* Main Info Area */}
          <div className="col-span-1 lg:col-span-2 space-y-8">
            <div className="border border-border bg-card/50 glass rounded-3xl p-8 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
              <h3 className="text-2xl font-bold mb-6 relative z-10">Personal Information</h3>
              <div className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                        <User size={18} />
                      </div>
                      <input type="text" disabled value={user.name} className="w-full pl-10 pr-4 py-2.5 bg-muted/50 border border-border rounded-xl focus:outline-none text-foreground font-medium" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                        <Mail size={18} />
                      </div>
                      <input type="email" disabled value={user.email || 'N/A'} className="w-full pl-10 pr-4 py-2.5 bg-muted/50 border border-border rounded-xl focus:outline-none text-foreground font-medium" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Role</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-500">
                      <Shield size={18} />
                    </div>
                    <input type="text" disabled value={user.role || 'Customer'} className="w-full pl-10 pr-4 py-2.5 bg-muted/50 border border-border rounded-xl focus:outline-none text-foreground font-medium capitalize" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
