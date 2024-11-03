import { Key } from "react";

// types.ts
export interface User {
    [x: string]: Key | null | undefined;
    _id: string;
    name: string;
    email: string;
    type: string;
  }