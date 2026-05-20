"use client";

import { useState, type KeyboardEvent } from "react";
import type { MeetingFormData } from "@/lib/types/MeetingData";

const CAPACITY_PRESETS = [4, 6, 8, 10, 12, 20];
const MIN_CAPACITY = 2;
const MAX_CAPACITY = 50;
const MAX_TAGS = 5;

const TARGET_OPTIONS = [
  { id: "beginner", label: "초보 환영", emoji: "🌱" },
  { id: "experienced", label: "경험자", emoji: "🎯" },
  { id: "20s", label: "20대" },
  { id: "30s", label: "30대" },
  { id: "40s", label: "40대 이상" },
  { id: "women", label: "여성 한정" },
  { id: "men", label: "남성 한정" },
  { id: "family", label: "가족 동반" },
  { id: "pet", label: "반려동물 동반" },
];

const SUGGESTED_TAGS = ["서울", "경기", "초보환영", "주말", "저녁", "원데이"];

interface Step3Props {
  data: MeetingFormData;
  onChange: (partial: Partial<MeetingFormData>) => void;
}

export default function Step3({ data, onChange }: Step3Props) {
  const [feeType, setFeeType] = useState<"free" | "paid">(
    data.price === "무료" ? "free" : "paid",
  );
  const [feeAmount, setFeeAmount] = useState(
    data.price !== "무료" ? data.price : "",
  );
  const [tagInput, setTagInput] = useState("");

  const adjustCapacity = (delta: number) => {
    const next = Math.max(
      MIN_CAPACITY,
      Math.min(MAX_CAPACITY, data.maxParticipants + delta),
    );
    onChange({ maxParticipants: next });
  };

  const toggleTarget = (id: string) => {
    const next = data.filter.includes(id)
      ? data.filter.filter((t) => t !== id)
      : [...data.filter, id];
    onChange({ filter: next });
  };

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (
      trimmed &&
      !data.tags.includes(trimmed) &&
      data.tags.length < MAX_TAGS
    ) {
      onChange({ tags: [...data.tags, trimmed] });
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    onChange({ tags: data.tags.filter((t) => t !== tag) });
  };

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(tagInput);
    }
  };

  const handleFeeTypeChange = (type: "free" | "paid") => {
    setFeeType(type);
    if (type === "free") {
      onChange({ price: "무료" });
      setFeeAmount("");
    }
  };

  const handleFeeAmountChange = (value: string) => {
    const digits = value.replace(/[^0-9]/g, "");
    setFeeAmount(digits);
    onChange({ price: digits ? `${Number(digits).toLocaleString()}원` : "" });
  };

  return (
    <>
      {/* Step Header */}
      <div className="mb-2">
        <span className="text-xs font-bold text-signature">STEP 3 / 4</span>
        <span className="text-xs text-[#8a8175]"> · 참여 조건</span>
      </div>
      <h1 className="text-[26px] font-bold text-[#2A241D] leading-tight">
        누구와 함께 하고 싶어요?
      </h1>
      <p className="text-[13px] text-[#8a8175] mt-1 mb-6">
        정원, 참가비, 환영 대상을 알려주세요
      </p>

      {/* Progress Bar */}
      <div className="flex gap-1 mb-10">
        {[0, 1, 2, 3].map((step) => (
          <div
            key={step}
            className={`h-[3px] flex-1 rounded-full ${
              step <= 2 ? "bg-signature" : "bg-[#E5DDD3]"
            }`}
          />
        ))}
      </div>

      {/* Capacity */}
      <section className="mb-8">
        <label className="text-sm font-bold text-[#2A241D] mb-3 block">
          정원 <span className="text-signature">*</span>
        </label>

        <div className="flex items-center justify-between border border-[#E8E0D6] rounded-xl bg-white px-5 py-6 mb-3">
          <button
            type="button"
            onClick={() => adjustCapacity(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-[#E8E0D6] text-xl text-[#5C5246] hover:border-[#C8B89E] transition-colors cursor-pointer"
          >
            −
          </button>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#2A241D]">
              {data.maxParticipants}
              <span className="text-base font-medium">명</span>
            </div>
            <p className="text-xs text-[#8a8175] mt-1">
              호스트 포함 {data.maxParticipants}명까지 함께해요
            </p>
          </div>
          <button
            type="button"
            onClick={() => adjustCapacity(1)}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-[#E8E0D6] text-xl text-[#5C5246] hover:border-[#C8B89E] transition-colors cursor-pointer"
          >
            +
          </button>
        </div>

        <div className="grid grid-cols-6 gap-2">
          {CAPACITY_PRESETS.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => onChange({ maxParticipants: n })}
              className={`py-2 rounded-xl text-sm font-medium border transition-colors cursor-pointer ${
                data.maxParticipants === n
                  ? "border-signature text-signature bg-[#FFF8F0]"
                  : "border-[#E8E0D6] text-[#5C5246] bg-white hover:border-[#C8B89E]"
              }`}
            >
              {n}명
            </button>
          ))}
        </div>
      </section>

      {/* Fee */}
      <section className="mb-8">
        <label className="text-sm font-bold text-[#2A241D] mb-3 block">
          참가비 <span className="text-signature">*</span>
        </label>

        <div className="grid grid-cols-2 gap-2 mb-2">
          <button
            type="button"
            onClick={() => handleFeeTypeChange("free")}
            className={`relative py-4 rounded-xl text-sm font-bold border-2 transition-colors cursor-pointer ${
              feeType === "free"
                ? "border-signature bg-[#FFF8F0] text-signature"
                : "border-[#E8E0D6] bg-white text-[#5C5246] hover:border-[#C8B89E]"
            }`}
          >
            무료
            {feeType === "free" && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 bg-signature rounded-full flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2 6L5 9L10 3"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => handleFeeTypeChange("paid")}
            className={`py-4 rounded-xl text-sm font-bold border-2 transition-colors cursor-pointer ${
              feeType === "paid"
                ? "border-signature bg-[#FFF8F0] text-signature"
                : "border-[#E8E0D6] bg-white text-[#5C5246] hover:border-[#C8B89E]"
            }`}
          >
            유료
          </button>
        </div>

        {feeType === "paid" && (
          <div className="mb-2">
            <input
              type="text"
              value={feeAmount}
              onChange={(e) => handleFeeAmountChange(e.target.value)}
              placeholder="참가비를 입력해주세요 (원)"
              className="w-full px-4 py-3 rounded-xl border border-[#E8E0D6] bg-white text-sm text-[#2A241D] placeholder:text-[#B8AD9E] focus:outline-none focus:border-signature transition-colors"
            />
          </div>
        )}

        <p className="text-xs text-[#8a8175]">
          참가비는 장소 대관·재료비 등 실비 정산을 위한 금액이어야 해요. 영리
          목적의 모임은 금지됩니다.
        </p>
      </section>

      {/* Target Audience */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-bold text-[#2A241D]">환영 대상</label>
          <span className="text-xs text-[#8a8175]">(선택)</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {TARGET_OPTIONS.map((opt) => {
            const selected = data.filter.includes(opt.id);
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => toggleTarget(opt.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors cursor-pointer ${
                  selected
                    ? "bg-signature text-white border-signature"
                    : "bg-white text-[#5C5246] border-[#E8E0D6] hover:border-[#C8B89E]"
                }`}
              >
                {opt.emoji && <span className="mr-1">{opt.emoji}</span>}
                {opt.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Tags */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-bold text-[#2A241D]">태그</label>
          <span className="text-xs text-[#8a8175]">
            {data.tags.length} / {MAX_TAGS}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 px-4 py-3 rounded-xl border border-[#E8E0D6] bg-white mb-2">
          {data.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-3 py-1 bg-[#FFF8F0] text-signature text-sm rounded-full border border-signature/30"
            >
              # {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="text-signature/60 hover:text-signature cursor-pointer"
              >
                ×
              </button>
            </span>
          ))}
          {data.tags.length < MAX_TAGS && (
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder="태그 입력 후 엔터"
              className="flex-1 min-w-[120px] text-sm text-[#2A241D] placeholder:text-[#B8AD9E] outline-none bg-transparent"
            />
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-[#8a8175]">추천:</span>
          {SUGGESTED_TAGS.filter((t) => !data.tags.includes(t)).map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => addTag(tag)}
              className="text-xs text-[#8a8175] px-2.5 py-1 bg-[#F4EFE6] rounded-full hover:bg-[#E8E0D6] transition-colors cursor-pointer"
            >
              + {tag}
            </button>
          ))}
        </div>
      </section>
    </>
  );
}
