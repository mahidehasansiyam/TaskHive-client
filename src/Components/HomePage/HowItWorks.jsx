'use client';
import React from 'react';

const defaultSteps = [
  {
    number: '01',
    status: 'Open',
    color: '#E98A2B',
    title: 'Client posts a task',
    description:
      'Describe the work, set a budget, and publish it to the freelancer pool.',
  },
  {
    number: '02',
    status: 'Pending',
    color: '#7C5CFC',
    title: 'Freelancers send proposals',
    description:
      'Interested freelancers submit their pitch, rate, and timeline for review.',
  },
  {
    number: '03',
    status: 'In progress',
    color: '#2478E8',
    title: 'Client accepts & pays',
    description:
      'The client picks a proposal and funds payment to lock in the freelancer.',
  },
  {
    number: '04',
    status: 'Complete',
    color: '#1CA672',
    title: 'Freelancer submits task',
    description:
      'Work is delivered, the client approves it, and the task is marked done.',
  },
];

export default function HowItWorksRoadmap({
  eyebrow = 'How it works',
  title = 'The road from post to paid',
  subtitle = 'Every task follows the same route — four stops, one status at a time.',
  steps = defaultSteps,
}) {
  return (
    <section className="w-full bg-slate-50 py-20 px-6 overflow-hidden">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-blue-600">
          {eyebrow}
        </span>

        <h2 className="mt-3 text-4xl md:text-5xl font-bold text-slate-900">
          {title}
        </h2>

        <p className="mt-4 max-w-lg mx-auto text-slate-500 leading-[1.6]">
          {subtitle}
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Connector line */}
        <div className="hidden md:block absolute top-[140px] left-[12%] right-[12%] border-t-2 border-dashed border-slate-300" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const moveDown = index % 2 === 1;

            return (
              <div
                key={step.number}
                className={`relative flex flex-col items-center ${
                  moveDown ? 'md:mt-40' : ''
                }`}
              >
                {/* Step number */}
                <div
                  className="w-14 h-14 rounded-full bg-white border-[3px] flex items-center justify-center font-bold z-20 shadow"
                  style={{
                    borderColor: step.color,
                    color: step.color,
                  }}
                >
                  {step.number}
                </div>

                {/* Mobile line */}
                {index !== steps.length - 1 && (
                  <div className="md:hidden h-10 border-l-2 border-dashed border-slate-300 my-2" />
                )}

                {/* Card */}
                <div
                  className="mt-5 bg-white rounded-xl shadow-sm border border-slate-200 p-6 max-w-[240px] text-center"
                  style={{
                    borderTop: `4px solid ${step.color}`,
                  }}
                >
                  <div
                    className="inline-block text-[11px] uppercase font-semibold rounded-full px-3 py-1 mb-3"
                    style={{
                      color: step.color,
                      backgroundColor: `${step.color}20`,
                    }}
                  >
                    {step.status}
                  </div>

                  <h3 className="font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>

                  <p className="text-sm text-slate-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
