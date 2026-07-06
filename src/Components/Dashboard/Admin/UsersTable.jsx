'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

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
    const previousUsers = [...localUsers];
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
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isBlocked: status }),
        },
      );
      const data = await response.json();
      if (!data.success) setLocalUsers(previousUsers);
    } catch (error) {
      console.error(error);
      setLocalUsers(previousUsers);
    }
  };

  return (
    <div className="space-y-5">
      {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-white p-1 rounded-2xl border border-slate-100 shadow-sm">
        {/* Search */}
        <div className="relative flex items-center w-full sm:max-w-sm">
          <div className="absolute left-4 pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full bg-slate-50 rounded-xl pl-12 pr-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition border-0"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Filter */}
        <div className="relative flex items-center w-full sm:w-44">
          <div className="absolute left-4 pointer-events-none">
            <FilterIcon />
          </div>
          <select
            className="w-full bg-slate-50 rounded-xl pl-10 pr-8 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 cursor-pointer appearance-none border-0"
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

      {/* Count */}
      <p className="text-xs text-slate-400 font-medium px-1">
        {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''} found
      </p>

      {/* ── DESKTOP TABLE (md+) ── */}
      <div className="hidden md:block bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100">
                {['Profile', 'Name', 'Email', 'Role', 'Status / Actions'].map(
                  (h, i) => (
                    <th
                      key={h}
                      className={`px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider ${i === 4 ? 'text-right' : ''}`}
                    >
                      {h}
                    </th>
                  ),
                )}
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="relative w-10 h-10 rounded-full ring-2 ring-slate-100 overflow-hidden bg-slate-50">
                          <Image
                            src={user.image || '/default-user.png'}
                            alt={user.name || 'User'}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-semibold text-slate-900 group-hover:text-orange-600 transition-colors text-sm">
                          {user.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-slate-500">
                          {user.email}
                        </span>
                      </td>
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
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="inline-flex items-center gap-3 justify-end">
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
                          {isBlocked ? (
                            <button
                              onClick={() => handleBlockStatus(user._id, 'no')}
                              className="text-xs font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/50 px-3.5 py-2 rounded-xl transition active:scale-95"
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
                    className="text-center py-14 text-slate-400 text-sm font-medium"
                  >
                    No users found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── MOBILE CARDS (below md) ── */}
      <div className="md:hidden space-y-3">
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => {
            const isBlocked = user.isBlocked === 'yes';
            return (
              <div
                key={user._id}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4"
              >
                {/* Top row: avatar + name/email + status dot */}
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-full ring-2 ring-slate-100 overflow-hidden bg-slate-50 shrink-0">
                    <Image
                      src={user.image || '/default-user.png'}
                      alt={user.name || 'User'}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 text-sm truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-slate-400 truncate">
                      {user.email}
                    </p>
                  </div>

                  {/* Status dot badge */}
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide shrink-0 ${
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
                </div>

                {/* Bottom row: role + action button */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${
                      user.role?.toLowerCase() === 'freelancer'
                        ? 'bg-blue-50 text-blue-600'
                        : 'bg-purple-50 text-purple-600'
                    }`}
                  >
                    {user.role}
                  </span>

                  {isBlocked ? (
                    <button
                      onClick={() => handleBlockStatus(user._id, 'no')}
                      className="text-xs font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/50 px-4 py-2 rounded-xl transition active:scale-95"
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
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
            <p className="text-slate-400 text-sm font-medium">
              No users found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersTable;
