import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, FilledButton, formInputClassName } from './index';

const NotFocusedModal = ({ toggle }) => {
  const [step, setStep] = useState(1);
  const [input, setInput] = useState('');
  const [showInputError, setShowInputError] = useState(false);
  const step1Quote =
    'Everybody wants to change others. Nobody wants to be changed.';
  const step1Author = 'Naval Ravikant';
  const leftSideButton = (stepNumber) => {
    switch (stepNumber) {
      case 2:
        return 'Continue';
      default:
        return 'Yes';
    }
  };
  const stepComponent = (stepNumber) => {
    switch (stepNumber) {
      case 2:
        return (
          <Step2
            input={input}
            setInput={setInput}
            quote={step1Quote}
            quoteAuthor={step1Author}
            showInputError={showInputError}
          />
        );
      default:
        return <Step1 />;
    }
  };
  return (
    <>
      <h2 className="text-center text-6xl text-white bg-red-500 py-8">
        ! STOP !
      </h2>
      <div className="p-8">
        {stepComponent(step)}
        <div className="flex pt-8">
          <Button
            type="button"
            classes="w-full"
            action={() => {
              if (step === 2) {
                if (input !== step1Quote) {
                  setShowInputError(true);
                  return;
                }
              }
              setShowInputError(false);
              if (step + 1 === 3) {
                toggle(true);
              }
              setStep(step + 1);
            }}
          >
            {leftSideButton(step)}
          </Button>
          <FilledButton
            type="button"
            classes="w-full"
            action={() => toggle(false)}
          >
            No
          </FilledButton>
        </div>
      </div>
    </>
  );
};
NotFocusedModal.propTypes = {
  toggle: PropTypes.func.isRequired,
};
export default NotFocusedModal;

const Step1 = () => (
  <p>
    You&apos;ve reached the threshold of how many times this has been clicked.
    Do you want to proceed and keep being distracted?
  </p>
);
const Step2 = ({ input, setInput, quote, quoteAuthor, showInputError }) => (
  <>
    <p>Okay, if you say so. To continue, please type the following quote:</p>
    <pre className="whitespace-pre-wrap p-8">
      &quot;
      {quote}
      &quot;
      <p className="text-right">
        {' - '}
        {quoteAuthor}
      </p>
    </pre>
    <input
      type="text"
      value={input}
      onChange={(event) => setInput(event.target.value)}
      className={formInputClassName}
      placeholder="Please type here..."
    />
    {showInputError && (
      <p className="text-xs text-red-500 pl-4">Incorrect spelling.</p>
    )}
  </>
);
Step2.propTypes = {
  input: PropTypes.string.isRequired,
  setInput: PropTypes.func.isRequired,
  quote: PropTypes.string.isRequired,
  quoteAuthor: PropTypes.string.isRequired,
  showInputError: PropTypes.bool.isRequired,
};
