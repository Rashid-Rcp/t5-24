import { CgSpinner } from "react-icons/cg";

type LoadingOverlayProps = {
  show: boolean;
}

export default function LoadingOverlay({ show }: LoadingOverlayProps) {
  if (!show) return null;
  
  return (
    <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] flex items-center justify-center z-50">
      <CgSpinner className="animate-spin text-t5-black" size={32} />
    </div>
  );
} 