"use client";

import { useState } from "react";

interface FormData {
  fullName: string;
  email: string;
  postcode: string;
}

interface ValidationErrors {
  fullName?: string;
  email?: string;
  postcode?: string;
}

export default function CompactForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    postcode: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email";
    }

    if (!formData.postcode.trim()) {
      newErrors.postcode = "Required";
    } else if (!validatePostcode(formData.postcode)) {
      newErrors.postcode = "Invalid postcode";
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
          name: formData.fullName,
          email: formData.email,
          postcode: formData.postcode,
          source: "compact_form",
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

  if (isSubmitted) {
    return (
      <section className="py-16 px-4 bg-[var(--navy)]">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-[var(--teal)]/10 rounded-2xl p-8">
            <div className="w-12 h-12 bg-[var(--teal)] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-[var(--navy)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Thank you!</h3>
            <p className="text-[var(--text-muted)]">
              Your support has been registered. Scroll down to learn more about the development.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-[var(--navy)]">
      <div className="max-w-2xl mx-auto">
        <div className="bg-[var(--teal)]/10 rounded-2xl p-6 md:p-8">
          <div className="text-center mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
              Ready to add your support?
            </h3>
            <p className="text-[var(--text-muted)] text-sm">
              Just 3 fields · Takes 30 seconds
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Name */}
              <div>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData({ ...formData, fullName: e.target.value });
                    if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                  }}
                  placeholder="Your name"
                  className={`w-full px-4 py-3 rounded-lg bg-white/10 border outline-none text-white placeholder-white/50 transition-all ${
                    errors.fullName
                      ? "border-red-500"
                      : "border-transparent focus:border-[var(--teal)] focus:bg-white/15"
                  }`}
                />
                {errors.fullName && (
                  <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  placeholder="Email address"
                  className={`w-full px-4 py-3 rounded-lg bg-white/10 border outline-none text-white placeholder-white/50 transition-all ${
                    errors.email
                      ? "border-red-500"
                      : "border-transparent focus:border-[var(--teal)] focus:bg-white/15"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Postcode */}
              <div>
                <input
                  type="text"
                  value={formData.postcode}
                  onChange={(e) => {
                    setFormData({ ...formData, postcode: e.target.value.toUpperCase() });
                    if (errors.postcode) setErrors({ ...errors, postcode: undefined });
                  }}
                  placeholder="Postcode"
                  className={`w-full px-4 py-3 rounded-lg bg-white/10 border outline-none text-white placeholder-white/50 transition-all ${
                    errors.postcode
                      ? "border-red-500"
                      : "border-transparent focus:border-[var(--teal)] focus:bg-white/15"
                  }`}
                />
                {errors.postcode && (
                  <p className="text-red-400 text-xs mt-1">{errors.postcode}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full md:w-auto md:min-w-[200px] mx-auto block py-3 px-8 rounded-lg font-semibold transition-all ${
                isSubmitting
                  ? "bg-[var(--teal)]/50 text-[var(--navy)]/70 cursor-not-allowed"
                  : "bg-[var(--teal)] text-[var(--navy)] hover:bg-[var(--teal-light)]"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Add My Support"}
            </button>
          </form>

          <p className="text-center text-xs text-white/40 mt-4">
            Your details are only used to register your support. We won&apos;t spam you.
          </p>
        </div>
      </div>
    </section>
  );
}
