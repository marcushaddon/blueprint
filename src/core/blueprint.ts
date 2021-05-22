import { WriteStream } from "fs";
import { debugPort } from "process";

interface IBlueprint {
    gen(): any;
    isBlueprint: true;
}

type DynamicPath = {
    path: string;
    blueprint: IBlueprint;
}

const isSimple = (val: any) => new Set(['string', 'number', 'undefined']).has(typeof val);
    

const getDynamicPaths = (bp: any, path: string[] = [], paths: DynamicPath[] = []) => {
    // TODO: handle array
    for (const key of Object.keys(bp)) {
        path.push(key);
        const val = bp[key];
        if (isSimple(val)) {
            continue;
        }
        if (val.isBlueprint) {
            paths.push({
                path: path.join('.'),
                blueprint: val,
            });
        } else {
            paths = [...paths, ...getDynamicPaths(val, path, paths)]
        }
        path.pop();
    }

    return paths;
};

const deepWrite = (obj: { [key: string]: any }, path: string, val: any) => {
    obj[path] = val;

    return obj;
}

export const blueprint = (arg: any) => ({
    gen() { 
        // TODO: deep copy 'arg'
        const dynamicPaths: DynamicPath[] = getDynamicPaths(arg);
        for (const dp of dynamicPaths) {
            // TODO: place 'at' path
            deepWrite(arg, dp.path, dp.blueprint.gen());
        }

        return arg;
    }
});