import { ObjectInterface } from "../../../../interfaces/object.interface";
import { generateClassComponent } from "./generate-class-component";
import { generateFunctionComponent } from "./generate-function-component";

export function generateComponent(name: string, options: ObjectInterface) {
    if (options.function) {
        generateFunctionComponent(name);
    } else {
        generateClassComponent(name);
    }
}