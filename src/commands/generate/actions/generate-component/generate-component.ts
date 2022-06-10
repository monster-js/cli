import { ObjectInterface } from "../../../../interfaces/object.interface";
import { getConfig } from "../../../../utils/get-config";
import { generateClassComponent } from "./generate-class-component";
import { generateFunctionComponent } from "./generate-function-component";
import { generateFunctionTest } from "./generate-function-test";
import { generateShadowClassComponent } from "./generate-shadow-class-component";
import { generateShadowFunctionComponent } from "./generate-shadow-function-component";
import { generateComponentStyle } from "./generate-style";
import { generateComponentTest } from "./generate-test";

export function generateComponent(name: string, options: ObjectInterface) {
    const config = getConfig();
    if (config) {
        if (options.function) {
            if (!options.shadow) {
                generateFunctionComponent(name);
            } else {
                generateShadowFunctionComponent(name, options.shadow);
            }
            if (!options.noTest) {
                generateFunctionTest(name);
            }
        } else {
            if (!options.shadow) {
                generateClassComponent(name);
            } else {
                generateShadowClassComponent(name, options.shadow);
            }
            if (!options.noTest) {
                generateComponentTest(name);
            }
        }
        generateComponentStyle(name);
    }
}