"use client";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
export default function CreateMeetingButton() {
  const router = useRouter();
  return (
    <Button
      className="bg-[#2A241D] text-white rounded-xl w-full h-[50px]"
      onPress={() => {
        router.push("/meeting/create");
      }}
    >
      + 새 모임 만들기
    </Button>
  );
}
