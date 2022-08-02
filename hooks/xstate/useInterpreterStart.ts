/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";

import type { Interpreter } from "xstate";

import authPageMachine from "@/machines/auth-page-machine";

interface Props {
  children?: ReactNode;
}

const authPageActor: Interpreter<
  MachineContextGenericI,
  any,
  machineEventsGenericType,
  machineFiniteStatesGenericType,
  ResolveTypegenMeta<
    TypegenDisabled,
    machineEventsGenericType,
    BaseActionObject,
    ServiceMap
  >
>;

const useInterpreterStart = (path: string, interpreter: any) => {
  //
  //
  //
  //
};

export default useInterpreterStart;
