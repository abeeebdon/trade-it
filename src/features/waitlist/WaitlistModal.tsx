import api from '@/configs/api-config';
import { Loader2, X } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'sonner';

interface WaitlistModalProps {
  show: boolean;
  onClose: () => void;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  roleToSignFor: 'exporter' | 'buyer' | null;
}
const WaitlistModal = ({
  show,
  onClose,
  roleToSignFor,
  email,
  setEmail,
}: WaitlistModalProps) => {
  const [fullname, setFullname] = useState('');
  const [loading, setLoading] = useState(false);
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
    try {
      setLoading(true);
      const postData = {
        email: email.trim(),
        fullname: fullname,
        role: roleToSignFor ?? 'buyer',
        CustomerType: roleToSignFor ?? 'buyer',
      };
      const res = await api.post('/Waitlist', postData);
      if (res.data?.success) {
        setEmail('');
        setFullname('');
        toast.success(
          res.data?.message ||
            'You have been added to the waitlist! We will notify you when we launch.',
        );
        handleClose();
        return;
      } else {
        console.log('Waitlist response:', res);
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
  return (
    <div className="fixed inset-0 z-9999 w-full bg-black/20 left-0 top-0 right-0 bottom-0 flex items-center justify-center">
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
