'use client';
import React from 'react';
import { motion } from 'framer-motion';

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
    <section className="w-full bg-slate-50 dark:bg-gray-900 py-20 px-6 overflow-hidden transition-colors duration-300">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.span 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.2em] font-semibold text-blue-600 dark:text-blue-400"
        >
          {eyebrow}
        </motion.span>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-3 text-4xl md:text-5xl font-bold text-slate-900 dark:text-white"
        >
          {title}
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 max-w-lg mx-auto text-slate-500 dark:text-slate-400 leading-[1.6]"
        >
          {subtitle}
        </motion.p>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Connector line */}
        <div className="hidden md:block absolute top-[140px] left-[12%] right-[12%] border-t-2 border-dashed border-slate-300 dark:border-slate-700" />

        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => {
            const moveDown = index % 2 === 1;

            return (
              <motion.div
                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
                key={step.number}
                className={`relative flex flex-col items-center ${
                  moveDown ? 'md:mt-40' : ''
                }`}
              >
                {/* Step number */}
                <div
                  className="w-14 h-14 rounded-full bg-white dark:bg-gray-800 border-[3px] flex items-center justify-center font-bold z-20 shadow-lg transition-transform hover:scale-110 cursor-default"
                  style={{
                    borderColor: step.color,
                    color: step.color,
                  }}
                >
                  {step.number}
                </div>

                {/* Mobile line */}
                {index !== steps.length - 1 && (
                  <div className="md:hidden h-10 border-l-2 border-dashed border-slate-300 dark:border-slate-700 my-2" />
                )}

                {/* Card */}
                <div
                  className="mt-5 bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 max-w-[240px] text-center transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 group"
                  style={{
                    borderTop: `4px solid ${step.color}`,
                  }}
                >
                  <div
                    className="inline-block text-[11px] uppercase font-semibold rounded-full px-3 py-1 mb-3 transition-transform group-hover:scale-105"
                    style={{
                      color: step.color,
                      backgroundColor: `${step.color}20`,
                    }}
                  >
                    {step.status}
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                    {step.title}
                  </h3>

                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
