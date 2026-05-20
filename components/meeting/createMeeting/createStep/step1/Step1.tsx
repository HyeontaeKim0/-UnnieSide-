"use client";

import type { MeetingFormData } from "@/lib/types/MeetingData";
import CATEGORIES from "@/lib/utils/MeetingCategories";

const SAMPLE_IMAGES = [
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=300&fit=crop",
  "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=600&h=300&fit=crop",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=300&fit=crop",
  "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=600&h=300&fit=crop",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=300&fit=crop",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=300&fit=crop",
];

const TITLE_MAX = 40;
const DESC_MAX = 500;

interface Step1Props {
  data: MeetingFormData;
  onChange: (partial: Partial<MeetingFormData>) => void;
}

export default function Step1({ data, onChange }: Step1Props) {
  return (
    <>
      {/* Step Header */}
      <div className="mb-2">
        <span className="text-xs font-bold text-signature">STEP 1 / 4</span>
        <span className="text-xs text-[#8a8175]"> · 소개</span>
      </div>
      <h1 className="text-[26px] font-bold text-[#2A241D] leading-tight">
        어떤 모임을 만드시나요?
      </h1>
      <p className="text-[13px] text-[#8a8175] mt-1 mb-6">
        카테고리와 제목, 소개글을 적어주세요
      </p>

      {/* Progress Bar */}
      <div className="flex gap-1 mb-10">
        {[0, 1, 2, 3].map((step) => (
          <div
            key={step}
            className={`h-[3px] flex-1 rounded-full ${
              step === 0 ? "bg-signature" : "bg-[#E5DDD3]"
            }`}
          />
        ))}
      </div>

      {/* Category */}
      <section className="mb-8">
        <label className="text-sm font-bold text-[#2A241D] mb-3 block">
          카테고리 <span className="text-signature">*</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          {CATEGORIES.map((cat) => {
            const isSelected = data.category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onChange({ category: cat.id })}
                className={`flex flex-col items-center justify-center gap-1.5 py-4 rounded-xl border-2 transition-colors cursor-pointer ${
                  isSelected
                    ? "border-signature bg-[#FFF8F0]"
                    : "border-[#E8E0D6] bg-white hover:border-[#C8B89E]"
                }`}
              >
                <span className="text-2xl">{cat.emoji}</span>
                <span
                  className={`text-xs font-medium ${
                    isSelected ? "text-signature" : "text-[#5C5246]"
                  }`}
                >
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Title */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-bold text-[#2A241D]">
            모임 제목 <span className="text-signature">*</span>
          </label>
          <span className="text-xs text-[#8a8175]">
            {data.title.length} / {TITLE_MAX}
          </span>
        </div>
        <input
          type="text"
          value={data.title}
          onChange={(e) => {
            if (e.target.value.length <= TITLE_MAX)
              onChange({ title: e.target.value });
          }}
          placeholder="예: 북한산 백운대 새벽 등반"
          className="w-full px-4 py-3 rounded-xl border border-[#E8E0D6] bg-white text-sm text-[#2A241D] placeholder:text-[#B8AD9E] focus:outline-none focus:border-signature transition-colors"
        />
      </section>

      {/* Description */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-bold text-[#2A241D]">
            소개글 <span className="text-signature">*</span>
          </label>
          <span className="text-xs text-[#8a8175]">
            {data.description.length} / {DESC_MAX}
          </span>
        </div>
        <textarea
          value={data.description}
          onChange={(e) => {
            if (e.target.value.length <= DESC_MAX)
              onChange({ description: e.target.value });
          }}
          placeholder={`어떤 분위기의 모임인지, 무엇을 함께할지 적어주세요.\n\n예) 동트는 백운대 정상에서 일출 보고 내려옵니다. 5시간 코스, 가벼운 등산 경험 있는 분 환영해요.`}
          rows={5}
          className="w-full px-4 py-3 rounded-xl border border-[#E8E0D6] bg-white text-sm text-[#2A241D] placeholder:text-[#B8AD9E] resize-none focus:outline-none focus:border-signature transition-colors"
        />
      </section>

      {/* Representative Image */}
      <section className="mb-8">
        <label className="text-sm font-bold text-[#2A241D] mb-3 block">
          대표 이미지 <span className="text-signature">*</span>
        </label>

        {data.image && (
          <div className="relative w-full h-48 rounded-xl overflow-hidden mb-3">
            <img
              src={data.image}
              alt="대표 이미지"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => onChange({ image: "" })}
              className="absolute top-3 right-3 px-3 py-1 bg-[#2A241D]/70 text-white text-xs rounded-md hover:bg-[#2A241D]/90 transition-colors cursor-pointer"
            >
              제거
            </button>
          </div>
        )}

        <div className="flex gap-2 overflow-x-auto pb-1">
          {SAMPLE_IMAGES.map((img) => (
            <button
              key={img}
              type="button"
              onClick={() => onChange({ image: img })}
              className={`shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-colors cursor-pointer ${
                data.image === img
                  ? "border-signature"
                  : "border-transparent hover:border-[#C8B89E]"
              }`}
            >
              <img
                src={img}
                alt="썸네일"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </section>
    </>
  );
}
