// components/settings-form.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SettingsFormProps {
  onClose: (result?: any) => void;
}

export function SettingsForm({ onClose }: SettingsFormProps) {
  return (
    <div className="space-y-6 py-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">模型</label>
        <Select defaultValue="claude-3.5-sonnet">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="claude-3.5-sonnet">claude-3.5-sonnet</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">自定义模型</label>
        <Input placeholder="自定义模型多个用空格隔开，不是必须" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">上下文数量</label>
        <Slider defaultValue={[10]} max={10} step={1} className="py-2" />
        <p className="text-muted-foreground text-xs">
          更多的上下文会使记忆更精确，但会消耗更多的额度
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">回复数</label>
        <Slider defaultValue={[1024]} max={1024} step={1} className="py-2" />
        <p className="text-muted-foreground text-xs">
          (max_tokens)回复数越大，越有可能回复更多的额度
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">角色设定</label>
        <Textarea
          placeholder="给你的会话设置一个专属的角色，不是必须"
          className="min-h-[100px]"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={() => onClose()}>
          恢复默认
        </Button>
        <Button onClick={() => onClose({ saved: true })}>保存</Button>
      </div>
    </div>
  );
}
