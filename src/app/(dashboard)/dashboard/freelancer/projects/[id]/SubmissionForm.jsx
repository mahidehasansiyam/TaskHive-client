'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaLink, FaArrowRight } from 'react-icons/fa6';
import { toast } from 'react-toastify';

export default function SubmissionForm({ proposalId }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ error: false, text: '' });

  // Next.js Server Action running database task securely on form execution
  const handleFormSubmit = async (formData) => {
    const projectUrl = formData.get('projectUrl');
    const clientComments = formData.get('clientComments');
    setLoading(true);
    

    console.log(projectUrl);
    console.log(proposalId);


    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/submit-task/${proposalId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ projectUrl }),
        },
      );

      const data = await response.json();

      if (data.success) {
        toast.success('Task submitted successfully');
        setLoading(false);
        router.push('/dashboard/freelancer');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to submit task');
      setLoading(false);
    }
    

  };

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6 sm:p-8 lg:sticky lg:top-6">
      <h3 className="font-bold text-xl text-[#00174d] mb-1">Submit Task</h3>
      <p className="text-xs text-zinc-500 mb-6">Provide the execution links and notes for review.</p>

      {/* action calls the handler natively through Next.js server pipeline */}
      <form action={handleFormSubmit} className="space-y-5">
        {/* Project Link Input */}
        <div>
          <label htmlFor="projectUrl" className="block text-xs font-bold text-[#00174d] tracking-wide uppercase mb-2">
            Project Deliverable URL
          </label>
          <div className="relative rounded-xl">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
              <FaLink className="text-[#00174d] text-sm" />
            </div>
            <input
              type="url"
              name="projectUrl"
              id="projectUrl"
              placeholder="https://github.com/... or production URL"
              className="block w-full rounded-xl border-2 border-[#00174d] py-3 pl-10 pr-4 text-[#00174d] placeholder:text-zinc-400 font-medium sm:text-sm focus:ring-2 focus:ring-[#082f99] outline-none"
              required
              disabled={loading}
            />
          </div>
        </div>

        {/* Client Notes Field */}
        <div>
          <label htmlFor="clientComments" className="block text-xs font-bold text-[#00174d] tracking-wide uppercase mb-2">
            Notes for Client
          </label>
          <textarea
            id="clientComments"
            name="clientComments"
            rows={5}
            placeholder="Summarize key features, details, or leave deployment directions..."
            className="block w-full rounded-xl border-2 border-[#00174d] p-4 text-[#00174d] placeholder:text-zinc-400 font-medium sm:text-sm focus:ring-2 focus:ring-[#082f99] outline-none resize-none"
            disabled={loading}
          />
        </div>

        {/* Dynamic Status Display Messages */}
        {statusMessage.text && (
          <p className={`text-xs font-bold ${statusMessage.error ? 'text-rose-600' : 'text-emerald-600'}`}>
            {statusMessage.text}
          </p>
        )}

        {/* Trigger Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#082f99] px-4 py-3.5 text-sm font-bold text-white shadow-md hover:bg-[#06247a] active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Submitting to database...' : 'Submit Project Deliverable'}
          {!loading && <FaArrowRight className="text-xs" />}
        </button>
      </form>
    </div>
  );
}