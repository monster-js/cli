import { resolve } from "path";

export const paths = {
    component: resolver('assets/component/component-logic.txt'),
    service: resolver('assets/service/service.txt'),
    module: resolver('assets/module/module.txt'),
    guard: resolver('assets/guard/guard.txt'),
    class: resolver('assets/class/class.txt'),
    directive: resolver('assets/directive/directive.txt'),
    pipe: resolver('assets/pipe/pipe.txt'),
    interface: resolver('assets/interface/interface.txt'),
    newApp: resolver('assets/starter-app')
};

function resolver(path: string) {
    return resolve(__dirname, path);
}
