"use client";
import { useState, use } from "react";
import Write from "@/components/Write/Write";

const page = ({ params }: { params: Promise<{ journalId?: string }> }) => {
  const [journalId, setJournalId] = useState<string | undefined>(
    use(params).journalId
  );

  return <Write journalId={journalId} />;
};

export default page;
