import { Eye } from "lucide-react";

export default function PasswordInput({ label, placeholder, visible, toggle, onChange, error }) {
  return (
    <div>
      <label className="block mb-1 text-sm font-semibold">{placeholder}</label>
      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          className={`w-full bg-black text-white px-3 py-2 pr-10 border-2 rounded-sm 
            ${error ? "border-red-500" : "border-[#333]"} 
            focus:outline-none`}
          onChange={(e) => onChange(label, e.target.value)}
        />
        <button
          type="button"
          onClick={toggle}
          className="absolute right-2 top-2 text-white"
        >
          <Eye size={20} />
        </button>
      </div>
    </div>
  );
}