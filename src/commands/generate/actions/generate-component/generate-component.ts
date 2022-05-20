import { ObjectInterface } from "../../../../interfaces/object.interface";
import { generateMultipleFilesComponent } from "./generate-multiple-files-component";

export function generateComponent(name: string, options: ObjectInterface) {
    generateMultipleFilesComponent(name);
}