// export interface Selection {
//     selectionName: string;
//     price: number;
//     explanationBool: boolean;
//     explanation: string;
//     explainPic: string;
// }

export interface ISelection {
    selectionName: string;
    price: number;
    hasExplainPic: boolean;
    explainPic: string | undefined;
    customChoice: string;
    // customChoice?: string;
}