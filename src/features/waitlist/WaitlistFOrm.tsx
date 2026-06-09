import { useAppDispatch } from '@/hooks/store/store';
import { setWaitlistModalDetails } from '@/store/waitlist/waitlist.slice';
import { Dispatch, SetStateAction, useState } from 'react';
interface WaitlistFormProps {
  dark?: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  type: string;
  ctaLabel?: string;
  funcEMail: string;
  setFuncEmail: (email: string) => void;
}
export default function WaitlistForm({
  dark = false,
  type,
  ctaLabel = 'Notify Me →',
  setOpenModal,
  funcEMail,
  setFuncEmail,
}: WaitlistFormProps) {
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.trim());
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setError('');
    e.preventDefault();
    if (!funcEMail.trim()) {
      setError('Email is required');
      return;
    }
    if (!validateEmail(funcEMail)) {
      setError('Please enter a valid email address');
      return;
    }
    setOpenModal(true);
    setFuncEmail(funcEMail.trim());
    const details = {
      email: funcEMail,
      role: type === 'exporter' ? 'exporter' : type == 'hero' ? '' : 'consumer',
    };
    dispatch(setWaitlistModalDetails(details));
  };

  return (
    <main className="relative">
      <form
        onSubmit={handleSubmit}
        className={`js-form-container relative ${type === 'hero' ? 'mx-auto' : ''}`}
      >
        <div className={`js-form ${dark ? 'js-form-dark' : ''}`}>
          <input
            type="text"
            placeholder="Enter your email address"
            value={funcEMail}
            onChange={(e) => {
              setFuncEmail(e.target.value);
              if (error) setError('');
            }}
            className="js-input"
          />
          <button
            type="submit"
            className="js-btn w-full sm:w-fit text-center  js-btn-gold pulse-gold"
          >
            {ctaLabel}
          </button>
        </div>
        {error && (
          <p className="text-left text-[10px] ml-2 text-danger mt-1">{error}</p>
        )}
      </form>
    </main>
  );
}
