import React from "react";

const ErrorMessage = ({ message, onRetry, retryCount = 0 }) => {
  const getErrorIcon = () => {
    if (retryCount > 2) return "🔌";
    if (retryCount > 1) return "⚠️";
    return "❌";
  };

  const getErrorTitle = () => {
    if (retryCount > 2) return "Connection Issues";
    if (retryCount > 1) return "Still Having Trouble";
    return "Oops! Something went wrong";
  };

  const getHelpText = () => {
    if (retryCount > 2) {
      return "Please check your internet connection and try again.";
    }
    if (retryCount > 1) {
      return "The server might be temporarily unavailable.";
    }
    return "Don't worry, this happens sometimes.";
  };

  return (
    <div className="text-center py-8">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
        <div className="text-4xl mb-4">{getErrorIcon()}</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {getErrorTitle()}
        </h3>
        <p className="text-gray-600 mb-2">{message}</p>
        <p className="text-sm text-gray-500 mb-6">{getHelpText()}</p>

        <button
          onClick={onRetry}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {retryCount > 0 ? `Try Again (${retryCount + 1})` : "Try Again"}
        </button>

        {retryCount > 2 && (
          <div className="mt-4 text-xs text-gray-400">
            <p>If the problem persists, please contact support.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
