import React, { useState, useEffect } from 'react';
import api from './../Services/api';
import { toast } from 'react-toastify';
import { 
  DollarSign, 
  FileText, 
  Calendar, 
  Tag, 
  AlertCircle, 
  CheckCircle,
  Loader2,
  PlusCircle
} from 'lucide-react';


const CreateExpense = () => {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expense, setExpense] = useState({
    category: '',
    amount: '',
    details: '',
    date: ''
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Simulate page loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'amount') {
      setExpense({
        ...expense,
        [name]: parseFloat(value),
      });
    } else {
      setExpense({
        ...expense,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors and messages
    setError('');
    setMessage('');
    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const response = await api.post('/expense/create', expense);

      toast.success(response.data.message)
      setMessage('Expense created successfully!');
      setExpense({
        category: '',
        amount: '',
        details: '',
        date: '',
      });
    
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error(err.response.data.message)
        setError(err.response.data.message);
      } else {
        setError('An error occurred while creating the expense.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Page loading animation
  if (isPageLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="w-24 h-24 border-[8px] border-t-orange-600 border-r-orange-600 border-b-orange-300 border-l-orange-300 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto px-4 py-12 bg-orange-50 min-h-screen">
      <div className="max-w-md mx-auto bg-white shadow-2xl rounded-2xl border-2 border-orange-600 overflow-hidden">
        <div className="bg-orange-100 text-orange-700 p-4 md:p-6 text-center">
          <div className="flex items-center justify-center space-x-3">
            <PlusCircle size={32} />
            <h2 className="text-lg md:text-2xl font-bold">Create New Expense</h2>
          </div>
        </div>

        <div className="p-6">
          {error && (
            <div className="flex items-center space-x-2 bg-red-50 p-3 rounded-lg mb-4 border border-red-200 text-red-600">
              <AlertCircle className="text-red-500" size={20} />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}
          {message && (
            <div className="flex items-center space-x-2 bg-green-50 p-3 rounded-lg mb-4 border border-green-200 text-green-600">
              <CheckCircle className="text-green-500" size={20} />
              <p className="text-sm font-medium">{message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="flex items-center text-sm font-medium text-orange-900 mb-2">
                <Tag className="mr-2 text-orange-600" size={18} />
                Expense Category
              </label>
              <input
                type="text"
                name="category"
                value={expense.category}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border-2 border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
                required
                placeholder="Enter expense category"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-orange-900 mb-2">
                <DollarSign className="mr-2 text-orange-600" size={18} />
                Expense Amount
              </label>
              <input
                type="number"
                name="amount"
                value={expense.amount}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border-2 border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
                required
                placeholder="Enter expense amount"
                min="0"
                step="0.01"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-orange-900 mb-2">
                <FileText className="mr-2 text-orange-600" size={18} />
                Expense Details
              </label>
              <textarea
                name="details"
                value={expense.details}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border-2 border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
                required
                placeholder="Provide expense details"
                rows="4"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-orange-900 mb-2">
                <Calendar className="mr-2 text-orange-600" size={18} />
                Expense Date
              </label>
              <input
                type="date"
                name="date"
                value={expense.date}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border-2 border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
                required
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-3.5 rounded-lg hover:bg-orange-700 active:scale-95 transition duration-300 flex items-center justify-center space-x-2 mt-4 shadow-md hover:scale-95 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 animate-spin" />
                  <span>Submitting Expense...</span>
                </>
              ) : (
                <>
                  <DollarSign />
                  <span>Submit Expense</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateExpense;