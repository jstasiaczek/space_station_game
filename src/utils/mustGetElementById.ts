export const mustGetElementById = <Type>(id: string, doc: Document = document): Type => {
    const element = doc.getElementById(id);

    if (element === null) {
        throw new Error(`Element with id = "${id}" not found!`);
    }
    return element as Type;
};
