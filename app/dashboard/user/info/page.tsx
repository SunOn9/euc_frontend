"use client";
import { User } from "@/generated/user/user";
import ChangePasswordForm from "../_component/form-change-password";
import UserDetailForm from "../_component/form-detail-user";
import { useEffect, useState } from "react";
import { Card } from "@nextui-org/react";

export default function UserInfo() {
  const [user, setUser] = useState(User.create());
  useEffect(() => {
    const data = localStorage.getItem("user-info");
    if (data) {
      const userInfo = User.fromJSON(JSON.parse(data));
      setUser(userInfo);
    }
  }, []);

  return (
    <section className="flex flex-col gap-4 items-center h-full justify-center	">
      <Card className="p-4">
        <UserDetailForm isDetail onClose={() => {}} user={user} />
      </Card>
      <Card className="p-4 ">
        <ChangePasswordForm />
      </Card>
    </section>
  );
}
