import { useEffect } from "react";

const F = "'Signika Negative', sans-serif";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmColor?: string;
  icon?: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({
  isOpen,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  confirmColor = "#ef4444",
  icon,
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onCancel]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    /* Backdrop */
    <div
      onClick={onCancel}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        backgroundColor: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(3px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20,
      }}
    >
      {/* Modal card */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          backgroundColor: "white",
          borderRadius: 16,
          padding: "32px 28px",
          maxWidth: 420,
          width: "100%",
          boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
          border: "1px solid #ede9fe",
          display: "flex",
          flexDirection: "column",
          gap: 20,
          animation: "modalPop 0.18s ease-out",
        }}
      >
        {/* Icon + Title */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, textAlign: "center" }}>
          {icon && (
            <div style={{
              width: 56, height: 56, borderRadius: "50%",
              backgroundColor: "#fff5f5", border: "2px solid #fca5a5",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {icon}
            </div>
          )}
          <h3 style={{
            fontFamily: F, fontWeight: 700, fontSize: 20,
            color: "#0f0f0f", margin: 0,
          }}>
            {title}
          </h3>
          <p style={{
            fontFamily: F, fontSize: 14, color: "#6b7280",
            margin: 0, lineHeight: 1.6,
          }}>
            {message}
          </p>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 12 }}>
          {/* Cancel */}
          <button
            onClick={onCancel}
            style={{
              flex: 1, padding: "12px",
              fontFamily: F, fontWeight: 600, fontSize: 14,
              color: "#374151", backgroundColor: "white",
              border: "1.5px solid #d1d5db", borderRadius: 10,
              cursor: "pointer",
            }}
          >
            {cancelLabel}
          </button>

          {/* Confirm */}
          <button
            onClick={onConfirm}
            style={{
              flex: 1, padding: "12px",
              fontFamily: F, fontWeight: 700, fontSize: 14,
              color: "white", backgroundColor: confirmColor,
              border: "none", borderRadius: 10,
              cursor: "pointer",
              boxShadow: `0 4px 14px ${confirmColor}55`,
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes modalPop {
          from { opacity: 0; transform: scale(0.94); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default ConfirmModal;
