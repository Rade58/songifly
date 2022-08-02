/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";

import { useRouter } from "next/router";

import type { Interpreter, ResolvedTypegenMeta } from "xstate";

import authPageMachine from "@/machines/auth-page-machine";

/* 
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
>; */

let a: Interpreter = authPageMachine;

const useInterpreterStart = (path: string, interpreter: any) => {
  //
  //
  //
  //
};

export default useInterpreterStart;
