export const frontmatterMapper = (str) => {

    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = str.match(frontmatterRegex);

    if (!match) {
        throw new Error("add FrontMatter in your .md files")
    }

    const frontmatterTxt = match[1];
    const contentTxt = match[2].trim();

    const frontmatter = frontmatterTxt.split("\n").reduce((acc, line) => {

        const [key, ...value] = line.split(":");

        if (key && value) {

            const parsedKey = key.trim();
            const parsedValue = value.join(":").trim();

            acc[parsedKey] = parsedKey === "tag" ? parsedValue.split(" ") : parsedValue;
        }

        return acc;
    }, {});

    const newVar = {
        frontmatter,
        content : contentTxt
    };

    return newVar
}