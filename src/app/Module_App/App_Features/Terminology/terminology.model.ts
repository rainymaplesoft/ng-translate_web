// export interface IKeyValue {
//     key: string;
//     value: string;
// }

import { IKeyValue } from 'app/Module_Core';

export interface ITermInfo {
    client: string;
    language: string;
    category: string;
    terms: IKeyValue[];
}
