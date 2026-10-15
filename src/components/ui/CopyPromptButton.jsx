import { useState } from 'react';
import { Clipboard, ClipboardCheck } from 'lucide-react';
import { useI18n } from '../../i18n/lang';

/**
 * A small "copy to clipboard" button for SE starter prompts. Stops click
 * propagation so it can live inside an interactive (flip) card without
 * triggering it, and shows a transient "Copied!" confirmation.
 */
export function CopyPromptButton({
  prompt,
  label,
  color = 'var(--color-neon-violet)',
}) {
  const { tr } = useI18n();
  const text = label ?? tr('Copy Starter Prompt', '複製入門提示詞');
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1900);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={text}
      className="inline-flex items-center gap-1.5 rounded-lg border bg-white/5 px-2.5 py-1.5 text-xs font-semibold text-slate-200 transition-colors hover:text-white"
      style={{
        borderColor: copied
          ? 'color-mix(in oklab, var(--color-neon-green) 55%, transparent)'
          : `color-mix(in oklab, ${color} 40%, transparent)`,
      }}
    >
      {copied ? (
        <>
          <ClipboardCheck className="h-3.5 w-3.5 text-neon-green" />
          <span className="text-neon-green">{tr('Copied!', '已複製！')}</span>
        </>
      ) : (
        <>
          <Clipboard className="h-3.5 w-3.5" style={{ color }} />
          {text}
        </>
      )}
    </button>
  );
}

export default CopyPromptButton;
