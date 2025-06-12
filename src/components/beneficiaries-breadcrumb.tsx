import * as React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";

interface Section {
  id: string;
  label: string;
}

interface BeneficiariesBreadcrumbProps {
  sections: Section[];
  activeId: string;
  onStepClick: (id: string) => void;
}

export function BeneficiariesBreadcrumb({
  sections,
  activeId,
  onStepClick,
}: BeneficiariesBreadcrumbProps) {
  return (
    <div className="mb-6">
      <Breadcrumb className="flex flex-row items-center bg-gray-50 px-4 py-2 rounded-lg shadow-sm">
        {sections.map((sec, idx) => (
          <React.Fragment key={sec.id}>
            <BreadcrumbItem>
              <BreadcrumbLink
                onClick={() => onStepClick(sec.id)}
                className={`cursor-pointer px-2 py-1 rounded 
                  ${
                    activeId === sec.id
                      ? "font-semibold text-primary underline"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
              >
                {sec.label}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {idx < sections.length - 1 && (
              <Separator orientation="vertical" className="mx-1 h-5" />
            )}
          </React.Fragment>
        ))}
      </Breadcrumb>
    </div>
  );
}
