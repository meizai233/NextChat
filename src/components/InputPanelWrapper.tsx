import InputPanel from "./InputPanel";

export default function InputPanelWrapper({
  input,
  setInput,
  handleSubmit,
}: {
  input: string;
  setInput: (val: string) => void;
  handleSubmit: () => void;
}) {
  return <InputPanel value={input} onChange={setInput} onSend={handleSubmit} />;
}
