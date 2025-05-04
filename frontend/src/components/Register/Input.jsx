export default function Input({ label, placeholder, type = "text", onChange, error }) {
  return (
    <div>
      <label className="block mb-1 text-sm font-semibold">{placeholder}</label>
      <input
        type={type}
        className={`w-full bg-black text-white px-3 py-2 border-2 rounded-sm 
          ${error ? "border-red-500" : "border-[#333]"} 
          focus:outline-none`}
        onChange={(e) => onChange(label, e.target.value)}
      />
    </div>
  );
}