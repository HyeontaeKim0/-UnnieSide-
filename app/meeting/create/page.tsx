"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Step1 from "@/components/meeting/createMeeting/createStep/step1/Step1";
import Step2 from "@/components/meeting/createMeeting/createStep/step2/Step2";
import Step3 from "@/components/meeting/createMeeting/createStep/step3/Step3";
import Step4 from "@/components/meeting/createMeeting/createStep/step4/Step4";
import type {
  CreateMeetingRequest,
  MeetingFormData,
} from "@/lib/types/MeetingData";

const TOTAL_STEPS = 4;

const initialFormData: MeetingFormData = {
  category: "",
  title: "",
  description: "",
  image: "",
  date: "",
  time: "",
  duration: "2시간",
  isOnline: false,
  location: "",
  maxParticipants: 8,
  price: "무료",
  filter: [],
  tags: [],
};

export default function CreateMeetingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<MeetingFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateForm = (partial: Partial<MeetingFormData>) => {
    setFormData((prev) => ({ ...prev, ...partial }));
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const body: CreateMeetingRequest = {
        title: formData.title,
        description: formData.description,
        image: formData.image,
        category: formData.category,
        location: formData.location,
        date: formData.date,
        time: formData.time,
        duration: formData.duration,
        price: formData.price,
        maxParticipants: formData.maxParticipants,
        isOnline: formData.isOnline,
        tags: formData.tags,
        filter: formData.filter,
      };

      const res = await fetch("/api/meeting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error ?? "모임 생성에 실패했습니다.");
        return;
      }

      router.push("/meeting");
    } catch {
      alert("모임 생성 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((s) => s + 1);
      scrollToTop();
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
      scrollToTop();
    } else {
      router.back();
    }
  };

  const isLastStep = currentStep === TOTAL_STEPS;

  return (
    <div className="flex flex-col min-h-screen bg-[#FBF7F3] font-sans">
      <div className="flex-1 w-full max-w-2xl mx-auto px-6 pt-10 pb-28">
        {currentStep === 1 && <Step1 data={formData} onChange={updateForm} />}
        {currentStep === 2 && <Step2 data={formData} onChange={updateForm} />}
        {currentStep === 3 && <Step3 data={formData} onChange={updateForm} />}
        {currentStep === 4 && <Step4 data={formData} />}
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E8E0D6]">
        <div className="max-w-2xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handlePrev}
              className="flex items-center gap-1 text-sm font-medium text-[#5C5246] hover:text-[#2A241D] transition-colors cursor-pointer"
            >
              ← {currentStep === 1 ? "취소" : "이전"}
            </button>
            <button
              type="button"
              className="text-sm text-[#8a8175] hover:text-[#5C5246] transition-colors cursor-pointer"
            >
              임시저장
            </button>
          </div>
          <button
            type="button"
            onClick={handleNext}
            disabled={isSubmitting}
            className="px-8 py-3 bg-signature text-white text-sm font-bold rounded-xl hover:bg-[#C06E25] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting
              ? "게시 중..."
              : isLastStep
                ? "모임 게시하기"
                : "다음 →"}
          </button>
        </div>
      </div>
    </div>
  );
}
