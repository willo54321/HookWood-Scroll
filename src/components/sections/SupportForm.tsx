"use client";

import { useState } from "react";

interface FormData {
  fullName: string;
  email: string;
  postcode: string;
  ageRange: string;
  homeSize: string;
  supportApplication: string;
  consentShare: boolean;
}

export default function SupportForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    postcode: "",
    ageRange: "",
    homeSize: "",
    supportApplication: "",
    consentShare: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const ageRangeOptions = [
    "18-24",
    "25-34",
    "35-44",
    "45-54",
    "55-64",
    "65+",
  ];

  const homeSizeOptions = [
    "1 bedroom",
    "2 bedrooms",
    "3 bedrooms",
    "4+ bedrooms",
    "Not sure yet",
  ];

  const steps = [
    {
      id: "name",
      question: "What's your name?",
      subtext: "We'll use this when submitting your support.",
      type: "text",
      field: "fullName" as keyof FormData,
      placeholder: "Your full name",
    },
    {
      id: "email",
      question: "What's your email?",
      subtext: "We'll keep you updated on the planning application.",
      type: "email",
      field: "email" as keyof FormData,
      placeholder: "your@email.com",
    },
    {
      id: "postcode",
      question: "What's your postcode?",
      subtext: "This helps show local support for the development.",
      type: "text",
      field: "postcode" as keyof FormData,
      placeholder: "RH6 0XX",
    },
    {
      id: "ageRange",
      question: "What's your age range?",
      subtext: "This helps us understand who needs housing in the area.",
      type: "select",
      field: "ageRange" as keyof FormData,
      options: ageRangeOptions,
    },
    {
      id: "homeSize",
      question: "What size home interests you?",
      subtext: "This helps us understand local housing needs.",
      type: "select",
      field: "homeSize" as keyof FormData,
      options: homeSizeOptions,
    },
    {
      id: "support",
      question: "Do you support this application?",
      subtext: "446 homes including 200 affordable homes at Hookwood.",
      type: "yesno",
      field: "supportApplication" as keyof FormData,
    },
    {
      id: "consent",
      question: "Almost done",
      subtext: "We need your consent to share details with Mole Valley District Council.",
      type: "consent",
      field: "consentShare" as keyof FormData,
    },
  ];

  const goNext = () => {
    const step = steps[currentStep];
    const value = formData[step.field];
    if (!value) return;
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goPrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (!formData.consentShare) return;
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      goNext();
    }
  };

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  if (isSubmitted) {
    return (
      <section
        id="support-form"
        className="min-h-screen bg-[var(--teal)] flex items-center justify-center px-6"
      >
        <div className="text-center max-w-xl">
          <div className="w-16 h-16 bg-[var(--navy)] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-[var(--teal)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--navy)] mb-4">
            Thank you!
          </h2>
          <p className="text-lg text-[var(--navy)]/70">
            We'll keep you updated on the planning application.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="support-form"
      className="min-h-screen bg-[var(--teal)] flex items-center justify-center px-6 py-20"
    >
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--navy)] mb-6">
            Have Your Say
          </h2>
          {/* Progress bar */}
          <div className="w-full h-1 bg-[var(--navy)]/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--navy)] transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-[var(--navy)]/50 mt-2">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>

        {/* Form card */}
        <div className="bg-[var(--navy)]/10 rounded-2xl p-8 md:p-10">
          <h3 className="text-2xl md:text-3xl font-bold text-[var(--navy)] mb-2">
            {currentStepData.question}
          </h3>
          <p className="text-[var(--navy)]/60 mb-8">
            {currentStepData.subtext}
          </p>

          {/* Text/Email inputs */}
          {(currentStepData.type === "text" || currentStepData.type === "email") && (
            <input
              type={currentStepData.type}
              value={formData[currentStepData.field] as string}
              onChange={(e) =>
                setFormData({ ...formData, [currentStepData.field]: e.target.value })
              }
              onKeyPress={handleKeyPress}
              placeholder={currentStepData.placeholder}
              autoFocus
              className="w-full text-xl md:text-2xl bg-transparent border-b-2 border-[var(--navy)]/20 focus:border-[var(--navy)] outline-none py-3 text-[var(--navy)] placeholder-[var(--navy)]/30 transition-colors"
            />
          )}

          {/* Select dropdown */}
          {currentStepData.type === "select" && (
            <div className="space-y-6">
              <select
                value={formData[currentStepData.field] as string}
                onChange={(e) => {
                  setFormData({ ...formData, [currentStepData.field]: e.target.value });
                }}
                className="w-full text-xl bg-white/50 border-2 border-[var(--navy)]/20 focus:border-[var(--navy)] outline-none py-4 px-4 rounded-lg text-[var(--navy)] transition-colors appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%230f172a'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '1.5rem',
                }}
              >
                <option value="">Select an option</option>
                {currentStepData.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={goNext}
                disabled={!formData[currentStepData.field]}
                className={`w-full font-semibold py-4 px-6 rounded-lg transition-all ${
                  formData[currentStepData.field]
                    ? "bg-[var(--navy)] text-[var(--teal)] hover:opacity-90"
                    : "bg-[var(--navy)]/10 text-[var(--navy)]/30 cursor-not-allowed"
                }`}
              >
                Continue
              </button>
            </div>
          )}

          {/* Yes/No */}
          {currentStepData.type === "yesno" && (
            <div className="flex gap-3">
              {["Yes", "No"].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setFormData({ ...formData, supportApplication: option });
                    setTimeout(() => setCurrentStep(currentStep + 1), 150);
                  }}
                  className={`flex-1 text-xl font-semibold py-5 rounded-lg transition-all ${
                    formData.supportApplication === option
                      ? "bg-[var(--navy)] text-[var(--teal)]"
                      : "bg-[var(--navy)]/5 hover:bg-[var(--navy)]/10 text-[var(--navy)]"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {/* Consent + Submit */}
          {currentStepData.type === "consent" && (
            <div className="space-y-6">
              <label className="flex items-start gap-4 cursor-pointer group">
                <div className="relative mt-1">
                  <input
                    type="checkbox"
                    checked={formData.consentShare}
                    onChange={(e) => setFormData({ ...formData, consentShare: e.target.checked })}
                    className="sr-only"
                  />
                  <div className={`w-6 h-6 rounded border-2 transition-all flex items-center justify-center ${
                    formData.consentShare
                      ? "bg-[var(--navy)] border-[var(--navy)]"
                      : "border-[var(--navy)]/30 group-hover:border-[var(--navy)]/50"
                  }`}>
                    {formData.consentShare && (
                      <svg className="w-4 h-4 text-[var(--teal)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-[var(--navy)]/80 text-lg leading-relaxed">
                  I consent to my details being shared with housing partners and Mole Valley District Council
                </span>
              </label>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={!formData.consentShare}
                className={`w-full text-lg font-semibold py-4 rounded-lg transition-all ${
                  formData.consentShare
                    ? "bg-[var(--navy)] text-[var(--teal)] hover:opacity-90"
                    : "bg-[var(--navy)]/10 text-[var(--navy)]/30 cursor-not-allowed"
                }`}
              >
                Submit
              </button>
            </div>
          )}

          {/* Navigation for text inputs */}
          {(currentStepData.type === "text" || currentStepData.type === "email") && (
            <div className="flex justify-between items-center mt-8">
              <button
                type="button"
                onClick={goPrev}
                className={`text-[var(--navy)]/60 hover:text-[var(--navy)] transition-colors ${
                  currentStep === 0 ? "invisible" : ""
                }`}
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={!formData[currentStepData.field]}
                className={`font-semibold py-3 px-6 rounded-lg transition-all ${
                  formData[currentStepData.field]
                    ? "bg-[var(--navy)] text-[var(--teal)] hover:opacity-90"
                    : "bg-[var(--navy)]/10 text-[var(--navy)]/30 cursor-not-allowed"
                }`}
              >
                Continue →
              </button>
            </div>
          )}

          {/* Back button for select/yesno/consent */}
          {currentStepData.type !== "text" && currentStepData.type !== "email" && currentStep > 0 && (
            <button
              type="button"
              onClick={goPrev}
              className="mt-8 text-[var(--navy)]/60 hover:text-[var(--navy)] transition-colors"
            >
              ← Back
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
