import HeaderPanel from "@/components/HeaderPanel";
import InputPanel from "@/components/InputPanel";

export default function Chat(props) {
  return (
    <>
      <div className="flex h-dvh w-full min-w-0 flex-col">
        <HeaderPanel />
        <div className="flex-1">siderbar</div>
        <InputPanel />
      </div>
    </>
  );
}
