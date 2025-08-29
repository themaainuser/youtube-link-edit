import { cn } from "@/lib/utils";

type InputProps = {
  type: "text" | "number" | "email" | "password" | "tel"; // Define all expected types
  placeholder: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const Input = ({
  type,
  placeholder,
  value,
  onChange,
  className = "",
}: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={cn("") + className}
    />
  );
};

export default Input;
