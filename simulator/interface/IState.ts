﻿import { IOptions } from "./IOptions";
import { ICore } from "./ICore";
import { IWarrior } from "./IWarrior";

export interface IState {

    options: IOptions;
    cycle: number;
    warriorIndex: number;
    warriors: IWarrior[];
}