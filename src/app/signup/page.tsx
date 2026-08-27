"use client";

import React from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { SignupForm } from "@/components/auth/SignupForm";

export default function SignupPage() {
  React.useEffect(() => {
    document.title = "Create Account | Stanza Living";
  }, []);

  return (
    <AuthLayout
      brandQuote="Find somewhere that actually feels like home."
      imageSrc="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1600&auto=format&fit=crop"
    >
      <SignupForm />
    </AuthLayout>
  );
}
