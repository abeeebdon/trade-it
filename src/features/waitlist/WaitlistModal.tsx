import api from '@/configs/api-config';
import { Loader2, X } from 'lucide-react';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { ROLES, RoleType } from '../authentication/components/data';
import { useAppDispatch, useAppSelector } from '@/hooks/store/store';
import { setWaitlistModalDetails } from '@/store/waitlist/waitlist.slice';

interface WaitlistModalProps {
  show: boolean;
  onClose: () => void;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  roleToSignFor: 'exporter' | 'buyer' | null;
}
const WaitlistModal = ({ show, onClose }: WaitlistModalProps) => {
  const modalDetails = useAppSelector((state) => state.wait.modalDetails);
  const dispatch = useAppDispatch();
  const [fullname, setFullname] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(modalDetails.email ?? '');
  const [roleValue, setRoleValue] = useState(modalDetails.role ?? '');
  const [error, setError] = useState('');
  const handleClose = () => {
    setTimeout(() => {
      setError('');
      onClose();
    }, 300);
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError('');
    if (!fullname.trim()) {
      setError('Please enter a full name');
      return;
    }
    if (!roleValue.trim()) {
      toast.error('Please select the role u will love to sign up for');
      return;
    }
    try {
      setLoading(true);
      const postData = {
        email: email.trim(),
        fullname: fullname,
        role: roleValue,
        CustomerType: roleValue,
      };
      const res = await api.post('/Waitlist', postData);
      if (res.data?.success) {
        setEmail('');
        setFullname('');
        toast.success(
          res.data?.message ||
            'You have been added to the waitlist! We will notify you when we launch.',
        );
        const details = { email: '', role: '' };
        dispatch(setWaitlistModalDetails(details));
        handleClose();
        return;
      } else {
        return;
      }
    } catch (err: unknown) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const message = (error as any)?.response?.data?.message;
      toast.error(
        message ?? 'An error occurred during registration. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };
  type SelectOption = {
    label: string;
    value: 'exporter' | 'retailer' | 'consumer';
  };

  const roles: SelectOption[] = [
    { label: 'Exporter', value: 'exporter' },
    { label: 'Retailer', value: 'retailer' },
    { label: 'Consumer', value: 'consumer' },
  ];
  const roleBlurb: RoleType | undefined = useMemo(() => {
    return roleValue !== ''
      ? ROLES.find((r) => r.value === roleValue)
      : ({} as RoleType);
  }, [roleValue]);
  return (
    <div className="fixed inset-0 z-9999 w-full bg-black/40 left-0 top-0 right-0 bottom-0 flex items-center justify-center">
      <div className="bg-[#50045a] w-[90%] max-w-lg p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between ">
          <h2 className="text-lg font-bold mb-4">Join the Waitlist</h2>
          <X onClick={onClose} />
        </div>
        <p className="text-gray-200 mb-4">
          Thank you for your interest! We&apos;ll notify you when we launch.
        </p>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="js-input"
          />
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Enter your full name"
              value={fullname}
              onChange={(e) => {
                setFullname(e.target.value);
                setError('');
              }}
              className="js-input"
            />
            {error && (
              <p className="ml-1 mt-1 text-[10px] text-danger">{error}</p>
            )}
          </div>
          <div className="flex flex-col">
            <select
              className=" js-select border text-sm p-2"
              value={roleValue}
              onChange={(e) => setRoleValue(e.target.value)}
            >
              <option value="">Select the role you want to signup for</option>
              {roles.map(({ label, value }, i) => {
                return (
                  <option key={i} className="" value={value}>
                    {label}
                  </option>
                );
              })}
            </select>

            <p className="ml-3  mt-1 text-[#828ada]">{roleBlurb?.sub ?? ''}</p>
          </div>
          <div className="mt-4 flex justify-end items-center">
            <button
              disabled={loading}
              className="helix-btn-primary flex justify-center items-center w-full max-w-40"
              type="submit"
            >
              {loading ? (
                <Loader2 className="animate-spin " color="white" />
              ) : (
                'Submit'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WaitlistModal;
