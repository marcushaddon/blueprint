export const always = (val: any) => ({
    isBlueprint: true,
    gen() { return val; }
});

export const oneOf = (...choices: any[]) => choices[0];

