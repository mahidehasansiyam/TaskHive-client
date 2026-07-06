'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

/* ── Icons ── */
const MailIcon = () => (
  <svg
    className="w-3.5 h-3.5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);
const EditIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);
const SaveIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
    />
  </svg>
);
const XIcon = () => (
  <svg
    className="w-3.5 h-3.5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.5"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

/* ── Component ── */
const Profile = ({ user }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    image: user?.image || '',
    bio: user?.bio || '',
    hourlyRate: user?.hourlyRate || 0,
  });

  const [skills, setSkills] = useState(user?.skills || []);
  const [newSkill, setNewSkill] = useState('');

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addSkill = () => {
    const trimmed = newSkill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setNewSkill('');
    }
  };

  const removeSkill = skill => setSkills(skills.filter(s => s !== skill));

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/update`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            hourlyRate: Number(formData.hourlyRate),
            skills,
            email: user.email,
          }),
        },
      );
      const result = await res.json();
      if (result.success) {
        toast.success('Profile saved!');
        setIsModalOpen(false);
        router.refresh();
      }
    } finally {
      setIsSaving(false);
    }
  };

  const initials =
    user?.name
      ?.split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'U';

  return (
    <div className="min-h-screen bg-slate-50 px-1 py-8 sm:px-1 sm:py-12">
      <div className="max-w-3xl mx-auto">
        {/* ── Page header ── */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              My Profile
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage your professional digital presence
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-[#f07300] hover:bg-[#d86500] active:scale-95 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm shadow-orange-200 transition-all duration-150 shrink-0 ml-4"
          >
            <EditIcon />
            <span className="hidden sm:inline">Edit Profile</span>
            <span className="sm:hidden">Edit</span>
          </button>
        </div>

        {/* Profile card — remove overflow-hidden */}
<div className="bg-white rounded-3xl border border-slate-100 shadow-sm">  {/* ← no overflow-hidden */}

  {/* Banner */}
  <div className="h-36 sm:h-48 bg-gradient-to-br from-orange-400 via-[#f07300] to-amber-500 relative rounded-t-3xl">
    <div className="absolute inset-0 opacity-20 rounded-t-3xl"
      style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, white 0%, transparent 60%)' }}
    />
  </div>

  {/* Body */}
  <div className="px-5 sm:px-8 pb-8">

    {/* Avatar row */}
    <div className="flex items-end justify-between -mt-12 sm:-mt-16 mb-5">
      <div className="relative z-10 w-24 h-24 sm:w-32 sm:h-32 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-orange-50 flex items-center justify-center shrink-0">
        {formData.image ? (
          <img src={formData.image} alt={user?.name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-2xl sm:text-3xl font-black text-orange-400">{initials}</span>
        )}
      </div>

      {/* Hourly rate */}
      <div className="mb-1 text-right">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hourly Rate</p>
        <p className="text-2xl sm:text-3xl font-black text-[#f07300] leading-tight">
          ${formData.hourlyRate}
          <span className="text-xs font-semibold text-slate-400 ml-0.5">/hr</span>
        </p>
      </div>
    </div>


            {/* Name + email */}
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-1.5">
                {user?.name}
              </h2>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-500 text-xs font-medium">
                <MailIcon />
                {user?.email}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-100 mb-6" />

            {/* About */}
            <div className="mb-6">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                About Me
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {formData.bio || (
                  <span className="text-slate-300 italic">
                    No bio yet — click Edit Profile to add one.
                  </span>
                )}
              </p>
            </div>

            {/* Skills */}
            {skills.length > 0 && (
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Skills & Expertise
                </p>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs sm:text-sm font-semibold"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Edit Modal ── */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4"
          onClick={e => e.target === e.currentTarget && setIsModalOpen(false)}
        >
          <div className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-100 flex flex-col max-h-[92vh] sm:max-h-[88vh]">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 shrink-0">
              {/* Drag handle on mobile */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 bg-slate-200 rounded-full sm:hidden" />
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Edit Profile
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update your professional details
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <XIcon />
              </button>
            </div>

            {/* Scrollable form body */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
              <div className="px-6 py-5 space-y-5">
                {/* Photo URL */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Profile Photo URL
                  </label>
                  <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus-within:border-[#f07300] focus-within:bg-white focus-within:ring-2 focus-within:ring-orange-100 transition-all">
                    <input
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      className="flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder-slate-400 min-w-0"
                      placeholder="https://example.com/photo.jpg"
                    />
                    {formData.image && (
                      <img
                        src={formData.image}
                        alt=""
                        className="w-7 h-7 rounded-lg object-cover shrink-0 border border-slate-200"
                      />
                    )}
                  </div>
                </div>

                {/* Hourly rate */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Hourly Rate (USD)
                  </label>
                  <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus-within:border-[#f07300] focus-within:bg-white focus-within:ring-2 focus-within:ring-orange-100 transition-all">
                    <span className="text-slate-400 text-sm mr-2 select-none">
                      $
                    </span>
                    <input
                      type="number"
                      name="hourlyRate"
                      value={formData.hourlyRate}
                      onChange={handleInputChange}
                      className="flex-1 bg-transparent text-sm font-semibold text-slate-800 outline-none"
                      placeholder="0"
                      min="0"
                    />
                    <span className="text-slate-400 text-xs ml-2 select-none">
                      /hr
                    </span>
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:border-[#f07300] focus:bg-white focus:ring-2 focus:ring-orange-100 outline-none transition-all resize-none placeholder-slate-400 leading-relaxed"
                    placeholder="Tell clients about your background and expertise..."
                  />
                </div>

                {/* Skills */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Skills & Tags
                    </label>
                    <span className="text-xs font-semibold text-orange-500 bg-orange-50 px-2.5 py-1 rounded-full">
                      {skills.length} added
                    </span>
                  </div>

                  {/* Skills pills */}
                  {skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl min-h-[52px]">
                      {skills.map((s, i) => (
                        <span
                          key={i}
                          className="flex items-center gap-1.5 pl-3 pr-2 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-700 shadow-sm"
                        >
                          {s}
                          <button
                            type="button"
                            onClick={() => removeSkill(s)}
                            className="w-4 h-4 flex items-center justify-center rounded-full text-slate-300 hover:bg-red-50 hover:text-red-400 transition-colors"
                          >
                            <XIcon />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Add skill input */}
                  <div className="flex gap-2">
                    <input
                      value={newSkill}
                      onChange={e => setNewSkill(e.target.value)}
                      onKeyDown={e =>
                        e.key === 'Enter' && (e.preventDefault(), addSkill())
                      }
                      placeholder="e.g. React, UI/UX, TypeScript..."
                      className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-[#f07300] focus:bg-white focus:ring-2 focus:ring-orange-100 outline-none transition-all placeholder-slate-400"
                    />
                    <button
                      type="button"
                      onClick={addSkill}
                      className="px-5 py-3 bg-[#f07300] hover:bg-[#d86500] active:scale-95 text-white text-sm font-bold rounded-xl transition-all shrink-0"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Sticky save button */}
              <div className="px-6 pb-6 pt-3 border-t border-slate-100 shrink-0 bg-white">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full flex items-center justify-center gap-2 bg-[#f07300] hover:bg-[#d86500] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl shadow-sm shadow-orange-200 transition-all duration-150 text-sm"
                >
                  {isSaving ? (
                    <>
                      <svg
                        className="animate-spin w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <SaveIcon />
                      Save Profile Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
