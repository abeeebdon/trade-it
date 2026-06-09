'use client';
import { useState } from 'react';
import { useAppSelector } from '@/hooks/store/store';
import ProfileStep1 from '../components/ProfileStep1';
import ProfileStep2 from '../components/ProfileStep2';
import { Business, KYCForm } from '../types/buyers';
import Steppers from '../components/Steppers';

export default function ProfileManagement() {
  const { user } = useAppSelector((state) => state.auth);
  const [biz, setBiz] = useState<Business>({} as Business);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    business_name: '',
    registration_type: 'business',
    country: 'Nigeria',
    sector: 'fashion',
    role: user?.role || 'exporter',
    cac_number: '',
    tin: '',
    bvn: '',
    nin: '',
    ein: '',
    director_name: '',
    contact_phone: '',
    contact_email: user?.email || '',
    address: '',
  });
  const [kycForm, setKycForm] = useState<KYCForm>({
    bvn: '',
    nin: '',
    cac_number: '',
    tin: '',
    director_name: '',
    docs: [],
  });

  //   useEffect(() => {
  //     (async () => {
  //       try {
  //         const { data } = await api.get('/businesses/me');
  //         if (data) {
  //           setBiz(data);
  //           setStep(2);
  //           setKycForm({
  //             bvn: data.bvn || '',
  //             nin: data.nin || '',
  //             cac_number: data.cac_number || '',
  //             tin: data.tin || '',
  //             director_name: data.director_name || '',
  //             docs: [],
  //           });
  //         }
  //       } finally {
  //         setLoading(false);
  //       }
  //     })();
  //   }, []);

  // const upd = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  //   const createBiz = async (e) => {
  //     e.preventDefault();
  //     try {
  //       const { data } = await api.post('/businesses', form);
  //       setBiz(data);
  //       toast.success('Business profile created. Anchor customer provisioned.');
  //       await refresh();
  //       setStep(2);
  //     } catch (err) {
  //       toast.error(err.response?.data?.detail || 'Failed to create business');
  //     }
  //   };

  //   const uploadDoc = async (e) => {
  //     const files = Array.from(e.target.files || []);
  //     for (const f of files) {
  //       const fd = new FormData();
  //       fd.append('file', f);
  //       try {
  //         const { data } = await api.post('/upload?kind=kyc', fd, {
  //           headers: { 'Content-Type': 'multipart/form-data' },
  //         });
  //         setKycForm((k) => ({ ...k, docs: [...k.docs, data.storage_path] }));
  //         toast.success(`Uploaded ${f.name}`);
  //       } catch {
  //         toast.error(`Failed to upload ${f.name}`);
  //       }
  //     }
  //   };

  //   const submitKyc = async () => {
  //     try {
  //       const endpoint = biz.registration_type === 'business' ? 'kyb' : 'kyc';
  //       await api.post(`/businesses/${biz.id}/${endpoint}`, kycForm);
  //       toast.success('Documents submitted — under review');
  //       const { data } = await api.get('/businesses/me');
  //       setBiz(data);
  //     } catch (err) {
  //       toast.error(err.response?.data?.detail || 'Submission failed');
  //     }
  //   };

  const createBiz = (biz: Business) => {
    setBiz(biz);
  };
  return (
    <main>
      <div className="max-w-4xl">
        {/* Stepper */}
        <Steppers biz={biz} step={step} />

        {step === 1 && <ProfileStep1 setStep={setStep} createBiz={createBiz} />}

        {step >= 2 && biz && (
          <ProfileStep2 biz={biz} kycForm={kycForm} setKycForm={setKycForm} />
        )}
      </div>
    </main>
  );
}
