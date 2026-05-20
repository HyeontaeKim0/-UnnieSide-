import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import MeetingCard from "@/components/meeting/meetingCard/MeetingCard";
import CreateMeetingButton from "@/components/meeting/createMeeting/button/Button";
import { CATEGORY_LABELS } from "@/lib/utils/MeetingCategories";
import type { Session } from "next-auth";

export default async function MeetingPage() {
  const session = await auth();

  const meetings = await prisma.meeting.findMany({
    orderBy: { createdAt: "desc" },
    include: { host: { select: { name: true, image: true, id: true } } },
  });

  console.log(meetings);

  const categories = meetings.reduce(
    (acc, m) => {
      acc[m.category] = (acc[m.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  console.log(categories);

  const tagCounts = meetings
    .flatMap((m) => m.tags)
    .reduce(
      (acc, tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

  const topTags = Object.entries(tagCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([tag]) => tag);

  return (
    <div className="flex flex-1 bg-[#FBF7F3] font-sans w-full mx-auto px-[220px]">
      <div className="py-[50px] px-[40px] w-[320px] shrink-0">
        <CreateMeetingButton />
        {/* 카테고리 */}
        <div className="flex flex-col gap-2 mt-5 rounded-xl p-4">
          <span className="text-sm text-[#4A4A4A] font-bold">카테고리</span>
          {Object.entries(categories).map(([category, count]) => (
            <div key={category} className="flex justify-between px-2 mt-2">
              <div className="text-sm font-bold text-[#4A4A4A]">
                {CATEGORY_LABELS[category]}
              </div>
              <div className="text-sm text-[#4A4A4A]">{count}</div>
            </div>
          ))}
        </div>
        {/* 지금 뜨는 태그 */}
        {topTags.length > 0 && (
          <div className="flex flex-col gap-2 mt-10 bg-[#f1f5e8] rounded-xl p-4 border border-[#dfe8d0]">
            <span className="text-sm text-[#4A4A4A] font-bold">
              지금 뜨는 태그
            </span>
            <div className="flex flex-wrap gap-2 mt-2">
              {topTags.map((tag) => (
                <div key={tag} className="flex gap-2 items-center">
                  <div className="text-sm font-bold text-[#5f7a4a] bg-[#ffffff] rounded-full px-2 py-1 whitespace-nowrap">
                    #{tag}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4 flex-1 font-sans py-[50px] px-[10px]">
        {/* 타이틀 */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl text-text-signature font-bold">
              전체 모임
            </h1>
            <span className="text-sm text-text-signature mt-2">
              ({meetings.length}개)
            </span>
          </div>
          <span className="text-sm text-text-signature mt-2">
            <span className="text-signature font-bold">
              {session?.user?.name}
            </span>
            님, 관심 있는 모임에 참여해보세요.
          </span>
          <div className="w-full h-px bg-[#E0E0E0] my-4"></div>
          {/* 필터 */}
          <div className="flex items-center gap-3">
            <div className="flex items-center text-sm text-text-signature">
              이번 주말
            </div>
            <div className="flex items-center text-sm text-text-signature">
              초보환영
            </div>
            <div className="flex items-center text-sm text-text-signature">
              무료
            </div>
            <div className="flex items-center text-sm text-text-signature">
              정원 여유
            </div>
            <div className="flex items-center text-sm text-text-signature">
              온라인
            </div>
            <div className="flex items-center text-sm text-text-signature">
              오프라인
            </div>
          </div>
        </div>
        <div className="mt-3 flex flex-col gap-4">
          {meetings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#8a8175]">
              <span className="text-4xl mb-4">📭</span>
              <p className="text-lg font-bold mb-1">아직 모임이 없어요</p>
              <p className="text-sm">첫 번째 모임을 만들어보세요!</p>
            </div>
          ) : (
            meetings.map((meeting) => (
              <MeetingCard
                key={meeting.id}
                meeting={meeting}
                session={session as Session}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
