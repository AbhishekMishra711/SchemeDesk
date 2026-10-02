import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorMessage = ({ message = 'Something went wrong. Please try again.', onRetry }) => {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-red-50 border border-red-200 rounded-xl my-6 text-center max-w-lg mx-auto shadow-sm">
            <div className="bg-red-100 p-3 rounded-full text-red-600 mb-3">
                <AlertCircle size={32} />
            </div>
            <h3 className="text-lg font-bold text-red-800 mb-1">Notice</h3>
            <p className="text-red-600 text-sm mb-4 leading-relaxed">{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition shadow-sm"
                >
                    <RefreshCw size={16} />
                    Try Again
                </button>
            )}
        </div>
    );
};

export default ErrorMessage;