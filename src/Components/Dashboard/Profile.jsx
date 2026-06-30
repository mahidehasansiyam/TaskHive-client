'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';


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
    hourlyRate: user?.hourlyRate || 56,
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
   
   console.log(result);
  };

  return (
    <div className="p-10">
      {/* 1. HEADER */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            My Profile
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your professional presence
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#f07300] hover:bg-[#d66600] text-white px-6 py-3 rounded-xl flex items-center gap-2 font-semibold shadow-sm transition active:scale-95"
        >
          <EditIcon />
          Edit Profile
        </button>
      </div>

      {/* 2. PROFILE CARD (PREVIEW) */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden mb-8">
        <div className="h-40 bg-gradient-to-r from-orange-400 to-[#f07300]"></div>
        <div className="px-10 pb-10 relative">
          <div className="-mt-16 flex flex-col md:flex-row gap-8">
            {/* Avatar */}
            <div className="bg-white rounded-full p-2 shadow-lg w-32 h-32 flex items-center justify-center overflow-hidden">
              {formData.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center text-3xl font-bold text-slate-400">
                  {user.name.charAt(0)}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 pt-16 md:pt-20">
              <div className="flex justify-between items-start flex-wrap gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">
                    {formData.name}
                  </h2>
                  <div className="flex items-center gap-2 mt-2 text-slate-500">
                    <MailIcon /> {user?.email || 'freelance@taskhive.com'}
                  </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-right">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                    Hourly Rate
                  </p>
                  <p className="text-3xl font-black text-[#f07300]">
                    ${formData.hourlyRate}
                    <span className="text-sm font-medium text-slate-400">
                      /hr
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">
                    About Me
                  </h3>
                  <p className="text-slate-600 leading-relaxed max-w-2xl">
                    {formData.bio}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((s, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-sm font-semibold border border-slate-100"
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
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Edit Profile
                </h2>
                <p className="text-sm text-gray-500">
                  Update your public profile details
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition text-slate-400"
              >
                <XIcon />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-4">
                {/* <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700">
                    Name
                  </label>
                  <input
                    name="name"
                    value={user.name}
                    onChange={handleInputChange}
                    className="bg-slate-50 border-0 rounded-xl p-3 focus:ring-2 focus:ring-[#f07300] outline-none"
                  />
                </div> */}

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700">
                    Profile Photo Link
                  </label>
                  <input
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="bg-slate-50 text-black border-0 rounded-xl p-3 focus:ring-2 focus:ring-[#f07300] outline-none"
                    placeholder="https://..."
                  />
                </div>
{/* Skils input */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700">
                    Skills
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {skills.map((s, i) => (
                      <span
                        key={i}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold"
                      >
                        {s}{' '}
                        <button
                          type="button"
                          onClick={() => removeSkill(s)}
                          className="hover:text-red-500"
                        >
                          <XIcon />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      value={newSkill}
                      onChange={e => setNewSkill(e.target.value)}
                      placeholder="Add a skill"
                      className="flex-1 bg-slate-50 border-0 rounded-xl p-3 focus:ring-2 focus:ring-[#f07300] outline-none"
                    />
                    <button
                      type="button"
                      onClick={addSkill}
                      className="w-12 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    defaultValue={formData.bio}
                    onChange={handleInputChange}
                    rows={3}
                    className="bg-slate-50 text-black border-0 rounded-xl p-3 focus:ring-2 focus:ring-[#f07300] outline-none resize-none"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700">
                    Hourly Rate (USD)
                  </label>
                  <input
                    type="number"
                    name="hourlyRate"
                    value={formData.hourlyRate}
                    onChange={handleInputChange}
                    className="bg-slate-50 text-black border-0 rounded-xl p-3 focus:ring-2 focus:ring-[#f07300] outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                onClick={handleReload}
                className="w-full bg-[#f07300] hover:bg-[#d66600] text-white p-4 rounded-2xl flex justify-center items-center gap-2 font-bold shadow-lg transition"
              >
                <SaveIcon /> Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
