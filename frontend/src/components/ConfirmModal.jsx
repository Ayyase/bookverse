export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl">
        <h2 className="text-xl font-bold">
          Yakin ingin menghapus?
        </h2>

        <div className="flex gap-4 mt-4">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Ya
          </button>

          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}