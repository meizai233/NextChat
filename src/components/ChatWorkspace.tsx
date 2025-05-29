export default function ChatWorkspace({ messages }) {
  return (
    <>
      <div
        className="mb-4 space-y-4"
        style={{
          padding: 24,
          minHeight: 360,
        }}
      >
        {/* 聊天记录 */}
        {messages.map((message) => (
          <div
            key={message.id}
            className={message.role === "user" ? "text-right" : "text-left"}
          >
            <span className="inline-block rounded bg-gray-100 px-4 py-2">
              {message.content}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
