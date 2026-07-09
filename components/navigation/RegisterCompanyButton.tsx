import React from "react";
import { Button } from "../ui/Button";

interface RegisterCompanyButtonProps { className?: string; }

export function RegisterCompanyButton({ className }: RegisterCompanyButtonProps) {
  return (
    <Button 
      variant="primary"
      className={className}
    >
      Register Company
    </Button>
  );
}
