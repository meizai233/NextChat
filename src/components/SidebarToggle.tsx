// 触发siderbar显示
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./ui/button";
import { SquareChevronRight } from "lucide-react";
export default function SiderbarToggle() {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="ghost"
              size="icon"
              className="cursor-pointer hover:cursor-pointer"
            >
              <SquareChevronRight className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Toggle Sider</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
