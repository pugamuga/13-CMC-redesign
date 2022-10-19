import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import { FaMoon } from "react-icons/fa";

function ToggleDarkMode() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (!enabled) {
      setTimeout(() => {
        setEnabled(true);
      }, 500);
    }
  }, [enabled]);

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={`${
        enabled ? "bg-white/20" : "bg-white/90"
      } relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <div
        className={`${
          enabled ? "translate-x-6 " : "translate-x-1 "
        } inline-block transform   tr-300 `}
      >
        <div className=" relative">
          <div
            className={` h-4 w-4 absolute top-0 right-[1px] rounded-full z-0 ${
              enabled ? "opacity-0 " : "opacity-100 bg-primary"
            } tr-300`}
          ></div>
          <FaMoon
            className={`  scale-x-[-100%] z-10 ${
              enabled ? "opacity-100 " : "opacity-0 text-primary"
            } tr-300`}
          />
        </div>
      </div>
    </Switch>
  );
}

export default ToggleDarkMode;
