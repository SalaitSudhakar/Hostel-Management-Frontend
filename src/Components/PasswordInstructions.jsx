import React from "react";

const PasswordInstructions = () => {
  return (
    <div className="p-3 mt-3 text-gray-400 bg-gradient-to-br from-orange-50 to-orange-100 rounde-md">
      <h2 className="text-gray-500 mb-3 underline">Password Requirements</h2>
      <ul className="list-disc mx-4">
        <li>At least 8 characters long</li>
        <li>At least one letter</li>
        <li>At least one number</li>
        <li>At least one special character (e.g., @$!%*?&)</li>
      </ul>
    </div>
  );
};

export default PasswordInstructions;
