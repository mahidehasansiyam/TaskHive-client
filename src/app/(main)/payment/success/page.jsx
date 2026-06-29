import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';
import {
  FiCheckCircle,
  FiMail,
  FiHome,
  FiFileText,
  FiUser,
  FiDollarSign,
} from 'react-icons/fi';
import { FaCheckCircle } from 'react-icons/fa';
import Link from 'next/link';

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)');

  const {
    status,
    customer_details: { email: customerEmail },
    amount_total,
    currency,
    line_items,
    metadata,
    payment_intent,
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent'],
  });

  if (status === 'open') {
    return redirect('/');
  }

  if (status === 'complete') {
    // console.log(metadata);
     try {
       const response = await fetch(
         `${process.env.NEXT_PUBLIC_SERVER_URL}/proposals/accept/${metadata.proposalId}`,
         {
           method: 'PATCH',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({
             status: 'accepted',
           }),
         },
       );

       if (!response.ok) {
         throw new Error('Failed to accept proposal');
       }

       const data = await response.json();

       console.log('Proposal updated:', data);

       // no return here
     } catch (error) {
       console.error('Error accepting proposal:', error);
     }
  





    // Format currency
    const formatCurrency = (amount, currency) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency || 'USD',
        minimumFractionDigits: 0,
      }).format(amount / 100);
    };

    // Get payment details
    const paymentAmount = amount_total
      ? formatCurrency(amount_total, currency)
      : '$0';
    const paymentId = payment_intent?.id || 'N/A';
    const transactionDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full">
          {/* Success Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-green-100">
            {/* Header with Gradient */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-10 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4"></div>

              {/* Success Icon */}
              <div className="relative z-10 inline-flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-lg mb-4">
                <FaCheckCircle className="w-14 h-14 text-green-600" />
              </div>

              <h1 className="relative z-10 text-3xl font-bold text-white mb-2">
                Payment Successful!
              </h1>
              <p className="relative z-10 text-green-100 text-lg">
                Thank you for your payment
              </p>
            </div>

            {/* Content */}
            <div className="px-8 py-8">
              {/* Success Message */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                <p className="text-green-800 text-sm flex items-start gap-2">
                  <FiCheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>
                    We appreciate your business! A confirmation email has been
                    sent to{' '}
                    <strong className="text-green-900">{customerEmail}</strong>.
                  </span>
                </p>
              </div>

              {/* Payment Details */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
                  Payment Details
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <FiDollarSign className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-sm text-gray-600">Amount Paid</span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">
                      {paymentAmount}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-100 p-2 rounded-lg">
                        <FiMail className="w-4 h-4 text-purple-600" />
                      </div>
                      <span className="text-sm text-gray-600">Email</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {customerEmail}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="bg-indigo-100 p-2 rounded-lg">
                        <FiFileText className="w-4 h-4 text-indigo-600" />
                      </div>
                      <span className="text-sm text-gray-600">Payment ID</span>
                    </div>
                    <span className="text-sm font-mono text-gray-900 truncate max-w-[150px]">
                      {paymentId}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <FiCheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-sm text-gray-600">Date</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {transactionDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">
                  What's Next?
                </h4>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>You'll receive a confirmation email shortly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>The freelancer will be notified of your payment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>
                      Work will begin as soon as the freelancer accepts
                    </span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/dashboard/client/proposals"
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg shadow-green-200"
                >
                  <FiHome className="w-5 h-5" />
                  Back to Proposals
                </Link>
                <Link
                  href="/dashboard"
                  className="flex-1 bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <FiUser className="w-5 h-5" />
                  Go to Dashboard
                </Link>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-xs text-gray-500">
              Need help? Contact us at{' '}
              <a
                href="mailto:support@taskhive.com"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                support@taskhive.com
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
