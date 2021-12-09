import React, { useEffect, useState } from "react";
import { DOMMessageType } from "../../types";
import { getStoredOptions } from "../../utility/getStoredOptions";
import { Loading } from "../Loading";
import { Option, OptionsConfig, optionsConfig } from "./optionsConfig";
import { OptionsForm } from "./OptionsForm";
import { setStoredOptions } from "../../utility/setStoredOptions";

/**
 * Display a form allowing the user to configure options
 */
export function Options() {
  const [options, setStateOptions] = useState<OptionsConfig>();

  // message handler
  const sendMessage = chrome?.runtime?.sendMessage;

  // generate setters from options config
  const setters = {} as React.ComponentProps<typeof OptionsForm>["setters"];
  if (options) {
    for (const key of Object.keys(optionsConfig)) {
      setters[key as Option] = (value: any) => {
        const newOptions = { [key]: value };

        // set options in storage
        setStoredOptions(newOptions);

        // set options in state
        setStateOptions({ ...options, ...newOptions });

        // broadcast options
        sendMessage({
          type: DOMMessageType.UpdateOptions,
          options: newOptions,
        });
      };
    }
  }

  // load options data from storage
  useEffect(() => {
    getStoredOptions().then(setStateOptions);
  }, []);

  return !options ? (
    <Loading />
  ) : (
    <OptionsForm {...options} setters={setters} />
  );
}
