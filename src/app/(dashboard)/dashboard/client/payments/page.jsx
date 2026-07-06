import { getPaymentsByEmail } from '@/lib/api/payment';
import { getUserSession } from '@/lib/core/session';


const page = async () => {
  const user = await getUserSession();
  const clientEmail = user?.email;
  
  const payments = await getPaymentsByEmail(clientEmail)
  // console.log(payments.data);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-1 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-3">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 rounded-lg shrink-0">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            All Payments
          </h1>
          <p className="text-gray-600 mt-1 ml-1 text-sm sm:text-base">
            Total Transactions:{' '}
            <span className="font-semibold text-gray-800">
              {payments?.data?.length || 0}
            </span>
          </p>
        </div>

        {/* ── DESKTOP TABLE (md+) ── */}
        <div className="hidden md:block bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                  {[
                    'Client Email',
                    'Freelancer Email',
                    'Transaction ID',
                    'Final Budget',
                    'Title',
                  ].map(col => (
                    <th
                      key={col}
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {payments?.data?.map((payment, index) => (
                  <tr
                    key={payment._id}
                    className={`hover:bg-blue-50 transition-colors duration-150 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {payment.clientEmail.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm text-gray-700">
                          {payment.clientEmail}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-teal-400 flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {payment.freelancerEmail.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm text-gray-700">
                          {payment.freelancerEmail}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-mono text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        {payment.transactionId}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                        ${payment.finalBudget}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700 font-medium">
                        {payment.title}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── MOBILE CARDS (below md) ── */}
        <div className="md:hidden space-y-4">
          {payments?.data?.map(payment => (
            <div
              key={payment._id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4"
            >
              {/* Title + budget row */}
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-bold text-gray-900 text-base">
                  {payment.title}
                </h3>
                <span className="text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full shrink-0">
                  ${payment.finalBudget}
                </span>
              </div>

              {/* Client */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {payment.clientEmail.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
                    Client
                  </p>
                  <p className="text-sm text-gray-700 truncate">
                    {payment.clientEmail}
                  </p>
                </div>
              </div>

              {/* Freelancer */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-teal-400 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {payment.freelancerEmail.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
                    Freelancer
                  </p>
                  <p className="text-sm text-gray-700 truncate">
                    {payment.freelancerEmail}
                  </p>
                </div>
              </div>

              {/* Transaction ID */}
              <div className="bg-gray-50 rounded-xl px-4 py-2.5">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">
                  Transaction ID
                </p>
                <p className="text-xs font-mono text-gray-600 break-all">
                  {payment.transactionId}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {(!payments?.data || payments.data.length === 0) && (
          <div className="bg-white rounded-2xl p-16 text-center shadow-sm border border-gray-100">
            <p className="text-gray-400 text-sm">No payments found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;