"use client";
import type { Session } from "next-auth";
import { Dropdown, Button, Label } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function MyProfile({
  session,
  signOutAction,
}: {
  session: Session;
  signOutAction: () => void;
}) {
  const router = useRouter();
  return (
    <Dropdown>
      <Button aria-label="Menu" variant="secondary" className="bg-transparent">
        {session.user?.image && (
          <Image
            src={session.user.image}
            alt="profile"
            width={32}
            height={32}
            className="rounded-full"
          />
        )}
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu onAction={(key) => console.log(`Selected: ${key}`)}>
          <Dropdown.Item
            id="my-page"
            textValue="마이페이지"
            variant="default"
            onPress={() => router.push("/my-page")}
          >
            <Label>마이페이지</Label>
          </Dropdown.Item>
          <Dropdown.Item
            id="sign-out"
            textValue="로그아웃"
            variant="danger"
            onPress={signOutAction}
          >
            <Label>로그아웃</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
