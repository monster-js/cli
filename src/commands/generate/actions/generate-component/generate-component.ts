import { ObjectInterface } from "../../../../interfaces/object.interface";
import { getConfig } from "../../../../utils/get-config";
import { generateClassComponent } from "./generate-class-component";
import { generateFunctionComponent } from "./generate-function-component";
import { generateFunctionTest } from "./generate-function-test";
import { generateComponentStyle } from "./generate-style";
import { generateComponentTest } from "./generate-test";

export function generateComponent(name: string, options: ObjectInterface) {
    const config = getConfig();
    if (config) {
        if (options.function) {
            generateFunctionComponent(name);
            generateComponentStyle(name);
            if (!options.noTest) {
                generateFunctionTest(name);
            }
        } else {
            generateClassComponent(name);
            generateComponentStyle(name);
            if (!options.noTest) {
                generateComponentTest(name);
            }
        }
    }
}