import React from 'react';
import { Loader2 } from 'lucide-react';

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 size={48} className="text-blue-600 animate-spin" />
            <p className="mt-4 text-gray-600 text-lg">Loading...</p>
        </div>
    );
};

export default Loading;