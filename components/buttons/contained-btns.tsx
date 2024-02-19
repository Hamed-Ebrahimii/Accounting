import { classNames } from "@/utils/tools";
import {HTMLAttributes} from "react";

export const PrimaryContainedButton: React.FC<IButton> = ({
  title,
  ...props
}) => {
  return (
    <button
      className={classNames(
        "w-full rounded-md px-sm py-xs text-white",
        "bg-primary-700 hover:bg-primary-800 disabled:bg-primary-400"
      )}
      {...props}
    >
      {title}
    </button>
  );
};
export const OutlinePrimaryContainedButton: React.FC<IButton> = ({
                                                            title,
                                                            ...props
}) => {
  return (
      <button
          className={
              "w-full rounded-md px-sm py-xs text-primary-700 border-2 border-primary-700 hover:bg-primary-100 disabled:border-primary-400"}
          {...props}
      >
        {title}
      </button>
  );
};
