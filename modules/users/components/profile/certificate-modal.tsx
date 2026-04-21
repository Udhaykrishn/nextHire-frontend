"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  Certificate,
  CertificateService,
  CreateCertificateDto,
} from "@/services/certificate.service";
import { Button } from "@/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";

interface CertificateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  certificate?: Certificate | null;
  onSuccess: () => void;
}

export function CertificateModal({
  open,
  onOpenChange,
  certificate,
  onSuccess,
}: CertificateModalProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [formData, setFormData] = React.useState<CreateCertificateDto>({
    certificateName: "",
    issuingOrganization: "",
    issueDate: "",
    expirationDate: "",
    certificateUrl: "",
  });

  React.useEffect(() => {
    if (certificate) {
      setFormData({
        certificateName: certificate.certificateName || "",
        issuingOrganization: certificate.issuingOrganization || "",
        issueDate: certificate.issueDate
          ? new Date(certificate.issueDate).toISOString().split("T")[0]
          : "",
        expirationDate: certificate.expirationDate
          ? new Date(certificate.expirationDate).toISOString().split("T")[0]
          : "",
        certificateUrl: certificate.certificateUrl || "",
      });
    } else {
      setFormData({
        certificateName: "",
        issuingOrganization: "",
        issueDate: "",
        expirationDate: "",
        certificateUrl: "",
      });
    }
  }, [certificate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (certificate) {
        await CertificateService.update(certificate._id, formData);
        toast.success("Certificate updated successfully");
      } else {
        await CertificateService.create(formData);
        toast.success("Certificate added successfully");
      }
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to save certificate");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {certificate ? "Edit Certificate" : "Add Certificate"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="certificateName">Certificate Name</Label>
            <Input
              id="certificateName"
              value={formData.certificateName}
              onChange={(e) =>
                setFormData({ ...formData, certificateName: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="issuingOrganization">Issuing Organization</Label>
            <Input
              id="issuingOrganization"
              value={formData.issuingOrganization}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  issuingOrganization: e.target.value,
                })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="issueDate">Issue Date</Label>
              <Input
                id="issueDate"
                type="date"
                value={formData.issueDate as string}
                onChange={(e) =>
                  setFormData({ ...formData, issueDate: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expirationDate">Expiration Date</Label>
              <Input
                id="expirationDate"
                type="date"
                value={formData.expirationDate as string}
                onChange={(e) =>
                  setFormData({ ...formData, expirationDate: e.target.value })
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="certificateUrl">Certificate URL</Label>
            <Input
              id="certificateUrl"
              type="url"
              value={formData.certificateUrl}
              onChange={(e) =>
                setFormData({ ...formData, certificateUrl: e.target.value })
              }
              placeholder="https://..."
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : certificate ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
