import React from "react";

const PasswordStrengthIndicator = ({
  validity: { minChar, number, specialChar, lowercase, uppercase },
}) => {
  return (
    <div className="mt-3">
      <ul className="text-muted">
        <h6 className="text-dark">Password Requirements:</h6>
        <PasswordStrengthIndicatorItem
          isValid={minChar}
          text="At least 8 characters"
        />
        <PasswordStrengthIndicatorItem
          isValid={number}
          text="At least 1 number"
        />
        <PasswordStrengthIndicatorItem
          isValid={specialChar}
          text="At least 1 special character"
        />
        <PasswordStrengthIndicatorItem
          isValid={lowercase}
          text="At least 1 lowercase letter"
        />
        <PasswordStrengthIndicatorItem
          isValid={uppercase}
          text="At least 1 uppercase letter"
        />
      </ul>
    </div>
  );
};

const PasswordStrengthIndicatorItem = ({ isValid, text }) => {
  const highlightClass = isValid
    ? "text-success"
    : isValid !== null
    ? "text-danger"
    : "";
  return <div className={highlightClass}>{text}</div>;
};

export default PasswordStrengthIndicator;
