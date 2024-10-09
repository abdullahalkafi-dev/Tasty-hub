/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type TInputField = {
  fieldName: string;
  label: string;
  placeholder: string;
  control: any;
  type: string;
  className?: string;
};

const TextField = ({
  fieldName,
  label,
  placeholder,
  control,
  type,
  className,
}: TInputField) => {
  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              className={`${className} rounded-2xl`}
              type={type}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextField;
