"use client";

import React from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  React.useEffect(() => {
    document.title = "Sign In | Stanza Living";
  }, []);

  return (
    <AuthLayout
      brandQuote="Your next room is closer than you think."
      imageSrc="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=1600&auto=format&fit=crop"
    >
      <LoginForm />
    </AuthLayout>
  );
}
