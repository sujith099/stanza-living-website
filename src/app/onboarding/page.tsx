"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import {
  OnboardingProgress,
  OnboardingCityStep,
  OnboardingLocationStep,
  OnboardingBudgetStep,
  OnboardingRoomTypeStep,
  OnboardingLifestyleStep,
  RecommendationPreview,
} from "@/components/auth";
import { RoomlyButton } from "@/components/ui/RoomlyButton";
import { INITIAL_PREFERENCES, OnboardingPreferences } from "@/data/auth";
import { ROOMLY_EASE } from "@/lib/animations";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] =
    useState<OnboardingPreferences>(INITIAL_PREFERENCES);

  React.useEffect(() => {
    document.title = "Onboarding | Stanza Living";
  }, []);

  const handleNext = () => {
    setStep((s) => Math.min(s + 1, 6));
  };

  const handleBack = () => {
    setStep((s) => Math.max(s - 1, 1));
  };

  const toggleLifestyleTag = (tag: string) => {
    setPreferences((prev) => {
      const exists = prev.lifestyle.includes(tag);
      return {
        ...prev,
        lifestyle: exists
          ? prev.lifestyle.filter((t) => t !== tag)
          : [...prev.lifestyle, tag],
      };
    });
  };

  return (
    <div className="min-h-screen bg-roomly-bg text-roomly-dark selection:bg-roomly-green selection:text-roomly-cream flex flex-col justify-between p-6 sm:p-10 lg:p-14">
      {/* Top Header & Progress */}
      {step <= 5 ? (
        <header className="max-w-3xl mx-auto w-full pb-8">
          <OnboardingProgress currentStep={step} totalSteps={5} />
        </header>
      ) : (
        <header className="max-w-4xl mx-auto w-full pb-8 flex items-center justify-between">
          <div className="font-display font-black text-xl tracking-wider text-roomly-dark">
            ROOMLY<span className="text-roomly-lime">*</span>
          </div>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="text-xs font-semibold text-roomly-muted hover:text-roomly-dark transition-colors cursor-pointer"
          >
            Edit preferences ↺
          </button>
        </header>
      )}

      {/* Main Question Body with Framer Motion slide */}
      <main className="max-w-3xl mx-auto w-full flex-grow flex flex-col justify-center py-4">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: ROOMLY_EASE }}
              className="w-full flex flex-col gap-8"
            >
              <OnboardingCityStep
                selectedCity={preferences.city}
                onSelectCity={(city) =>
                  setPreferences((p) => ({ ...p, city }))
                }
              />

              <div className="flex justify-end pt-4">
                <RoomlyButton
                  variant="primary"
                  size="lg"
                  shape="pill"
                  withArrow
                  arrowStyle="circle"
                  onClick={handleNext}
                  className="text-xs sm:text-sm font-semibold px-8 py-3.5"
                >
                  Continue
                </RoomlyButton>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: ROOMLY_EASE }}
              className="w-full flex flex-col gap-8"
            >
              <OnboardingLocationStep
                routine={preferences.routine}
                locationName={preferences.locationName}
                onRoutineChange={(routine) =>
                  setPreferences((p) => ({ ...p, routine }))
                }
                onLocationChange={(locationName) =>
                  setPreferences((p) => ({ ...p, locationName }))
                }
              />

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-roomly-muted hover:text-roomly-dark transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <RoomlyButton
                  variant="primary"
                  size="lg"
                  shape="pill"
                  withArrow
                  arrowStyle="circle"
                  onClick={handleNext}
                  className="text-xs sm:text-sm font-semibold px-8 py-3.5"
                >
                  Continue
                </RoomlyButton>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: ROOMLY_EASE }}
              className="w-full flex flex-col gap-8"
            >
              <OnboardingBudgetStep
                budgetMin={preferences.budgetMin}
                budgetMax={preferences.budgetMax}
                onBudgetChange={(budgetMin, budgetMax) =>
                  setPreferences((p) => ({ ...p, budgetMin, budgetMax }))
                }
              />

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-roomly-muted hover:text-roomly-dark transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <RoomlyButton
                  variant="primary"
                  size="lg"
                  shape="pill"
                  withArrow
                  arrowStyle="circle"
                  onClick={handleNext}
                  className="text-xs sm:text-sm font-semibold px-8 py-3.5"
                >
                  Continue
                </RoomlyButton>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: ROOMLY_EASE }}
              className="w-full flex flex-col gap-8"
            >
              <OnboardingRoomTypeStep
                roomType={preferences.roomType}
                onRoomTypeChange={(roomType) =>
                  setPreferences((p) => ({ ...p, roomType }))
                }
              />

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-roomly-muted hover:text-roomly-dark transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <RoomlyButton
                  variant="primary"
                  size="lg"
                  shape="pill"
                  withArrow
                  arrowStyle="circle"
                  onClick={handleNext}
                  className="text-xs sm:text-sm font-semibold px-8 py-3.5"
                >
                  Continue
                </RoomlyButton>
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: ROOMLY_EASE }}
              className="w-full flex flex-col gap-8"
            >
              <OnboardingLifestyleStep
                selectedTags={preferences.lifestyle}
                onToggleTag={toggleLifestyleTag}
              />

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-roomly-muted hover:text-roomly-dark transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <RoomlyButton
                  variant="lime"
                  size="lg"
                  shape="pill"
                  withArrow
                  arrowStyle="circle"
                  onClick={handleNext}
                  className="text-xs sm:text-sm font-semibold px-8 py-3.5 shadow-xl"
                >
                  Show my rooms
                </RoomlyButton>
              </div>
            </motion.div>
          )}

          {step === 6 && (
            <motion.div
              key="step6"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: ROOMLY_EASE }}
              className="w-full max-w-5xl mx-auto"
            >
              <RecommendationPreview preferences={preferences} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="max-w-3xl mx-auto w-full pt-8 text-center text-xs text-roomly-muted">
        <span>Roomly Prototype · Living simplified</span>
      </footer>
    </div>
  );
}
