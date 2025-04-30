export default function Input({ label, type = "text", placeholder, onChange }) {
    return (
      <div>
        <label className="block mb-1 text-sm font-semibold">{placeholder}</label>
        <input
          type={type}
          className="w-full bg-black text-white px-3 py-2"
          onChange={(e) => onChange(label, e.target.value)}
        />
      </div>
    );
  }