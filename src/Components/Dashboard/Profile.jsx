'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Icons ── */
const MailIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);
const EditIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);
const SaveIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
  </svg>
);
const XIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
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
            email: user?.email,
          }),
        },
      );
      const result = await res.json();
      if (result.success) {
        toast.success('Profile saved successfully!');
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
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-8 sm:py-12 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        {/* ── Page header ── */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-start justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              My Profile
            </h1>
            <p className="text-sm text-slate-500 mt-2 font-medium">
              Manage your professional digital presence
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-[#f07300] hover:from-[#e06700] hover:to-[#d86500] active:scale-95 text-white text-[15px] font-bold px-6 py-3 rounded-2xl shadow-lg shadow-orange-500/20 transition-all duration-200 shrink-0 ml-4 border-none"
          >
            <EditIcon />
            <span className="hidden sm:inline">Edit Profile</span>
            <span className="sm:hidden">Edit</span>
          </button>
        </motion.div>

        {/* Profile card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-[32px] border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-colors duration-300 relative z-0"
        >
          {/* Banner */}
          <div className="h-44 sm:h-56 bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 relative rounded-t-[32px] overflow-hidden">
            <div 
              className="absolute inset-0 opacity-20 mix-blend-overlay"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}
            />
          </div>

          {/* Body */}
          <div className="px-6 sm:px-10 pb-10">
            {/* Avatar row */}
            <div className="flex items-end justify-between -mt-16 sm:-mt-20 mb-6 relative z-10">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-[6px] border-white shadow-xl overflow-hidden bg-gradient-to-br from-orange-100 to-amber-50 flex items-center justify-center shrink-0 transition-colors duration-300">
                {formData.image ? (
                  <img src={formData.image} alt={user?.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl sm:text-5xl font-black text-orange-500">{initials}</span>
                )}
              </div>

              {/* Hourly rate */}
              <div className="mb-2 text-right bg-white/80 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-0.5 transition-transform">
                <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5">Rate</p>
                <p className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500 leading-none">
                  ${formData.hourlyRate}
                  <span className="text-[13px] font-bold text-slate-400 ml-1">/hr</span>
                </p>
              </div>
            </div>

            {/* Name + email */}
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2.5">
                {user?.name}
              </h2>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-600 text-[14px] font-semibold transition-colors duration-300">
                <MailIcon />
                {user?.email}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-100 mb-8 transition-colors duration-300" />

            {/* About */}
            <div className="mb-8">
              <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 mb-4">
                <span className="w-1.5 h-6 bg-amber-500 rounded-full inline-block"></span>
                About Me
              </h3>
              <p className="text-slate-600 text-[15px] sm:text-base leading-relaxed whitespace-pre-wrap font-medium">
                {formData.bio || (
                  <span className="text-slate-400 italic font-normal">
                    No bio yet — click Edit Profile to add one.
                  </span>
                )}
              </p>
            </div>

            {/* Skills */}
            {skills.length > 0 && (
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-6 bg-indigo-500 rounded-full inline-block"></span>
                  Skills & Expertise
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {skills.map((s, i) => (
                    <span
                      key={i}
                      className="px-4 py-2.5 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-xl text-[13px] sm:text-sm font-bold shadow-sm transition-colors duration-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* ── Edit Modal ── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={e => e.target === e.currentTarget && setIsModalOpen(false)}
            />
            
            <motion.div 
              initial={{ y: "100%", opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: "100%", opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-white w-full sm:max-w-xl rounded-t-[32px] sm:rounded-[32px] shadow-2xl border border-slate-100 flex flex-col max-h-[92vh] sm:max-h-[85vh] overflow-hidden"
            >
              {/* Modal header */}
              <div className="flex items-center justify-between px-6 sm:px-8 py-5 sm:py-6 border-b border-slate-100 shrink-0 bg-white z-10 transition-colors">
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-slate-200 rounded-full sm:hidden" />
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">
                    Edit Profile
                  </h2>
                  <p className="text-xs sm:text-[13px] text-slate-500 mt-1 font-semibold">
                    Customize how clients see you
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-all"
                >
                  <XIcon />
                </button>
              </div>

              {/* Scrollable form body */}
              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
                <div className="px-6 sm:px-8 py-6 space-y-6">
                  {/* Photo URL */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest ml-1">
                      Profile Photo URL
                    </label>
                    <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-500/10 transition-all">
                      <input
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        className="flex-1 bg-transparent text-[15px] font-medium text-slate-800 outline-none placeholder-slate-400 min-w-0"
                        placeholder="https://example.com/photo.jpg"
                      />
                      {formData.image && (
                        <img
                          src={formData.image}
                          alt=""
                          className="w-8 h-8 rounded-xl object-cover shrink-0 border border-slate-200 shadow-sm"
                        />
                      )}
                    </div>
                  </div>

                  {/* Hourly rate */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest ml-1">
                      Hourly Rate (USD)
                    </label>
                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-500/10 transition-all">
                      <span className="text-slate-400 text-[15px] font-bold mr-2 select-none">
                        $
                      </span>
                      <input
                        type="number"
                        name="hourlyRate"
                        value={formData.hourlyRate}
                        onChange={handleInputChange}
                        className="flex-1 bg-transparent text-[15px] font-bold text-slate-800 outline-none"
                        placeholder="0"
                        min="0"
                      />
                      <span className="text-slate-400 text-sm font-semibold ml-2 select-none">
                        / hr
                      </span>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest ml-1">
                      About Me
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 text-[15px] font-medium text-slate-800 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all resize-none placeholder-slate-400 leading-relaxed"
                      placeholder="Tell clients about your background, experience, and expertise..."
                    />
                  </div>

                  {/* Skills */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between ml-1">
                      <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest">
                        Skills & Tags
                      </label>
                      <span className="text-[11px] font-extrabold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full uppercase tracking-wide">
                        {skills.length} added
                      </span>
                    </div>

                    {/* Skills pills */}
                    {skills.length > 0 && (
                      <div className="flex flex-wrap gap-2.5 p-4 bg-slate-50 border border-slate-200 rounded-2xl min-h-[72px] transition-colors">
                        <AnimatePresence>
                          {skills.map((s, i) => (
                            <motion.span
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.8, opacity: 0 }}
                              key={s}
                              className="flex items-center gap-1.5 pl-3 pr-2 py-1.5 bg-white border border-slate-200 rounded-xl text-[13px] font-bold text-slate-700 shadow-sm"
                            >
                              {s}
                              <button
                                type="button"
                                onClick={() => removeSkill(s)}
                                className="w-5 h-5 flex items-center justify-center rounded-lg text-slate-400 hover:bg-rose-100 hover:text-rose-600 transition-colors"
                              >
                                <XIcon />
                              </button>
                            </motion.span>
                          ))}
                        </AnimatePresence>
                      </div>
                    )}

                    {/* Add skill input */}
                    <div className="flex gap-2.5 pt-1">
                      <input
                        value={newSkill}
                        onChange={e => setNewSkill(e.target.value)}
                        onKeyDown={e =>
                          e.key === 'Enter' && (e.preventDefault(), addSkill())
                        }
                        placeholder="e.g. React, Node.js, UI/UX..."
                        className="flex-1 px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-[15px] font-medium text-slate-800 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder-slate-400"
                      />
                      <button
                        type="button"
                        onClick={addSkill}
                        className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-[15px] font-bold rounded-2xl shadow-md shadow-indigo-600/20 transition-all shrink-0"
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                </div>

                {/* Sticky save button */}
                <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-5 border-t border-slate-100 shrink-0 bg-white transition-colors">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-orange-500 to-[#f07300] hover:from-[#e06700] hover:to-[#d86500] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed text-white font-extrabold py-4 rounded-2xl shadow-lg shadow-orange-500/25 transition-all duration-200 text-[15px]"
                  >
                    {isSaving ? (
                      <>
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Saving Changes...
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
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
