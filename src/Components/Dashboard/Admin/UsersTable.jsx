'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

/* MODERN APP ICONS */
const SearchIcon = () => (
  <svg
    className="w-5 h-5 text-slate-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const FilterIcon = () => (
  <svg
    className="w-4 h-4 text-slate-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
    />
  </svg>
);

const UsersTable = ({ users = [] }) => {
  const router = useRouter();

  // Local state for users
  const [localUsers, setLocalUsers] = useState(users);

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredUsers = useMemo(() => {
    return localUsers.filter(user => {
      const roleMatch =
        filter === 'all' ? true : user.role?.toLowerCase() === filter;

      const searchMatch =
        user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase());

      return roleMatch && searchMatch;
    });
  }, [localUsers, search, filter]);

  const handleBlockStatus = async (id, status) => {
    // Save previous state for rollback
    const previousUsers = [...localUsers];

    // Update instantly
    setLocalUsers(prev =>
      prev.map(user =>
        user._id === id ? { ...user, isBlocked: status } : user,
      ),
    );

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            isBlocked: status,
          }),
        },
      );

      const data = await response.json();

      if (!data.success) {
        // Rollback if API fails
        setLocalUsers(previousUsers);
      }
    } catch (error) {
      console.error(error);

      // Rollback on error
      setLocalUsers(previousUsers);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. TOP BAR: SEARCH & FILTER */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        {/* Search Input */}
        <div className="relative w-full sm:max-w-md flex items-center">
          <div className="absolute left-4 pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Search users by name or email..."
            className="w-full bg-slate-50 border-0 rounded-xl pl-12 pr-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Filter Dropdown */}
        <div className="relative w-full sm:w-auto flex items-center">
          <div className="absolute left-4 pointer-events-none">
            <FilterIcon />
          </div>
          <select
            className="w-full sm:w-48 bg-slate-50 border-0 rounded-xl pl-10 pr-8 py-3 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 cursor-pointer appearance-none"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="client">Clients</option>
            <option value="freelancer">Freelancers</option>
          </select>
          <div className="absolute right-4 pointer-events-none text-slate-400">
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
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* 2. TABLE CONTAINER */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Profile
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">
                  Status / Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => {
                  const isBlocked = user.isBlocked === 'yes';
                  return (
                    <tr
                      key={user._id}
                      className="hover:bg-slate-50/40 transition-colors group"
                    >
                      {/* Avatar */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="relative w-12 h-12 rounded-full ring-2 ring-slate-100/80 overflow-hidden bg-slate-50 flex items-center justify-center">
                          <Image
                            src={user.image || '/default-user.png'}
                            alt={user.name || 'User'}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                      </td>

                      {/* Name */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">
                          {user.name}
                        </span>
                      </td>

                      {/* Email */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-slate-500 font-medium">
                          {user.email}
                        </span>
                      </td>

                      {/* Role Badge */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${
                            user.role?.toLowerCase() === 'freelancer'
                              ? 'bg-blue-50 text-blue-600'
                              : 'bg-purple-50 text-purple-600'
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>

                      {/* Status & Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="inline-flex items-center gap-4 justify-end">
                          {/* Active / Blocked Badge */}
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                              isBlocked
                                ? 'bg-rose-50 text-rose-600'
                                : 'bg-emerald-50 text-emerald-600'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${isBlocked ? 'bg-rose-500' : 'bg-emerald-500'}`}
                            />
                            {isBlocked ? 'Blocked' : 'Active'}
                          </span>

                          {/* Trigger Action Buttons */}
                          {isBlocked ? (
                            <button
                              onClick={() => handleBlockStatus(user._id, 'no')}
                              className="text-xs font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/50 px-3.5 py-2 rounded-xl transition active:scale-95 shadow-sm"
                            >
                              Unblock
                            </button>
                          ) : (
                            <button
                              onClick={() => handleBlockStatus(user._id, 'yes')}
                              className="text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 px-4 py-2 rounded-xl transition active:scale-95 shadow-sm shadow-rose-100"
                            >
                              Block
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-12 text-slate-400 font-medium text-sm"
                  >
                    No users matching your criteria were found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
