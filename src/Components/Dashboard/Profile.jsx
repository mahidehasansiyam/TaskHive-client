'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';


/* ICONS */
const MailIcon = () => (
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
    className="w-5 h-5"
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
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

/* COMPONENT */
const Profile = ({ user }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    // name: user?.name || '',
    image: user?.image || '',
    bio: user?.bio || '...',
    hourlyRate: user?.hourlyRate || 0,
  });
  

  const [skills, setSkills] = useState(user?.skills || ['React', 'Next.js']);
  const [newSkill, setNewSkill] = useState('');

  // Handle Changes
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

   const handleReload = () => {
     router.refresh();
   };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('Form data', formData);
    const updatedData = {
      ...formData,
      hourlyRate: Number(formData.hourlyRate),
      skills,
      email: user.email,
    };
    console.log('Updated data', updatedData);
    
    

   const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/update`, {
     method: 'PATCH',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(updatedData),
   });

    const result = await res.json();
    // console.log(result);
   if(result.success) {
     toast.success('Profile updated successfully!');
     setIsModalOpen(false);
   }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8 min-h-screen bg-slate-50/50">
      {/* 1. HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-slate-200/60">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            My Profile
          </h1>
          <p className="text-slate-500 mt-1.5 text-sm sm:text-base font-medium">
            Manage your professional digital presence
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="group bg-[#f07300] hover:bg-[#d66600] text-white px-5 py-3 rounded-xl flex items-center gap-2.5 font-semibold shadow-md shadow-orange-500/10 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-200 active:scale-98"
        >
          <span className="transition-transform group-hover:rotate-12 duration-200">
            <EditIcon />
          </span>
          Edit Profile
        </button>
      </div>

      {/* 2. PROFILE CARD (PREVIEW) */}
      <div className="bg-white rounded-3xl border border-slate-200/70 shadow-sm shadow-slate-100/50 overflow-hidden mb-8 transition-all duration-300 hover:shadow-md">
        <div className="h-48 bg-gradient-to-r from-orange-400 via-[#f07300] to-amber-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent)] pointer-events-none" />
        </div>
        <div className="px-6 sm:px-10 pb-10 relative">
          <div className="-mt-20 flex flex-col md:flex-row gap-6 md:gap-8 items-start">
            {/* Avatar */}
            <div className="bg-white rounded-2xl p-1.5 shadow-xl shadow-slate-200/80 w-36 h-36 flex items-center justify-center overflow-hidden ring-4 ring-white/50 group transition-transform duration-300 hover:scale-[1.02]">
              {formData.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center text-4xl font-black text-slate-400 rounded-xl">
                  {user.name.charAt(0)}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 pt-4 md:pt-24 w-full">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {formData.name}
                  </h2>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 text-slate-600 rounded-xl text-sm font-medium border border-slate-100">
                    <span className="text-slate-400">
                      <MailIcon />
                    </span>
                    {user?.email || 'freelance@taskhive.com'}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-slate-50 to-white p-5 rounded-2xl border border-slate-200/60 min-w-[180px] shadow-sm lg:text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    Hourly Rate
                  </p>
                  <p className="text-3xl font-black text-[#f07300] tracking-tight">
                    ${formData.hourlyRate}
                    <span className="text-sm font-semibold text-slate-400 ml-1">
                      /hr
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100 space-y-8">
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                    About Me
                  </h3>
                  <p className="text-slate-600 leading-relaxed max-w-3xl text-base font-normal">
                    {formData.bio}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                    Skills & Expertises
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {skills.map((s, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-sm font-semibold border border-slate-200/50 transition-colors duration-150"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-all duration-300">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl border border-slate-100 flex flex-col animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 sm:p-8 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Edit Profile
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                  Update your professional details and layout options
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-400 hover:text-slate-600 active:scale-95"
              >
                <XIcon />
              </button>
            </div>

            {/* Modal Form */}
            <form
              onSubmit={handleSubmit}
              className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 bg-slate-50/50"
            >
              <div className="space-y-6">
                {/* 2-COLUMN INPUT GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Profile Photo Link Field */}
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Profile Photo Link
                    </label>
                    <div className="relative flex items-center bg-white border border-slate-200 rounded-xl px-3.5 py-3 transition-all focus-within:border-[#f07300] focus-within:ring-4 focus-within:ring-orange-500/5 shadow-sm">
                      <input
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        className="w-full bg-transparent text-slate-900 text-sm outline-none placeholder-slate-400 pr-8"
                        placeholder="https://example.com/avatar.jpg"
                      />
                      {formData.image && (
                        <div className="absolute right-3.5 w-6 h-6 rounded-md overflow-hidden border border-slate-100 shadow-sm flex-shrink-0">
                          <img
                            src={formData.image}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Hourly Rate Field */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Hourly Rate (USD)
                    </label>
                    <div className="flex items-center bg-white border border-slate-200 rounded-xl px-3.5 py-3 transition-all focus-within:border-[#f07300] focus-within:ring-4 focus-within:ring-orange-500/5 shadow-sm">
                      <span className="text-slate-400 font-medium text-sm mr-1.5 select-none">
                        $
                      </span>
                      <input
                        type="number"
                        name="hourlyRate"
                        value={formData.hourlyRate}
                        onChange={handleInputChange}
                        className="w-full bg-transparent text-slate-900 text-sm outline-none font-semibold"
                        placeholder="0"
                      />
                      <span className="text-slate-400 font-medium text-xs ml-1.5 select-none whitespace-nowrap">
                        / hr
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bio Textarea Field */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Bio Description
                  </label>
                  <textarea
                    name="bio"
                    defaultValue={formData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full bg-white text-slate-900 border border-slate-200 rounded-xl p-4 text-sm focus:border-[#f07300] focus:ring-4 focus:ring-orange-500/5 transition-all outline-none shadow-sm resize-none leading-relaxed placeholder-slate-400"
                    placeholder="Tell clients about your expertise, background, and what drives your execution workflow..."
                  />
                </div>

                {/* Skills Container Field */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-slate-700">
                      Skills & Tags
                    </label>

                    <span className="text-xs px-2.5 py-1 rounded-full bg-orange-50 text-[#f07300] font-medium">
                      {skills.length} skills
                    </span>
                  </div>

                  {/* Skills Container */}
                  <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl p-4 min-h-[90px] shadow-sm">
                    {skills.length > 0 ? (
                      <div className="flex flex-wrap gap-3">
                        {skills.map((s, i) => (
                          <div
                            key={i}
                            className="group flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 text-sm font-medium text-slate-700 shadow-sm hover:shadow-md transition-all"
                          >
                            <span>{s}</span>

                            <button
                              type="button"
                              onClick={() => removeSkill(s)}
                              className="w-5 h-5 flex items-center justify-center rounded-full text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all"
                            >
                              <XIcon />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center text-sm text-slate-400">
                        Add skills like React, UI/UX, TypeScript, Marketing...
                      </div>
                    )}
                  </div>

                  {/* Input Section */}
                  <div className="flex gap-3">
                    <input
                      value={newSkill}
                      onChange={e => setNewSkill(e.target.value)}
                      onKeyDown={e =>
                        e.key === 'Enter' && (e.preventDefault(), addSkill())
                      }
                      placeholder="Type a skill..."
                      className="flex-1 px-5 py-3.5 rounded-2xl bg-white border border-slate-200 text-sm focus:border-[#f07300] focus:ring-4 focus:ring-orange-100 outline-none transition-all shadow-sm"
                    />

                    <button
                      type="button"
                      onClick={addSkill}
                      className="px-6 rounded-2xl bg-[#f07300] hover:bg-[#d86500] text-white font-semibold flex items-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95"
                    >
                      <span className="text-lg">+</span>
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Sticky Footer Action Bar */}
              <div className="pt-4 pb-1 mt-4 border-t border-slate-100 sticky bottom-0 bg-gradient-to-t from-slate-50 via-slate-50/95 to-transparent backdrop-blur-sm -mx-6 sm:-mx-8 px-6 sm:px-8 z-20">
                <button
                  type="submit"
                  onClick={handleReload}
                  className="w-full bg-[#f07300] hover:bg-[#d66600] text-white p-4 rounded-xl flex justify-center items-center gap-2.5 font-bold shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20 transition-all duration-200 active:scale-[0.99]"
                >
                  <SaveIcon /> Save Profile Changes
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