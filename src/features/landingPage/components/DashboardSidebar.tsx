import ThemeToggle from '@/components/buttons/ToggleButton';
import { cn } from '@/lib/cn';
import { LogOut, X } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import LogoutModal from './LogoutModal';
import { useAppDispatch, useAppSelector } from '@/hooks/store/store';
import { NAV } from './data';
import { useState } from 'react';
import { logout } from '@/store/auth/auth.slice';
import { logoutAction } from '@/features/authentication/components/helper';
interface Props {
  setOpenSideBar: (open: boolean) => void;
  openSidebar: boolean;
}
const DashboardSidebar = ({ setOpenSideBar, openSidebar }: Props) => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const items = NAV[user?.role ?? 'admin'] || NAV.exporter;

  const handlelogout = () => {
    setLoading(true);
    setTimeout(() => {
      logoutFn();
      setLoading(false);
    }, 2000);
  };
  const logoutFn = async () => {
    await logoutAction();
    dispatch(logout());
    router.push('/login');
  };

  return (
    <>
      {openSidebar && (
        <div
          className="fixed w-full inset-0 bg-black opacity-10 h-screen z-40"
          onClick={() => setOpenSideBar(false)}
        ></div>
      )}
      <article
        className={cn(
          'fixed inset-y-0 right-0 z-50 w-2/3 max-w-64 bg-bg h-screen  justify-between p-4 flex flex-col  shadow-lg sm:hidden transform transition-transform duration-600  ease-in-out ',
          !openSidebar ? 'translate-x-full' : 'translate-x-0',
        )}
      >
        <article>
          <div className="flex items-center justify-between">
            <ThemeToggle />
            <motion.button onClick={() => setOpenSideBar(false)}>
              <X className="cursor-pointer text-text hover:text-text/20" />
            </motion.button>
          </div>
          <nav className="flex-1  py-4 overflow-y-auto">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = item.to === pathname;
              return (
                <Link
                  key={item.to}
                  href={item.to}
                  onClick={() => setOpenSideBar(false)}
                  data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`group flex items-center gap-3 px-4 lg:px-6 py-3 border-l-2 transition-colors ${
                    isActive
                      ? 'border-[#C9922A] bg-[#C9922A]/6 text-[#C9922A]'
                      : 'border-transparent text-muted hover:text-text hover:bg-[#1A7A6E]/8'
                  }`}
                >
                  {<Icon size={18} />}
                  <span className=" text-[13px] font-medium tracking-wide">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </article>

        <article>
          <div className="border-t border-[#1A7A6E]/15 px-3 lg:px-4 py-3">
            <div className="hidden lg:flex items-center gap-2 mb-3 px-2">
              <div className="w-8 h-8 rounded-full bg-[#C9922A]/20 border border-[#C9922A]/40 flex items-center justify-center text-[#C9922A] font-bold text-xs">
                {user?.fullName?.[0] || 'H'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[12px] font-medium truncate">
                  {user?.fullName}
                </div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#1A7A6E]">
                  {user?.role}
                </div>
              </div>
            </div>
            <button
              data-testid="logout-btn"
              onClick={() => setShowLogoutModal(true)}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded text-muted hover:text-text hover:bg-[#1A7A6E]/10 text-[12px] transition-colors"
            >
              <LogOut size={16} />
              <span className="">Sign out</span>
            </button>
          </div>
        </article>
      </article>
      <LogoutModal
        open={showLogoutModal}
        onConfirm={handlelogout}
        onClose={() => setShowLogoutModal(false)}
        loading={loading}
      />
    </>
  );
};

export default DashboardSidebar;
