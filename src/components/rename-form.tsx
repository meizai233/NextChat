"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface RenameFormProps {
  initialValue: string;
  onClose: (result?: { newTitle: string }) => void;
}

export function RenameForm({ initialValue, onClose }: RenameFormProps) {
  const [title, setTitle] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onClose({ newTitle: title.trim() });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="请输入新的会话标题"
        autoFocus
      />
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={() => onClose()}>
          取消
        </Button>
        <Button type="submit">确认</Button>
      </div>
    </form>
  );
}
