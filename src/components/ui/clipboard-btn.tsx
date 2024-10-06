import { ClipboardIcon } from "@heroicons/react/24/solid";

interface ClipboardBtnProps {
  handleCopyToClipboard: () => void;
}

export function ClipboardBtn(props: ClipboardBtnProps) {
  return (
    <button
      onClick={props.handleCopyToClipboard}
      className="ml-3 text-gray-500 hover:text-indigo-600 transition-colors"
      aria-label="Copy to clipboard"
    >
      <ClipboardIcon className="h-7 w-7" />
    </button>
  );
}
