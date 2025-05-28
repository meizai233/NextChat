interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  className?: string;
  placeholder?: string;
}

export function ChatInput({
  onSend,
  isLoading = false,
  className,
  placeholder = "输入消息...",
}: ChatInputProps) {
  const [message, setMessage] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (message.trim() && !isLoading) {
      onSend(message.trim());
      setMessage("");
      textareaRef.current?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className={cn(
        "bg-background flex w-full flex-col rounded-lg border p-2",
        className,
      )}
    >
      <Textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="min-h-10 resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        rows={1}
        autoComplete="off"
      />

      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <Button type="button" size="icon" variant="ghost">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Button type="button" size="icon" variant="ghost">
            <Mic className="h-5 w-5" />
          </Button>
          <Button type="button" size="icon" variant="ghost">
            <Smile className="h-5 w-5" />
          </Button>
        </div>

        <Button
          onClick={handleSend}
          disabled={isLoading || !message.trim()}
          size="sm"
          className="gap-1"
        >
          {isLoading ? "发送中..." : "发送"}
          <PaperPlaneIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
