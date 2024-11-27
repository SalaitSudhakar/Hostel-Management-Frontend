import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HostelFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How do I book a room?",
      answer: "You can book a room online through our website or by contacting our reception directly. We recommend booking at least a week in advance during peak seasons."
    },
    {
      question: "What are the check-in and check-out times?",
      answer: "Check-in is from 2:00 PM to 10:00 PM, and check-out is from 8:00 AM to 11:00 AM. Late check-out or early check-in may be available for an additional fee."
    },
    {
      question: "Are meals included?",
      answer: "We offer a complimentary breakfast buffet from 7:00 AM to 9:30 AM. Additional meals can be purchased at our on-site café."
    },
    {
      question: "What facilities do you provide?",
      answer: "Our hostel includes free Wi-Fi, a common kitchen, laundry facilities, a recreation room, lockers, and 24/7 security."
    },
    {
      question: "Do you offer private or shared rooms?",
      answer: "We have both dormitory-style shared rooms and private rooms. Shared rooms range from 4 to 8 beds, while private rooms accommodate 1-2 guests."
    },
    {
      question: "What are the check-in and check-out times?",
      answer: "Check-in is from 2:00 PM and check-out is until 11:00 AM. Early check-in and late check-out may be available upon request."
    },
    {
      question: "Are meals included?",
      answer: "Breakfast is complimentary. Additional meals can be arranged at an extra cost."
    },
    {
      question: "What are the payment methods?",
      answer: "We accept credit cards, debit cards, and online payment methods. Cash payments are also welcome."
    }
  ];

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <button 
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-lg">{faq.question}</span>
              {activeIndex === index ? <ChevronUp /> : <ChevronDown />}
            </button>
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-4 pb-4 text-gray-600"
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HostelFAQ;