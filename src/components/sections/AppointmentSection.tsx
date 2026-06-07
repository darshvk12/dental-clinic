"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks";
import { appointmentSchema, type AppointmentFormValues } from "@/lib/schemas";
import { TREATMENT_OPTIONS, TIME_SLOTS, CLINIC_CONFIG } from "@/lib/data";
import { getMinDate } from "@/lib/utils";
import { Calendar, Phone, Mail, Clock, MessageSquare, User, CheckCircle, AlertCircle, Loader2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

function useReveal() {
  const { ref, inView } = useInView();
  return { ref: ref as React.RefObject<HTMLDivElement>, inView };
}

function RevealDiv({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const { ref, inView } = useReveal();
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}>{children}</motion.div>
  );
}

type SubmitState = "idle" | "loading" | "success" | "error";

export default function AppointmentSection() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submittedName, setSubmittedName] = useState("");

  const {
    register, handleSubmit, reset,
    formState: { errors },
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
  });

  const onSubmit = async (data: AppointmentFormValues) => {
    setSubmitState("loading");
    setSubmittedName(data.name.split(" ")[0]);

    try {
      const response = await fetch("/api/book-appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        console.error("Appointment submission failed:", errorBody || response.statusText);
        throw new Error("Failed to submit appointment");
      }

      setSubmitState("success");
      reset();
    } catch (error) {
      console.error("Appointment submission failed:", error);
      setSubmitState("error");
    }
  };

  return (
    <section id="appointment" className="section-py bg-gradient-to-br from-dental-navy-700 to-dental-navy-900 relative overflow-hidden">
      {/* BG decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/3 -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-dental-mint/8 translate-y-1/3 -translate-x-1/3" />
      </div>

      <div className="container-dental relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 xl:gap-20 items-start">
          {/* Left: info */}
          <div>
            <RevealDiv><span className="text-xs font-semibold uppercase tracking-[0.12em] text-dental-mint">Book Appointment</span></RevealDiv>
            <RevealDiv delay={0.1}>
              <h2 className="text-display text-display-lg text-white mt-2 mb-3">
                Ready to <em className="italic text-dental-mint">Transform</em> Your Smile?
              </h2>
            </RevealDiv>
            <div className="w-12 h-0.5 bg-dental-mint rounded-full my-5" />
            <RevealDiv delay={0.15}>
              <p className="text-white/60 text-base leading-relaxed mb-8">
                Fill in the form and our team will confirm your appointment within 30 minutes
                during clinic hours.
              </p>
            </RevealDiv>

            {/* Quick info cards */}
            <div className="space-y-3">
              {[
                { icon: Clock, label: "Response Time", value: "Within 30 minutes" },
                { icon: Phone, label: "Emergency Line", value: CLINIC_CONFIG.contact.emergencyPhone },
                { icon: Calendar, label: "First Available", value: "Often same day" },
              ].map(({ icon: Icon, label, value }) => (
                <RevealDiv key={label} delay={0.2}>
                  <div className="flex items-center gap-3 glass rounded-xl px-4 py-3">
                    <div className="w-9 h-9 rounded-lg bg-dental-mint/20 flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-dental-mint" />
                    </div>
                    <div>
                      <div className="text-xs text-white/45 font-medium">{label}</div>
                      <div className="text-sm font-semibold text-white">{value}</div>
                    </div>
                  </div>
                </RevealDiv>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <RevealDiv delay={0.2}>
            <div className="glass rounded-[1.75rem] p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {submitState === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                  >
                    <div className="w-20 h-20 rounded-full bg-dental-mint/20 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle size={40} className="text-dental-mint" />
                    </div>
                    <h3 className="font-display text-2xl font-light text-white mb-2">
                      Thank you, {submittedName}!
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-6">
                      Thank you. Your appointment request has been received. Our team will contact you within 30 minutes during clinic hours. A confirmation email has been sent to your inbox.
                    </p>
                    <button
                      onClick={() => setSubmitState("idle")}
                      className="btn btn-mint btn-md"
                    >
                      Book Another Appointment
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="space-y-0"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <FieldWrapper label="Full Name" required error={errors.name?.message} icon={User}>
                        <input
                          {...register("name")}
                          type="text"
                          placeholder="e.g. Priya Sharma"
                          className={cn("form-field", errors.name && "border-red-400 focus:border-red-400")}
                          autoComplete="name"
                        />
                      </FieldWrapper>

                      {/* Phone */}
                      <FieldWrapper label="Phone Number" required error={errors.phone?.message} icon={Phone}>
                        <input
                          {...register("phone")}
                          type="tel"
                          placeholder="+91 98765 43210"
                          className={cn("form-field", errors.phone && "border-red-400 focus:border-red-400")}
                          autoComplete="tel"
                        />
                      </FieldWrapper>

                      {/* Email */}
                      <FieldWrapper label="Email Address" required error={errors.email?.message} icon={Mail} className="sm:col-span-2">
                        <input
                          {...register("email")}
                          type="email"
                          placeholder="your@email.com"
                          className={cn("form-field", errors.email && "border-red-400 focus:border-red-400")}
                          autoComplete="email"
                        />
                      </FieldWrapper>

                      {/* Treatment */}
                      <FieldWrapper label="Treatment Type" required error={errors.treatment?.message} icon={Calendar} className="sm:col-span-2">
                        <select
                          {...register("treatment")}
                          className={cn("form-field cursor-pointer", errors.treatment && "border-red-400")}
                        >
                          <option value="">Select a treatment...</option>
                          {TREATMENT_OPTIONS.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </FieldWrapper>

                      {/* Date */}
                      <FieldWrapper label="Preferred Date" required error={errors.date?.message} icon={Calendar}>
                        <input
                          {...register("date")}
                          type="date"
                          min={getMinDate()}
                          className={cn("form-field", errors.date && "border-red-400")}
                        />
                      </FieldWrapper>

                      {/* Time */}
                      <FieldWrapper label="Preferred Time" required error={errors.time?.message} icon={Clock}>
                        <select
                          {...register("time")}
                          className={cn("form-field cursor-pointer", errors.time && "border-red-400")}
                        >
                          <option value="">Select a time...</option>
                          {TIME_SLOTS.map(slot => (
                            <option key={slot} value={slot}>{slot}</option>
                          ))}
                        </select>
                      </FieldWrapper>

                      {/* Message */}
                      <FieldWrapper label="Additional Message" error={errors.message?.message} icon={MessageSquare} className="sm:col-span-2">
                        <textarea
                          {...register("message")}
                          rows={3}
                          placeholder="Tell us about any concerns, symptoms, or specific questions..."
                          className="form-field resize-none"
                        />
                      </FieldWrapper>
                    </div>

                    {/* Error state */}
                    <AnimatePresence>
                      {submitState === "error" && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                          className="flex items-center gap-2 text-red-300 bg-red-500/15 border border-red-500/30 rounded-xl p-3 text-xs mt-4"
                        >
                          <AlertCircle size={14} className="flex-shrink-0" />
                          Something went wrong. Please try again or call us directly.
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit */}
                    <div className="flex flex-col sm:flex-row gap-3 items-start mt-5">
                      <button
                        type="submit"
                        disabled={submitState === "loading"}
                        className="btn btn-mint btn-lg gap-2 shadow-mint disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto"
                      >
                        {submitState === "loading" ? (
                          <><Loader2 size={18} className="animate-spin" /> Submitting...</>
                        ) : (
                          <><CheckCircle size={18} /> Confirm Appointment <ArrowRight size={15} /></>
                        )}
                      </button>
                      <p className="text-white/35 text-xs leading-relaxed pt-2 sm:pt-0">
                        We respond within 30 min during clinic hours. Your data is kept private.
                      </p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </RevealDiv>
        </div>
      </div>
    </section>
  );
}

/* ── Field wrapper ─────────────────────────────────────────────── */
function FieldWrapper({
  label, required, error, icon: Icon, children, className = "",
}: {
  label: string;
  required?: boolean;
  error?: string;
  icon: React.ElementType;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label className="text-xs font-semibold text-white/75 flex items-center gap-1.5">
        <Icon size={12} className="text-white/40" />
        {label}
        {required && <span className="text-dental-mint">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-[0.7rem] text-red-300 flex items-center gap-1"
          >
            <AlertCircle size={11} className="flex-shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
