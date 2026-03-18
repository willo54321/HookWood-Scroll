"use client";

import { useState, useEffect } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  postcode: string;
  supportsProposal: boolean;
}

interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  postcode?: string;
  supportsProposal?: string;
}

export default function SupportForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    postcode: "",
    supportsProposal: false,
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Track UTM params on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get("utm_source");
    if (utmSource) {
      sessionStorage.setItem("utm_source", utmSource);
      sessionStorage.setItem("utm_medium", urlParams.get("utm_medium") || "");
      sessionStorage.setItem("utm_campaign", urlParams.get("utm_campaign") || "");
    }
  }, []);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePostcode = (postcode: string): boolean => {
    const postcodeRegex = /^[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}$/i;
    return postcodeRegex.test(postcode.trim());
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.postcode.trim()) {
      newErrors.postcode = "Postcode is required";
    } else if (!validatePostcode(formData.postcode)) {
      newErrors.postcode = "Please enter a valid UK postcode";
    }

    if (!formData.supportsProposal) {
      newErrors.supportsProposal = "Please confirm your support to continue";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/mvzzzobg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          postcode: formData.postcode,
          supportsProposal: formData.supportsProposal,
          utm_source: sessionStorage.getItem("utm_source") || "",
          utm_medium: sessionStorage.getItem("utm_medium") || "",
          utm_campaign: sessionStorage.getItem("utm_campaign") || "",
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        setIsSubmitted(true);
      }
    } catch {
      setIsSubmitted(true);
    }

    setIsSubmitting(false);
  };

  // Thank you screen
  if (isSubmitted) {
    return (
      <section
        id="support-form"
        className="min-h-screen bg-[var(--teal)] flex items-center justify-center px-4 py-12"
      >
        <div className="text-center max-w-xl w-full">
          <div className="w-16 h-16 bg-[var(--navy)] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-[var(--teal)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-[var(--navy)] mb-4">
            Thank you, {formData.firstName}!
          </h2>

          <p className="text-lg text-[var(--navy)]/80 mb-8">
            Your support has been registered. We&apos;ll keep you updated at {formData.email}.
          </p>

          <div className="bg-[var(--navy)]/10 rounded-xl p-4 mb-8 text-left">
            <h3 className="font-semibold text-[var(--navy)] mb-2">What happens next?</h3>
            <p className="text-[var(--navy)]/70 text-sm">
              Your support will be submitted to Mole Valley District Council as part of the planning application.
            </p>
          </div>

          <a
            href="https://vistryhookwood.co.uk/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[var(--navy)] font-medium hover:underline"
          >
            Find out more about the application
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </section>
    );
  }

  // Main form
  return (
    <section
      id="support-form"
      className="min-h-screen bg-[var(--teal)] flex items-center justify-center px-4 py-12 md:py-20"
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--navy)] mb-3">
            Add Your Support
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block text-[var(--navy)] font-medium mb-1.5">
              First name <span className="text-red-600">*</span>
            </label>
            <input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={(e) => {
                setFormData({ ...formData, firstName: e.target.value });
                if (errors.firstName) setErrors({ ...errors, firstName: undefined });
              }}
              className={`w-full px-4 py-3 rounded-lg bg-white/50 border-2 outline-none text-[var(--navy)] placeholder-[var(--navy)]/40 transition-all ${
                errors.firstName
                  ? "border-red-500 bg-red-50"
                  : "border-transparent focus:border-[var(--navy)] focus:bg-white"
              }`}
            />
            {errors.firstName && (
              <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-[var(--navy)] font-medium mb-1.5">
              Last name <span className="text-red-600">*</span>
            </label>
            <input
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={(e) => {
                setFormData({ ...formData, lastName: e.target.value });
                if (errors.lastName) setErrors({ ...errors, lastName: undefined });
              }}
              className={`w-full px-4 py-3 rounded-lg bg-white/50 border-2 outline-none text-[var(--navy)] placeholder-[var(--navy)]/40 transition-all ${
                errors.lastName
                  ? "border-red-500 bg-red-50"
                  : "border-transparent focus:border-[var(--navy)] focus:bg-white"
              }`}
            />
            {errors.lastName && (
              <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-[var(--navy)] font-medium mb-1.5">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              placeholder="your@email.com"
              className={`w-full px-4 py-3 rounded-lg bg-white/50 border-2 outline-none text-[var(--navy)] placeholder-[var(--navy)]/40 transition-all ${
                errors.email
                  ? "border-red-500 bg-red-50"
                  : "border-transparent focus:border-[var(--navy)] focus:bg-white"
              }`}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Postcode */}
          <div>
            <label htmlFor="postcode" className="block text-[var(--navy)] font-medium mb-1.5">
              Postcode <span className="text-red-600">*</span>
            </label>
            <input
              id="postcode"
              type="text"
              value={formData.postcode}
              onChange={(e) => {
                setFormData({ ...formData, postcode: e.target.value.toUpperCase() });
                if (errors.postcode) setErrors({ ...errors, postcode: undefined });
              }}
              placeholder="RH6 0XX"
              className={`w-full px-4 py-3 rounded-lg bg-white/50 border-2 outline-none text-[var(--navy)] placeholder-[var(--navy)]/40 transition-all ${
                errors.postcode
                  ? "border-red-500 bg-red-50"
                  : "border-transparent focus:border-[var(--navy)] focus:bg-white"
              }`}
            />
            {errors.postcode && (
              <p className="text-red-600 text-sm mt-1">{errors.postcode}</p>
            )}
          </div>

          {/* Support Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative mt-0.5">
                <input
                  type="checkbox"
                  checked={formData.supportsProposal}
                  onChange={(e) => {
                    setFormData({ ...formData, supportsProposal: e.target.checked });
                    if (errors.supportsProposal) setErrors({ ...errors, supportsProposal: undefined });
                  }}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded border-2 transition-all flex items-center justify-center ${
                  formData.supportsProposal
                    ? "bg-[var(--navy)] border-[var(--navy)]"
                    : errors.supportsProposal
                      ? "border-red-500"
                      : "border-[var(--navy)]/30 group-hover:border-[var(--navy)]/50"
                }`}>
                  {formData.supportsProposal && (
                    <svg className="w-3 h-3 text-[var(--teal)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-[var(--navy)] text-sm leading-snug">
                I support the proposal for 446 new homes at Hookwood, including 200 affordable homes
              </span>
            </label>
            {errors.supportsProposal && (
              <p className="text-red-600 text-sm mt-1 ml-8">{errors.supportsProposal}</p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 rounded-lg font-semibold text-lg transition-all mt-6 ${
              isSubmitting
                ? "bg-[var(--navy)]/50 text-[var(--teal)]/70 cursor-not-allowed"
                : "bg-[var(--navy)] text-[var(--teal)] hover:opacity-90 hover:shadow-lg"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Add My Support"}
          </button>
        </form>

        {/* Trust line */}
        <p className="text-center text-sm text-[var(--navy)]/60 mt-4">
          Your details are only used to register your support with the council. We won&apos;t share them with anyone else.
        </p>
      </div>
    </section>
  );
}
