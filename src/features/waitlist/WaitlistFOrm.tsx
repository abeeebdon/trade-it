import { useState } from 'react';
interface WaitlistFormProps {
  type: string;
  testid: string;
  dark?: boolean;
  ctaLabel?: string;
}
export default function WaitlistForm({
  type,
  testid,
  dark = false,
  ctaLabel = 'Notify Me →',
}: WaitlistFormProps) {
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);

  //   const submit = async (e) => {
  //     e.preventDefault();
  //     if (!email) return;
  //     setBusy(true);
  //     try {
  //       const { data } = await api.post('/waitlist/signup', { email, type });
  //       const title =
  //         type === 'exporter'
  //           ? '🇳🇬 Exporter Waitlist'
  //           : type === 'buyer'
  //             ? '🇺🇸 Buyer Waitlist'
  //             : 'Waitlist';
  //       if (data.status === 'already_on_list') {
  //         toast(`Already on the list as ${email}.`, {
  //           description: "We'll notify you when JompShop goes live.",
  //           duration: 5000,
  //         });
  //       } else {
  //         toast(title, {
  //           description: `You're on the list. We'll notify you at ${email} when JompShop goes live.`,
  //           duration: 5000,
  //         });
  //       }
  //       setEmail('');
  //     } catch (err) {
  //       toast.error(
  //         err.response?.data?.detail || "Couldn't subscribe — try again.",
  //       );
  //     } finally {
  //       setBusy(false);
  //     }
  //   };
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
  };
  return (
    <form
      onSubmit={submit}
      className={`js-form ${dark ? 'js-form-dark' : ''}`}
      data-testid={testid}
    >
      <input
        type="email"
        placeholder="Enter your email address"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
        className="js-input"
        data-testid={`${testid}-input`}
      />
      <button
        type="submit"
        disabled={busy}
        className="js-btn js-btn-gold pulse-gold"
        data-testid={`${testid}-submit`}
      >
        {busy ? 'Adding…' : ctaLabel}
      </button>
    </form>
  );
}
